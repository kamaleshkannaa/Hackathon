import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserBookings } from '../../services/bookingService';
import { Booking } from '../../types/booking';
import { Loader } from '../../components/common/Loader';
import { formatDate, formatTime } from '../../utils/formatDate';
import { Ticket, Download, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getUserBookings(user.id).then(res => {
        setBookings(res.data);
      }).catch(console.error).finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div className="mt-20"><Loader /></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <Ticket className="w-8 h-8 text-blue-600"/> My Bookings
        </h1>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow border p-12 text-center flex flex-col items-center">
            <Ticket className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">No bookings found</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't travelled with us yet.</p>
            <Link to="/search"><Button>Find a Bus</Button></Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="bg-blue-600 text-white p-6 flex flex-col justify-center items-center md:w-48 shrink-0">
                  <span className="text-sm opacity-80 uppercase tracking-widest font-semibold mb-1">Date</span>
                  <span className="text-3xl font-extrabold leading-none mb-1">{booking.schedule?.date ? new Date(booking.schedule.date).getDate() : ''}</span>
                  <span className="font-medium text-lg mb-4">{booking.schedule?.date ? new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(booking.schedule.date)) : ''}</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{booking.status}</span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{booking.schedule?.bus?.name}</h3>
                      <span className="font-bold text-blue-600">₹{booking.totalPrice}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700 font-medium bg-gray-50 p-3 rounded-lg border mb-4">
                      <span>{booking.schedule?.route?.source}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span>{booking.schedule?.route?.destination}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600">
                      <div><span className="block text-gray-400 text-xs uppercase mb-1">Departure</span>
                      <span className="font-semibold text-gray-800">{formatTime(booking.schedule?.departureTime || '')}</span></div>
                      
                      <div><span className="block text-gray-400 text-xs uppercase mb-1">Seats</span>
                      <span className="font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded border">{booking.seatNumbers.join(', ')}</span></div>
                      
                      <div><span className="block text-gray-400 text-xs uppercase mb-1">Booking ID</span>
                      <span className="font-mono text-gray-800">#{booking.id}</span></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 pt-4 border-t">
                    <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
                      <Download className="w-4 h-4 mr-2" /> Download Ticket
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
