// src/components/Dashboard.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './dashboard/Sidebar';
import ProfileSetup from './dashboard/ProfileSetup';
import UserSearch from './dashboard/UserSearch';
import { ArrowLeftOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      checkUserProfile(userData.userId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedUser]);

  const checkUserProfile = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/profile/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setProfileComplete(true);
        const updatedUser = { ...user, profile: data.profile };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.log('No profile found');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfileComplete = (profileData) => {
    setProfileComplete(true);
    const updatedUser = { ...user, profile: profileData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleUserSelect = (selected) => {
    setSelectedUser(selected);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-xl flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`lg:w-72 w-80 fixed lg:relative z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 backdrop-blur-xl shadow-2xl`}>
        <Sidebar onLogout={handleLogout} user={user} />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-6 left-6 z-50 p-3 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 lg:hidden shadow-2xl hover:shadow-white/20 transition-all duration-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Profile & Search (Hidden on mobile when chat open) */}
        <div className={`w-full lg:w-96 border-r border-slate-700/50 p-4 lg:p-6 space-y-6 overflow-y-auto transition-all duration-300 ${selectedUser ? 'lg:block hidden' : 'block'}`}>
          
          {/* Profile Setup OR Welcome */}
          {!profileComplete ? (
            <div className="w-full max-w-sm mx-auto">
              <ProfileSetup 
                userId={user.userId} 
                onComplete={handleProfileComplete} 
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-lg lg:text-xl">
                    {user.profile?.username?.slice(0,2).toUpperCase() || 'U'}
                  </span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-2 truncate">
                  {user.profile?.username || 'Welcome Back'}
                </h2>
                <p className="text-slate-400 text-lg font-medium">{user.profile?.tag || '#user'}</p>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center bg-emerald-500/20 text-emerald-400 text-sm px-4 py-2 rounded-full border border-emerald-500/30 font-medium">
                  Active ✅
                </span>
              </div>
            </div>
          )}

          {/* User Search */}
          {profileComplete && (
            <div className="w-full">
              <UserSearch onUserSelect={handleUserSelect} />
            </div>
          )}
        </div>

        {/* Right Panel - Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 p-4 lg:p-6">
          {selectedUser ? (
            <>
            {/* Mobile Chat Header */}
            <div className="lg:hidden flex items-center justify-between mb-4 p-4 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700/50">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">
                  {selectedUser.username?.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-bold text-lg truncate">{selectedUser.username}</h3>
                  <p className="text-slate-400 text-sm truncate">{selectedUser.tag}</p>
                </div>
              </div>
              <button 
                onClick={handleCloseChat}
                className="p-2 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Chat Container */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Desktop Chat Header */}
              {!selectedUser || (
                <div className="hidden lg:flex p-6 border-b border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {selectedUser.username?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-xl truncate">{selectedUser.username}</h3>
                      <p className="text-slate-400 text-sm truncate">{selectedUser.tag}</p>
                    </div>
                    <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900/50">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">You</div>
                  <div className="bg-blue-600/80 backdrop-blur-xl p-3 lg:p-4 rounded-2xl rounded-tr-sm max-w-xs lg:max-w-md">
                    <p className="text-white text-sm">Chat ready! Send your first message 🚀</p>
                  </div>
                </div>
                <div className="flex items-start justify-end space-x-3 space-x-reverse">
                  <div className="bg-purple-600/80 backdrop-blur-xl p-3 lg:p-4 rounded-2xl rounded-tl-sm max-w-xs lg:max-w-md">
                    <p className="text-white text-sm">Hi! {selectedUser.username} is online and ready to chat!</p>
                  </div>
                  <div className="w-7 h-7 lg:w-8 lg:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {selectedUser.username?.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 lg:p-6 border-t border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
                <div className="flex space-x-3 items-end">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-800/70 border border-slate-700 rounded-2xl px-4 lg:px-5 py-3 lg:py-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none transition-all resize-none text-sm lg:text-base"
                  />
                  <button className="w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-900/30 to-slate-800/30 backdrop-blur-xl rounded-3xl border-2 border-slate-700/50 border-dashed">
              <div className="text-center text-slate-400 space-y-4 max-w-md mx-auto p-8 lg:p-12">
                <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-slate-800/50 rounded-2xl flex items-center justify-center group hover:scale-105 transition-all duration-300">
                  <ArrowLeftOnRectangleIcon className="w-10 h-10 lg:w-12 lg:h-12 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Start Chatting</h3>
                  <p className="text-lg lg:text-xl mb-2">Search for users by their unique tag</p>
                  <p className="text-sm lg:text-base opacity-75">e.g. #coolguy, #gamer, #developer</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
