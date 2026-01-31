import React, { useState } from 'react';
import { Building2, Search, Filter, Plus, MoreVertical, Phone, Mail, Globe } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatsCard from '../../components/common/StatCard';
import DataViewToolbar from '../../components/common/DataViewToolbar';

const InsuranceCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

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
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${row.status === 'Active'
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

      <DataViewToolbar
        title="Partner Companies"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded-xl hover:opacity-90 transition-colors shadow-lg shadow-blue-500/30">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Company</span>
          </button>
        }
      />

      {/* Content Section */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden">
          <DataTable columns={columns} data={filteredCompanies} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-slate-500 dark:text-gray-400 font-bold text-xl group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-colors">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-gray-100 text-lg">{company.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-gray-400">
                      <Globe size={12} />
                      <span>Partner</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg text-slate-400 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
                  <Phone size={16} className="text-slate-400" />
                  <span>{company.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
                  <Mail size={16} className="text-slate-400" />
                  <span>{company.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-gray-800">
                <div className="text-center">
                  <p className="text-xs text-slate-500 dark:text-gray-400 uppercase font-semibold">Plans</p>
                  <p className="font-bold text-slate-800 dark:text-gray-100">{company.plans}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${company.status === 'Active'
                  ? 'bg-green-50 dark:bg-green-500/10 text-green-600 border-green-200 dark:border-green-500/20'
                  : 'bg-slate-100 dark:bg-gray-800 text-slate-500 border-slate-200 dark:border-gray-700'
                  }`}>
                  {company.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsuranceCompanies;