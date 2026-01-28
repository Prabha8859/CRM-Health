import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const PermissionTable = () => {
  const modules = ['Dashboard', 'Insurance', 'Staff', 'Reports', 'Settings', 'Finance'];
  const actions = ['View', 'Create', 'Edit', 'Delete'];
  
  // Mock initial state
  const [permissions, setPermissions] = useState(
    modules.reduce((acc, module) => ({
      ...acc,
      [module]: actions.reduce((actAcc, action) => ({ ...actAcc, [action]: false }), {})
    }), {})
  );

  // Calculate if all permissions are selected
  const allSelected = modules.every(module => 
    actions.every(action => permissions[module][action])
  );

  const toggleAll = () => {
    const newState = !allSelected;
    const newPermissions = {};
    modules.forEach(module => {
      newPermissions[module] = {};
      actions.forEach(action => {
        newPermissions[module][action] = newState;
      });
    });
    setPermissions(newPermissions);
  };

  const togglePermission = (module, action) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action]
      }
    }));
  };

  return (
    <div className="overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200">
            <th className="p-4 font-bold text-slate-700 text-sm w-1/3">
              <div className="flex items-center gap-3">
                <div className="relative group">
                    <input 
                    type="checkbox" 
                    checked={allSelected}
                    onChange={toggleAll}
                    className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-300 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                    />
                    <Check size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                </div>
                <span>Module Name</span>
              </div>
            </th>
            {actions.map(action => (
              <th key={action} className="p-4 font-bold text-slate-700 text-sm text-center uppercase tracking-wider text-xs">{action}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {modules.map((module, idx) => (
            <tr key={module} className={`hover:bg-blue-50/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
              <td className="p-4">
                  <div className="font-bold text-slate-700">{module}</div>
                  <div className="text-xs text-slate-400 font-medium">Access control for {module.toLowerCase()}</div>
              </td>
              {actions.map(action => (
                <td key={`${module}-${action}`} className="p-4 text-center">
                  <button
                    onClick={() => togglePermission(module, action)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20
                      ${permissions[module][action] ? 'bg-blue-600' : 'bg-slate-200'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm
                        ${permissions[module][action] ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionTable;
