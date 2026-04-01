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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Schedules</h1>
        <Button onClick={() => setIsOpen(true)}>Add Schedule</Button>
      </div>
      
      <TableView headers={['Date', 'Bus', 'Route', 'Departure', 'Price', 'Actions']}>
        {schedules?.map(s => (
          <tr key={s.id} className="hover:bg-gray-50">
            <td className="p-4">{s.date}</td>
            <td className="p-4">{s.bus?.name || s.busId}</td>
            <td className="p-4">{s.route?.source} - {s.route?.destination}</td>
            <td className="p-4">{s.departureTime}</td>
            <td className="p-4">₹{s.price}</td>
            <td className="p-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
            </td>
          </tr>
        ))}
      </TableView>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Schedule">
        <ScheduleForm onSuccess={() => { setIsOpen(false); refetch(); }} />
      </Modal>
    </div>
  );
}
