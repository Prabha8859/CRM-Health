import React, { useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, Search, Filter, MoreVertical } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import StatsCard from '../common/StatCard';
import DataTable from '../common/DataTable';

const LeaveRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const requests = [
    { id: 'LR-001', employee: 'Alice Johnson', type: 'Sick Leave', startDate: '2024-02-10', endDate: '2024-02-12', status: 'Pending', reason: 'Flu' },
    { id: 'LR-002', employee: 'Bob Smith', type: 'Vacation', startDate: '2024-03-01', endDate: '2024-03-05', status: 'Approved', reason: 'Family Trip' },
    { id: 'LR-003', employee: 'Charlie Brown', type: 'Personal', startDate: '2024-01-20', endDate: '2024-01-20', status: 'Rejected', reason: 'Urgent Work' },
  ];

  const filteredRequests = requests.filter(req =>
    req.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Employee',
      accessor: 'employee',
      render: (row) => (
        <div className="font-medium text-slate-800">{row.employee}</div>
      )
    },
    { header: 'Type', accessor: 'type', className: 'text-slate-600' },
    {
      header: 'Duration',
      render: (row) => (
        <div className="text-sm text-slate-600">
          {row.startDate} to {row.endDate}
        </div>
      )
    },
    { header: 'Reason', accessor: 'reason', className: 'text-slate-500 italic' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const styles = {
          Pending: 'bg-orange-50 text-orange-600 border-orange-200',
          Approved: 'bg-green-50 text-green-600 border-green-200',
          Rejected: 'bg-red-50 text-red-600 border-red-200'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[row.status]}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      render: () => (
        <button className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg transition-colors">
          <MoreVertical size={18} />
        </button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Leave Requests"
        subtitle="Manage employee time-off and leave applications."
        icon={Calendar}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Pending Requests" value="5" icon={Clock} color="text-orange-600" bg="bg-orange-50" />
        <StatsCard label="Approved (This Month)" value="12" icon={CheckCircle2} color="text-green-600" bg="bg-green-50" />
        <StatsCard label="Rejected" value="2" icon={XCircle} color="text-red-600" bg="bg-red-50" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">Recent Requests</h2>
          <div className="flex gap-3">
             <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredRequests} />
      </div>
    </div>
  );
};

export default LeaveRequests;