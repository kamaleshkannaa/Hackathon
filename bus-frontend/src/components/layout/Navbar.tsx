import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Bus, User, LogOut, Shield } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition">
            <Bus className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">ExpressBus</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer">Find Tickets</Link>
            
            {!isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">Login</Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin" className="text-rose-600 bg-rose-50 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-rose-100 transition">
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                {!isAdmin && (
                  <Link to="/my-bookings" className="text-gray-600 hover:text-blue-600 font-medium transition">
                    My Bookings
                  </Link>
                )}
                <div className="flex items-center gap-2 pl-4 border-l">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
