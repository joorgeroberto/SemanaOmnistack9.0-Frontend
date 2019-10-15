// Aqui faremos a comunicação com o backend usando a biblioteca axios.
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;