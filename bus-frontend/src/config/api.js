import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add JWT token and role headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add role header for admin/user specific requests
    if (user.role) {
      config.headers['X-User-Role'] = user.role;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    if (response?.status === 403) {
      // Forbidden - user doesn't have required role
      console.error('Access denied: Insufficient permissions');
    }
    
    return Promise.reject(error);
  }
);

// Role-based API instance creator
export const createRoleApi = (requiredRole) => {
  const roleApi = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  roleApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== requiredRole) {
      return Promise.reject(new Error(`Access denied: ${requiredRole} role required`));
    }
    
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['X-User-Role'] = user.role;
    return config;
  });

  return roleApi;
};

export default api;
