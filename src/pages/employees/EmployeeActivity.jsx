import React, { useState } from 'react';
import { Activity, Clock, Search, Filter, Download, FileText, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatsCard from '../../components/common/StatCard';

const EmployeeActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const activities = [
    { id: 1, employee: 'Alice Johnson', action: 'Updated profile picture', time: '2 hours ago', type: 'info' },
    { id: 2, employee: 'Bob Smith', action: 'Changed status to On Leave', time: '5 hours ago', type: 'warning' },
    { id: 3, employee: 'Admin', action: 'Assigned Charlie to Sales Team', time: '1 day ago', type: 'success' },
    { id: 4, employee: 'System', action: 'Automated payroll processed', time: '2 days ago', type: 'info' },
  ];

  const filteredActivities = activities.filter(act => 
    act.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
        header: 'Employee / User', 
        accessor: 'employee', 
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                    row.type === 'success' ? 'bg-green-500' :
                    row.type === 'warning' ? 'bg-orange-500' :
                    'bg-blue-500'
                }`} />
                <span className="font-bold text-slate-700">{row.employee}</span>
            </div>
        )
    },
    { header: 'Action', accessor: 'action', className: 'text-slate-600 font-medium' },
    { 
      header: 'Timestamp', 
      accessor: 'time',
      render: (row) => (
        <div className="flex items-center gap-1 text-slate-400 text-xs font-medium bg-slate-50 px-2 py-1 rounded-lg w-fit">
          <Clock size={12} /> {row.time}
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Employee Activity"
        subtitle="Audit log of employee changes and updates."
        icon={Activity}
        actions={
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-medium shadow-sm">
                <Download size={18} />
                <span>Export Log</span>
            </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Events" value="1,240" icon={Activity} color="text-blue-600" bg="bg-blue-50" trend="+45 today" trendUp={true} />
        <StatsCard label="Profile Updates" value="12" icon={FileText} color="text-purple-600" bg="bg-purple-50" />
        <StatsCard label="Alerts" value="3" icon={AlertCircle} color="text-orange-600" bg="bg-orange-50" trend="Low" trendUp={true} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Clock size={20} className="text-blue-600" />
            Activity Log
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full sm:w-64"
                />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-medium">
                <Filter size={18} />
                <span>Filter</span>
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredActivities} />
      </div>
    </div>
  );
};

export default EmployeeActivity;
