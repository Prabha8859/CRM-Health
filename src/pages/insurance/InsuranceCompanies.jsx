import React, { useState } from 'react';
import { Building2, Search, Filter, Plus, MoreVertical, Phone, Mail, Globe } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatsCard from '../../components/common/StatCard';

const InsuranceCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const companies = [
    { id: 1, name: 'LIC', contact: '+91 98765 43210', email: 'support@lic.india', status: 'Active', created: '2023-01-15', plans: 12 },
    { id: 2, name: 'HDFC Ergo', contact: '+91 98765 12345', email: 'contact@hdfcergo.com', status: 'Active', created: '2023-03-20', plans: 8 },
    { id: 3, name: 'Star Health', contact: '+91 98765 67890', email: 'info@starhealth.in', status: 'Inactive', created: '2023-06-10', plans: 5 },
    { id: 4, name: 'Bajaj Allianz', contact: '+91 98765 98765', email: 'help@bajajallianz.co.in', status: 'Active', created: '2023-08-05', plans: 15 },
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Company Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <Globe size={10} />
              <span>Partner</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      header: 'Contact Info', 
      accessor: 'contact',
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={14} /> {row.contact}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Mail size={14} /> {row.email}
          </div>
        </div>
      )
    },
    { header: 'Total Plans', accessor: 'plans', className: 'text-center font-medium text-slate-700' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          row.status === 'Active' 
            ? 'bg-green-50 text-green-600 border-green-200' 
            : 'bg-slate-100 text-slate-500 border-slate-200'
        }`}>
          {row.status}
        </span>
      )
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
        title="Insurance Companies" 
        subtitle="Manage partner insurance providers and their details."
        icon={Building2}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
            <Plus size={18} />
            <span>Add Company</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Partners" value="12" icon={Building2} color="text-blue-600" bg="bg-blue-50" />
        <StatsCard label="Active Companies" value="10" icon={Building2} color="text-green-600" bg="bg-green-50" />
        <StatsCard label="Total Plans" value="156" icon={Filter} color="text-purple-600" bg="bg-purple-50" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">Partner Companies</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search companies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
            />
          </div>
        </div>
        <DataTable columns={columns} data={filteredCompanies} />
      </div>
    </div>
  );
};

export default InsuranceCompanies;