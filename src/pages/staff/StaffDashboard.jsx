import React from 'react';
import { Users, UserPlus, CheckCircle2, Briefcase, XCircle, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';
import StaffChart from '../../components/staff/StaffChart';
import RecentActivity from '../../components/staff/RecentActivity';

const StaffDashboard = () => {
  const navigate = useNavigate();

// Internal components moved to src/components/staff/


  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Staff Overview"
        subtitle="A quick snapshot of your entire staff system."
        icon={Users}
        actions={
          <button 
            onClick={() => navigate('/staff/list', { state: { openAddModal: true } })}
            className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30"
          >
            <UserPlus size={18} />
            <span>Add Employee</span>  
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Staff" value="150" icon={Users} color="text-blue-600" bg="bg-blue-50" trend="+5 New" trendUp={true} />
        <StatsCard label="Active Staff" value="120" icon={CheckCircle2} color="text-green-600" bg="bg-green-50" trend="80%" trendUp={true} />
        <StatsCard label="On Leave" value="8" icon={Briefcase} color="text-orange-600" bg="bg-orange-50" trend="5%" trendUp={false} />
        <StatsCard label="Inactive" value="22" icon={XCircle} color="text-red-600" bg="bg-red-50" trend="15%" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#0077B6]" />
            Staff Joining Trend
          </h3>
          <StaffChart />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[#0077B6]" />
            Recent Activity
          </h3>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;