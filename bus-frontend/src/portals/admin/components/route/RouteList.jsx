import React from 'react';
import { Route } from '../../services/routeManagementService';
import { Edit2, Trash2, Plus, MapPin } from 'lucide-react';

interface RouteListProps {
  routes: Route[];
  onEdit: (route: Route) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const RouteList: React.FC<RouteListProps> = ({ routes, onEdit, onDelete, onAdd }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200">
    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-slate-900">Route Management</h2>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-4 h-4" />
        Add Route
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {routes.map((route) => (
        <div key={route.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">{route.source} → {route.destination}</h3>
              <p className="text-sm text-slate-500">{route.distance} km</p>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => onEdit(route)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(route.id)}
              className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);