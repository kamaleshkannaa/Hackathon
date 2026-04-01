import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPage';
import BusManagementPage from './pages/BusManagementPage';
import RouteManagementPage from './pages/RouteManagementPage';
import ScheduleManagementPage from './pages/ScheduleManagementPage';
import BookingManagementPage from './pages/BookingManagementPage';
import AdminProfilePage from './pages/AdminProfilePage';

// Protected Route
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';

const AdminApp = () => {
  return (
    <Routes>
      {/* Admin Login (separate from user login) */}
      <Route path="/login" element={<AdminLoginPage />} />
      
      {/* Protected Admin Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/buses" element={<BusManagementPage />} />
          <Route path="/routes" element={<RouteManagementPage />} />
          <Route path="/schedules" element={<ScheduleManagementPage />} />
          <Route path="/bookings" element={<BookingManagementPage />} />
          <Route path="/profile" element={<AdminProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminApp;
