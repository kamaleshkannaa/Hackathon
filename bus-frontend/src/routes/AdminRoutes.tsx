import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/admin/Dashboard';
export const AdminRoutes = () => <Routes><Route path="/" element={<Dashboard />} /></Routes>;
