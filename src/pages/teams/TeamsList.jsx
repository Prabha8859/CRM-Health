import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Eye, Edit, Trash2, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const TeamsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const teams = [
    { id: 1, name: 'Insurance Ops', lead: 'Rahul', members: 8, dept: 'Insurance', status: 'Active', created: '2023-10-15' },
    { id: 2, name: 'Claims Review', lead: 'Sarah', members: 5, dept: 'Claims', status: 'Active', created: '2023-11-02' },
    { id: 3, name: 'Customer Support', lead: 'Mike', members: 12, dept: 'Support', status: 'Active', created: '2023-09-20' },
    { id: 4, name: 'Sales Alpha', lead: 'Jessica', members: 6, dept: 'Sales', status: 'Inactive', created: '2024-01-10' },
  ];

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.lead.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === 'All' || team.status === activeTab)
  );

  const columns = [
    {
      header: 'Team Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold shadow-sm">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">ID: TM-{row.id}</p>
          </div>
        </div>
      )
    },
    { header: 'Team Lead', accessor: 'lead', render: (row) => (
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200">
                {row.lead.charAt(0)}
            </div>
            <span className="font-medium text-slate-700">{row.lead}</span>
        </div>
    )},
    { header: 'Members', accessor: 'members', className: 'text-center font-bold text-slate-700' },
    { header: 'Department', accessor: 'dept', className: 'text-slate-600' },
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
      render: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <button 
            onClick={() => navigate(`/teams/details/${row.id}`)}
            className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" 
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={() => navigate(`/teams/edit/${row.id}`)}
            className="p-2 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-lg transition-colors" 
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="All Teams"
        subtitle="Manage your organization's teams and groups."
        icon={Users}
        actions={
          <button 
            onClick={() => navigate('/teams/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 font-bold"
          >
            <Plus size={18} />
            <span>Create Team</span>
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
            {['All', 'Active', 'Inactive'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                    {tab} Teams
                </button>
            ))}
        </div>

        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search teams..."
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
        <DataTable columns={columns} data={filteredTeams} />
      </div>
    </div>
  );
};

export default TeamsList;
