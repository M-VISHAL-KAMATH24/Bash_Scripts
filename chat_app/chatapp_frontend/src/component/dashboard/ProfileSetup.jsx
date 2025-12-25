// src/components/dashboard/ProfileSetup.jsx
import { useState } from 'react';
import { UserIcon, HashtagIcon } from '@heroicons/react/24/outline';

const ProfileSetup = ({ userId, onComplete }) => {
  const [formData, setFormData] = useState({ username: '', tag: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          username: formData.username,
          tag: formData.tag
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('profile', JSON.stringify(formData));
        onComplete(formData);
      } else {
        setError(data.message || 'Profile creation failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <UserIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
          Complete Profile
        </h2>
        <p className="text-slate-400">Choose your unique username & tag</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-purple-400" />
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full px-12 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="yourname"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
            <HashtagIcon className="w-5 h-5 mr-2 text-emerald-400" />
            Unique Tag
          </label>
          <div className="relative">
            <HashtagIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={(e) => setFormData({...formData, tag: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="#yourtag"
              required
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Profile...</span>
            </>
          ) : (
            <span>Save Profile</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
