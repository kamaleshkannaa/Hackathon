import { User } from './user';
import { Schedule } from './schedule';

export interface Booking {
  id?: number | string;
  userId: number | string;
  scheduleId: number | string;
  seatNumbers: number[];
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  bookingDate: string;
  schedule?: Schedule;
  user?: User;
}
