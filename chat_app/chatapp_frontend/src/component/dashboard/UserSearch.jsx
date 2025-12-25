// src/components/dashboard/UserSearch.jsx
import { useState } from 'react';
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const UserSearch = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/profile/search?tag=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.profiles || []);
      } else {
        setError(data.message || 'Search failed');
        setResults([]);
      }
    } catch (err) {
      setError('Network error');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by tag (e.g. #coolguy)"
            className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            disabled={loading}
          />
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {results.map((user) => (
            <button
              key={user.id}
              onClick={() => onUserSelect(user)}
              className="w-full flex items-center space-x-4 p-4 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user.username?.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{user.username}</p>
                <p className="text-slate-400 text-sm">{user.tag}</p>
              </div>
              <UserPlusIcon className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            </button>
          ))}
        </div>
      ) : searchTerm && !loading ? (
        <p className="text-center text-slate-400 py-12">No users found</p>
      ) : null}
    </div>
  );
};

export default UserSearch;
