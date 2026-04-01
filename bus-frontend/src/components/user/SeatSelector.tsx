import React from 'react';
import { Shield } from 'lucide-react';

interface SeatSelectorProps {
  totalSeats: number;
  bookedSeats: number[];
  selectedSeats: number[];
  onSeatToggle: (seatNumber: number) => void;
  maxSeats?: number;
}

export const SeatSelector = ({ totalSeats, bookedSeats, selectedSeats, onSeatToggle, maxSeats = 4 }: SeatSelectorProps) => {
  const isBooked = (num: number) => bookedSeats.includes(num);
  const isSelected = (num: number) => selectedSeats.includes(num);

  const getSeatClass = (num: number) => {
    if (isBooked(num)) return 'bg-slate-800 border-slate-700 cursor-not-allowed text-slate-600 opacity-60 shadow-inner';
    if (isSelected(num)) return 'bg-gradient-to-br from-indigo-500 to-fuchsia-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] scale-110 z-10';
    return 'bg-white/5 border-white/20 text-indigo-300 hover:bg-white/10 hover:border-indigo-400 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)] cursor-pointer';
  };

  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="glass-panel p-8 rounded-2xl flex flex-col items-center h-full relative overflow-hidden">
      {/* Legend */}
      <div className="flex gap-6 mb-10 text-sm font-bold tracking-wide w-full justify-center pb-6 border-b border-white/10">
        <div className="flex items-center gap-2"><div className="w-5 h-5 bg-white/5 border border-white/20 rounded shadow-inner"></div> <span className="text-slate-300">Available</span></div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 bg-slate-800 border border-slate-700 rounded opacity-60"></div> <span className="text-slate-500">Booked</span></div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 bg-indigo-500 border border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] rounded"></div> <span className="text-white">Selected</span></div>
      </div>
      
      {/* Bus Layout */}
      <div className="relative border-4 border-slate-700 rounded-[3rem] p-10 pt-20 w-full max-w-[400px] bg-[#111318] shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Cockpit */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-slate-800/50 to-transparent rounded-t-[2.5rem] flex justify-center pt-6 pointer-events-none">
          <div className="absolute top-6 right-10 flex flex-col items-center opacity-40">
            <Shield className="w-6 h-6 text-white mb-1" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white">Driver</span>
          </div>
          <div className="w-48 h-10 border-t-4 border-slate-600 rounded-[100%] absolute top-2 opacity-50"></div>
        </div>
        
        <div className="grid grid-cols-4 gap-5 mt-4 relative z-10">
          {seats.map((seat) => (
            <div key={seat} 
              className={`
                w-12 h-14 rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-300
                ${seat % 4 === 2 ? 'mr-10' : ''}
                ${getSeatClass(seat)}
              `}
              onClick={() => {
                if (isBooked(seat)) return;
                if (!isSelected(seat) && selectedSeats.length >= maxSeats) {
                  alert(`You can only select up to ${maxSeats} seats`);
                  return;
                }
                onSeatToggle(seat);
              }}
            >
              <div className="flex flex-col items-center">
                <span className={`text-xs mb-1 opacity-50 block w-4 h-[2px] rounded-full ${isSelected(seat) ? 'bg-white' : 'bg-current'}`}></span>
                {seat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
