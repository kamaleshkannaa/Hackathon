import React from 'react';

export const Loader = () => (
  <div className="flex justify-center items-center p-12">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-r-2 border-fuchsia-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      <div className="absolute inset-4 rounded-full border-b-2 border-cyan-400 animate-spin" style={{ animationDuration: '0.8s' }}></div>
    </div>
  </div>
);
