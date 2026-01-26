import React, { useState } from 'react';
import { Building2, Search, Plus, Users, Briefcase } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    { id: 'DEP-001', name: 'Human Resources', head: 'Sarah Connor', staff: 12, status: 'Active' },
    { id: 'DEP-002', name: 'IT & Support', head: 'John Connor', staff: 25, status: 'Active' },
    { id: 'DEP-003', name: 'Sales & Marketing', head: 'Kyle Reese', staff: 40, status: 'Active' },
    { id: 'DEP-004', name: 'Finance', head: 'T-800', staff: 8, status: 'Active' },
  ];

  const filteredDepartments = departments.filter(dep =>
    dep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dep.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Department Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0077B6]">
            <Building2 size={20} />
          </div>
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">{row.id}</p>
          </div>
        </div>
      )
    },
    { header: 'Department Head', accessor: 'head', className: 'text-slate-600 font-medium' },
    { header: 'Total Staff', accessor: 'staff', className: 'text-center font-bold text-slate-700' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-200">
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Departments"
        subtitle="Manage company departments and structure."
        icon={Building2}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
            <Plus size={18} />
            <span>Add Department</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Departments" value="8" icon={Building2} color="text-blue-600" bg="bg-blue-50" />
        <StatsCard label="Total Staff" value="150" icon={Users} color="text-green-600" bg="bg-green-50" />
        <StatsCard label="Open Positions" value="12" icon={Briefcase} color="text-purple-600" bg="bg-purple-50" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">Department List</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
            />
          </div>
        </div>
        <DataTable columns={columns} data={filteredDepartments} />
      </div>
    </div>
  );
};

export default Departments;