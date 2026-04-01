import React from 'react';
import { Schedule } from '../../types/schedule';
import { Button } from '../common/Button';
import { Ticket } from 'lucide-react';

interface BookingSummaryProps {
  schedule: Schedule;
  selectedSeats: number[];
  onConfirm: () => void;
  isLoading: boolean;
}

export const BookingSummary = ({ schedule, selectedSeats, onConfirm, isLoading }: BookingSummaryProps) => {
  const totalAmount = selectedSeats.length * schedule.price;

  return (
    <div className="glass-panel rounded-2xl p-6 sticky top-28 bg-[#161920]/90">
      <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 flex items-center justify-center">
          <Ticket className="w-5 h-5 text-white transform -rotate-45" />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">Fare Details</h3>
      </div>
      
      <div className="space-y-4 mb-8 text-sm font-medium">
        <div className="flex justify-between items-center text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5">
          <span>Base Ticket (₹{schedule.price} x {selectedSeats.length})</span>
          <span className="font-bold text-white text-base">₹{totalAmount}</span>
        </div>
        <div className="flex justify-between items-center text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5">
          <span>Taxes & Processing</span>
          <span className="font-bold text-emerald-400 text-base">FREE</span>
        </div>
        <div className="flex justify-between items-start text-slate-400 bg-white/5 p-4 rounded-lg border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]">
          <span className="mt-1">Selected Seats</span>
          <div className="flex flex-wrap gap-2 justify-end max-w-[150px]">
            {selectedSeats.length > 0 
              ? selectedSeats.map(s => <span key={s} className="w-8 h-8 flex items-center justify-center bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 rounded-md font-bold text-xs">{s}</span>) 
              : <span className="text-slate-600 font-bold mt-1">None</span>}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8 mt-2">
        <span className="text-lg font-bold text-slate-400 tracking-wide uppercase">Total Payable</span>
        <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">₹{totalAmount}</span>
      </div>

      <Button 
        onClick={onConfirm} 
        disabled={selectedSeats.length === 0 || isLoading}
        isLoading={isLoading}
        className="w-full text-lg py-4 h-14 bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-600 border-none shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)] active:scale-95 transition-all duration-300"
      >
        <span className="font-extrabold tracking-wide uppercase">Pay Now</span>
      </Button>
    </div>
  );
};
