import axios from 'axios';
import { API_URL } from '@env';

const baseURL = API_URL || 'https://binsmart.onrender.com/';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;