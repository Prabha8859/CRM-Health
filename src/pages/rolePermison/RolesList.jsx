import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit3, Trash2, 
  Users, Shield, Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react';
import RoleForm from '../../components/rolepermison/RoleForm';
import { getAllRoles, createRole, updateRole, deleteRole } from '../staff/rolesApi'; // Named exports
import Modal from '../../components/common/Modal'; // Reusable Modal
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal'; // Reusable Delete Modal

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [roleToDelete, setRoleToDelete] = useState(null); // Role selected for deletion
  
  const [editingRole, setEditingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      console.log('RolesList: Fetching roles...');
      const data = await getAllRoles(); // Use named export
      console.log('RolesList: Received roles:', data);
      
      const mappedRoles = data.map(role => ({
        ...role,
        description: role.description || 'No description available',
        status: role.status || 'Active',
        users: role.users || 0
      }));
      
      setRoles(mappedRoles);
      setError(null);
    } catch (err) {
      console.error('RolesList: Error fetching roles', err);
      setError('Failed to load roles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleCreateClick = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;
    
    try {
      console.log('RolesList: Deleting role', roleToDelete.id);
      await deleteRole(roleToDelete.id); // Use named export
      setRoles(roles.filter(r => r.id !== roleToDelete.id));
      console.log('RolesList: Role deleted successfully');
      setIsDeleteModalOpen(false);
      setRoleToDelete(null);
    } catch (err) {
      console.error('RolesList: Error deleting role', err);
      alert('Failed to delete role');
    }
  };

  const handleSaveRole = async (formData) => {
    try {
      setActionLoading(true);
      console.log('RolesList: Saving role', formData);
      
      if (editingRole) {
        // Update existing
        const updatedRole = await updateRole(editingRole.id, { name: formData.name }); // Use named export
        console.log('RolesList: Role updated', updatedRole);
        fetchRoles(); 
      } else {
        // Create new
        const newRole = await createRole({ name: formData.name }); // Use named export
        console.log('RolesList: Role created', newRole);
        fetchRoles();
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('RolesList: Error saving role', err);
      alert('Failed to save role: ' + (err.message || 'Unknown error'));
    } finally {
      setActionLoading(false);
    }
  };

  // Filtering
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          role.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || role.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading && roles.length === 0) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
    );
  }

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

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
        </div>
      )}

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
                  {role.name ? role.name.charAt(0) : '?'}
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
                  onClick={() => handleDeleteClick(role)}
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

      {/* Main Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRole ? 'Edit Role' : 'Create New Role'}
        maxWidth="max-w-lg"
      >
        {actionLoading ? (
            <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        ) : (
            <RoleForm 
                initialData={editingRole} 
                onSave={handleSaveRole} 
                onCancel={() => setIsModalOpen(false)}
            />
        )}
      </Modal>

      {/* Reusable Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
            setIsDeleteModalOpen(false);
            setRoleToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the "${roleToDelete?.name}" role? This action cannot be undone.`}
      />
    </div>
  );
};

export default RolesList;
