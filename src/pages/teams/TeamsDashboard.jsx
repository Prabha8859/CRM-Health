import React from 'react';
import { LayoutDashboard, Users, ArrowRight, TrendingUp, AlertTriangle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import TeamStats from '../../components/teams/TeamStats';

const TeamsDashboard = () => {
  const navigate = useNavigate();

  const recentTeams = [
    { name: 'Claims Review Alpha', lead: 'Sarah Connor', members: 5, date: '2 days ago' },
    { name: 'Sales Force North', lead: 'John Doe', members: 12, date: '5 days ago' },
    { name: 'Tech Support L1', lead: 'Emily Blunt', members: 8, date: '1 week ago' },
  ];

  const workloadData = [
    { team: 'Insurance Ops', load: 85, color: 'bg-blue-500' },
    { team: 'Claims Review', load: 62, color: 'bg-green-500' },
    { team: 'Customer Support', load: 94, color: 'bg-orange-500' },
    { team: 'Sales Alpha', load: 45, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Teams Dashboard"
        subtitle="Overview of all operational teams and staff groups."
        icon={LayoutDashboard}
      />

      <TeamStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users size={18} /></div>
              Recent Teams
            </h3>
            <button 
              onClick={() => navigate('/teams/list')}
              className="text-sm text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {recentTeams.map((team, idx) => (
              <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-blue-50/30 rounded-xl border border-slate-100 hover:border-blue-100 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 font-bold border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                    {team.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{team.name}</p>
                    <p className="text-xs text-slate-500">Lead: {team.lead}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-sm font-bold text-slate-700">
                    <Users size={14} className="text-slate-400" /> {team.members}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{team.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workload Distribution & Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><TrendingUp size={18} /></div>
                Team Workload
             </h3>
             <div className="space-y-4">
                {workloadData.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                            <span>{item.team}</span>
                            <span>{item.load}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.load}%` }}></div>
                        </div>
                    </div>
                ))}
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><AlertTriangle size={18} /></div>
                Action Items
            </h3>
            <div className="space-y-3">
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 flex gap-3 items-start">
                    <div className="mt-0.5 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-orange-900">Empty Teams Detected</p>
                        <p className="text-xs text-orange-700 mt-0.5">2 teams have no members assigned.</p>
                        <button className="mt-2 text-xs font-bold text-orange-700 bg-white px-3 py-1.5 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                        Assign Members
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsDashboard;
