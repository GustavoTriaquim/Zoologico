import styled from 'styled-components';
import { useState, useEffect } from 'react';
import cuidadosService from '../services/cuidadosService';
import FormsCuidados from './FormsCuidados';
import Modal from './Modal';

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

const ListaCuidados = () => {
  const [cares, setCares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCare, setSelectedCare] = useState(null);

  useEffect(() => {
    loadCares();
  }, []);

  const loadCares = async () => {
    try {
      setLoading(true);
      const response = await cuidadosService.getAll();
      setCares(response.data);
    } catch (error) {
      console.error('Erro ao carregar cuidados:', error);
      alert('Erro ao carregar cuidados');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCare = () => {
    setSelectedCare(null);
    setModalOpen(true);
  };

  const handleEditCare = (care) => {
    setSelectedCare(care);
    setModalOpen(true);
  };

  const handleDeleteCare = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cuidado?')) {
      try {
        await cuidadosService.delete(id);
        loadCares();
      } catch (error) {
        console.error('Erro ao deletar cuidado:', error);
        alert('Erro ao deletar cuidado');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCare) {
        await cuidadosService.update(selectedCare.id, formData);
      } else {
        await cuidadosService.create(formData);
      }
      setModalOpen(false);
      loadCares();
    } catch (error) {
      console.error('Erro ao salvar cuidado:', error);
      alert('Erro ao salvar cuidado');
    }
  };

  return (
    <Container>
      <Header>
        <Title>💊 Gerenciamento de Cuidados</Title>
        <AddButton onClick={handleAddCare}>+ Novo Cuidado</AddButton>
      </Header>

      {loading ? (
        <LoadingMessage>Carregando cuidados...</LoadingMessage>
      ) : cares.length === 0 ? (
        <EmptyMessage>Nenhum cuidado cadastrado. Clique em "+ Novo Cuidado" para começar.</EmptyMessage>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Nome do Cuidado</th>
                <th>Descrição</th>
                <th>Frequência</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cares.map((care) => (
                <tr key={care.id}>
                  <td>{care.nomeCuidado}</td>
                  <td>{care.descricao || '-'}</td>
                  <td>{care.frequencia}</td>
                  <td>
                    <ActionButtons>
                      <EditButton onClick={() => handleEditCare(care)}>
                        Editar
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteCare(care.id)}>
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
        title={selectedCare ? 'Editar Cuidado' : 'Novo Cuidado'}
        onClose={() => setModalOpen(false)}
      >
        <FormsCuidados
          initialData={selectedCare}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default ListaCuidados;