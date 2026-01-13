import axios from 'axios';
import { mockRequestEntrega3 } from './mockAdapterEntrega3';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Force mock only if explicitly true in env, otherwise false (allowing backend connection)
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

console.log('[API CONFIG] USE_MOCKS:', USE_MOCKS);
console.log('[API CONFIG] API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - INTERCEPTA ANTES DE ENVIAR
api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Si USE_MOCKS está activado, interceptar ANTES de hacer la petición
    if (USE_MOCKS) {
      // eslint-disable-next-line no-console
      console.log(`[MOCK E3] Intercepting request BEFORE sending: ${config.method.toUpperCase()} ${config.url}`);
      try {
        const mockResponse = await mockRequestEntrega3(config);
        // Crear una respuesta falsa que axios pueda manejar
        config.adapter = () => {
          return Promise.resolve({
            data: mockResponse,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          });
        };
      } catch (mockError) {
        // eslint-disable-next-line no-console
        console.error('[MOCK E3] Error in mock:', mockError);
        config.adapter = () => {
          return Promise.reject(mockError);
        };
      }
    }
    
    return config;
  },
  error => Promise.reject(error),
);

export default api;
