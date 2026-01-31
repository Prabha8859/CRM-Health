import React, { useState } from 'react';
import { AlertCircle, Search, Filter, CheckCircle2, XCircle, Clock, FileText, Eye } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatsCard from '../../components/common/StatCard';
import DataViewToolbar from '../../components/common/DataViewToolbar';

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const claims = [
    { id: 'CLM-2024-001', policyHolder: 'John Doe', type: 'Accident', amount: '$2,500', date: '2024-01-20', status: 'Pending' },
    { id: 'CLM-2024-002', policyHolder: 'Sarah Smith', type: 'Medical', amount: '$1,200', date: '2024-01-18', status: 'Approved' },
    { id: 'CLM-2024-003', policyHolder: 'Mike Johnson', type: 'Theft', amount: '$5,000', date: '2024-01-15', status: 'Rejected' },
    { id: 'CLM-2024-004', policyHolder: 'Emily Davis', type: 'Medical', amount: '$800', date: '2024-01-22', status: 'Pending' },
  ];

  const columns = [
    {
      header: 'Claim ID',
      accessor: 'id',
      render: (row) => <span className="font-medium text-[#0077B6]">{row.id}</span>
    },
    { header: 'Policy Holder', accessor: 'policyHolder', className: 'font-medium text-slate-800' },
    { header: 'Type', accessor: 'type', className: 'text-slate-600' },
    { header: 'Amount', accessor: 'amount', className: 'font-bold text-slate-700' },
    { header: 'Date', accessor: 'date', className: 'text-slate-500 text-sm' },
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
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[row.status] || styles.Pending}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      render: () => (
        <button className="p-2 hover:bg-slate-100 text-slate-500 hover:text-[#0077B6] rounded-lg transition-colors">
          <Eye size={18} />
        </button>
      ),
      className: 'text-right'
    }
  ];

  const filteredClaims = claims.filter(claim =>
    claim.policyHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Claims Management"
        subtitle="Review and process insurance claims."
        icon={AlertCircle}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Pending Claims" value="12" icon={Clock} color="text-orange-500" bg="bg-orange-50" trend="4 New" trendUp={true} />
        <StatsCard label="Approved (This Month)" value="45" icon={CheckCircle2} color="text-green-500" bg="bg-green-50" trend="12%" trendUp={true} />
        <StatsCard label="Rejected" value="3" icon={XCircle} color="text-red-500" bg="bg-red-50" trend="2%" trendUp={false} />
      </div>

      <DataViewToolbar
        title="Recent Claims"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder="Search claims..."
      />

      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden">
          <DataTable columns={columns} data={filteredClaims} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredClaims.map((claim) => (
            <div key={claim.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-bold bg-blue-50 text-[var(--color-brand-primary)]`}>
                    {claim.id}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-gray-100 mt-2">{claim.policyHolder}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${claim.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' :
                    claim.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                      'bg-orange-50 text-orange-600 border-orange-200'
                  }`}>
                  {claim.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Type</p>
                  <p className="font-medium text-slate-700 dark:text-gray-300">{claim.type}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Amount</p>
                  <p className="font-bold text-slate-800 dark:text-gray-100">{claim.amount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={16} />
                  {claim.date}
                </div>
                <button className="text-sm font-medium text-[var(--color-brand-primary)] hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Claims;