// src/components/dashboard/Sidebar.jsx
import { 
  UserCircleIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  UserIcon  // ← ADD THIS
} from '@heroicons/react/24/outline';

const Sidebar = ({ onLogout, user }) => {
  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 backdrop-blur-xl shadow-2xl">
      <div className="p-8">
        {/* User Profile */}
        <div className="flex items-center space-x-4 mb-8 p-4 bg-slate-800/30 rounded-2xl">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {user?.profile?.username?.slice(0, 2).toUpperCase() || 
               user?.email?.slice(0, 2).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white truncate">
              {user?.profile?.username || user?.email?.split('@')[0] || 'User'}
            </h2>
            <p className="text-emerald-400 font-medium text-sm truncate">
              {user?.profile?.tag || `#${user?.userId?.slice(0, 6)}`}
            </p>
            <p className="text-slate-500 text-xs mt-1">ID: {user?.userId?.slice(0, 8)}</p>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="space-y-2 mb-8">
          <button className="w-full flex items-center space-x-3 p-4 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all duration-300 group hover:shadow-lg">
            <ChatBubbleLeftRightIcon className="w-6 h-6 group-hover:text-emerald-400 transition-colors" />
            <span className="font-medium">Chats</span>
          </button>
          
          {user?.profile ? (
            <button className="w-full flex items-center space-x-3 p-4 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all duration-300 group hover:shadow-lg">
              <UserIcon className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
              <span className="font-medium">Find Users</span>
            </button>
          ) : (
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-600/80 to-emerald-600/80 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <CogIcon className="w-6 h-6" />
              <span className="font-bold">Complete Profile</span>
            </button>
          )}
          
          <button className="w-full flex items-center space-x-3 p-4 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all duration-300 group hover:shadow-lg">
            <DocumentTextIcon className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
            <span className="font-medium">Documents</span>
          </button>
        </div>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
