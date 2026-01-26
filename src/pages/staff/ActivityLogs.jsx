import React, { useState } from 'react';
import { Activity, Search, Filter, Clock, ShieldAlert, User } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { id: 1, user: 'Alice Johnson', action: 'Created new policy', module: 'Insurance', time: '10 mins ago', ip: '192.168.1.45' },
    { id: 2, user: 'Bob Smith', action: 'Approved claim #CLM-002', module: 'Claims', time: '1 hour ago', ip: '192.168.1.22' },
    { id: 3, user: 'Charlie Brown', action: 'Updated staff role', module: 'Staff', time: '3 hours ago', ip: '192.168.1.10' },
    { id: 4, user: 'System', action: 'Daily backup completed', module: 'System', time: '5 hours ago', ip: 'localhost' },
  ];

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'User',
      accessor: 'user',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <User size={16} />
          </div>
          <span className="font-medium text-slate-700">{row.user}</span>
        </div>
      )
    },
    { header: 'Action', accessor: 'action', className: 'text-slate-800 font-medium' },
    { 
      header: 'Module', 
      accessor: 'module',
      render: (row) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
          {row.module}
        </span>
      )
    },
    { 
      header: 'Time', 
      accessor: 'time',
      render: (row) => (
        <div className="flex items-center gap-1 text-slate-500 text-sm">
          <Clock size={14} /> {row.time}
        </div>
      )
    },
    { header: 'IP Address', accessor: 'ip', className: 'text-slate-400 text-sm font-mono' }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Activity Logs"
        subtitle="Monitor system activity and user actions."
        icon={Activity}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span>Filter Logs</span>
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <ShieldAlert size={20} className="text-[#0077B6]" />
            Recent Logs
          </h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all" />
          </div>
        </div>
        <DataTable columns={columns} data={filteredLogs} />
      </div>
    </div>
  );
};

export default ActivityLogs;