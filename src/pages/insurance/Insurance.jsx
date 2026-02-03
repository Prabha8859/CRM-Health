import React, { useState } from 'react';
import { Plus, Shield, Edit, UserPlus, DollarSign, Users, Activity, Clock, PieChart, BarChart3, AlertCircle, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import InsuranceStatCard from '../../components/insurance/InsuranceStatCard';
import PolicyClaimsChart from '../../components/insurance/PolicyClaimsChart';
import ClaimsStatsWidget from '../../components/insurance/ClaimsStatsWidget';
import ActivityFeedWidget from '../../components/insurance/ActivityFeedWidget';
import InsurancePlansTable from '../../components/insurance/InsurancePlansTable';
import InsuranceModal from '../../components/insurance/InsuranceModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import Button from '../../components/common/Button';
import useInsurancePlans from '../../hooks/useInsurancePlans';
import PolicyStatusWidget from '../../components/insurance/PolicyStatusWidget';
import QuickActionsWidget from '../../components/insurance/QuickActionsWidget';
import TopPerformingPlans from '../../components/insurance/TopPerformingPlans';
import UpcomingRenewals from '../../components/insurance/UpcomingRenewals';
import RevenueAnalytics from '../../components/insurance/RevenueAnalytics';

const InsuranceDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const {
    filteredPlans,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortConfig,
    handleSort,
    addPlan,
    updatePlan,
    deletePlan
  } = useInsurancePlans();

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan) => {
    setModalMode('edit');
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (plan) => {
    setModalMode('view');
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleAssignPlan = (plan) => {
    navigate('/insurance/assign', { state: { plan } });
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      deletePlan(planToDelete);
      setDeleteModalOpen(false);
      setPlanToDelete(null);
    }
  };

  const handleSavePlan = (formData) => {
    if (modalMode === 'add') {
      addPlan(formData);
    } else {
      updatePlan({ ...selectedPlan, ...formData });
    }
    setIsModalOpen(false);
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
            onClick={(e) => { e.stopPropagation(); handleOpenViewModal(row); }}
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
            onClick={(e) => { e.stopPropagation(); handleOpenEditModal(row); }}
            icon={Edit}
          />
          <Button
            variant="ghost-danger"
            size="icon"
            onClick={(e) => { e.stopPropagation(); setPlanToDelete(row.id); setDeleteModalOpen(true); }}
            title="Delete Plan"
            icon={Trash2}
          />
        </div>
      ),
      className: 'text-right'
    }
  ];

  // Policy Distribution Donut Chart
  const PolicyDistributionChart = () => (
    <div className="relative flex items-center justify-center py-4">
      <div className="w-48 h-48 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" className="dark:stroke-gray-700" strokeWidth="12" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-brand-primary)" strokeWidth="12" strokeDasharray="113 251" strokeDashoffset="0" className="transition-all duration-1000 ease-out" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-brand-secondary)" strokeWidth="12" strokeDasharray="88 251" strokeDashoffset="-113" className="transition-all duration-1000 ease-out" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-brand-light)" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-201" className="transition-all duration-1000 ease-out" />
        </svg>
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
              onClick={handleOpenAddModal}
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
            variant="primary"
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
            variant="success"
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
            variant="warning"
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
            variant="danger"
            trend="Expired"
            trendUp={false}
            subtitle="Policies Expired"
          />
        </div>
      </div>

      {/* Row 1: Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Policy & Claims Chart - Takes 8 columns */}
        <div className="col-span-1 lg:col-span-8">
          <PolicyClaimsChart />
        </div>

        {/* Policy Distribution - Takes 4 columns */}
        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-gray-800 flex flex-col h-full">
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
      </div>

      {/* Row 2: Policy Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <PolicyStatusWidget />
        </div>
        <div className="col-span-1">
          <QuickActionsWidget />
        </div>
      </div>

      {/* Row 3: Revenue Analytics & Top Performing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueAnalytics />
        <TopPerformingPlans />
      </div>

      {/* Row 4: Upcoming Renewals */}
      <div className="grid grid-cols-1 gap-6">
        <UpcomingRenewals />
      </div>

      {/* Row 5: Claims & Recent Activity */}
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
        onConfirm={handleConfirmDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this insurance plan? This action cannot be undone."
      />
    </div>
  );
};

export default InsuranceDashboard;