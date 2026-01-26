import React, { useState } from 'react';
import { RefreshCw, Search, Filter, Mail, Phone, Calendar, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatsCard from '../../components/common/StatCard';

const Renewals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const renewals = [
    { id: 'POL-003', holder: 'Mike Johnson', plan: 'Critical Care', expiry: '2024-02-10', amount: '$8,500', status: 'Due Soon' },
    { id: 'POL-005', holder: 'Alice Brown', plan: 'Family Shield', expiry: '2024-02-15', amount: '$12,000', status: 'Due Soon' },
    { id: 'POL-008', holder: 'Robert Wilson', plan: 'Health Premium', expiry: '2024-01-30', amount: '$5,000', status: 'Overdue' },
  ];

  const filteredRenewals = renewals.filter(renewal => 
    renewal.holder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    renewal.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
      header: 'Policy ID', 
      accessor: 'id',
      render: (row) => <span className="font-medium text-[#0077B6]">{row.id}</span>
    },
    { header: 'Policy Holder', accessor: 'holder', className: 'font-medium text-slate-800' },
    { header: 'Plan', accessor: 'plan', className: 'text-slate-600' },
    { header: 'Expiry Date', accessor: 'expiry', className: 'text-slate-500' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          row.status === 'Overdue' 
            ? 'bg-red-50 text-red-600 border-red-200' 
            : 'bg-yellow-50 text-yellow-600 border-yellow-200'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-2 justify-end">
          <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Send Reminder">
            <Mail size={18} />
          </button>
          <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors" title="Call Client">
            <Phone size={18} />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader 
        title="Policy Renewals" 
        subtitle="Track and manage upcoming policy expirations."
        icon={RefreshCw}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Due This Month" value="89" icon={Calendar} color="text-blue-600" bg="bg-blue-50" trend="12 Upcoming" trendUp={true} />
        <StatsCard label="Overdue" value="15" icon={AlertTriangle} color="text-red-600" bg="bg-red-50" trend="Action Required" trendUp={false} />
        <StatsCard label="Renewed (YTD)" value="450" icon={RefreshCw} color="text-green-600" bg="bg-green-50" trend="92% Rate" trendUp={true} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">Upcoming Expirations</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search renewals..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
            />
          </div>
        </div>
        
        <DataTable 
          columns={columns} 
          data={filteredRenewals} 
        />
      </div>
    </div>
  );
};

export default Renewals;