import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Schedule } from '../../types/schedule';
import { BusCard } from '../../components/user/BusCard';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Search, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0b0c0f] flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/20 blur-[150px] pointer-events-none"></div>

      {/* Hero Header search area */}
      <div className="pt-20 pb-28 px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Search Routes</h1>
          <p className="text-xl text-slate-400 font-medium">Discover premium availability across India instantly.</p>
        </div>

        <div className="max-w-5xl mx-auto glass-panel p-4 md:p-6 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border-white/10 relative">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end relative z-10">
            <div className="flex-1 w-full">
              <Input icon={<MapPin className="w-5 h-5"/>} label="Departure City" value={source} onChange={e => setSource(e.target.value)} placeholder="e.g. Mumbai" />
            </div>
            
            <div className="hidden md:flex items-center justify-center p-2 rounded-full glass-panel border-white/10 mb-2 self-center rotate-90 md:rotate-0 z-20 -mx-6 shadow-xl text-indigo-400">
              <ArrowRight className="w-5 h-5"/>
            </div>

            <div className="flex-1 w-full">
              <Input icon={<MapPin className="w-5 h-5"/>} label="Destination City" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Delhi" />
            </div>
            
            <div className="flex-1 w-full relative">
              <Input icon={<Calendar className="w-5 h-5"/>} label="Travel Date" type="date" value={date} onChange={e => setDate(e.target.value)} 
                className="[&::-webkit-calendar-picker-indicator]:filter-[invert(1)]" />
            </div>

            <Button type="submit" className="w-full md:w-auto h-[3.25rem] md:px-10 mb-[2px] shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Search className="w-5 h-5 mr-3" /> Search
            </Button>
          </form>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="max-w-5xl mx-auto w-full px-4 pb-24 flex-1 relative z-10">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-black text-white">
            <span className="text-indigo-400">{filtered.length}</span> Premium Services Found
          </h2>
        </div>

        {loading ? <Loader /> : (
          <div className="flex flex-col gap-8">
            {filtered.length > 0 ? (
              filtered.map((schedule, i) => (
                <div key={schedule.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <BusCard schedule={schedule} />
                </div>
              ))
            ) : (
              <div className="glass-panel p-16 text-center rounded-3xl border border-dashed border-white/20">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500 shadow-inner">
                  <Clock className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">No itineraries found</h3>
                <p className="text-slate-400 font-medium">Try adjusting your destinations or selecting a different date.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
