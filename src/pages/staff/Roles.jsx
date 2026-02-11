import React, { useState, useEffect } from 'react';
import { Shield, Plus, Check, Trash2, Edit, Loader2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import { getAllRoles, createRole, updateRole, deleteRole } from './rolesApi';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Permissions List (Static for now as API doesn't provide them)
  const permissions = [
    'View Dashboard',
    'Edit Insurance Plans',
    'Approve Claims',
    'Manage Employees',
    'View Reports',
    'Manage Roles',
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      console.log('Component calling fetchRoles...');
      const data = await rolesApi.getAllRoles();
      console.log('Component received roles data:', data);
      setRoles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch roles. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setRoleName('');
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (role) => {
    setModalMode('edit');
    setRoleName(role.name);
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    try {
      setActionLoading(true);
      if (modalMode === 'create') {
        const newRole = await rolesApi.createRole({ name: roleName });
        // Optimistic update or refetch
        setRoles([...roles, newRole]); 
        // Or refetch if the response structure differs significantly from list item
        fetchRoles();
      } else {
        await rolesApi.updateRole(selectedRole.id, { name: roleName });
        fetchRoles();
      }
      setIsModalOpen(false);
      setRoleName('');
    } catch (err) {
      console.error(err);
      // Ideally show a toast here
      alert(`Failed to ${modalMode} role: ${err.message || 'Unknown error'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRole) return;
    try {
      setActionLoading(true);
      await rolesApi.deleteRole(selectedRole.id);
      fetchRoles();
      setIsDeleteModalOpen(false);
      setSelectedRole(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete role');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading && roles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0077B6]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Control what users can see and do within the system."
        icon={Shield}
        actions={
          <button 
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30"
          >
            <Plus size={18} />
            <span>Create Role</span>
          </button>
        }
      />

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-lg text-slate-800">Permission Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold sticky left-0 bg-slate-50/50 z-10 min-w-[200px]">Permission</th>
                {roles.map(role => (
                  <th key={role.id} className="p-4 font-semibold text-center min-w-[150px] group">
                    <div className="flex flex-col items-center gap-2">
                       <span>{role.name}</span>
                       <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenEditModal(role)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-[#0077B6]"
                            title="Edit Name"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleOpenDeleteModal(role)}
                            className="p-1 hover:bg-red-100 rounded text-slate-500 hover:text-red-500"
                            title="Delete Role"
                          >
                            <Trash2 size={14} />
                          </button>
                       </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map(permission => (
                <tr key={permission} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-medium text-slate-700 sticky left-0 bg-white group-hover:bg-slate-50/80 z-10 border-r border-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                    {permission}
                  </td>
                  {roles.map(role => (
                    <td key={`${permission}-${role.id}`} className="p-4 text-center">
                      <label className="inline-flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-slate-300 text-[#0077B6] focus:ring-[#0077B6]/50 cursor-pointer peer"
                          // Mock state for now
                          defaultChecked={Math.random() > 0.5} 
                          disabled // Disabled for now as API doesn't support assignment
                          title="Permission assignment not yet available via API"
                        />
                        <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Create New Role' : 'Edit Role'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role Name</label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
              placeholder="e.g. Sales Manager"
              autoFocus
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-4 py-2 rounded-xl bg-[#0077B6] text-white hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              {actionLoading && <Loader2 size={16} className="animate-spin" />}
              {modalMode === 'create' ? 'Create Role' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the "${selectedRole?.name}" role? This action cannot be undone.`}
      />
    </div>
  );
};

export default Roles;