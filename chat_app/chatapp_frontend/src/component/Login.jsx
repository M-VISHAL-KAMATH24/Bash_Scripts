// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {  // ← VITE PROXY (NO CORS!)
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Login successful → Go to Dashboard
        localStorage.setItem('user', JSON.stringify(data)); // Save user data
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 via-emerald-900/30 to-slate-900 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/50">
            <LockClosedIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-lg">Sign in to your QuikChat dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-emerald-400" />
              Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-12 pr-4 py-4 bg-slate-900/70 border border-slate-600/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
              <LockClosedIcon className="w-5 h-5 mr-2 text-emerald-400" />
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-12 pr-4 py-4 bg-slate-900/70 border border-slate-600/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-700 hover:from-emerald-700 hover:via-blue-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/60 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LockClosedIcon className="w-6 h-6" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm mb-4">Don't have an account?</p>
          <button
            onClick={() => navigate('/signup')}
            disabled={loading}
            className="inline-flex items-center space-x-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
