import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { LogIn, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginUser({ email, password });
      login(res.data.user, res.data.token);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      login({ id: 'demo-admin', name: 'System Admin', email: 'admin@aerobus.com', role: 'admin' } as any, 'demo-token');
      navigate('/admin');
    } else {
      login({ id: 'demo-user', name: 'Elite Member', email: 'member@aerobus.com', role: 'user' } as any, 'demo-token');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b0c0f]">
      {/* Visual Half */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-slate-900 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -left-[20%] top-[20%] w-[500px] h-[500px] bg-fuchsia-500/30 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
        
        <div className="z-10 text-center max-w-lg px-8">
          <div className="w-20 h-20 bg-white/10 rounded-3xl mx-auto flex items-center justify-center backdrop-blur-md border border-white/20 mb-8 shadow-2xl">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">BJP BUS</h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">Enter the high-security portal to manage itineraries and elite travel bookings securely.</p>
        </div>
      </div>

      {/* Form Half */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#111318] relative">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-indigo-600/10 blur-[150px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 glass-panel p-10 rounded-[2rem] border-white/5 shadow-2xl">
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-slate-400 font-medium mb-10">Enter your secure credentials to proceed.</p>
          
          {error && <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl text-sm font-bold tracking-wide mb-8 border border-rose-500/20 shadow-inner flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse block"></span> {error}</div>}
          
          {/* Quick Demos */}
          <div className="flex gap-4 mb-10 pb-10 border-b border-white/10">
             <button onClick={() => demoLogin('admin')} className="flex-1 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 text-indigo-300 font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center group text-sm">
                Demo Admin <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/>
             </button>
             <button onClick={() => demoLogin('user')} className="flex-1 bg-white/5 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-500/50 text-fuchsia-300 font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center group text-sm">
                Demo User <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/>
             </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input label="SECURE ID (EMAIL)" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="alias@domain.com" />
            <Input label="SECURITY KEY (PASSWORD)" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            
            <Button type="submit" className="w-full h-14 mt-4 bg-white text-black hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] font-black text-lg tracking-widest border-0" isLoading={loading}>
              AUTHENTICATE
            </Button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-bold text-sm tracking-wide">
            NO CLEARANCE? <Link to="/register" className="text-indigo-400 hover:text-white transition-colors uppercase border-b border-indigo-500/30 pb-0.5 ml-2">Obtain Access</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
