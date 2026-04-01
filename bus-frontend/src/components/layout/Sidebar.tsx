import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Bus, Route, Calendar, Ticket, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { name: 'Command Center', to: '/admin', icon: LayoutDashboard },
    { name: 'Fleet Inventory', to: '/admin/buses', icon: Bus },
    { name: 'Route Network', to: '/admin/routes', icon: Route },
    { name: 'Dispatch Timetables', to: '/admin/schedules', icon: Calendar },
    { name: 'Manifest Logs', to: '/admin/bookings', icon: Ticket },
  ];

  return (
    <aside className="w-72 bg-[#111318] text-slate-300 min-h-[calc(100vh-5rem)] border-r border-white/5 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 blur-[50px] pointer-events-none"></div>
      
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 text-xs font-black text-fuchsia-400 uppercase tracking-[0.2em] mb-8 px-3 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg">
           <ShieldAlert className="w-4 h-4" /> SECURE OVERRIDE
        </div>

        <nav className="flex flex-col gap-2 relative z-10">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3.5 rounded-xl transition duration-300 font-bold text-sm tracking-wide ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-fuchsia-600/20 text-indigo-300 border border-indigo-500/30 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]' 
                      : 'hover:bg-white/5 hover:text-white border border-transparent'
                  }`
                }
              >
                <Icon className="w-5 h-5 opacity-80" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-white/5 bg-[#0b0c0f]">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/50 py-3 rounded-xl transition duration-300 font-bold text-sm tracking-widest uppercase shadow-inner group mb-4"
        >
          <LogOut className="w-4 h-4 opacity-80 group-hover:opacity-100" /> Disconnect
        </button>
        
        <div className="text-xs font-mono text-slate-500">
           SYSTEM STATUS: <span className="text-emerald-400 font-bold ml-1 animate-pulse">ONLINE</span> <br/>
           SERVER TIME: <span className="text-slate-400 ml-1">T-Minus 00:00</span>
        </div>
      </div>
    </aside>
  );
};
