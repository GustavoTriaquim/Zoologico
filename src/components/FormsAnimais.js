import styled from 'styled-components';
import { useState, useEffect } from 'react';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const FormsAnimais = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    dataNascimento: '',
    especie: '',
    habitat: '',
    paisOrigem: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="nome">Nome do Animal *</Label>
        <Input
          id="nome"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          placeholder="Ex: Leão Simba"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="descricao">Descrição</Label>
        <TextArea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descreva características do animal..."
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
        <Input
          id="dataNascimento"
          type="date"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="especie">Espécie *</Label>
        <Select
          id="especie"
          name="especie"
          value={formData.especie}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma espécie</option>
          <option value="Leão">Leão</option>
          <option value="Tigre">Tigre</option>
          <option value="Elefante">Elefante</option>
          <option value="Girafa">Girafa</option>
          <option value="Macaco">Macaco</option>
          <option value="Pinguim">Pinguim</option>
          <option value="Urso">Urso</option>
          <option value="Serpente">Serpente</option>
          <option value="Outro">Outro</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="habitat">Habitat *</Label>
        <Select
          id="habitat"
          name="habitat"
          value={formData.habitat}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um habitat</option>
          <option value="Savana">Savana</option>
          <option value="Floresta">Floresta</option>
          <option value="Deserto">Deserto</option>
          <option value="Oceano">Oceano</option>
          <option value="Montanha">Montanha</option>
          <option value="Tundra">Tundra</option>
          <option value="Pântano">Pântano</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="paisOrigem">País de Origem *</Label>
        <Input
          id="paisOrigem"
          type="text"
          name="paisOrigem"
          value={formData.paisOrigem}
          onChange={handleChange}
          required
          placeholder="Ex: Brasil"
        />
      </FormGroup>

      <ButtonGroup>
        <SubmitButton type="submit">
          {initialData ? 'Atualizar' : 'Cadastrar'}
        </SubmitButton>
        <CancelButton type="button" onClick={onCancel}>
          Cancelar
        </CancelButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default FormsAnimais;
