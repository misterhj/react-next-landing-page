// Ruta: src/api/publicApi.ts
// Instancia de axios sin interceptor de autorización.
// Se usa para llamadas públicas (catálogo de productos/categorías) que no requieren JWT.
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
