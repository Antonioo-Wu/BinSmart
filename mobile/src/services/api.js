import axios from 'axios';
import { API_URL } from '@env';

const baseURL = API_URL || 'https://localhost:3000/api';

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});


export default api;