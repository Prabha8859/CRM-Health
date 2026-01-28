import React from 'react';
import { Shield, Users, Lock, Key, Activity } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import RoleCard from '../../components/rolepermison/RoleCard';

const RolePermissionDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Role & Permission Dashboard"
        subtitle="Overview of system access control and security."
        icon={Shield}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RoleCard title="Total Roles" value="8" icon={Shield} color="text-blue-600" bg="bg-blue-50" trend="+1 New" trendUp={true} />
        <RoleCard title="Active Roles" value="6" icon={Activity} color="text-green-600" bg="bg-green-50" trend="Stable" trendUp={true} />
        <RoleCard title="Total Permissions" value="42" icon={Key} color="text-purple-600" bg="bg-purple-50" />
        <RoleCard title="Users Assigned" value="150" icon={Users} color="text-orange-600" bg="bg-orange-50" trend="+12" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Shield size={18} />
              </div>
              Recently Created Roles
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Compliance Officer', date: '2 days ago', status: 'Active', users: 3 },
              { name: 'Regional Manager', date: '5 days ago', status: 'Active', users: 12 },
              { name: 'Intern', date: '1 week ago', status: 'Disabled', users: 0 },
            ].map((role, i) => (
              <div key={i} className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-100 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-sm font-bold text-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    {role.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{role.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Created {role.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {role.users} users</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${role.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                  {role.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Lock size={18} />
              </div>
              Recent Permission Updates
            </h3>
            <button className="text-sm text-purple-600 font-medium hover:text-purple-700">View Logs</button>
          </div>
          <div className="relative space-y-0 before:absolute before:inset-y-0 before:left-6 before:w-0.5 before:bg-slate-100">
            {[
              { role: 'Manager', action: 'Added "Delete" to Insurance', time: '2 hours ago', user: 'Admin' },
              { role: 'Staff', action: 'Removed "Edit" from Reports', time: '5 hours ago', user: 'Super Admin' },
              { role: 'Admin', action: 'Full access granted to Finance', time: '1 day ago', user: 'System' },
            ].map((log, i) => (
              <div key={i} className="relative flex items-start gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="relative z-10 w-4 h-4 mt-1 rounded-full bg-purple-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    <span className="font-bold text-purple-700">{log.role}</span>: {log.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">{log.time}</p>
                    <p className="text-xs text-slate-400">by {log.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionDashboard;
