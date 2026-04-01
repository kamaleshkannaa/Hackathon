import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Schedule } from '../../types/schedule';
import { BusCard } from '../../components/user/BusCard';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Search } from 'lucide-react';

export default function BusSearch() {
  const { data: schedules, loading } = useFetch<Schedule[]>('/schedules');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [filtered, setFiltered] = useState<Schedule[]>([]);

  useEffect(() => {
    if (schedules) setFiltered(schedules);
  }, [schedules]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedules) return;
    
    let res = schedules;
    if (source) res = res.filter(s => s.route?.source.toLowerCase().includes(source.toLowerCase()));
    if (destination) res = res.filter(s => s.route?.destination.toLowerCase().includes(destination.toLowerCase()));
    if (date) res = res.filter(s => s.date.startsWith(date));
    
    setFiltered(res);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-blue-600 p-8 shadow-inner">
        <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 rounded-2xl shadow-lg border">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
            <Input label="Leaving From" value={source} onChange={e => setSource(e.target.value)} placeholder="Mumbai" />
            <Input label="Going To" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Delhi" />
            <Input label="Date of Journey" type="date" value={date} onChange={e => setDate(e.target.value)} />
            <Button type="submit" className="w-full md:w-auto md:px-8 py-2 md:mb-1">
              <Search className="w-5 h-5 mr-2" /> Search
            </Button>
          </form>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {filtered.length} Buses Found
        </h2>

        {loading ? <Loader /> : (
          <div className="flex flex-col gap-6">
            {filtered.length > 0 ? (
              filtered.map(schedule => <BusCard key={schedule.id} schedule={schedule} />)
            ) : (
              <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
                <div className="text-gray-400 mb-4 inline-block"><Search className="w-12 h-12" /></div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No buses found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or dates.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
