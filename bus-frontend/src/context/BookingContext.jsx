import { createContext, useReducer, useContext, useCallback } from 'react';

// Action Types
export const BOOKING_ACTIONS = {
  SELECT_SCHEDULE: 'SELECT_SCHEDULE',
  ADD_SEAT: 'ADD_SEAT',
  REMOVE_SEAT: 'REMOVE_SEAT',
  SET_PASSENGER: 'SET_PASSENGER',
  SET_PASSENGERS: 'SET_PASSENGERS',
  UPDATE_PASSENGER: 'UPDATE_PASSENGER',
  RESET: 'RESET',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Initial State
const initialState = {
  selectedSchedule: null,
  selectedSeats: [], // Max 6 seats
  passengers: [], // Array matching selected seats
  isLoading: false,
  error: null,
  maxSeats: 6
};

// Reducer
const bookingReducer = (state, action) => {
  switch (action.type) {
    case BOOKING_ACTIONS.SELECT_SCHEDULE:
      return {
        ...state,
        selectedSchedule: action.payload,
        // Reset seats when schedule changes
        selectedSeats: [],
        passengers: []
      };

    case BOOKING_ACTIONS.ADD_SEAT:
      if (state.selectedSeats.length >= state.maxSeats) {
        return {
          ...state,
          error: `Maximum ${state.maxSeats} seats allowed`
        };
      }
      if (state.selectedSeats.find(s => s.id === action.payload.id)) {
        return state; // Already selected
      }
      const newSeats = [...state.selectedSeats, action.payload];
      return {
        ...state,
        selectedSeats: newSeats,
        passengers: newSeats.map((seat, index) => ({
          seatId: seat.id,
          seatNumber: seat.seatNumber,
          name: '',
          age: '',
          gender: '',
          ...state.passengers[index] // Preserve existing data if re-adding
        })),
        error: null
      };

    case BOOKING_ACTIONS.REMOVE_SEAT:
      const filteredSeats = state.selectedSeats.filter(
        s => s.id !== action.payload
      );
      return {
        ...state,
        selectedSeats: filteredSeats,
        passengers: state.passengers.filter(
          p => p.seatId !== action.payload
        ),
        error: null
      };

    case BOOKING_ACTIONS.SET_PASSENGER:
      // Set single passenger by index
      const updatedPassengers = [...state.passengers];
      updatedPassengers[action.payload.index] = {
        ...updatedPassengers[action.payload.index],
        ...action.payload.data
      };
      return {
        ...state,
        passengers: updatedPassengers
      };

    case BOOKING_ACTIONS.UPDATE_PASSENGER:
      // Update passenger by seatId
      return {
        ...state,
        passengers: state.passengers.map(p =>
          p.seatId === action.payload.seatId
            ? { ...p, ...action.payload.data }
            : p
        )
      };

    case BOOKING_ACTIONS.SET_PASSENGERS:
      return {
        ...state,
        passengers: action.payload
      };

    case BOOKING_ACTIONS.RESET:
      return initialState;

    case BOOKING_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case BOOKING_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Action creators
  const selectSchedule = useCallback((schedule) => {
    dispatch({ type: BOOKING_ACTIONS.SELECT_SCHEDULE, payload: schedule });
  }, []);

  const addSeat = useCallback((seat) => {
    dispatch({ type: BOOKING_ACTIONS.ADD_SEAT, payload: seat });
  }, []);

  const removeSeat = useCallback((seatId) => {
    dispatch({ type: BOOKING_ACTIONS.REMOVE_SEAT, payload: seatId });
  }, []);

  const updatePassenger = useCallback((seatId, data) => {
    dispatch({
      type: BOOKING_ACTIONS.UPDATE_PASSENGER,
      payload: { seatId, data }
    });
  }, []);

  const setPassengers = useCallback((passengers) => {
    dispatch({ type: BOOKING_ACTIONS.SET_PASSENGERS, payload: passengers });
  }, []);

  const resetBooking = useCallback(() => {
    dispatch({ type: BOOKING_ACTIONS.RESET });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: BOOKING_ACTIONS.SET_ERROR, payload: error });
  }, []);

  // Validation helpers
  const isValidBooking = () => {
    if (!state.selectedSchedule) return false;
    if (state.selectedSeats.length === 0) return false;
    if (state.selectedSeats.length > state.maxSeats) return false;
    
    // Check all passengers have required fields
    return state.passengers.every(p => 
      p.name && p.name.trim().length > 0 &&
      p.age && parseInt(p.age) > 0 &&
      p.gender
    );
  };

  const getTotalAmount = () => {
    if (!state.selectedSchedule) return 0;
    return state.selectedSeats.length * state.selectedSchedule.price;
  };

  const value = {
    ...state,
    selectSchedule,
    addSeat,
    removeSeat,
    updatePassenger,
    setPassengers,
    resetBooking,
    setLoading,
    setError,
    isValidBooking,
    getTotalAmount,
    canAddMoreSeats: state.selectedSeats.length < state.maxSeats
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export default BookingContext;
