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

const FormCuidados = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nomeCuidado: '',
    descricao: '',
    frequencia: '',
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
        <Label htmlFor="nomeCuidado">Nome do Cuidado *</Label>
        <Select
          id="nomeCuidado"
          name="nomeCuidado"
          value={formData.nomeCuidado}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um tipo de cuidado</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Exame Veterinário">Exame Veterinário</option>
          <option value="Vacinação">Vacinação</option>
          <option value="Treinamento">Treinamento</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Enriquecimento">Enriquecimento</option>
          <option value="Outro">Outro</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="descricao">Descrição</Label>
        <TextArea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descreva os detalhes do cuidado..."
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="frequencia">Frequência *</Label>
        <Select
          id="frequencia"
          name="frequencia"
          value={formData.frequencia}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma frequência</option>
          <option value="Diária">Diária</option>
          <option value="Semanal">Semanal</option>
          <option value="Quinzenal">Quinzenal</option>
          <option value="Mensal">Mensal</option>
          <option value="Trimestral">Trimestral</option>
          <option value="Semestral">Semestral</option>
          <option value="Anual">Anual</option>
        </Select>
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

export default FormCuidados;