export interface User {
  id?: number | string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
