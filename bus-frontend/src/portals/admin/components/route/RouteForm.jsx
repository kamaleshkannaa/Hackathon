import React, { useState, useEffect } from 'react';
import { RouteFormData } from '../../types/admin.types';
import { Route } from '../../services/routeManagementService';
import { X } from 'lucide-react';

interface RouteFormProps {
  route?: Route | null;
  onSubmit: (data: RouteFormData) => void;
  onCancel: () => void;
}

export const RouteForm: React.FC<RouteFormProps> = ({ route, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<RouteFormData>({
    source: '',
    destination: '',
    distance: 0
  });

  useEffect(() => {
    if (route) {
      setFormData({
        source: route.source,
        destination: route.destination,
        distance: route.distance
      });
    }
  }, [route]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            {route ? 'Edit Route' : 'Add New Route'}
          </h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Source</label>
              <input
                type="text"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                placeholder="From city"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                placeholder="To city"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Distance (km)</label>
            <input
              type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: parseInt(e.target.value) })}
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
              {route ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};