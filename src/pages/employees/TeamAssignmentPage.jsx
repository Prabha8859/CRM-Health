import React from 'react';
import { Users, ArrowRight, UserPlus, Briefcase } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const TeamAssignmentPage = () => {
  const unassignedEmployees = [
    { id: 1, name: 'Charlie Brown', role: 'Intern' },
    { id: 2, name: 'David Lee', role: 'Staff' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Team Assignments"
        subtitle="Manage team allocations and unassigned staff."
        icon={Users}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unassigned List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg text-slate-800 mb-4 text-orange-600">Unassigned Employees</h3>
            <div className="space-y-3">
                {unassignedEmployees.map(emp => (
                    <div key={emp.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <div>
                            <p className="font-bold text-slate-800">{emp.name}</p>
                            <p className="text-xs text-slate-500">{emp.role}</p>
                        </div>
                        <button className="text-sm font-bold text-blue-600 hover:underline">Assign</button>
                    </div>
                ))}
            </div>
        </div>

        {/* Quick Assign Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Quick Assignment</h3>
            <p className="text-slate-500 text-sm mb-4">Select an employee and a team to create an assignment.</p>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Employee</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <option>Select Employee...</option>
                        <option>Charlie Brown</option>
                        <option>David Lee</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <ArrowRight className="text-slate-300 rotate-90 lg:rotate-0" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Target Team</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <option>Select Team...</option>
                        <option>Insurance Ops</option>
                        <option>Sales</option>
                    </select>
                </div>
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors">
                    Confirm Assignment
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAssignmentPage;
