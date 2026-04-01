import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Bus, User, LogOut, Shield, Search } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-nav sticky top-0 z-40 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all duration-300">
              <Bus className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all">
              AeroBus
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/search" className="flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors">
              <Search className="w-4 h-4" /> Find Tickets
            </Link>
            
            {!isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-300 hover:text-white font-medium transition px-2">Login</Link>
                <Link to="/register">
                  <Button className="!rounded-full px-6 shadow-[0_0_15px_rgba(99,102,241,0.3)]">Join Now</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                {isAdmin && (
                  <Link to="/admin" className="text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-fuchsia-500/20 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all">
                    <Shield className="w-4 h-4" />
                    Admin Portal
                  </Link>
                )}
                {!isAdmin && (
                  <Link to="/my-bookings" className="text-indigo-400 hover:text-indigo-300 font-bold transition">
                    My Bookings
                  </Link>
                )}
                <div className="flex items-center gap-3 pl-5 border-l border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 shadow-inner">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-white hidden sm:block">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="p-2.5 text-slate-400 hover:text-rose-400 transition-colors rounded-full hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20">
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
