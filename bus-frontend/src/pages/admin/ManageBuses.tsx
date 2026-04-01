import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { TableView } from '../../components/admin/TableView';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { BusForm } from '../../components/admin/BusForm';

export default function ManageBuses() {
  const { data: buses, refetch } = useFetch<any[]>('/buses');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 relative min-h-screen bg-[#0b0c0f]">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight uppercase">Fleet Inventory</h1>
           <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 mt-2 rounded-full"></div>
        </div>
        <Button onClick={() => setIsOpen(true)}>Initialize Unit</Button>
      </div>
      
      <TableView headers={['Designation', 'Reg ID', 'Class', 'Capacity', 'Override']}>
        {buses?.map(bus => (
          <tr key={bus.id} className="hover:bg-white/5 transition-colors">
            <td className="p-5 font-bold text-white">{bus.name}</td>
            <td className="p-5 font-mono text-indigo-300">#{bus.busNumber}</td>
            <td className="p-5">
              <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded border border-slate-700">{bus.busType}</span>
            </td>
            <td className="p-5 text-slate-300 font-mono">{bus.totalSeats} pax</td>
            <td className="p-5">
              <button className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-black tracking-widest uppercase transition-colors">Configure</button>
            </td>
          </tr>
        ))}
        {!buses?.length && <tr><td colSpan={5} className="p-8 text-center text-slate-500 font-bold uppercase tracking-widest">No units found</td></tr>}
      </TableView>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Provision New Unit">
        <BusForm onSuccess={() => { setIsOpen(false); refetch(); }} />
      </Modal>
    </div>
  );
}
