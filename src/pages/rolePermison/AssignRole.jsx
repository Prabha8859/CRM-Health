import React, { useState } from 'react';
import { 
  Users, Search, Shield, ChevronRight, ChevronDown,
  MoreVertical, UserCheck, AlertCircle 
} from 'lucide-react';
import { ROLES, ROLE_LABELS } from '../../utils/rbac';

import { useMockData } from '../../context/MockDataContext';

const AssignRole = () => {
  const { users, updateUserRole } = useMockData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');

  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole);
    // Optional: Show success toast
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoleFilter === 'all' || user.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-6 md:p-8 pb-20">
      
      {/* Header */}
      <div className="mb-8 animate-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2 flex items-center gap-3">
          <Users className="text-[var(--color-brand-primary)]" size={32} />
          Role Assignment
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Manage user access levels and permissions efficiently.</p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 animate-in fade-in duration-700">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <select 
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none cursor-pointer font-bold text-gray-600 dark:text-gray-300"
          >
            <option value="all">All Roles</option>
            {Object.values(ROLES).map(role => (
              <option key={role} value={role}>{ROLE_LABELS[role]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group relative overflow-hidden">
            
            {/* Role Badge */}
            <div className="absolute top-4 right-4">
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                 ${user.role === ROLES.SUPER_ADMIN ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                   user.role === ROLES.ADMIN ? 'bg-blue-50 text-blue-600 border-blue-100' :
                   'bg-gray-50 text-gray-600 border-gray-100'
                 }
               `}>
                 {ROLE_LABELS[user.role]}
               </span>
            </div>

            <div className="flex flex-col items-center text-center mb-6 pt-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] p-1 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                   {user.avatar ? (
                     <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-2xl font-black text-gray-300">{user.name.charAt(0)}</span>
                   )}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-500 font-medium">{user.email}</p>
            </div>

            <div className="pt-4 border-t border-gray-50 dark:border-gray-700">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-left">Assign New Role</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-[var(--color-brand-primary)] outline-none text-sm font-semibold transition-all cursor-pointer appearance-none"
                >
                  {Object.values(ROLES).map(role => (
                    <option key={role} value={role}>{ROLE_LABELS[role]}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AssignRole;
