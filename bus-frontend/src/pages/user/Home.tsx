import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Search, MapPin, ShieldCheck, Clock, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c0f]">
      {/* Cinematic Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-black z-0">
          <img src="/hero_bus.webp" alt="Premium Bus" className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_20s_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/80 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0c0f] to-transparent"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-indigo-500/30 text-indigo-300 font-bold text-sm tracking-widest mb-8 animate-fade-in-up shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Zap className="w-4 h-4 text-fuchsia-400" /> REINVENTING INTERCITY TRAVEL
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 animate-fade-in-up leading-[1.1] [text-shadow:0_10px_30px_rgba(0,0,0,0.8)]" style={{ animationDelay: '0.1s' }}>
            Journey Beyond <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 animate-pulse">Expectations.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Experience the zenith of luxury and safety. India's premier high-speed coach network, designed exclusively for the uncompromising traveler.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/search">
              <Button className="h-16 px-10 text-xl shadow-[0_0_40px_rgba(99,102,241,0.5)] bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-600 rounded-full border border-indigo-400 transition-all duration-500">
                <Search className="w-6 h-6 mr-3 text-white"/>
                Book Elite Tickets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 relative z-10 bg-[#0b0c0f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Grid Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-fuchsia-600/5 blur-[150px] pointer-events-none"></div>

          <div className="glass-panel p-10 rounded-3xl hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] transition-all duration-500 group relative overflow-hidden">
            <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner relative z-10">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight relative z-10">Omnipresent Network</h3>
            <p className="text-slate-400 font-medium leading-relaxed relative z-10">Connecting metropolis cores to hidden retreats. Over 500+ exclusive routes operational daily across the subcontinent.</p>
          </div>

          <div className="glass-panel p-10 rounded-3xl hover:-translate-y-2 hover:border-fuchsia-500/50 hover:shadow-[0_0_50px_rgba(217,70,239,0.15)] transition-all duration-500 group relative overflow-hidden">
            <div className="w-20 h-20 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-fuchsia-500 group-hover:text-white transition-all shadow-inner relative z-10">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight relative z-10">Military-Grade Safety</h3>
            <p className="text-slate-400 font-medium leading-relaxed relative z-10">24/7 centralized command tracking, verified elite operators, and end-to-end encrypted bookings.</p>
          </div>

          <div className="glass-panel p-10 rounded-3xl hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500 group relative overflow-hidden">
            <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-inner relative z-10">
              <Clock className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight relative z-10">Precision Timing</h3>
            <p className="text-slate-400 font-medium leading-relaxed relative z-10">Our fleet operates on aerospace-level precision principles. Zero compromises on dispatch and arrival schedules.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
