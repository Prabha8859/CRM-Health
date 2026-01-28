import React, { useState } from 'react';
import { UserCog, Search, Filter } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import AssignRoleModal from '../../components/rolepermison/AssignRoleModal';

const AssignRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const staffData = [
    { id: 'EMP-001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Manager', department: 'Sales' },
    { id: 'EMP-002', name: 'Bob Smith', email: 'bob@example.com', role: 'Staff', department: 'Support' },
    { id: 'EMP-003', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', department: 'Operations' },
  ];

  const handleAssignClick = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleRoleUpdate = (newRole) => {
    console.log(`Updated ${selectedStaff.name} to ${newRole}`);
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  const columns = [
    {
      header: 'Staff Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Current Role', accessor: 'role', className: 'font-medium text-slate-700' },
    { header: 'Department', accessor: 'department', className: 'text-slate-600' },
    {
      header: 'Actions',
      render: (row) => (
        <button 
          onClick={() => handleAssignClick(row)}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          Change Role
        </button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Role Assignment"
        subtitle="Assign and manage roles for staff members."
        icon={UserCog}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
          <h2 className="font-bold text-lg text-slate-800">Staff List</h2>
          <div className="flex gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={staffData} />
      </div>

      <AssignRoleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAssign={handleRoleUpdate}
        staffName={selectedStaff?.name}
        currentRole={selectedStaff?.role}
      />
    </div>
  );
};

export default AssignRole;
