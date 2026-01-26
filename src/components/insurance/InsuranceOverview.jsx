import { ShieldCheck, Users, AlertCircle, FileText, TrendingUp, Clock } from 'lucide-react';

export default function InsuranceDashboard() {
  return (
    <div className="p-6 h-full">
      <div className="bg-white rounded-3xl shadow-2xl p-8 h-full border-2 border-[#90E0EF]/20 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-[#03045E] mb-2">Insurance Overview 👋</h2>
            <p className="text-[#0077B6] text-lg">Manage your policies and assignments</p>
          </div>
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
            <ShieldCheck size={20} />
            + New Policy
          </button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <div className="bg-gradient-to-br from-[#f8fcfd] to-white rounded-2xl p-6 border-2 border-[#90E0EF]/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-[#03045E]">Policy Status</h3>
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp size={20} className="text-[#0077B6]" />
              </div>
            </div>
            
            {/* Custom Chart Visualization */}
            <div className="space-y-6">
              <div className="relative pt-4">
                <div className="flex justify-between mb-2 text-sm font-bold text-[#03045E]">
                  <span>Active Policies (78%)</span>
                  <span>980</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] h-4 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between mb-2 text-sm font-bold text-[#03045E]">
                  <span>Expired Policies (22%)</span>
                  <span>270</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-400 to-red-600 h-4 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <div className="flex-1 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="text-xs text-gray-500 font-bold uppercase">Renewals Due</div>
                  <div className="text-2xl font-black text-[#0077B6]">45</div>
                </div>
                <div className="flex-1 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="text-xs text-gray-500 font-bold uppercase">Critical</div>
                  <div className="text-2xl font-black text-red-500">12</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-gradient-to-br from-[#f8fcfd] to-white rounded-2xl p-6 border-2 border-[#90E0EF]/20 shadow-lg">
            <h3 className="text-xl font-black text-[#03045E] mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { title: 'Policy Renewed', desc: 'Health Secure - John Doe', time: '2h ago', icon: Clock },
                { title: 'New Assignment', desc: 'Family Plan - Sarah Smith', time: '4h ago', icon: Users },
                { title: 'Policy Expired', desc: 'Auto Protect - Mike Ross', time: '1d ago', icon: AlertCircle },
                { title: 'Claim Processed', desc: 'Life Guard - #POL8821', time: '2d ago', icon: FileText },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-[#CAF0F8]/30 hover:to-transparent transition-all duration-300 border border-[#90E0EF]/20 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center text-white font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#03045E]">{item.title}</p>
                    <p className="text-sm text-[#0077B6]">{item.desc}</p>
                  </div>
                  <span className="text-xs text-[#00B4D8] font-semibold">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}