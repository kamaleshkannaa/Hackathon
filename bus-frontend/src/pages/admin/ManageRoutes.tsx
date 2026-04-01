import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { TableView } from '../../components/admin/TableView';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { RouteForm } from '../../components/admin/RouteForm';

export default function ManageRoutes() {
  const { data: routes, refetch } = useFetch<any[]>('/routes');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 relative min-h-screen bg-[#0b0c0f]">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight uppercase">Route Network</h1>
           <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 mt-2 rounded-full"></div>
        </div>
        <Button onClick={() => setIsOpen(true)}>Add Sector</Button>
      </div>
      
      <TableView headers={['Grid ID', 'Origin', 'Terminus', 'Range', 'Override']}>
        {routes?.map(route => (
          <tr key={route.id} className="hover:bg-white/5 transition-colors border-white/5">
            <td className="p-5 font-mono text-indigo-400">RC-{route.id}</td>
            <td className="p-5 font-bold text-white">{route.source}</td>
            <td className="p-5 font-bold text-white">{route.destination}</td>
            <td className="p-5 text-slate-400 font-mono">{route.distance} km</td>
            <td className="p-5">
              <button className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-black tracking-widest uppercase">Repath</button>
            </td>
          </tr>
        ))}
      </TableView>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Establish Sector">
        <RouteForm onSuccess={() => { setIsOpen(false); refetch(); }} />
      </Modal>
    </div>
  );
}
