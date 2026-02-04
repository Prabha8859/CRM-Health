import React from 'react';
import { Camera, Briefcase, Edit3, Settings, Shield, Activity } from 'lucide-react';
import { ROLE_LABELS, ROLES } from '../../utils/rbac';

const ProfileHeader = ({ user, onEdit, onSettings }) => {
  const isSuperAdmin = user?.role === ROLES.SUPER_ADMIN;

  return (
    <div className="relative mb-8">
      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-b-[3rem] shadow-lg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)]"></div>
            <Activity className="absolute top-10 right-20 text-white w-32 h-32 opacity-20 rotate-12" />
            <Shield className="absolute bottom-[-20px] left-20 text-white w-40 h-40 opacity-10 rotate-[-12deg]" />
        </div>
      </div>

      {/* User Card */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            
            {/* Avatar */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden relative bg-gray-100">
                <img 
                  src={user?.avatar || "https://i.pravatar.cc/300"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-md">
                 <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  {user?.name || "User Name"}
                </h1>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm
                  ${isSuperAdmin 
                    ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}
                >
                  {ROLE_LABELS[user?.role] || "Member"}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg flex items-center justify-center md:justify-start gap-2">
                <Briefcase size={18} />
                HealthCRM Solutions &bull; ID: #EMP-{Math.floor(Math.random() * 10000)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
               <button 
                 onClick={onEdit}
                 className="px-6 py-3 bg-[var(--color-brand-primary)] text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
               >
                 <Edit3 size={18} /> Edit Profile
               </button>
               <button 
                 onClick={onSettings}
                 className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
               >
                 <Settings size={20} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
