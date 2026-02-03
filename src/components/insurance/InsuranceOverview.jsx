import React from 'react';
import { Shield, ShieldCheck, Users, AlertCircle, FileText, TrendingUp, Clock, Plus } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

export default function InsuranceDashboard() {
  const handleAddPlan = () => {
    // Placeholder for create plan logic
    console.log("Create Plan Clicked");
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Policies', value: 1250, color: 'from-[#00B4D8] to-[#0077B6]', icon: FileText, trend: '+12%' },
          { label: 'Active Policies', value: 980, color: 'from-[#90E0EF] to-[#00B4D8]', icon: ShieldCheck, trend: '+5%' },
          { label: 'Expired / Due', value: 270, color: 'from-[#CAF0F8] to-[#90E0EF]', icon: AlertCircle, trend: '-2%' }
        ].map((item, i) => (
          <div key={i} className={`relative bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <item.icon size={32} strokeWidth={2.5} className="opacity-80" />
                <div className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold backdrop-blur-sm">{item.trend}</div>
              </div>
              <div className="text-4xl font-black mb-2">{item.value}</div>
              <div className="text-sm opacity-90 font-medium">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active vs Expired Chart Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Policy Status</h3>
              <p className="text-sm text-slate-500">Overview of active and expired policies</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp size={20} className="text-[#0077B6]" />
            </div>
          </div>

          {/* Custom Chart Visualization */}
          <div className="space-y-8">
            <div className="relative pt-4">
              <div className="flex justify-between mb-2 text-sm font-bold text-slate-700">
                <span>Active Policies (78%)</span>
                <span>980</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] h-3 rounded-full shadow-[0_0_10px_rgba(0,180,216,0.5)]" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between mb-2 text-sm font-bold text-slate-700">
                <span>Expired Policies (22%)</span>
                <span>270</span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.5)]" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <div className="flex-1 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Renewals Due</div>
                  <div className="text-2xl font-black text-[#0077B6]">45</div>
                </div>
                <Clock className="text-blue-200" size={32} />
              </div>
              <div className="flex-1 p-4 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">Critical</div>
                  <div className="text-2xl font-black text-red-500">12</div>
                </div>
                <AlertCircle className="text-red-200" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
            <p className="text-sm text-slate-500">Latest updates from your portfolio</p>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Policy Renewed', desc: 'Health Secure - John Doe', time: '2h ago', icon: Clock },
              { title: 'New Assignment', desc: 'Family Plan - Sarah Smith', time: '4h ago', icon: Users },
              { title: 'Policy Expired', desc: 'Auto Protect - Mike Ross', time: '1d ago', icon: AlertCircle },
              { title: 'Claim Processed', desc: 'Life Guard - #POL8821', time: '2d ago', icon: FileText },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md hover:border-blue-100 border border-transparent transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#0077B6] group-hover:bg-[#0077B6] group-hover:text-white transition-colors duration-300">
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">{item.desc}</p>
                </div>
                <span className="text-xs text-slate-400 font-medium bg-white px-2 py-1 rounded-md border border-slate-100">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}