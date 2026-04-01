import React from 'react';
import { BusSchedule } from '../../services/scheduleManagementService';
import { Edit2, Trash2, Plus, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduleListProps {
  schedules: BusSchedule[];
  onEdit: (schedule: BusSchedule) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ 
  schedules, 
  onEdit, 
  onDelete, 
  onAdd 
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200">
    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-slate-900">Schedule Management</h2>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-4 h-4" />
        Add Schedule
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Bus</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Route</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Date</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Time</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Price</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {schedules.map((schedule) => (
            <tr key={schedule.id} className="hover:bg-slate-50">
              <td className="py-4 px-6">
                <div>
                  <p className="font-medium text-slate-900">{schedule.bus?.busName}</p>
                  <p className="text-xs text-slate-500">{schedule.bus?.busType}</p>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-slate-600">
                {schedule.route?.source} → {schedule.route?.destination}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-900">
                    {format(new Date(schedule.travelDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-slate-600">
                {schedule.departureTime} - {schedule.arrivalTime}
              </td>
              <td className="py-4 px-6 text-sm font-medium text-slate-900">
                ₹{schedule.price}
              </td>
              <td className="py-4 px-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(schedule)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(schedule.id)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
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