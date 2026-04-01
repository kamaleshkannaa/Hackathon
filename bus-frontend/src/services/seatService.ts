import api from './api';

export const getSeatsByBus = (busId: string | number) => api.get(`/seats/bus/${busId}`);
export const addSeat = (data: any) => api.post('/seats', data);
