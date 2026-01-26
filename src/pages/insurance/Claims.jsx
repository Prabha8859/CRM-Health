import React, { useState } from 'react';
import { AlertCircle, Search, Filter, CheckCircle2, XCircle, Clock, FileText, Eye } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatsCard from '../../components/common/StatCard';

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <FileText size={20} className="text-[#0077B6]" />
            Recent Claims
          </h2>
          <div className="flex gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search claims..." 
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
        
        <DataTable 
          columns={columns} 
          data={filteredClaims} 
        />
      </div>
    </div>
  );
};

export default Claims;