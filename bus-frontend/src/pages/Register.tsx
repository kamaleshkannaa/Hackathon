import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b0c0f]">
      {/* Form Half */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#111318] relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-fuchsia-600/10 blur-[150px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 glass-panel p-10 rounded-[2rem] border-white/5 shadow-2xl">
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">Initialize Origin</h2>
          <p className="text-slate-400 font-medium mb-10">Establish your secure identity profile.</p>

          {error && <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl text-sm font-bold tracking-wide mb-8 border border-rose-500/20">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-6">
            <Input label="LEGAL DESIGNATION" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" />
            <Input label="SECURE ID (EMAIL)" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="alias@domain.com" />
            <Input label="SECURITY KEY (PASSWORD)" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
            
            <div className="pt-2 pb-4">
              <label className="text-xs font-black text-slate-500 tracking-[0.2em] block mb-4 uppercase">Clearance Level</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center py-3 border rounded-xl font-bold cursor-pointer transition-all ${formData.role === 'user' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <input type="radio" value="user" checked={formData.role === 'user'} onChange={() => setFormData({...formData, role: 'user'})} className="hidden"/> Standard
                </label>
                <label className={`flex-1 flex items-center justify-center py-3 border rounded-xl font-bold cursor-pointer transition-all ${formData.role === 'admin' ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <input type="radio" value="admin" checked={formData.role === 'admin'} onChange={() => setFormData({...formData, role: 'admin'})} className="hidden"/> Operator
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 mt-4 bg-gradient-to-r from-indigo-500 to-fuchsia-600 shadow-[0_0_30px_rgba(99,102,241,0.3)] font-black text-lg tracking-widest border-0 text-white hover:shadow-[0_0_40px_rgba(217,70,239,0.5)]" isLoading={loading}>
              PROVISION PROFILE
            </Button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-bold text-sm tracking-wide">
            PROFILE EXISTS? <Link to="/login" className="text-white hover:text-fuchsia-400 transition-colors uppercase border-b border-fuchsia-500/30 pb-0.5 ml-2">Authenticate</Link>
          </p>
        </div>
      </div>

      {/* Visual Half */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-[#0b0c0f] z-0"></div>
        <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-cyan-500/20 blur-[200px] rounded-full animate-pulse pointer-events-none"></div>
        
        <div className="z-10 text-center max-w-lg px-8">
          <div className="w-24 h-24 bg-white/5 rounded-full mx-auto flex items-center justify-center border border-white/20 mb-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <ShieldAlert className="w-12 h-12 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">Regulated Access</h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed">System requires identity provisioning to guarantee absolute passenger security and manifest tracking logs.</p>
        </div>
      </div>
    </div>
  );
}
