import React, { createContext, useState } from 'react';
import { User } from '../types/user';
interface AuthContextType { user: User | null; login: () => void; logout: () => void; }
export const AuthContext = createContext<AuthContextType>({ user: null, login: () => {}, logout: () => {} });
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return <AuthContext.Provider value={{ user, login: () => {}, logout: () => {} }}>{children}</AuthContext.Provider>;
};
