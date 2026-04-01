import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const BookingSummary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedSchedule, selectedSeats, passengers, clearBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!selectedSchedule || selectedSeats.length === 0) {
    navigate('/search');
    return null;
  }

  const totalAmount = selectedSeats.length * selectedSchedule.price;

  const handleConfirmBooking = async () => {
    // Validate all passengers have details
    const incomplete = passengers.filter(p => !p.name || !p.age || !p.gender);
    if (incomplete.length > 0) {
      alert('Please fill all passenger details');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bookingData = {
        scheduleId: selectedSchedule.id,
        seatIds: selectedSeats.map(s => s.id),
        passengers: passengers.map(p => ({
          seatId: p.seatId,
          name: p.name,
          age: parseInt(p.age),
          gender: p.gender
        })),
        totalAmount: totalAmount
      };

      const response = await bookingService.createBooking(bookingData);
      clearBooking();
      navigate('/booking-confirmation', { state: { booking: response.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>

      {error && (
        <div className="bg-red-50 text-danger p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="card mb-6">
        <h3 className="text-lg font-bold mb-4">Journey Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-secondary text-sm">Bus</p>
            <p className="font-medium">{selectedSchedule.bus.busName}</p>
            <p className="text-sm text-secondary">{selectedSchedule.bus.busType}</p>
          </div>
          <div>
            <p className="text-secondary text-sm">Route</p>
            <p className="font-medium">{selectedSchedule.route.source} → {selectedSchedule.route.destination}</p>
            <p className="text-sm text-secondary">{selectedSchedule.travelDate}</p>
          </div>
          <div>
            <p className="text-secondary text-sm">Departure</p>
            <p className="font-medium">{selectedSchedule.departureTime}</p>
          </div>
          <div>
            <p className="text-secondary text-sm">Arrival</p>
            <p className="font-medium">{selectedSchedule.arrivalTime}</p>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="text-lg font-bold mb-4">Passenger Details</h3>
        <div className="space-y-3">
          {passengers.map((p, idx) => {
            const seat = selectedSeats.find(s => s.id === p.seatId);
            return (
              <div key={p.seatId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-secondary">{p.age} years • {p.gender}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Seat {seat?.seatNumber}</p>
                  <p className="text-sm text-primary">₹{selectedSchedule.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card mb-6 bg-primary text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-100">Total Amount</p>
            <p className="text-3xl font-bold">₹{totalAmount}</p>
          </div>
          <button 
            onClick={handleConfirmBooking}
            disabled={loading}
            className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Confirm & Pay'}
          </button>
        </div>
      </div>

      <button 
        onClick={() => navigate(-1)}
        className="w-full btn-secondary"
      >
        Back to Seat Selection
      </button>
    </div>
  );
};

export default BookingSummary;