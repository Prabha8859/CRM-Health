import React, { useState } from 'react';
import { Plus, Shield, Edit, UserPlus, DollarSign, Users, Activity, Clock, TrendingUp, PieChart, BarChart3, CheckCircle2, AlertCircle, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';
import InsurancePlansTable from '../../components/insurance/InsurancePlansTable';
import InsuranceModal from '../../components/insurance/InsuranceModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';

const InsuranceDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Mock Data
  const [plans, setPlans] = useState([
    { id: 1, name: 'Gold Health Plan', provider: 'LIC', coverage: '$500,000', duration: '1 Year', status: 'Active', code: 'INS-101', premium: '$250/mo' },
    { id: 2, name: 'Silver Life Cover', provider: 'HDFC', coverage: '$200,000', duration: '2 Years', status: 'Active', code: 'INS-102', premium: '$150/mo' },
    { id: 3, name: 'Basic Medical', provider: 'SBI', coverage: '$100,000', duration: '1 Year', status: 'Inactive', code: 'INS-103', premium: '$80/mo' },
    { id: 4, name: 'Family Shield', provider: 'ICICI', coverage: '$1,000,000', duration: '3 Years', status: 'Active', code: 'INS-104', premium: '$400/mo' },
    { id: 5, name: 'Senior Citizen Care', provider: 'Star Health', coverage: '$300,000', duration: '1 Year', status: 'Active', code: 'INS-105', premium: '$200/mo' },
    { id: 6, name: 'Accident Guard', provider: 'Bajaj Allianz', coverage: '$50,000', duration: '1 Year', status: 'Inactive', code: 'INS-106', premium: '$50/mo' },
    { id: 7, name: 'Child Future Plan', provider: 'LIC', coverage: '$1,500,000', duration: '10 Years', status: 'Active', code: 'INS-107', premium: '$100/mo' },
  ]);

  const handleDeletePlan = (id) => {
    setPlanToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter(plan => plan.id !== planToDelete));
      setDeleteModalOpen(false);
      setPlanToDelete(null);
    }
  };

  // Table Columns
  const columns = [
    {
      header: 'Plan Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0077B6]">
            <Shield size={18} />
          </div>
          <div>
            <p className="font-medium text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">{row.code}</p>
          </div>
        </div>
      )
    },
    { header: 'Provider', accessor: 'provider', className: 'text-slate-600' },
    { header: 'Coverage', accessor: 'coverage', className: 'font-medium text-slate-800' },
    { header: 'Premium', accessor: 'premium', className: 'text-slate-600' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
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
            onClick={(e) => { e.stopPropagation(); handleViewPlan(row); }}
            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-[#0077B6] rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleAssignPlan(row); }}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            title="Assign Policy"
          >
            <UserPlus size={18} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleEditPlan(row); }}
            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleDeletePlan(row.id); }}
            className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors"
            title="Delete Plan"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  const handleAddPlan = () => {
    setModalMode('add');
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleViewPlan = (plan) => {
    setModalMode('view');
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan) => {
    setModalMode('edit');
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleAssignPlan = (plan) => {
    navigate('/insurance/assign', { state: { plan } });
  };

  const handleSort = (value) => {
    if (!value) {
      setSortConfig({ key: '', direction: '' });
      return;
    }
    const [key, direction] = value.split('-');
    setSortConfig({ key, direction });
  };

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const getValue = (item, key) => {
      let val = item[key];
      if (typeof val === 'string') {
        // Remove currency symbols and commas for numbers
        if (val.includes('$')) {
          return parseFloat(val.replace(/[^0-9.-]+/g, ''));
        }
      }
      return val;
    };

    const aVal = getValue(a, sortConfig.key);
    const bVal = getValue(b, sortConfig.key);

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSavePlan = (formData) => {
    if (modalMode === 'add') {
      const newPlan = {
        ...formData,
        id: plans.length + 1,
        code: `INS-${100 + plans.length + 1}`
      };
      setPlans([...plans, newPlan]);
    } else {
      setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...formData } : p));
    }
    setIsModalOpen(false);
  };

  // Simple SVG Chart Component
  const RevenueChart = () => {
    const data = [30, 45, 35, 55, 48, 65, 60, 80, 75, 90, 85, 100];
    // const max = 100;
    const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - val}`).join(' ');
    
    return (
      <div className="h-64 w-full relative overflow-hidden">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0077B6" stopOpacity="0.3"/><stop offset="100%" stopColor="#0077B6" stopOpacity="0"/></linearGradient>
          </defs>
          <path d={`M0,100 ${points} L100,100 Z`} fill="url(#chartGradient)" />
          <polyline points={points} fill="none" stroke="#0077B6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    );
  };

  // Policy Distribution Donut Chart
  const PolicyDistributionChart = () => (
    <div className="relative flex items-center justify-center py-4">
      <div className="w-48 h-48 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background Circle */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
          {/* Segments: Health (45%), Family (35%), Critical (20%) */}
          {/* Circumference ~ 251 */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0077B6" strokeWidth="12" strokeDasharray="113 251" strokeDashoffset="0" className="transition-all duration-1000 ease-out" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00B4D8" strokeWidth="12" strokeDasharray="88 251" strokeDashoffset="-113" className="transition-all duration-1000 ease-out" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#90E0EF" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-201" className="transition-all duration-1000 ease-out" />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-800">1.2k</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Policies</span>
        </div>
      </div>
    </div>
  );

  // Claims Overview Widget
  const ClaimsOverview = () => (
    <div className="space-y-5">
      {[
        { label: 'Approved', value: '75%', color: 'bg-green-500', count: '892' },
        { label: 'Pending Review', value: '15%', color: 'bg-orange-500', count: '145' },
        { label: 'Rejected', value: '10%', color: 'bg-red-500', count: '84' },
      ].map((item, index) => (
        <div key={index} className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">{item.label}</span>
            <span className="text-slate-800 font-bold">{item.count}</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.value }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Recent Activity Component
  const RecentActivity = () => {
    const activities = [
      { title: 'New Health Policy', desc: 'Comprehensive Care for Patient #402', time: '10 mins ago', icon: UserPlus, color: 'bg-blue-500' },
      { title: 'Claim Processed', desc: 'Surgery Claim #CLM-882 Approved', time: '45 mins ago', icon: CheckCircle2, color: 'bg-green-500' },
      { title: 'Premium Adjustment', desc: 'Family Floater Plan rates updated', time: '3 hours ago', icon: Edit, color: 'bg-orange-500' },
      { title: 'Critical Illness Claim', desc: 'New claim filed for Cardiac Care', time: 'Yesterday', icon: AlertCircle, color: 'bg-red-500' },
    ];

    return (
      <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {activities.map((item, index) => (
          <div key={index} className="relative pl-8">
            <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${item.color}`}></div>
            <div>
              <p className="text-sm font-bold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium flex items-center gap-1">
                <Clock size={10} /> {item.time}
              </p>
            </div>
          </div>
        ))}
        <button className="w-full mt-6 py-2 text-sm text-[#0077B6] font-medium hover:bg-blue-50 rounded-xl transition-colors">
          View All Activity
        </button>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader 
        title="Insurance Overview" 
        subtitle="Welcome back. Here's what's happening with your insurance portfolio today."
        icon={Shield}
        actions={
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/insurance/assign')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <UserPlus size={18} />
              <span>Assign Policy</span>
            </button>
            <button 
              onClick={handleAddPlan}
              className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30"
            >
              <Plus size={18} />
              <span>Create Plan</span>
            </button>
          </div>
        }
      />

      {/* Admin Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Revenue" value="$124,500" icon={DollarSign} color="text-[#0077B6]" bg="bg-blue-50" trend="12.5%" trendUp={true} />
        <StatsCard label="Active Policies" value="1,234" icon={Users} color="text-[#00B4D8]" bg="bg-cyan-50" trend="5.2%" trendUp={true} />
        <StatsCard label="Claims Pending" value="45" icon={Activity} color="text-orange-500" bg="bg-orange-50" trend="2.1%" trendUp={false} />
        <StatsCard label="Renewals Due" value="89" icon={Clock} color="text-purple-500" bg="bg-purple-50" trend="Due Soon" trendUp={true} />
      </div>

      {/* Row 1: Revenue & Policy Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#0077B6]" />
            Revenue Growth
          </h3>
          <RevenueChart />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
            <PieChart size={20} className="text-[#0077B6]" />
            Policy Distribution
          </h3>
          <PolicyDistributionChart />
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            {[
              { label: 'Health', color: 'bg-[#0077B6]' },
              { label: 'Family', color: 'bg-[#00B4D8]' },
              { label: 'Critical', color: 'bg-[#90E0EF]' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Claims & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-[#0077B6]" />
            Claims Statistics
          </h3>
          <ClaimsOverview />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[#0077B6]" />
            Recent Activity
          </h3>
          <RecentActivity />
        </div>
      </div>

      {/* Plans Table Section */}
      <div className="mt-6">
        <InsurancePlansTable 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          columns={columns}
          filteredPlans={filteredPlans}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>

      {/* Create/Edit Modal */}
      <InsuranceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePlan}
        plan={selectedPlan}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this insurance plan? This action cannot be undone."
      />
    </div>
  );
};

export default InsuranceDashboard;