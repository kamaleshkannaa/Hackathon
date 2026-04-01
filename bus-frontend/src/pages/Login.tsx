import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { LogIn } from 'lucide-react';

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
      // assumes res.data structure { token, user }
      login(res.data.user, res.data.token);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-2xl">
            <LogIn className="w-8 h-8"/>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Welcome Back</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center border border-red-200">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <Input label="Email Address" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@expressbus.com" />
          <Input label="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          <Button type="submit" className="w-full py-3 text-lg" isLoading={loading}>Log In</Button>
        </form>
        <p className="mt-8 text-center text-gray-600 font-medium">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800 transition underline">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
