import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

const BusCard = ({ schedule }) => {
  const navigate = useNavigate();
  const { setSelectedSchedule } = useBooking();

  const handleSelect = () => {
    setSelectedSchedule(schedule);
    navigate(`/seat-selection/${schedule.id}`);
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const duration = () => {
    const dep = new Date(`2000-01-01T${schedule.departureTime}`);
    const arr = new Date(`2000-01-01T${schedule.arrivalTime}`);
    const diff = (arr - dep) / (1000 * 60 * 60);
    return `${Math.floor(diff)}h ${Math.round((diff % 1) * 60)}m`;
  };

  return (
    <div className="card border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{schedule.bus.busName}</h3>
          <p className="text-secondary text-sm">{schedule.bus.busType}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">₹{schedule.price}</p>
          <p className="text-success text-sm font-medium">
            {schedule.availableSeats || schedule.bus.totalSeats} seats available
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{formatTime(schedule.departureTime)}</p>
          <p className="text-secondary text-sm">{schedule.route.source}</p>
        </div>
        
        <div className="flex-1 px-4">
          <div className="border-t-2 border-gray-300 relative">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-secondary">
              {duration()}
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold">{formatTime(schedule.arrivalTime)}</p>
          <p className="text-secondary text-sm">{schedule.route.destination}</p>
        </div>
      </div>
      
      <button 
        onClick={handleSelect}
        className="w-full btn-primary"
      >
        Select Seats
      </button>
    </div>
  );
};

export default BusCard;