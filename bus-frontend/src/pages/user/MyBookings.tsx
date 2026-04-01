import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserBookings } from '../../services/bookingService';
import { Booking } from '../../types/booking';
import { Loader } from '../../components/common/Loader';
import { formatTime } from '../../utils/formatDate';
import { Ticket, Download, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getUserBookings(user.id).then(res => setBookings(res.data)).catch(console.error).finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div className="mt-32"><Loader /></div>;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0b0c0f] p-4 md:p-12 relative">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto flex flex-col gap-10 relative z-10">
        <h1 className="text-5xl font-black text-white flex items-center gap-4 tracking-tight">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Ticket className="w-8 h-8"/>
          </div>
          Active Itineraries
        </h1>
        
        {bookings.length === 0 ? (
          <div className="glass-panel p-20 text-center flex flex-col items-center rounded-3xl border border-white/5 relative overflow-hidden">
            <Ticket className="w-24 h-24 text-slate-700 mb-8 opacity-50" />
            <h2 className="text-3xl font-black text-white mb-4">No active trips</h2>
            <p className="text-slate-400 mb-10 text-lg font-medium">Your upcoming luxury intercity journeys will appear here.</p>
            <Link to="/search">
              <Button className="h-14 px-10 shadow-[0_0_20px_rgba(99,102,241,0.3)]">Explore Destinations</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking, i) => (
              <div key={booking.id} className="glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] border border-white/5 animate-fade-in-up hover:border-indigo-500/30 transition-colors" style={{ animationDelay: `${i * 0.1}s` }}>
                
                {/* Visual Pass Strip */}
                <div className="bg-gradient-to-b from-indigo-500 to-fuchsia-600 p-8 flex flex-col justify-center items-center md:w-56 shrink-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <span className="text-xs text-white/70 uppercase tracking-[0.3em] font-black mb-2">Departing</span>
                  <span className="text-6xl font-black text-white leading-none mb-1 shadow-sm drop-shadow-md">
                    {booking.schedule?.date ? new Date(booking.schedule.date).getDate().toString().padStart(2, '0') : ''}
                  </span>
                  <span className="font-bold text-xl text-white/90 mb-6 drop-shadow-sm uppercase tracking-wide">
                    {booking.schedule?.date ? new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(booking.schedule.date)) : ''}
                  </span>
                  <span className="bg-black/30 backdrop-blur-md text-emerald-400 border border-emerald-400/30 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {booking.status}
                  </span>
                </div>
                
                {/* Details Section */}
                <div className="p-8 flex-1 flex flex-col justify-between relative bg-white/5">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-1 block">Economy Plus • Bus #{booking.schedule?.bus?.busNumber}</span>
                        <h3 className="text-3xl font-black text-white tracking-tight">{booking.schedule?.bus?.name}</h3>
                      </div>
                      <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5 text-center">
                         <span className="block text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Total Paid</span>
                         <span className="font-black text-white text-xl">₹{booking.totalPrice}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-300 font-bold bg-black/30 p-4 rounded-xl border border-white/5 mb-8 shadow-inner">
                      <span className="flex-1 text-right">{booking.schedule?.route?.source}</span>
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-500 border border-white/10 shadow-sm shrink-0">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <span className="flex-1 text-left">{booking.schedule?.route?.destination}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 text-sm">
                      <div className="glass-panel p-3 rounded-xl border-white/5 bg-white/5">
                        <span className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Boarding</span>
                        <span className="font-bold text-white text-lg">{formatTime(booking.schedule?.departureTime || '')}</span>
                      </div>
                      <div className="glass-panel p-3 rounded-xl border-white/5 bg-white/5">
                        <span className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Seats</span>
                        <span className="font-bold text-indigo-300 text-lg flex gap-1 flex-wrap">
                           {booking.seatNumbers.map(s => <span key={s} className="bg-indigo-500/20 px-2 rounded">{s}</span>)}
                        </span>
                      </div>
                      <div className="glass-panel p-3 rounded-xl border-white/5 bg-white/5 md:col-span-1 col-span-2">
                        <span className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Pass ID</span>
                        <span className="font-mono text-slate-300 font-bold text-lg">#{booking.id?.toString().padStart(6, '0')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8 pt-6 border-t border-white/5">
                    <Button variant="glass" className="text-white hover:text-indigo-400 border border-white/10 hover:border-indigo-500/30">
                      <Download className="w-4 h-4 mr-2" /> E-Ticket
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
