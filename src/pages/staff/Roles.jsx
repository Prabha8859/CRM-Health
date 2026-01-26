import React from 'react';
import { Shield, Plus, Check } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const Roles = () => {
  const roles = ['Admin', 'Manager', 'HR', 'Support Staff', 'Finance'];
  const permissions = [
    'View Dashboard',
    'Edit Insurance Plans',
    'Approve Claims',
    'Manage Employees',
    'View Reports',
    'Manage Roles',
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Control what users can see and do within the system."
        icon={Shield}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
            <Plus size={18} />
            <span>Create Role</span>
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-lg text-slate-800">Permission Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold sticky left-0 bg-slate-50/50 z-10">Permission</th>
                {roles.map(role => (
                  <th key={role} className="p-4 font-semibold text-center">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map(permission => (
                <tr key={permission} className="hover:bg-slate-50/80">
                  <td className="p-4 font-medium text-slate-700 sticky left-0 bg-white group-hover:bg-slate-50/80 z-10">{permission}</td>
                  {roles.map(role => (
                    <td key={`${permission}-${role}`} className="p-4 text-center">
                      <label className="inline-flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-slate-300 text-[#0077B6] focus:ring-[#0077B6]/50 cursor-pointer peer"
                          // This would be controlled by state in a real app
                          defaultChecked={Math.random() > 0.5}
                        />
                        <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100" />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Roles;