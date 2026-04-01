export interface Bus {
  id?: number | string;
  busNumber: string;
  name: string;
  totalSeats: number;
  busType: 'AC' | 'Non-AC' | 'Sleeper';
}
