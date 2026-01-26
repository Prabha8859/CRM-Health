import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, Activity, UserPlus, CheckCircle2, Edit, AlertCircle, Clock, PieChart, BarChart3 } from 'lucide-react';

const InsuranceActivitySidebar = ({ RevenueChart, PolicyDistributionChart, ClaimsOverview }) => {
  const activities = [
    { title: 'New Health Policy', desc: 'Comprehensive Care for Patient #402', time: '10 mins ago', icon: UserPlus, color: 'bg-blue-500' },
    { title: 'Claim Processed', desc: 'Surgery Claim #CLM-882 Approved', time: '45 mins ago', icon: CheckCircle2, color: 'bg-green-500' },
    { title: 'Premium Adjustment', desc: 'Family Floater Plan rates updated', time: '3 hours ago', icon: Edit, color: 'bg-orange-500' },
    { title: 'Critical Illness Claim', desc: 'New claim filed for Cardiac Care', time: 'Yesterday', icon: AlertCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Chart Widget */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-[#0077B6]" />
          Revenue Growth
        </h3>
        <RevenueChart />
      </div>

      {/* Policy Distribution Widget */}
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

      {/* Claims Overview Widget */}
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
        </div>
        <button className="w-full mt-6 py-2 text-sm text-[#0077B6] font-medium hover:bg-blue-50 rounded-xl transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

InsuranceActivitySidebar.propTypes = {
  RevenueChart: PropTypes.elementType.isRequired,
  PolicyDistributionChart: PropTypes.elementType.isRequired,
  ClaimsOverview: PropTypes.elementType.isRequired,
};

export default InsuranceActivitySidebar;