import React from 'react';
import { Schedule } from '../../types/schedule';
import { Clock, MapPin, Navigation, Calendar, Zap, Wifi, Coffee } from 'lucide-react';
import { Button } from '../common/Button';
import { formatTime, formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

export const BusCard = ({ schedule }: { schedule: Schedule }) => {
  const navigate = useNavigate();
  const { bus, route } = schedule;

  return (
    <div className="glass-panel p-6 flex flex-col md:flex-row gap-8 md:items-center justify-between hover-glow transition-all duration-300 relative overflow-hidden group rounded-2xl">
      {/* Decorative Glow */}
      <div className="absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      <div className="flex-1 space-y-5 relative z-10 w-full">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-inner">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">{bus?.name}</h3>
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium mt-1">
                <span className="bg-slate-800 px-2 py-0.5 rounded text-xs">{bus?.busType}</span>
                <span>•</span>
                <span>{bus?.totalSeats} Seats</span>
                <span className="flex border-l border-white/10 pl-3 gap-2">
                  <Wifi className="w-4 h-4" /> <Coffee className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">₹{schedule.price}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex flex-col flex-1">
            <span className="text-2xl font-bold tracking-widest text-white">{formatTime(schedule.departureTime)}</span>
            <span className="text-sm font-medium text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3"/> {route?.source}</span>
          </div>
          
          <div className="flex-1 px-4 flex flex-col items-center justify-center opacity-80">
            <div className="text-xs font-bold text-indigo-400 tracking-[0.2em] uppercase mb-2">Duration: 8h 30m</div>
            <div className="relative w-full flex items-center">
              <div className="w-2 h-2 rounded-full border border-indigo-500 bg-indigo-500/50 shadow-[0_0_10px_#6366f1]"></div>
              <div className="flex-1 border-b border-dashed border-indigo-500/50"></div>
              <Navigation className="absolute left-1/2 -translate-x-1/2 text-indigo-400 w-5 h-5 transform rotate-90" />
              <div className="w-2 h-2 rounded-full border border-fuchsia-500 bg-fuchsia-500/50 shadow-[0_0_10px_#d946ef]"></div>
            </div>
            <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-2">Direct</div>
          </div>
          
          <div className="flex flex-col flex-1 text-right items-end">
            <span className="text-2xl font-bold tracking-widest text-white">{formatTime(schedule.arrivalTime)}</span>
            <span className="text-sm font-medium text-slate-400 flex items-center gap-1 mt-1">{route?.destination} <MapPin className="w-3 h-3"/></span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 pt-5 md:pt-0 pl-0 md:pl-8 flex flex-col md:w-56 gap-4 shrink-0 justify-center h-full relative z-10 w-full relative z-10 w-full">
        <div className="flex items-center justify-between text-sm text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50">
          <span className="flex items-center gap-2 font-medium">
            <Calendar className="w-4 h-4 text-indigo-400"/> 
            {formatDate(schedule.date)}
          </span>
        </div>
        <Button onClick={() => navigate(`/booking/${schedule.id}`)} className="w-full h-12 text-lg shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          Select Seats
        </Button>
      </div>
    </div>
  );
};
