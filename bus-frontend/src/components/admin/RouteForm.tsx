import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { addRoute } from '../../services/routeService';

export const RouteForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({ source: '', destination: '', distance: 0 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addRoute(formData);
      onSuccess();
    } catch (err) {
      alert('Failed to add route');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input required label="Source" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} />
      <Input required label="Destination" value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} />
      <Input required type="number" label="Distance (km)" value={formData.distance} onChange={e => setFormData({ ...formData, distance: +e.target.value })} />
      <Button type="submit" className="w-full" isLoading={loading}>Save Route</Button>
    </form>
  );
};
