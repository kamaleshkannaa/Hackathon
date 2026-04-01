import React from 'react';
import { Bus, Globe, Mail, Phone } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 text-white mb-4">
          <Bus className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">ExpressBus</span>
        </div>
        <p className="text-gray-400 mb-6 max-w-sm">
          Seamlessly book your next journey with India's most trusted intercity bus network. We prioritize safety, comfort, and timeliness.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-white transition"><Globe className="w-5 h-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><Mail className="w-5 h-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><Phone className="w-5 h-5" /></a>
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Offers</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Legal</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Refund Policy</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} ExpressBus. All rights reserved.
    </div>
  </footer>
);
