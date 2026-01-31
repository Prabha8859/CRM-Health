import React, { useState } from 'react';
import { Plus, Shield, Edit, UserPlus, DollarSign, Users, Activity, Clock, TrendingUp, PieChart, BarChart3, CheckCircle2, AlertCircle, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
// import StatsCard from '../../components/common/StatCard'; // Replaced by specific card
import InsuranceStatCard from '../../components/insurance/InsuranceStatCard';
import PolicyClaimsChart from '../../components/insurance/PolicyClaimsChart';
import ClaimsStatsWidget from '../../components/insurance/ClaimsStatsWidget';
import ActivityFeedWidget from '../../components/insurance/ActivityFeedWidget';
import InsurancePlansTable from '../../components/insurance/InsurancePlansTable';
import InsuranceModal from '../../components/insurance/InsuranceModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import Button from '../../components/common/Button';

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
          <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center text-[var(--color-brand-primary)]">
            <Shield size={18} />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-500 dark:text-gray-400">{row.code}</p>
          </div>
        </div>
      )
    },
    { header: 'Provider', accessor: 'provider', className: 'text-slate-600 dark:text-gray-300' },
    { header: 'Coverage', accessor: 'coverage', className: 'font-medium text-slate-800 dark:text-gray-200' },
    { header: 'Premium', accessor: 'premium', className: 'text-slate-600 dark:text-gray-300' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${row.status === 'Active'
          ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20'
          : 'bg-slate-100 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600'
          }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); handleViewPlan(row); }}
            title="View Details"
            icon={Eye}
          />
          <Button
            variant="ghost-brand"
            size="icon"
            onClick={(e) => { e.stopPropagation(); handleAssignPlan(row); }}
            title="Assign Policy"
            icon={UserPlus}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); handleEditPlan(row); }}
            icon={Edit}
          />
          <Button
            variant="ghost-danger"
            size="icon"
            onClick={(e) => { e.stopPropagation(); handleDeletePlan(row.id); }}
            title="Delete Plan"
            icon={Trash2}
          />
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

  // Policy Distribution Donut Chart
  const PolicyDistributionChart = () => (
    <div className="relative flex items-center justify-center py-4">
      <div className="w-48 h-48 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background Circle */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" className="dark:stroke-gray-700" strokeWidth="12" />
          {/* Segments: Health (45%), Family (35%), Critical (20%) */}
          {/* Circumference ~ 251 */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-brand-primary)" strokeWidth="12" strokeDasharray="113 251" strokeDashoffset="0" className="transition-all duration-1000 ease-out" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-brand-secondary)" strokeWidth="12" strokeDasharray="88 251" strokeDashoffset="-113" className="transition-all duration-1000 ease-out" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-brand-light)" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-201" className="transition-all duration-1000 ease-out" />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-800 dark:text-gray-100">1.2k</span>
          <span className="text-[10px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wider">Policies</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 dark:bg-black min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Insurance Overview"
        subtitle="Welcome back. Here's what's happening with your insurance portfolio today."
        icon={Shield}
        actions={
          <div className="flex gap-3">

            <button
              onClick={handleAddPlan}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded-xl hover:opacity-90 transition-colors shadow-lg shadow-blue-500/30"
            >
              <Plus size={18} />
              <span>Create Plan</span>
            </button>
          </div>
        }
      />

      {/* Admin Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <InsuranceStatCard
            title="Total Revenue"
            value="$124,500"
            icon={DollarSign}
            color="text-[var(--color-brand-primary)]"
            trend="+12.5%"
            trendUp={true}
            subtitle="Total Earnings"
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <InsuranceStatCard
            title="Active Policies"
            value="1,234"
            icon={Users}
            color="text-[var(--color-brand-secondary)]"
            trend="Active"
            trendUp={true}
            subtitle="Total Members"
            members={[
              { text: 'JD' }, { text: 'AL' }, { text: 'MP' }, { text: 'SK' }
            ]}
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <InsuranceStatCard
            title="Claims Pending"
            value="45"
            icon={Activity}
            color="text-orange-500"
            trend="2.1%"
            trendUp={false}
            subtitle="Active Claims"
            members={[
              { text: 'JD' }, { text: 'AL' }, { text: 'MP' }, { text: 'SK' }
            ]}
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <InsuranceStatCard
            title="Policies Expired"
            value="12"
            icon={AlertCircle}
            color="text-red-500"
            trend="Expired"
            trendUp={false}
            subtitle="Policies Expired"
          />
        </div>
      </div>

      {/* Row 1: Charts Area - Side by Side (8 cols + 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Policy & Claims Chart (Takes 8 columns or 2/3 width) */}
        <div className="col-span-1 lg:col-span-8">
          <PolicyClaimsChart />
        </div>

        {/* Distribution Chart (Takes 4 columns or 1/3 width) */}
        <div className="col-span-1 lg:col-span-4 bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 mb-2 flex items-center gap-2">
              <PieChart size={22} className="text-[var(--color-brand-primary)]" />
              Policy Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Breakdown by category</p>
          </div>

          <PolicyDistributionChart />

          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            {[
              { label: 'Health', color: 'bg-[var(--color-brand-primary)]' },
              { label: 'Family', color: 'bg-[var(--color-brand-secondary)]' },
              { label: 'Critical', color: 'bg-[var(--color-brand-light)]' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-xs font-bold text-slate-600 dark:text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Claims & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800">
          <h3 className="font-bold text-slate-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-[var(--color-brand-primary)]" />
            Claims Statistics
          </h3>
          <ClaimsStatsWidget />
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800">
          <h3 className="font-bold text-slate-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[var(--color-brand-primary)]" />
            Recent Activity
          </h3>
          <ActivityFeedWidget />
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