import axios from 'axios';

// 1. Definimos la URL base del Backend de Spring Boot
const API_URL = 'http://localhost:8080/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor para inyectar automáticamente el token JWT
api.interceptors.request.use(
  (config) => {
    // Intentamos recuperar el token (puedes guardarlo como 'token' o 'jwt')
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor para capturar respuestas (Por ejemplo, redireccionar si el token expira)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el backend nos devuelve 403 (Forbidden) o 401 (Unauthorized), el token podría haber expirado
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Sesión expirada o sin permisos. Redireccionando...');
      // Aquí puedes limpiar el localStorage y redirigir al login si lo deseas:
      // if (typeof window !== 'undefined') {
      //   localStorage.removeItem('token');
      //   window.location.href = '/login';
      // }
    }
    return Promise.reject(error);
  }
);