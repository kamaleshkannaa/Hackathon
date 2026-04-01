import React from 'react';
import { useFetch } from '../../hooks/useFetch';

export default function Dashboard() {
  const { data: bookings } = useFetch<any[]>('/bookings');
  const { data: buses } = useFetch<any[]>('/buses');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-gray-500 font-medium">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">{bookings?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm border-l-4 border-l-green-500">
          <h3 className="text-gray-500 font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">₹{bookings?.reduce((acc, b) => acc + b.totalPrice, 0) || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm border-l-4 border-l-purple-500">
          <h3 className="text-gray-500 font-medium">Total Buses</h3>
          <p className="text-3xl font-bold mt-2">{buses?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}
