// Ruta: src/api/apiInstance.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Función auxiliar para obtener el valor de una cookie por su nombre
 */
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
}

// Interceptor para inyectar automáticamente el token JWT desde la Cookie
api.interceptors.request.use(
  (config) => {
    // Leemos el token que 'useAuth' guarda en la cookie 'admin-token'
    const token = getCookie('admin-token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para capturar respuestas con errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Sesión expirada o sin permisos de acceso.');
    }
    return Promise.reject(error);
  }
);