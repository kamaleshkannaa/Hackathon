import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Schedule } from '../../types/schedule';
import { SeatSelector } from '../../components/user/SeatSelector';
import { BookingSummary } from '../../components/user/BookingSummary';
import { createBooking } from '../../services/bookingService';
import { getSeatsByBus } from '../../services/seatService';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft, MapPin } from 'lucide-react';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: schedule, loading: schedLoad } = useFetch<Schedule>(`/schedules/${id}`);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login', { state: { from: `/booking/${id}` }});
  }, [user, navigate, id]);

  useEffect(() => {
    if (schedule?.busId) {
      getSeatsByBus(schedule.busId).then(res => {
        const booked = res.data.map((seat: any) => seat.seatNumber);
        setBookedSeats(booked);
      }).catch(console.error);
    }
  }, [schedule]);

  const handleConfirm = async () => {
    if (!user || selectedSeats.length === 0 || !schedule) return;
    try {
      setIsSubmitting(true);
      const payload = {
        userId: user.id || 1,
        scheduleId: schedule.id,
        seatNumbers: selectedSeats,
        totalPrice: schedule.price * selectedSeats.length,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
      };
      await createBooking(payload);
      
      // Success interaction
      navigate('/my-bookings');
    } catch (e: any) {
      alert(e.response?.data?.message || 'Booking failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSeat = (num: number) => {
    setSelectedSeats(prev => prev.includes(num) ? prev.filter(s => s !== num) : [...prev, num]);
  };

  if (schedLoad || !schedule) return <div className="mt-32"><Loader /></div>;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0b0c0f] flex flex-col pt-12 pb-32 relative">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full"></div>
      
      <div className="max-w-6xl mx-auto w-full px-4 relative z-10">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-white font-medium mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 
          </div>
          Return to Results
        </button>
        
        <div className="glass-panel p-8 rounded-3xl mb-10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-l-indigo-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 blur-[100px]"></div>
          
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-white/5 rounded text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
              Route #{schedule.id?.toString().padStart(4, '0') || '0000'}
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight leading-tight">{schedule.bus?.name}</h1>
            <div className="text-slate-400 flex items-center gap-2 mt-2 font-medium">
              <span className="text-white">{schedule.route?.source}</span> <MapPin className="w-4 h-4 text-indigo-400"/> <span className="text-white">{schedule.route?.destination}</span>
            </div>
          </div>
          <div className="text-right glass-panel p-4 rounded-2xl border-white/5 relative z-10 bg-black/20">
            <span className="block text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-indigo-400">₹{schedule.price}</span>
            <span className="text-sm tracking-[0.2em] text-slate-500 font-bold uppercase mt-1 block">Per Seat</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <SeatSelector 
              totalSeats={schedule.bus?.totalSeats || 40}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onSeatToggle={toggleSeat}
            />
          </div>
          <div className="lg:col-span-1">
            <BookingSummary 
              schedule={schedule}
              selectedSeats={selectedSeats}
              onConfirm={handleConfirm}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
