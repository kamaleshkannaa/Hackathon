import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { UserPlus } from 'lucide-react';

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
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-2xl">
            <UserPlus className="w-8 h-8"/>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Create Account</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4 border border-red-200">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <Input label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <Input label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <Input label="Password" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          
          <div className="pt-2">
            <label className="text-sm font-medium text-gray-700 block mb-2">Account Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="user" checked={formData.role === 'user'} onChange={() => setFormData({...formData, role: 'user'})} className="accent-blue-600 w-4 h-4"/> Regular User
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="admin" checked={formData.role === 'admin'} onChange={() => setFormData({...formData, role: 'admin'})} className="accent-blue-600 w-4 h-4"/> Operator
              </label>
            </div>
          </div>
          
          <Button type="submit" className="w-full py-3 mt-4 text-lg" isLoading={loading}>Sign Up</Button>
        </form>
        <p className="mt-8 text-center text-gray-600 font-medium">
          Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 transition underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
}
