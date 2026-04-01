import api from './api';

export const createBooking = (data: any) => api.post('/bookings', data);
export const getBookingById = (id: string | number) => api.get(`/bookings/${id}`);
export const getUserBookings = (userId: string | number) => api.get(`/bookings/user/${userId}`);
export const getAllBookings = () => api.get('/bookings');
