import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, UserPlus, Mail, Phone, Edit, Trash2, Briefcase, CheckCircle2, XCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import StaffModal from '../../components/staff/StaffModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';

const StaffList = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [modalMode, setModalMode] = useState('add');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const [staffData, setStaffData] = useState([
    { id: 'EMP-001', name: 'Alice Johnson', role: 'Manager', department: 'Sales', status: 'Active', email: 'alice@example.com', phone: '+1 234 567 890' },
    { id: 'EMP-002', name: 'Bob Smith', role: 'Agent', department: 'Support', status: 'On Leave', email: 'bob@example.com', phone: '+1 987 654 321' },
    { id: 'EMP-003', name: 'Charlie Brown', role: 'Admin', department: 'Operations', status: 'Active', email: 'charlie@example.com', phone: '+1 555 666 777' },
    { id: 'EMP-004', name: 'Diana Prince', role: 'Specialist', department: 'Medical', status: 'Inactive', email: 'diana@example.com', phone: '+1 111 222 333' },
  ]);

  useEffect(() => {
    if (location.state?.openAddModal) {
      handleAddStaff();
      // Clear state to prevent reopening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const filteredStaff = staffData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleAddStaff = () => {
    setModalMode('add');
    setSelectedStaff(null);
    setIsModalOpen(true);
  };

  const handleEditStaff = (staff) => {
    setModalMode('edit');
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setStaffToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (staffToDelete) {
      setStaffData(staffData.filter(staff => staff.id !== staffToDelete));
      setDeleteModalOpen(false);
      setStaffToDelete(null);
    }
  };

  const handleSaveStaff = (formData) => {
    if (modalMode === 'add') {
      const newStaff = {
        ...formData,
        id: `EMP-00${staffData.length + 1}`,
      };
      setStaffData([...staffData, newStaff]);
    } else {
      setStaffData(staffData.map(s => s.id === selectedStaff.id ? { ...s, ...formData } : s));
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Employee',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">{row.id}</p>
          </div>
        </div>
      )
    },
    { header: 'Role', accessor: 'role', className: 'text-slate-600' },
    { header: 'Department', accessor: 'department', className: 'text-slate-600' },
    {
      header: 'Contact',
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Mail size={12} /> {row.email}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Phone size={12} /> {row.phone}
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          row.status === 'Active'
            ? 'bg-green-50 text-green-600 border-green-200'
            : row.status === 'On Leave'
            ? 'bg-yellow-50 text-yellow-600 border-yellow-200'
            : 'bg-red-50 text-red-600 border-red-200'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={() => handleEditStaff(row)} className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg transition-colors">
            <Edit size={18} />
          </button>
          <button onClick={() => handleDeleteClick(row.id)} className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors">
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
        title="Staff List"
        subtitle="Manage employees, roles, and permissions."
        icon={Users}
        actions={
          <button onClick={handleAddStaff} className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
            <UserPlus size={18} />
            <span>Add Employee</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard label="Total Employees" value="150" icon={Users} color="text-blue-600" bg="bg-blue-50" trend="+5 New" trendUp={true} />
        <StatsCard label="Active Now" value="120" icon={CheckCircle2} color="text-green-600" bg="bg-green-50" trend="80%" trendUp={true} />
        <StatsCard label="On Leave" value="8" icon={Briefcase} color="text-orange-600" bg="bg-orange-50" trend="5%" trendUp={false} />
        <StatsCard label="Inactive" value="22" icon={XCircle} color="text-red-600" bg="bg-red-50" trend="15%" trendUp={false} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">Employee List</h2>
          <div className="flex items-center gap-3">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Operations">Operations</option>
              <option value="Medical">Medical</option>
            </select>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
              />
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={filteredStaff} />
      </div>

      <StaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveStaff} staff={selectedStaff} mode={modalMode} />

      <DeleteConfirmationModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={confirmDelete} title="Delete Staff Member" message="Are you sure you want to remove this staff member? This action cannot be undone." />
    </div>
  );
};

export default StaffList;