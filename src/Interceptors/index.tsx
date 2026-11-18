import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3001' : '/',
  headers: {
    'Content-Type': 'application/json',
  },
});
