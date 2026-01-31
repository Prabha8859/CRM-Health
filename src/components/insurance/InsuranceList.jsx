import React from 'react';
import { FileText, Search, Filter, MoreVertical, Download, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';
import AssignPolicyModal from '../../components/insurance/AssignPolicyModal';
import DataViewToolbar from '../../components/common/DataViewToolbar';
import DataTable from '../../components/common/DataTable';
import { useState } from 'react';

const InsuranceList = () => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [searchTerm, setSearchTerm] = useState('');

  const policies = [
    { id: 'POL-001', holder: 'John Doe', type: 'Health Premium', amount: '$5,000', status: 'Active', date: '2024-01-15' },
    { id: 'POL-002', holder: 'Sarah Smith', type: 'Family Shield', amount: '$12,000', status: 'Pending', date: '2024-01-18' },
    { id: 'POL-003', holder: 'Mike Johnson', type: 'Critical Care', amount: '$8,500', status: 'Expired', date: '2023-12-10' },
    { id: 'POL-004', holder: 'Emily Davis', type: 'Health Premium', amount: '$5,000', status: 'Active', date: '2024-01-20' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Expired': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const columns = [
    {
      header: 'Policy ID',
      accessor: 'id',
      render: (row) => <span className="font-bold text-[var(--color-brand-primary)]">{row.id}</span>
    },
    {
      header: 'Holder Name',
      accessor: 'holder',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[var(--color-brand-primary)] font-bold text-xs ring-2 ring-white dark:ring-gray-800">
            {row.holder.charAt(0)}
          </div>
          <span className="font-semibold text-slate-700 dark:text-gray-200">{row.holder}</span>
        </div>
      )
    },
    { header: 'Type', accessor: 'type', className: 'text-slate-600 dark:text-gray-400' },
    { header: 'Amount', accessor: 'amount', className: 'font-medium text-slate-800 dark:text-gray-200' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Date', accessor: 'date', className: 'text-slate-500 dark:text-gray-500 text-sm' },
    {
      header: 'Actions',
      render: () => (
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700/50 rounded-lg text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors">
          <MoreVertical size={18} />
        </button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">

      <PageHeader
        title="All Policies"
        subtitle="Manage and track all insurance policies across the system."
        icon={ShieldCheck}
        actions={
          <>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded-xl hover:opacity-90 transition-colors shadow-lg shadow-blue-500/30"
            >
              <ShieldCheck size={18} />
              <span>Assign Policy</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
              <Download size={18} />
              <span>Export</span>
            </button>
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Policies" value="1,234" icon={FileText} color="text-blue-600" bg="bg-blue-50" />
        <StatsCard label="Active Now" value="892" icon={CheckCircle2} color="text-green-600" bg="bg-green-50" />
        <StatsCard label="Pending Review" value="56" icon={AlertCircle} color="text-orange-600" bg="bg-orange-50" />
      </div>

      <DataViewToolbar
        title="Policy List"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        actions={
          <>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded-xl hover:opacity-90 transition-colors shadow-lg shadow-blue-500/30"
            >
              <ShieldCheck size={18} />
              <span className="hidden sm:inline">Assign Policy</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </>
        }
      />

      {/* Content Section */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden">
          <DataTable columns={columns} data={policies} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[var(--color-brand-primary)] font-bold text-lg">
                    {policy.holder.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-gray-100">{policy.holder}</h3>
                    <span className="text-sm text-slate-500 dark:text-gray-400">{policy.id}</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg text-slate-400 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-gray-400">Type</span>
                  <span className="font-medium text-slate-700 dark:text-gray-300">{policy.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-gray-400">Amount</span>
                  <span className="font-medium text-slate-700 dark:text-gray-300">{policy.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-gray-400">Date</span>
                  <span className="font-medium text-slate-700 dark:text-gray-300">{policy.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-gray-800">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(policy.status)}`}>
                  {policy.status}
                </span>
                <button className="text-sm font-medium text-[var(--color-brand-primary)] hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AssignPolicyModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      />
    </div>
  );
};

export default InsuranceList;