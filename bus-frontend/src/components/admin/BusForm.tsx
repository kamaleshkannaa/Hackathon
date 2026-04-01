import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { addBus } from '../../services/busService';

export const BusForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({ busNumber: '', name: '', totalSeats: 40, busType: 'AC' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addBus(formData);
      onSuccess();
    } catch (err) {
      alert('Failed to add bus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input required label="Bus Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <Input required label="Bus Number" value={formData.busNumber} onChange={e => setFormData({ ...formData, busNumber: e.target.value })} />
      <Input required type="number" label="Total Seats" value={formData.totalSeats} onChange={e => setFormData({ ...formData, totalSeats: +e.target.value })} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Bus Type</label>
        <select className="border border-gray-300 rounded-lg px-3 py-2" value={formData.busType} onChange={e => setFormData({ ...formData, busType: e.target.value as any })}>
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
          <option value="Sleeper">Sleeper</option>
        </select>
      </div>
      <Button type="submit" className="w-full" isLoading={loading}>Save Bus</Button>
    </form>
  );
};
