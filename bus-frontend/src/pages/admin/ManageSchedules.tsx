import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { TableView } from '../../components/admin/TableView';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ScheduleForm } from '../../components/admin/ScheduleForm';

export default function ManageSchedules() {
  const { data: schedules, refetch } = useFetch<any[]>('/schedules');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 relative min-h-screen bg-[#0b0c0f]">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight uppercase">Dispatch Timetables</h1>
           <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 mt-2 rounded-full"></div>
        </div>
        <Button onClick={() => setIsOpen(true)}>Queue Dispatch</Button>
      </div>
      
      <TableView headers={['T-Zero (Date)', 'Unit', 'Sector', 'Launch', 'Tariff', 'Actions']}>
        {schedules?.map(s => (
          <tr key={s.id} className="hover:bg-white/5 transition-colors">
            <td className="p-5 font-mono text-slate-300">{s.date}</td>
            <td className="p-5 font-bold text-indigo-300">{s.bus?.name || s.busId}</td>
            <td className="p-5 text-white font-medium">{s.route?.source} → {s.route?.destination}</td>
            <td className="p-5 font-mono text-emerald-400">{s.departureTime}</td>
            <td className="p-5 font-black text-white">₹{s.price}</td>
            <td className="p-5">
              <button className="text-fuchsia-400 hover:text-white text-sm font-black tracking-widest uppercase">Modify</button>
            </td>
          </tr>
        ))}
      </TableView>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Queue Dispatch Protocol">
        <ScheduleForm onSuccess={() => { setIsOpen(false); refetch(); }} />
      </Modal>
    </div>
  );
}
