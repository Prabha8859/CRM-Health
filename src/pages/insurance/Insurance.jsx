import React, { useState } from 'react';
import { Plus, Shield, Edit, UserPlus, DollarSign, Users, Activity, Clock } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import InsurancePlansTable from '../../components/insurance/InsurancePlansTable';
import InsuranceActivitySidebar from '../../components/insurance/InsuranceActivitySidebar';

const InsuranceDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const [plans] = useState([
    { id: 1, name: 'Gold Health Plan', provider: 'LIC', coverage: '$500,000', duration: '1 Year', status: 'Active', code: 'INS-101', premium: '$250/mo' },
    { id: 2, name: 'Silver Life Cover', provider: 'HDFC', coverage: '$200,000', duration: '2 Years', status: 'Active', code: 'INS-102', premium: '$150/mo' },
    { id: 3, name: 'Basic Medical', provider: 'SBI', coverage: '$100,000', duration: '1 Year', status: 'Inactive', code: 'INS-103', premium: '$80/mo' },
    { id: 4, name: 'Family Shield', provider: 'ICICI', coverage: '$1,000,000', duration: '3 Years', status: 'Active', code: 'INS-104', premium: '$400/mo' },
    { id: 5, name: 'Senior Citizen Care', provider: 'Star Health', coverage: '$300,000', duration: '1 Year', status: 'Active', code: 'INS-105', premium: '$200/mo' },
    { id: 6, name: 'Accident Guard', provider: 'Bajaj Allianz', coverage: '$50,000', duration: '1 Year', status: 'Inactive', code: 'INS-106', premium: '$50/mo' },
    { id: 7, name: 'Child Future Plan', provider: 'LIC', coverage: '$1,500,000', duration: '10 Years', status: 'Active', code: 'INS-107', premium: '$100/mo' },
  ]);

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

  const handleEditPlan = (plan) => {
    setModalMode('edit');
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleAssignPlan = (plan) => {
    setSelectedPlan(plan);
    setIsAssignModalOpen(true);
  };

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader 
        title="Insurance Overview" 
        subtitle="Welcome back. Here's what's happening with your insurance portfolio today."
        icon={Shield}
        actions={
          <div className="flex gap-3">
            <button 
              onClick={() => setIsAssignModalOpen(true)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Plans Table */}
        <InsurancePlansTable 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          columns={columns}
          filteredPlans={filteredPlans}
        />
        
        {/* Right Column: Activity Sidebar */}
        <InsuranceActivitySidebar 
          RevenueChart={RevenueChart} 
          PolicyDistributionChart={PolicyDistributionChart}
          ClaimsOverview={ClaimsOverview}
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Create New Plan' : 'Edit Plan'}
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Plan Name</label>
            <input type="text" defaultValue={selectedPlan?.name} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6]" placeholder="e.g. Gold Health Plan" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Provider</label>
              <input type="text" defaultValue={selectedPlan?.provider} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6]" placeholder="e.g. LIC" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Premium</label>
              <input type="text" defaultValue={selectedPlan?.premium} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6]" placeholder="$0.00" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Coverage Amount</label>
            <input type="text" defaultValue={selectedPlan?.coverage} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6]" placeholder="$0.00" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#023e8a] transition-colors">Save Plan</button>
          </div>
        </form>
      </Modal>

      {/* Assign Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign Policy to Client"
      >
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Selected Plan</p>
            <p className="text-lg font-bold text-blue-900">{selectedPlan?.name}</p>
            <p className="text-sm text-blue-700">{selectedPlan?.coverage} Coverage</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Select Client</label>
            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6]">
              <option>Select a client...</option>
              <option>John Doe</option>
              <option>Sarah Smith</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsAssignModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setIsAssignModalOpen(false)} className="px-6 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#023e8a] transition-colors">Confirm Assignment</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InsuranceDashboard;