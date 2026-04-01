import React from 'react';
import { format } from 'date-fns';
import { AdminBooking } from '../../types/admin.types';
import { CheckCircle, XCircle } from 'lucide-react';

interface RecentBookingsProps {
  bookings: AdminBooking[];
}

export const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Bookings</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ID</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Customer</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Route</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Amount</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 text-sm text-slate-900 font-medium">#{booking.id}</td>
              <td className="py-3 px-4 text-sm text-slate-600">{booking.user?.name}</td>
              <td className="py-3 px-4 text-sm text-slate-600">
                {booking.schedule?.route?.source} → {booking.schedule?.route?.destination}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-slate-900">₹{booking.totalAmount}</td>
              <td className="py-3 px-4">
                {booking.status === 'BOOKED' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Booked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                    <XCircle className="w-3.5 h-3.5" />
                    Cancelled
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);