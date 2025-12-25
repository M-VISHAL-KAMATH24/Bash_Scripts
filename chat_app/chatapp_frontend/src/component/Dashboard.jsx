import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const checkUserProfile = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/profile/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setProfileComplete(true);
        setUser(prevUser => {
                   const updatedUser = { ...prevUser, profile: data.profile };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return updatedUser;
        });
      }
    } catch (err) {
      console.log('No profile found');
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚨 COMPLETE FIXED useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log('User loaded:', userData);
      if (userData.id || userData.userId) {
        setUser(userData);
        checkUserProfile(userData.id || userData.userId);
      } else {
        console.error('Invalid user data:', userData);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🟢 HTTP POLLING - WORKS EVERYWHERE (No WebSocket needed)
  useEffect(() => {
    if (!selectedUser?.id || !user?.id) return;  // ← ADD THIS GUARD
    
    const interval = setInterval(async () => {
      try {
        const currentUserId = parseInt(user.id) || parseInt(user.userId);
        const selectedId = parseInt(selectedUser.id);
        
        if (!currentUserId || !selectedId) {
          console.log('⏳ Waiting for valid IDs...');
          return;
        }
        
        const chatId = `${Math.min(currentUserId, selectedId)}-${Math.max(currentUserId, selectedId)}`;
        console.log('📡 Polling chatId:', chatId);  // DEBUG
        
                const response = await fetch(`/api/messages?chatId=${chatId}`);  // ← USE PROXY /api
        const newMessages = await response.json();
        
        if (newMessages.length > 0) {
          setMessages(prev => {
            // Filter out duplicates
            const existingIds = new Set(prev.map(m => m.id));
            const filteredNew = newMessages.filter(msg => !existingIds.has(msg.id));
            return [...prev, ...filteredNew];
          });
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedUser?.id, user?.id]);  // ← DEPEND ON IDs

  // 🟢 HTTP Send Message (Replace sendMessage function)
  const sendMessage = useCallback(async () => {
    if (!selectedUser?.id || !user?.id || !newMessage.trim()) return;
    
    const currentUserId = parseInt(user.id) || parseInt(user.userId);
    const selectedId = parseInt(selectedUser.id);
    const chatId = `${Math.min(currentUserId, selectedId)}-${Math.max(currentUserId, selectedId)}`;
    
    try {
      console.log('📤 Sending to:', chatId);
      await fetch(`/api/chat`, {  // ← USE PROXY
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          senderId: currentUserId.toString(),
          senderTag: user.profile?.tag || user.email,
          content: newMessage
        })
      });
      setNewMessage('');
    } catch (error) {
      console.error('Send error:', error);
    }
  }, [selectedUser?.id, user, newMessage]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfileComplete = (profileData) => {
    setProfileComplete(true);
    setUser(prevUser => {
      const updatedUser = { ...prevUser, profile: profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const handleUserSelect = (selected) => {
    setSelectedUser(selected);
    setMessages([]);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
    setMessages([]);
  };




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
        {/* Left Panel - Profile & Search */}
        <div className={`w-full lg:w-96 border-r border-slate-700/50 p-4 lg:p-6 space-y-6 overflow-y-auto transition-all duration-300 ${selectedUser ? 'lg:block hidden' : 'block'}`}>
          
          {/* Profile Setup OR Welcome */}
          {!profileComplete ? (
            <div className="w-full max-w-sm mx-auto">
              <ProfileSetup 
                userId={user?.userId || user?.id} 
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

                {/* Messages Area */}
                <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900/50">
                  {messages.length === 0 ? (
                    <>
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
                    </>
                  ) : (
                    messages.map((msg, index) => (
                      <div 
                        key={index}
                        className={`flex items-start space-x-3 ${msg.senderId === (user.userId || user.id) ? 'justify-end space-x-reverse' : ''}`}
                      >
                        <div className={`p-3 rounded-2xl max-w-xs lg:max-w-md backdrop-blur-xl ${
                          msg.senderId === (user.userId || user.id)
                            ? 'bg-blue-600/80 rounded-tr-sm' 
                            : 'bg-purple-600/80 rounded-tl-sm'
                        }`}>
                          <p className="text-white text-sm">{msg.content}</p>
                          <p className="text-xs text-slate-300 mt-1 opacity-75">
                            {msg.senderTag}
                          </p>
                        </div>
                                                <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                          msg.senderId === (user.userId || user.id) ? 'bg-blue-500 order-first' : 'bg-purple-500 order-last'
                        }`}>
                          {msg.senderTag?.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                {/* Message Input */}
<div className="p-4 lg:p-6 border-t border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
  <div className="flex space-x-3 items-end">
    <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }}
      placeholder="Type message..."
      className="flex-1 bg-slate-800/70 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
      disabled={false}
    />
    <button 
      onClick={sendMessage}
      disabled={!newMessage.trim()}
      className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-2xl flex items-center justify-center shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
    >
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
