import api from './api';

export const getRoutes = () => api.get('/routes');
export const getRouteById = (id: string | number) => api.get(`/routes/${id}`);
export const addRoute = (data: any) => api.post('/routes', data);
export const updateRoute = (id: string | number, data: any) => api.put(`/routes/${id}`, data);
export const deleteRoute = (id: string | number) => api.delete(`/routes/${id}`);
