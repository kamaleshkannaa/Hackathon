import React from 'react';
import { Bus } from '../../services/busManagementService';
import { X, Bus as BusIcon, Users } from 'lucide-react';

interface BusDetailsProps {
  bus: Bus;
  onClose: () => void;
}

export const BusDetails: React.FC<BusDetailsProps> = ({ bus, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Bus Details</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
          <div className="p-3 bg-blue-100 rounded-lg">
            <BusIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Bus Name</p>
            <p className="text-lg font-semibold text-slate-900">{bus.busName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500 mb-1">Bus Type</p>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              bus.busType === 'AC' ? 'bg-blue-50 text-blue-700' :
              bus.busType === 'Sleeper' ? 'bg-purple-50 text-purple-700' :
              'bg-gray-50 text-gray-700'
            }`}>
              {bus.busType}
            </span>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500 mb-1">Total Seats</p>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-900">{bus.totalSeats}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);