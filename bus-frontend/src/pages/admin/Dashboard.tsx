import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Shield, TrendingUp, Users, MapPin } from 'lucide-react';

export default function Dashboard() {
  const { data: bookings } = useFetch<any[]>('/bookings');
  const { data: buses } = useFetch<any[]>('/buses');

  return (
    <div className="p-8 md:p-12 relative min-h-[calc(100vh-5rem)] bg-[#0b0c0f]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-indigo-500/5 blur-[200px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-inner">
             <Shield className="w-6 h-6 text-fuchsia-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight uppercase">Command Center</h1>
            <p className="text-slate-400 font-bold text-sm tracking-widest mt-1">EXECUTIVE SYSTEM OVERVIEW</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity"><TrendingUp className="w-24 h-24 text-indigo-400"/></div>
            <h3 className="text-slate-500 font-black tracking-[0.2em] text-xs uppercase mb-2">Total Yield</h3>
            <p className="text-5xl font-black text-white relative z-10 flex items-center gap-2">
               <span className="text-indigo-400">₹</span>{bookings?.reduce((acc, b) => acc + b.totalPrice, 0) || 0}
            </p>
            <div className="mt-6 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded inline-block">↑ 24% from last week</div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity"><Users className="w-24 h-24 text-fuchsia-400"/></div>
            <h3 className="text-slate-500 font-black tracking-[0.2em] text-xs uppercase mb-2">Manifest Activity</h3>
            <p className="text-5xl font-black text-white relative z-10">{bookings?.length || 0}</p>
            <div className="mt-6 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded inline-block">↑ 12 active sectors</div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity"><MapPin className="w-24 h-24 text-cyan-400"/></div>
            <h3 className="text-slate-500 font-black tracking-[0.2em] text-xs uppercase mb-2">Fleet Deployment</h3>
            <p className="text-5xl font-black text-white relative z-10">{buses?.length || 0}</p>
            <div className="mt-6 text-cyan-400 text-sm font-bold bg-cyan-400/10 px-3 py-1 rounded inline-block">All units operational</div>
          </div>
        </div>
      </div>
    </div>
  );
}
