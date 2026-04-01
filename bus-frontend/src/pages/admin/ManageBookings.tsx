import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { TableView } from '../../components/admin/TableView';

export default function ManageBookings() {
  const { data: bookings } = useFetch<any[]>('/bookings');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      
      <TableView headers={['ID', 'User', 'Schedule', 'Seats', 'Total', 'Status']}>
        {bookings?.map(b => (
          <tr key={b.id} className="hover:bg-gray-50">
            <td className="p-4">#{b.id}</td>
            <td className="p-4">{b.user?.name || b.userId}</td>
            <td className="p-4">{b.schedule?.date} ({b.schedule?.departureTime})</td>
            <td className="p-4">{b.seatNumbers?.join(', ')}</td>
            <td className="p-4 font-bold">₹{b.totalPrice}</td>
            <td className="p-4">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${b.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {b.status}
              </span>
            </td>
          </tr>
        ))}
      </TableView>
    </div>
  );
}
