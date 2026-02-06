import React from 'react';
import { Edit, Settings, UserPlus } from 'lucide-react';

const ProfileHeader = ({ user, onEdit, onSettings, onRegister }) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-6">
        <div className="relative shrink-0 cursor-pointer group" onClick={onEdit}>
          <img
            src={user?.profile_image || `https://i.pravatar.cc/150?u=${user?.id}`}
            alt={`${user?.username}'s profile`}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-lg group-hover:opacity-80 transition-opacity"
          />
          <span className={`absolute bottom-1 right-1 block h-4 w-4 rounded-full border-2 border-white dark:border-gray-900 ${user?.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{user?.username}</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">{user?.role_name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={onRegister} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors" title="Register New Staff">
                <UserPlus size={20} />
              </button>
              <button onClick={onEdit} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                <Edit size={20} />
              </button>
              <button onClick={onSettings} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;