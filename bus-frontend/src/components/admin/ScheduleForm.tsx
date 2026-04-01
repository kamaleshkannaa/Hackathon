import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { addSchedule } from '../../services/scheduleService';
import { useFetch } from '../../hooks/useFetch';

export const ScheduleForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data: buses } = useFetch<any[]>('/buses');
  const { data: routes } = useFetch<any[]>('/routes');
  
  const [formData, setFormData] = useState({ busId: '', routeId: '', departureTime: '', arrivalTime: '', price: 0, date: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSchedule(formData);
      onSuccess();
    } catch (err) {
      alert('Failed to add schedule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Bus</label>
        <select className="border p-2 rounded" required value={formData.busId} onChange={e => setFormData({...formData, busId: e.target.value})}>
          <option value="">Select Bus</option>
          {buses?.map(b => <option key={b.id} value={b.id}>{b.name} ({b.busNumber})</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Route</label>
        <select className="border p-2 rounded" required value={formData.routeId} onChange={e => setFormData({...formData, routeId: e.target.value})}>
          <option value="">Select Route</option>
          {routes?.map(r => <option key={r.id} value={r.id}>{r.source} - {r.destination}</option>)}
        </select>
      </div>
      <Input required type="date" label="Date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
      <Input required type="time" label="Departure Time" value={formData.departureTime} onChange={e => setFormData({ ...formData, departureTime: e.target.value })} />
      <Input required type="time" label="Arrival Time" value={formData.arrivalTime} onChange={e => setFormData({ ...formData, arrivalTime: e.target.value })} />
      <Input required type="number" label="Price (₹)" value={formData.price} onChange={e => setFormData({ ...formData, price: +e.target.value })} />
      
      <Button type="submit" className="w-full" isLoading={loading}>Save Schedule</Button>
    </form>
  );
};
