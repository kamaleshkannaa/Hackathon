import React from 'react';
import { Bus } from '../../services/busManagementService';
import { Edit2, Trash2, Plus } from 'lucide-react';

interface BusListProps {
  buses: Bus[];
  onEdit: (bus: Bus) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const BusList: React.FC<BusListProps> = ({ buses, onEdit, onDelete, onAdd }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200">
    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-slate-900">Bus Management</h2>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Bus
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">ID</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Bus Name</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Type</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Total Seats</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {buses.map((bus) => (
            <tr key={bus.id} className="hover:bg-slate-50">
              <td className="py-4 px-6 text-sm text-slate-900">#{bus.id}</td>
              <td className="py-4 px-6 text-sm font-medium text-slate-900">{bus.busName}</td>
              <td className="py-4 px-6">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  bus.busType === 'AC' ? 'bg-blue-50 text-blue-700' :
                  bus.busType === 'Sleeper' ? 'bg-purple-50 text-purple-700' :
                  'bg-gray-50 text-gray-700'
                }`}>
                  {bus.busType}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-slate-600">{bus.totalSeats}</td>
              <td className="py-4 px-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(bus)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(bus.id)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);