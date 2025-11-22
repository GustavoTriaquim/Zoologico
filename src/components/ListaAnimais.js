import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import animaisService from '../services/animaisService';
import Modal from './Modal';
import FormsAnimais from './FormsAnimais';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin: 0;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
  }

  tbody tr {
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f9f9f9;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #da190b;
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #667eea;
  font-size: 1.1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f4f7fc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FilterInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;
  font-size: 1rem;
`;

const ClearButton = styled(AddButton)`
  background: #f44336;
  &:hover {
    background-color: #da190b;
    box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
  }
`;

const ListaAnimais = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [filters, setFilters] = useState({
    habitat: '',
    especie: '',
    paisOrigem: '',
    dataNascimento: '',
  });


  const loadAnimals = useCallback(async (currentFilters = filters) => {
      try {
        setLoading(true);
        // Remove empty filters before sending to the service
        const activeFilters = Object.fromEntries(
          Object.entries(currentFilters).filter(([_, v]) => v)
        );
        const response = await animaisService.getAll(activeFilters);
        setAnimals(response.data);
      } catch (error) {
        console.error('Erro ao carregar animais:', error);
        alert('Erro ao carregar animais');
      } finally {
        setLoading(false);
      }
  }, [filters]);

  useEffect(() => {
    loadAnimals();
  }, [loadAnimals]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      habitat: '',
      especie: '',
      paisOrigem: '',
      dataNascimento: '',
    };
    setFilters(emptyFilters);
    loadAnimals(emptyFilters);
  };

  const handleAddAnimal = () => {
    setSelectedAnimal(null);
    setModalOpen(true);
  };

  const handleEditAnimal = (animal) => {
    setSelectedAnimal(animal);
    setModalOpen(true);
  };

  const handleDeleteAnimal = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este animal?')) {
      try {
        await animaisService.delete(id);
        loadAnimals();
      } catch (error) {
        console.error('Erro ao deletar animal:', error);
        alert('Erro ao deletar animal');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedAnimal) {
        await animaisService.update(selectedAnimal.id, formData);
      } else {
        await animaisService.create(formData);
      }
      setModalOpen(false);
      loadAnimals();
    } catch (error) {
      console.error('Erro ao salvar animal:', error);
      alert('Erro ao salvar animal');
    }
  };

  return (
    <Container>
      <Header>
        <Title>🦁 Gerenciamento de Animais</Title>
        <AddButton onClick={handleAddAnimal}>+ Novo Animal</AddButton>
      </Header>

      <FilterContainer>
        <FilterInput 
          type='text'
          name='habitat'
          placeholder='Filtrar por Habitat'
          value={filters.habitat}
          onChange={handleFilterChange}
        />
        <FilterInput 
          type='text'
          name='especie'
          placeholder='Filtrar por Espécie'
          value={filters.especie}
          onChange={handleFilterChange}
        />
        <FilterInput 
          type='text'
          name='paisOrigem'
          placeholder='Filtrar por País de Origem'
          value={filters.paisOrigem}
          onChange={handleFilterChange}
        />
        <FilterInput 
          type='text'
          name='dataNascimento'
          placeholder='Filtrar por Data de Nascimento'
          value={filters.dataNascimento}
          onChange={handleFilterChange}
        />
        <ClearButton onClick={handleClearFilters}>Limpar</ClearButton>
      </FilterContainer>

      {loading ? (
        <LoadingMessage>Carregando animais...</LoadingMessage>
      ) : animals.length === 0 ? (
        <EmptyMessage>Nenhum animal cadastrado. Clique em "+ Novo Animal" para começar.</EmptyMessage>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Habitat</th>
                <th>País de Origem</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.nome}</td>
                  <td>{animal.especie}</td>
                  <td>{animal.habitat}</td>
                  <td>{animal.paisOrigem}</td>
                  <td>{
                    animal.dataNascimento ?
                      animal.dataNascimento.split('-').reverse().join('/') : 'N/A'
                  }</td>
                  <td>
                    <ActionButtons>
                      <EditButton onClick={() => handleEditAnimal(animal)}>
                        Editar
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteAnimal(animal.id)}>
                        Deletar
                      </DeleteButton>
                    </ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      <Modal
        isOpen={modalOpen}
        title={selectedAnimal ? 'Editar Animal' : 'Novo Animal'}
        onClose={() => setModalOpen(false)}
      >
        <FormsAnimais
          initialData={selectedAnimal}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default ListaAnimais;