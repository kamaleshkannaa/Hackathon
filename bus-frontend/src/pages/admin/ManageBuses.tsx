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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Buses</h1>
        <Button onClick={() => setIsOpen(true)}>Add Bus</Button>
      </div>
      
      <TableView headers={['Name', 'Number', 'Type', 'Seats', 'Actions']}>
        {buses?.map(bus => (
          <tr key={bus.id} className="hover:bg-gray-50">
            <td className="p-4">{bus.name}</td>
            <td className="p-4 font-mono">{bus.busNumber}</td>
            <td className="p-4">{bus.busType}</td>
            <td className="p-4">{bus.totalSeats}</td>
            <td className="p-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
            </td>
          </tr>
        ))}
        {!buses?.length && <tr><td colSpan={5} className="p-4 text-center text-gray-500">No buses found</td></tr>}
      </TableView>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Bus">
        <BusForm onSuccess={() => { setIsOpen(false); refetch(); }} />
      </Modal>
    </div>
  );
}
