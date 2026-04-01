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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Routes</h1>
        <Button onClick={() => setIsOpen(true)}>Add Route</Button>
      </div>
      
      <TableView headers={['ID', 'Source', 'Destination', 'Distance', 'Actions']}>
        {routes?.map(route => (
          <tr key={route.id} className="hover:bg-gray-50">
            <td className="p-4">{route.id}</td>
            <td className="p-4">{route.source}</td>
            <td className="p-4">{route.destination}</td>
            <td className="p-4">{route.distance} km</td>
            <td className="p-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
            </td>
          </tr>
        ))}
      </TableView>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Route">
        <RouteForm onSuccess={() => { setIsOpen(false); refetch(); }} />
      </Modal>
    </div>
  );
}
