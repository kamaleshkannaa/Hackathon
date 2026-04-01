import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Search, Map, ShieldCheck, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Book Your Journey <br className="hidden md:block"/> With Confidence
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            India's most trusted network of premium intercity buses. Travel safely, comfortably, and on time.
          </p>
          <div className="flex justify-center">
            <Link to="/search">
              <Button variant="secondary" className="px-8 py-4 text-lg font-bold bg-white text-blue-600 hover:bg-gray-100 shadow-xl flex items-center gap-2">
                <Search className="w-5 h-5"/>
                Search Buses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50 flex-1">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Map className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Extensive Coverage</h3>
            <p className="text-gray-600">Connecting major cities and remote towns with thousands of daily routes.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
            <p className="text-gray-600">Verified operators, secure payments, and 24/7 dedicated customer support.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">On-Time Performance</h3>
            <p className="text-gray-600">Strict adherence to schedules ensuring you reach your destination right on time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
