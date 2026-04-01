import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/layout/Sidebar';
import Dashboard from '../pages/admin/Dashboard';
import ManageBuses from '../pages/admin/ManageBuses';
import ManageRoutes from '../pages/admin/ManageRoutes';
import ManageSchedules from '../pages/admin/ManageSchedules';
import ManageBookings from '../pages/admin/ManageBookings';

export default function AdminRoutes() {
  const { user, isAdmin } = useAuth();
  
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/buses" element={<ManageBuses />} />
          <Route path="/routes" element={<ManageRoutes />} />
          <Route path="/schedules" element={<ManageSchedules />} />
          <Route path="/bookings" element={<ManageBookings />} />
        </Routes>
      </div>
    </div>
  );
}
