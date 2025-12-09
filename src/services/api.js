import axios from 'axios';
import { mockRequest } from './mockAdapter';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || true; // Default to true for now

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (Mocking logic here)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (USE_MOCKS && error.config) {
      console.log(`[MOCK] Intercepting request to: ${error.config.url}`);
      try {
        const mockResponse = await mockRequest(error.config);
        return { data: mockResponse }; // Return mocked data structure matching axios response
      } catch (mockError) {
        // If mock doesn't handle it, reject with original error or mock error
        return Promise.reject(mockError || error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
