import React, { useState } from 'react';
import { Shield, Lock, Save, Share2, Info } from 'lucide-react';
import { ROLES, ROLE_LABELS, PERMISSIONS } from '../../utils/rbac';

const PermissionMatrix = () => {
  // In a real app, this would be state initialized from an API
  // For demo, we'll just use a local copy of the structure
  const [matrix, setMatrix] = useState(() => {
    // Generate a quick matrix map
    // Roles as columns, Modules as rows
    return {
      [ROLES.ADMIN]: PERMISSIONS[ROLES.ADMIN],
      [ROLES.STAFF]: PERMISSIONS[ROLES.STAFF],
      [ROLES.TEAM]: PERMISSIONS[ROLES.TEAM],
      [ROLES.EMPLOYEE]: PERMISSIONS[ROLES.EMPLOYEE],
    };
  });

  const modules = [
    { id: '/dashboard', label: 'Dashboard Access' },
    { id: '/staff', label: 'Staff Management' },
    { id: '/teams', label: 'Team Management' },
    { id: '/employees', label: 'Employee Records' },
    { id: '/insurance', label: 'Insurance Data' },
    { id: '/rolepermison', label: 'Role & Permissions' },
    { id: '/profile', label: 'User Profile' },
    { id: '/staff/logs', label: 'System Logs' },
  ];

  const handleToggle = (role, moduleId) => {
    setMatrix(prev => {
      const rolePermissions = prev[role] || [];
      const hasPermission = rolePermissions.includes(moduleId);
      
      let newPermissions;
      if (hasPermission) {
        newPermissions = rolePermissions.filter(p => p !== moduleId);
      } else {
        newPermissions = [...rolePermissions, moduleId];
      }

      return {
        ...prev,
        [role]: newPermissions
      };
    });
  };

  const hasPermission = (role, moduleId) => {
    return matrix[role]?.some(p => moduleId.startsWith(p)) || false; 
    // Simplified logic for visual demo. Real logic is in rbac.js
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-6 md:p-8 pb-20">
       <div className="flex flex-col md:flex-row items-center justify-between mb-8 animate-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2 flex items-center gap-3">
            <Lock className="text-[var(--color-brand-primary)]" size={32} />
            Access Control Matrix
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Configure granular access permissions for each role.</p>
        </div>
        <button className="px-6 py-3 bg-[var(--color-brand-primary)] text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform flex items-center gap-2">
          <Save size={20} /> Save Changes
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                <th className="p-6 text-sm font-extrabold text-gray-400 uppercase tracking-widest pl-8 sticky left-0 bg-gray-50 dark:bg-gray-900 z-10 w-64">
                    Module / Feature
                </th>
                {Object.keys(matrix).map(role => (
                  <th key={role} className="p-6 text-center min-w-[140px]">
                    <div className="flex flex-col items-center gap-2">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap
                        ${role === ROLES.ADMIN ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-100 text-gray-600 border-gray-200'}
                       `}>
                         {ROLE_LABELS[role]}
                       </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {modules.map((module) => (
                <tr key={module.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-6 pl-8 sticky left-0 bg-white dark:bg-gray-800 z-10 font-bold text-gray-700 dark:text-gray-200 border-r border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                         {module.label}
                    </div>
                  </td>
                  {Object.keys(matrix).map(role => {
                    const isActive = matrix[role]?.includes(module.id);
                    return (
                      <td key={`${role}-${module.id}`} className="p-6 text-center">
                        <div className="flex justify-center">
                            <button 
                                onClick={() => handleToggle(role, module.id)}
                                className={`
                                    w-12 h-6 rounded-full p-1 transition-all duration-300 ease-in-out relative
                                    ${isActive ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200 dark:bg-gray-700'}
                                `}
                            >
                                <div className={`
                                    w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300
                                    ${isActive ? 'translate-x-6' : 'translate-x-0'}
                                `}></div>
                            </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl">
        <Info size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-relaxed">
            <strong>Note:</strong> Super Admin permissions are immutable and grant full system access. Changes made here apply immediately to all users with the assigned role upon their next login or page refresh.
        </p>
      </div>

    </div>
  );
};

export default PermissionMatrix;
