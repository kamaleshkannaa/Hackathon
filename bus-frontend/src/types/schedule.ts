import { Bus } from './bus';
import { Route } from './route';

export interface Schedule {
  id?: number | string;
  busId: number | string;
  routeId: number | string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  date: string;
  bus?: Bus;
  route?: Route;
}
