import React, { useState, useEffect } from 'react';
import { BusFormData } from '../../types/admin.types';
import { Bus } from '../../services/busManagementService';
import { X } from 'lucide-react';

interface BusFormProps {
  bus?: Bus | null;
  onSubmit: (data: BusFormData) => void;
  onCancel: () => void;
}

export const BusForm: React.FC<BusFormProps> = ({ bus, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<BusFormData>({
    busName: '',
    busType: 'AC',
    totalSeats: 40
  });

  useEffect(() => {
    if (bus) {
      setFormData({
        busName: bus.busName,
        busType: bus.busType,
        totalSeats: bus.totalSeats
      });
    }
  }, [bus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            {bus ? 'Edit Bus' : 'Add New Bus'}
          </h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bus Name
            </label>
            <input
              type="text"
              value={formData.busName}
              onChange={(e) => setFormData({ ...formData, busName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Volvo AC Deluxe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bus Type
            </label>
            <select
              value={formData.busType}
              onChange={(e) => setFormData({ ...formData, busType: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
              <option value="Sleeper">Sleeper</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Total Seats
            </label>
            <input
              type="number"
              value={formData.totalSeats}
              onChange={(e) => setFormData({ ...formData, totalSeats: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="100"
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
              {bus ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};