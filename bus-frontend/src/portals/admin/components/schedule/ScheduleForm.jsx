import React, { useState, useEffect } from 'react';
import { ScheduleFormData } from '../../types/admin.types';
import { BusSchedule } from '../../services/scheduleManagementService';
import { Bus } from '../../services/busManagementService';
import { Route } from '../../services/routeManagementService';
import { X } from 'lucide-react';

interface ScheduleFormProps {
  schedule?: BusSchedule | null;
  buses: Bus[];
  routes: Route[];
  onSubmit: (data: ScheduleFormData) => void;
  onCancel: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ 
  schedule, 
  buses, 
  routes, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<ScheduleFormData>({
    busId: 0,
    routeId: 0,
    travelDate: '',
    departureTime: '',
    arrivalTime: '',
    price: 0
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        busId: schedule.bus?.id || 0,
        routeId: schedule.route?.id || 0,
        travelDate: schedule.travelDate,
        departureTime: schedule.departureTime,
        arrivalTime: schedule.arrivalTime,
        price: schedule.price
      });
    } else if (buses.length > 0 && routes.length > 0) {
      setFormData(prev => ({
        ...prev,
        busId: buses[0].id,
        routeId: routes[0].id
      }));
    }
  }, [schedule, buses, routes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            {schedule ? 'Edit Schedule' : 'Add New Schedule'}
          </h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bus</label>
              <select
                value={formData.busId}
                onChange={(e) => setFormData({ ...formData, busId: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                required
              >
                {buses.map(bus => (
                  <option key={bus.id} value={bus.id}>{bus.busName} ({bus.busType})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Route</label>
              <select
                value={formData.routeId}
                onChange={(e) => setFormData({ ...formData, routeId: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                required
              >
                {routes.map(route => (
                  <option key={route.id} value={route.id}>
                    {route.source} → {route.destination}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Travel Date</label>
            <input
              type="date"
              value={formData.travelDate}
              onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Departure Time</label>
              <input
                type="time"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Arrival Time</label>
              <input
                type="time"
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {schedule ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};