import api from './api';

export const getBuses = () => api.get('/buses');
export const getBusById = (id: string | number) => api.get(`/buses/${id}`);
export const addBus = (data: any) => api.post('/buses', data);
export const updateBus = (id: string | number, data: any) => api.put(`/buses/${id}`, data);
export const deleteBus = (id: string | number) => api.delete(`/buses/${id}`);
