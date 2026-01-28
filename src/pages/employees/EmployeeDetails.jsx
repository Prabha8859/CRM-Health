import React, { useState } from 'react';
import { Users, ArrowLeft, Shield, Briefcase, CheckCircle2, Layout, Settings, FileText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeProfileCard from '../../components/employees/EmployeeProfileCard';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState('Unassigned');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const employee = {
    id: id || 'EMP-001',
    name: 'Alice Johnson',
    email: 'alice@crm.com',
    role: 'Manager',
    department: 'Insurance',
    status: 'Active',
    joiningDate: '2023-01-15'
  };

  const handleAssignTeam = (newTeam) => {
    setTeam(newTeam);
    // API Call would go here
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button 
            onClick={() => navigate('/employees/list')}
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-500 hover:text-slate-700"
        >
            <ArrowLeft size={20} />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Employee Profile</h1>
            <p className="text-slate-500 text-sm">Manage details and assignments for {employee.name}.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
        {[
            { id: 'overview', label: 'Overview', icon: Layout },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings },
        ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
                <tab.icon size={16} />
                {tab.label}
            </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Left Column: Profile */}
        <div>
          <EmployeeProfileCard employee={employee} />
        </div>

        {/* Right Column: Management */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Team Assignment Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Team Assignment
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between mb-6">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Team</p>
                    <p className="text-lg font-bold text-slate-800">{team}</p>
                </div>
                {team !== 'Unassigned' && (
                    <button 
                        onClick={() => handleAssignTeam('Unassigned')}
                        className="text-red-600 text-sm font-bold hover:underline"
                    >
                        Remove
                    </button>
                )}
            </div>
            
            <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Assign to New Team</label>
                <div className="flex gap-3">
                    <select 
                        className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                        onChange={(e) => handleAssignTeam(e.target.value)}
                        value=""
                    >
                        <option value="" disabled>Select a team...</option>
                        <option value="Insurance Ops">Insurance Ops</option>
                        <option value="Sales Force">Sales Force</option>
                        <option value="Customer Support">Customer Support</option>
                    </select>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                        Assign
                    </button>
                </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Shield size={20} className="text-purple-600" />
              Status Management
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Active', 'Inactive', 'On Leave', 'Resigned'].map(status => (
                    <button 
                        key={status}
                        className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                            employee.status === status 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-500'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
          </div>

        </div>
      </div>
      )}

      {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Settings size={48} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">Account Settings</h3>
              <p className="text-slate-500">User account configuration and preferences.</p>
          </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
