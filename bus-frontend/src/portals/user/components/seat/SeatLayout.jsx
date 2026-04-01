import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { seatService } from '../../services/seatService';
import { useBooking } from '../../context/BookingContext';
import Seat from './Seat';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const SeatLayout = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { selectedSchedule, selectedSeats, addSeat, removeSeat, passengers, updatePassenger } = useBooking();
  
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeats();
  }, [scheduleId]);

  const fetchSeats = async () => {
    try {
      setLoading(true);
      const response = await seatService.getSeatsBySchedule(scheduleId);
      setSeats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load seats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seat) => {
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) {
      removeSeat(seat.id);
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can book maximum 6 seats at a time');
        return;
      }
      addSeat(seat);
    }
  };

  const handlePassengerChange = (seatId, field, value) => {
    updatePassenger(seatId, { [field]: value });
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    navigate('/booking-summary');
  };

  // Group seats by row for layout (assuming seat numbers like 1A, 1B, 2A, 2B...)
  const groupSeatsByRow = () => {
    const rows = {};
    seats.forEach(seat => {
      const rowNum = seat.seatNumber.match(/\d+/)?.[0] || '0';
      if (!rows[rowNum]) rows[rowNum] = [];
      rows[rowNum].push(seat);
    });
    return Object.entries(rows).sort(([a], [b]) => parseInt(a) - parseInt(b));
  };

  if (loading) return <LoadingSpinner size="lg" />;
  if (error) return <ErrorMessage message={error} onRetry={fetchSeats} />;

  const rows = groupSeatsByRow();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Seats</h2>
        <p className="text-secondary">
          {selectedSchedule?.bus?.busName} | {selectedSchedule?.route?.source} → {selectedSchedule?.route?.destination}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Legend */}
            <div className="flex gap-6 mb-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-primary bg-white rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-success rounded"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-danger rounded"></div>
                <span className="text-sm">Booked</span>
              </div>
            </div>

            {/* Driver */}
            <div className="mb-4 text-center">
              <div className="inline-block bg-gray-200 px-8 py-2 rounded-lg">
                🧑‍✈️ Driver
              </div>
            </div>

            {/* Seat Grid */}
            <div className="space-y-2">
              {rows.map(([rowNum, rowSeats]) => (
                <div key={rowNum} className="flex justify-center gap-4">
                  {rowSeats.sort((a, b) => a.seatNumber.localeCompare(b.seatNumber))
                    .map(seat => (
                      <Seat
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeats.find(s => s.id === seat.id)}
                        onClick={handleSeatClick}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
            
            {selectedSeats.length === 0 ? (
              <p className="text-secondary text-center py-4">No seats selected</p>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {selectedSeats.map((seat, index) => (
                    <div key={seat.id} className="border-b pb-4">
                      <p className="font-medium mb-2">Seat {seat.seatNumber} ({seat.seatType})</p>
                      <input
                        type="text"
                        placeholder="Passenger Name"
                        className="input-field mb-2 text-sm"
                        value={passengers.find(p => p.seatId === seat.id)?.name || ''}
                        onChange={(e) => handlePassengerChange(seat.id, 'name', e.target.value)}
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Age"
                          className="input-field text-sm w-20"
                          value={passengers.find(p => p.seatId === seat.id)?.age || ''}
                          onChange={(e) => handlePassengerChange(seat.id, 'age', e.target.value)}
                        />
                        <select
                          className="input-field text-sm flex-1"
                          value={passengers.find(p => p.seatId === seat.id)?.gender || ''}
                          onChange={(e) => handlePassengerChange(seat.id, 'gender', e.target.value)}
                        >
                          <option value="">Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Selected Seats:</span>
                    <span className="font-bold">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-lg">
                    <span>Total:</span>
                    <span className="font-bold text-primary">
                      ₹{selectedSeats.length * (selectedSchedule?.price || 0)}
                    </span>
                  </div>
                  
                  <button 
                    onClick={handleContinue}
                    className="w-full btn-primary"
                  >
                    Continue to Book
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;