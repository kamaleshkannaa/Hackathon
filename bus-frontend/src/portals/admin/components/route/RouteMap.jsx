import React from 'react';
import { Route } from '../../services/routeManagementService';
import { MapPin, ArrowRight } from 'lucide-react';

interface RouteMapProps {
  route: Route;
}

export const RouteMap: React.FC<RouteMapProps> = ({ route }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-4">Route Visualization</h3>
    
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
      <div className="text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-semibold text-slate-900">{route.source}</p>
        <p className="text-xs text-slate-500">Origin</p>
      </div>

      <div className="flex-1 px-8">
        <div className="border-t-2 border-dashed border-slate-300 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-3">
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm text-slate-500">
            {route.distance} km
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <MapPin className="w-6 h-6 text-red-600" />
        </div>
        <p className="font-semibold text-slate-900">{route.destination}</p>
        <p className="text-xs text-slate-500">Destination</p>
      </div>
    </div>
  </div>
);