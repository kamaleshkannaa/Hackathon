import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bus, Route, Calendar, Ticket } from 'lucide-react';

export const Sidebar = () => {
  const links = [
    { name: 'Dashboard', to: '/admin', icon: LayoutDashboard },
    { name: 'Buses', to: '/admin/buses', icon: Bus },
    { name: 'Routes', to: '/admin/routes', icon: Route },
    { name: 'Schedules', to: '/admin/schedules', icon: Calendar },
    { name: 'Bookings', to: '/admin/bookings', icon: Ticket },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-[calc(100vh-4rem)] border-r border-gray-800">
      <div className="p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">Management</div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition font-medium ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
