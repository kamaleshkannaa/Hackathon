import React from 'react';
import { Bus, Globe, Mail, Phone, ArrowUpRight } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-[#0b0c0f] text-slate-400 py-16 border-t border-white/5 relative overflow-hidden">
    {/* Decorative Glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 text-white mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Bus className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">AeroBus</span>
        </div>
        <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
          Experience the future of intercity travel. Premium comfort, unparalleled safety, and a seamless booking experience engineered for the modern traveler.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all"><Globe className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all"><Mail className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all"><Phone className="w-4 h-4" /></a>
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold mb-6 tracking-wide">Explore</h3>
        <ul className="space-y-3">
          <li><a href="#" className="hover:text-indigo-400 transition flex items-center gap-1">Destinations <ArrowUpRight className="w-3 h-3 opacity-50"/></a></li>
          <li><a href="#" className="hover:text-indigo-400 transition flex items-center gap-1">Offers & Passes <ArrowUpRight className="w-3 h-3 opacity-50"/></a></li>
          <li><a href="#" className="hover:text-indigo-400 transition flex items-center gap-1">Onboard Experience <ArrowUpRight className="w-3 h-3 opacity-50"/></a></li>
          <li><a href="#" className="hover:text-indigo-400 transition flex items-center gap-1">Careers <ArrowUpRight className="w-3 h-3 opacity-50"/></a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold mb-6 tracking-wide">Legal & Support</h3>
        <ul className="space-y-3">
          <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Refund Guidelines</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm font-medium relative z-10">
      <span className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} AeroBus Network. All rights reserved.</span>
      <div className="flex gap-6">
        <span>Currencies: INR / USD</span>
        <span>Language: English (UK)</span>
      </div>
    </div>
  </footer>
);
