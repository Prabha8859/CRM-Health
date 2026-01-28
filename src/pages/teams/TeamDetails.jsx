import React, { useState } from 'react';
import { Users, Calendar, UserCheck, Shield, Plus, MoreVertical, Trash2, Settings, Layout, List, Mail, Phone } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');

  // Mock Data
  const teamInfo = {
    name: 'Insurance Operations',
    lead: 'Rahul Sharma',
    status: 'Active',
    created: 'Oct 15, 2023',
    description: 'Responsible for processing new insurance policies and handling customer queries regarding coverage.'
  };

  const members = [
    { id: 1, name: 'Amit Verma', role: 'Senior Staff', status: 'Active', email: 'amit@crm.com' },
    { id: 2, name: 'Priya Singh', role: 'Staff', status: 'Active', email: 'priya@crm.com' },
    { id: 3, name: 'John Doe', role: 'Intern', status: 'On Leave', email: 'john@crm.com' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Team Details"
        subtitle={`Managing members and settings for ${teamInfo.name}`}
        icon={Users}
        actions={
          <button 
            onClick={() => navigate(`/teams/edit/${id}`)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-colors"
          >
            Edit Team
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
            { id: 'overview', label: 'Overview', icon: Layout },
            { id: 'members', label: 'Members', icon: Users },
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
           <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Team Overview</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team Name</label>
                <p className="text-lg font-bold text-slate-800">{teamInfo.name}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team Lead</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {teamInfo.lead.charAt(0)}
                  </div>
                  <p className="font-medium text-slate-700">{teamInfo.lead}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</label>
                  <span className="block mt-1 px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100 w-fit">
                    {teamInfo.status}
                  </span>
                </div>
                <div className="text-right">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Created</label>
                  <p className="text-sm font-medium text-slate-700 mt-1 flex items-center gap-1 justify-end">
                    <Calendar size={14} /> {teamInfo.created}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{teamInfo.description}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-purple-600" />
              Responsibilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Insurance Processing', 'Claims Review', 'Customer Support'].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <UserCheck size={20} className="text-blue-600" />
              Team Members
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">{members.length}</span>
            </h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-bold">
              <Plus size={16} />
              Add Member
            </button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold">Contact</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {member.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-700">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{member.role}</td>
                    <td className="p-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Mail size={14} /> {member.email}
                        </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        member.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Settings size={48} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">Team Settings</h3>
              <p className="text-slate-500">Configuration options for this team would go here.</p>
          </div>
      )}
    </div>
  );
};

export default TeamDetails;
