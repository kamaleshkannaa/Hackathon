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
import { ArrowLeft } from 'lucide-react';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: schedule, loading: schedLoad } = useFetch<Schedule>(`/schedules/${id}`);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/booking/${id}` }});
    }
  }, [user, navigate, id]);

  useEffect(() => {
    if (schedule?.busId) {
      getSeatsByBus(schedule.busId).then(res => {
        // mock logic: filter seats that match this schedule and are booked
        // API depends on exact backend integration. Assuming we get booked numbers.
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
        userId: user.id || 1, // fallback
        scheduleId: schedule.id,
        seatNumbers: selectedSeats,
        totalPrice: schedule.price * selectedSeats.length,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
      };
      await createBooking(payload);
      alert('Booking Successful!');
      navigate('/my-bookings');
    } catch (e: any) {
      alert(e.response?.data?.message || 'Booking failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSeat = (num: number) => {
    setSelectedSeats(prev => prev.includes(num) ? prev.filter(s => s !== num) : [...prev, num]);
  };

  if (schedLoad || !schedule) return <div className="mt-20"><Loader /></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-6 pb-20">
      <div className="max-w-6xl mx-auto w-full px-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 font-medium mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
        </button>
        
        <div className="bg-white p-6 rounded-xl border mb-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{schedule.bus?.name}</h1>
            <p className="text-gray-500">{schedule.route?.source} to {schedule.route?.destination}</p>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-bold text-blue-600">₹{schedule.price}</span>
            <span className="text-sm tracking-wide text-gray-400 uppercase">Per Seat</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
