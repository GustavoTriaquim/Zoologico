import axios from "axios";

const API_URL = 'http://localhost:5000/api/animais';

const animaisService = {
  getAll: (filters = {} ) => {
    const params = new URLSearchParams(filters).toString();
    return axios.get(`${API_URL}?${params}`);
  },
  getById: (id) => axios.get(`${API_URL}/${id}`),
  create: (data) => axios.post(API_URL, data),
  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/${id}`),
};

export default animaisService;