import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import BusSearch from '../pages/user/BusSearch';
import BookingPage from '../pages/user/BookingPage';
import MyBookings from '../pages/user/MyBookings';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function UserRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<BusSearch />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
