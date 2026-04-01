import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserRoutes } from './UserRoutes';
import { AdminRoutes } from './AdminRoutes';
export const AppRoutes = () => <Routes><Route path="/*" element={<UserRoutes />} /><Route path="/admin/*" element={<AdminRoutes />} /></Routes>;
