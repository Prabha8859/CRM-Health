import React from 'react';
import { LayoutDashboard, Users, ArrowRight, PieChart, TrendingUp, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import EmployeeStats from '../../components/employees/EmployeeStats';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const recentEmployees = [
    { name: 'Alice Johnson', role: 'Manager', team: 'Insurance Ops', status: 'Active' },
    { name: 'Bob Smith', role: 'Staff', team: 'Sales', status: 'Active' },
    { name: 'Charlie Brown', role: 'Intern', team: 'Unassigned', status: 'Inactive' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Employee Dashboard"
        subtitle="Overview of workforce health and distribution."
        icon={LayoutDashboard}
      />

      <EmployeeStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Employees */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users size={18} /></div>
              Recently Added Employees
            </h3>
            <button 
              onClick={() => navigate('/employees/list')}
              className="text-sm text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {recentEmployees.map((emp, idx) => (
              <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-blue-50/30 rounded-xl border border-slate-100 hover:border-blue-100 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 font-bold border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{emp.name}</p>
                    <p className="text-xs text-slate-500">{emp.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    emp.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {emp.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{emp.team}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Chart Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><PieChart size={18} /></div>
            Role Distribution
          </h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border-[24px] border-slate-50 border-t-blue-500 border-r-purple-500 border-b-green-500 relative shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-black text-slate-800">124</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Staff</span>
                </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex justify-between text-sm items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Staff</span>
                <span className="font-bold text-slate-600">60%</span>
            </div>
            <div className="flex justify-between text-sm items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Managers</span>
                <span className="font-bold text-slate-600">25%</span>
            </div>
            <div className="flex justify-between text-sm items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Admins</span>
                <span className="font-bold text-slate-600">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
