import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

const SearchForm = () => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    travelDate: ''
  });
  const [errors, setErrors] = useState({});
  
  const { setSearchParams } = useBooking();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.source.trim()) newErrors.source = 'Source is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.travelDate) newErrors.travelDate = 'Date is required';
    if (formData.source.toLowerCase() === formData.destination.toLowerCase()) {
      newErrors.destination = 'Source and destination cannot be same';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSearchParams(formData);
    navigate(`/search-results?source=${formData.source}&destination=${formData.destination}&date=${formData.travelDate}`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gradient-to-br from-primary to-blue-600 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Book Bus Tickets Online
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="text"
                placeholder="Enter city"
                className={`input-field ${errors.source ? 'border-red-500' : ''}`}
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
              />
              {errors.source && <p className="text-danger text-xs mt-1">{errors.source}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="text"
                placeholder="Enter city"
                className={`input-field ${errors.destination ? 'border-red-500' : ''}`}
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
              {errors.destination && <p className="text-danger text-xs mt-1">{errors.destination}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
              <input
                type="date"
                min={today}
                className={`input-field ${errors.travelDate ? 'border-red-500' : ''}`}
                value={formData.travelDate}
                onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
              />
              {errors.travelDate && <p className="text-danger text-xs mt-1">{errors.travelDate}</p>}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-6 btn-primary text-lg py-3"
          >
            Search Buses
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;