import React from 'react';
import { FileText, Search, Filter, MoreVertical, Download, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';

const InsuranceList = () => {
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

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      
      <PageHeader 
        title="All Policies" 
        subtitle="Manage and track all insurance policies across the system."
        icon={ShieldCheck}
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
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

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">Policy List</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search policies..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Policy ID</th>
                <th className="p-4 font-semibold">Holder Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {policies.map((policy, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-4 font-medium text-[#0077B6]">{policy.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                        {policy.holder.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-700">{policy.holder}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{policy.type}</td>
                  <td className="p-4 font-medium text-slate-800">{policy.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{policy.date}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceList;