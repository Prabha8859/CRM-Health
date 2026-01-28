import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Edit3, Trash2, 
  Users, Shield, X, MoreHorizontal, CheckCircle2, AlertCircle 
} from 'lucide-react';
import RoleForm from '../../components/rolepermison/RoleForm';

const RolesList = () => {
  // Mock Data
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', description: 'Full access to all system features, settings, and user management.', status: 'Active', users: 2 },
    { id: 2, name: 'Sales Manager', description: 'Can manage sales team, view reports, and edit leads.', status: 'Active', users: 8 },
    { id: 3, name: 'Support Staff', description: 'Access to ticketing system and customer database only.', status: 'Active', users: 15 },
    { id: 4, name: 'Intern', description: 'Read-only access to basic modules for training purposes.', status: 'Disabled', users: 0 },
    { id: 5, name: 'Finance Officer', description: 'Manage invoices, payments, and financial reporting.', status: 'Active', users: 4 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Handlers
  const handleCreateClick = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const handleSaveRole = (formData) => {
    if (editingRole) {
      // Update existing
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...formData } : r));
    } else {
      // Create new
      setRoles([...roles, { ...formData, id: Date.now(), users: 0 }]);
    }
    setIsModalOpen(false);
  };

  // Filtering
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || role.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 min-h-screen bg-slate-50 font-sans text-slate-800 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Shield className="text-blue-600" />
            System Roles
          </h1>
          <p className="text-slate-500 mt-1">Manage access levels and permissions for your team.</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          Create New Role
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search roles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <Filter size={16} className="text-slate-500" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm ${role.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                  {role.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{role.name}</h3>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${role.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                    {role.status === 'Active' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    {role.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEditClick(role)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                  title="Edit Role"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteClick(role.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                  title="Delete Role"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
              {role.description}
            </p>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Users size={16} className="text-slate-400" />
                {role.users} Users Assigned
              </div>
              <button className="text-blue-600 font-bold text-xs hover:underline">
                View Permissions
              </button>
            </div>
          </div>
        ))}
        
        {/* Add New Role Card (Empty State) */}
        <button 
          onClick={handleCreateClick}
          className="group flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 min-h-[200px]"
        >
          <div className="w-14 h-14 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-500 shadow-sm transition-colors">
            <Plus size={24} />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-700 group-hover:text-blue-700">Add New Role</p>
            <p className="text-xs text-slate-400 mt-1">Define a new access level</p>
          </div>
        </button>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                {editingRole ? <Edit3 size={20} className="text-blue-600" /> : <Plus size={20} className="text-blue-600" />}
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <RoleForm 
                initialData={editingRole} 
                onSave={handleSaveRole} 
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesList;
