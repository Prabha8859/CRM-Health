import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const employees = [
    { id: 'EMP-001', name: 'Alice Johnson', email: 'alice@crm.com', role: 'Manager', team: 'Insurance Ops', status: 'Active', joined: '2023-01-15' },
    { id: 'EMP-002', name: 'Bob Smith', email: 'bob@crm.com', role: 'Staff', team: 'Sales', status: 'Active', joined: '2023-03-10' },
    { id: 'EMP-003', name: 'Charlie Brown', email: 'charlie@crm.com', role: 'Intern', team: 'Unassigned', status: 'Inactive', joined: '2024-01-05' },
    { id: 'EMP-004', name: 'Diana Prince', email: 'diana@crm.com', role: 'Staff', team: 'Support', status: 'On Leave', joined: '2023-06-20' },
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeTab === 'All' || emp.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: 'Employee',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shadow-sm">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">{row.id}</p>
          </div>
        </div>
      )
    },
    { header: 'Email', accessor: 'email', className: 'text-slate-600' },
    { header: 'Role', accessor: 'role', className: 'font-medium text-slate-700' },
    { 
      header: 'Team', 
      accessor: 'team',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${row.team === 'Unassigned' ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>
            {row.team}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          row.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 
          row.status === 'On Leave' ? 'bg-orange-50 text-orange-600 border-orange-200' :
          'bg-slate-100 text-slate-500 border-slate-200'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <button 
            onClick={() => navigate(`/employees/details/${row.id}`)}
            className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" 
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button className="p-2 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-lg transition-colors" title="Edit">
            <Edit size={18} />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="All Employees"
        subtitle="Manage your organization's workforce."
        icon={Users}
        actions={
          <button 
            onClick={() => navigate('/employees/add')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 font-bold"
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
            {['All', 'Active', 'Inactive', 'On Leave'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredEmployees} />
      </div>
    </div>
  );
};

export default EmployeeList;
