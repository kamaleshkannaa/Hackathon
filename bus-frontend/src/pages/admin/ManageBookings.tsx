import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { TableView } from '../../components/admin/TableView';

export default function ManageBookings() {
  const { data: bookings } = useFetch<any[]>('/bookings');

  return (
    <div className="p-8 relative min-h-screen bg-[#0b0c0f]">
      <div className="mb-8">
         <h1 className="text-3xl font-black text-white tracking-tight uppercase">Manifest Logs</h1>
         <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 mt-2 rounded-full"></div>
      </div>
      
      <TableView headers={['Pass ID', 'Clearance Name', 'Dispatch Block', 'Load Zones', 'Yield', 'Status']}>
        {bookings?.map(b => (
          <tr key={b.id} className="hover:bg-white/5 transition-colors">
            <td className="p-5 font-mono text-slate-400">#{b.id?.toString().padStart(6, '0')}</td>
            <td className="p-5 font-bold text-white">{b.user?.name || b.userId}</td>
            <td className="p-5 text-slate-300">{b.schedule?.date} ({b.schedule?.departureTime})</td>
            <td className="p-5 font-mono text-indigo-300">{b.seatNumbers?.join(', ')}</td>
            <td className="p-5 font-black text-emerald-400">₹{b.totalPrice}</td>
            <td className="p-5">
              <span className={`px-3 py-1 rounded bg-black/40 border text-[10px] font-black tracking-widest uppercase ${b.status === 'confirmed' ? 'text-emerald-400 border-emerald-400/30' : 'text-rose-400 border-rose-400/30'}`}>
                {b.status}
              </span>
            </td>
          </tr>
        ))}
      </TableView>
    </div>
  );
}
