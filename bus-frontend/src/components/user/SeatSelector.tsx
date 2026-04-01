import React from 'react';
import { Bus as BusIcon } from 'lucide-react';

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
    if (isBooked(num)) return 'bg-gray-300 border-gray-400 cursor-not-allowed text-gray-500 opacity-60';
    if (isSelected(num)) return 'bg-blue-600 border-blue-700 text-white shadow-inner scale-105';
    return 'bg-white border-green-500 text-green-700 hover:bg-green-50 cursor-pointer shadow-sm';
  };

  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="bg-white p-6 rounded-xl border flex flex-col items-center h-full">
      <div className="flex gap-4 mb-8 text-sm font-medium w-full justify-center pb-6 border-b">
        <div className="flex items-center gap-2"><div className="w-5 h-5 bg-white border border-green-500 rounded"></div> Available</div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 bg-gray-300 border border-gray-400 rounded"></div> Booked</div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 bg-blue-600 border border-blue-700 rounded"></div> Selected</div>
      </div>
      
      <div className="relative border-4 border-gray-200 rounded-3xl p-8 pt-16 w-full max-w-sm bg-gray-50 shadow-inner">
        <div className="absolute top-4 right-8 flex justify-center w-full right-0">
          <span className="uppercase text-xs font-bold text-gray-400 tracking-widest border-b-2 border-dashed border-gray-300 pb-2 flex items-center gap-2">
            <BusIcon className="w-5 h-5" /> Driver
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-8">
          {seats.map((seat) => (
            <div key={seat} 
              className={`
                w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all
                ${seat % 4 === 2 ? 'mr-8' : ''}
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
              {seat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
