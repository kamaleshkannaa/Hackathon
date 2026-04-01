import React from 'react';
import { Schedule } from '../../types/schedule';
import { Clock, MapPin, Wind, Navigation, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { formatTime, formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

export const BusCard = ({ schedule }: { schedule: Schedule }) => {
  const navigate = useNavigate();
  const { bus, route } = schedule;

  return (
    <div className="bg-white rounded-xl shadow border p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{bus?.name}</h3>
            <p className="text-sm text-gray-500 font-medium">{bus?.busType} • {bus?.totalSeats} Seats</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">₹{schedule.price}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">{formatTime(schedule.departureTime)}</span>
            <span className="text-sm">{route?.source}</span>
          </div>
          <div className="flex-1 px-4 flex flex-col items-center justify-center opacity-60">
            <span className="text-xs font-medium border-b border-dashed border-gray-400 w-full text-center pb-1">
              <Navigation className="w-4 h-4 mx-auto mb-1 text-blue-500 transform rotate-45" />
            </span>
            <span className="text-xs mt-1">Direct</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-bold text-gray-900">{formatTime(schedule.arrivalTime)}</span>
            <span className="text-sm">{route?.destination}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 pl-0 md:pl-6 flex flex-col md:w-48 gap-3 shrink-0">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {formatDate(schedule.date)}</span>
        </div>
        <Button onClick={() => navigate(`/booking/${schedule.id}`)} className="w-full">
          Select Seats
        </Button>
      </div>
    </div>
  );
};
