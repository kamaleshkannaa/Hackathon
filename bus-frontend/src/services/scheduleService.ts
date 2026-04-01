import api from './api';

export const getSchedules = () => api.get('/schedules');
export const getScheduleById = (id: string | number) => api.get(`/schedules/${id}`);
export const addSchedule = (data: any) => api.post('/schedules', data);
export const updateSchedule = (id: string | number, data: any) => api.put(`/schedules/${id}`, data);
export const deleteSchedule = (id: string | number) => api.delete(`/schedules/${id}`);
