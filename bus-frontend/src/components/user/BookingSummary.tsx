import React from 'react';
import { Schedule } from '../../types/schedule';
import { Button } from '../common/Button';

interface BookingSummaryProps {
  schedule: Schedule;
  selectedSeats: number[];
  onConfirm: () => void;
  isLoading: boolean;
}

export const BookingSummary = ({ schedule, selectedSeats, onConfirm, isLoading }: BookingSummaryProps) => {
  const totalAmount = selectedSeats.length * schedule.price;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-6 border-b pb-4">Fare Details</h3>
      
      <div className="space-y-4 mb-6 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Base Fare (₹{schedule.price} x {selectedSeats.length})</span>
          <span className="font-medium text-gray-900">₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxes & Fees</span>
          <span className="font-medium text-gray-900">₹0</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Selected Seats</span>
          <span className="font-medium text-gray-900 text-right">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center border-t py-4 mb-6">
        <span className="text-lg font-bold text-gray-900">Total Amount</span>
        <span className="text-2xl font-bold text-blue-600">₹{totalAmount}</span>
      </div>

      <Button 
        onClick={onConfirm} 
        disabled={selectedSeats.length === 0 || isLoading}
        isLoading={isLoading}
        className="w-full text-lg py-3"
      >
        Proceed to Payment
      </Button>
    </div>
  );
};
