import React from 'react';
import { Users, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TeamForm from '../../components/teams/TeamForm';

const CreateTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const handleSave = (data) => {
    console.log('Team Saved:', data);
    navigate('/teams/list');
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button 
            onClick={() => navigate('/teams/list')}
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-500 hover:text-slate-700"
        >
            <ArrowLeft size={20} />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-slate-800">{isEditMode ? 'Edit Team' : 'Create New Team'}</h1>
            <p className="text-slate-500 text-sm">Fill in the details to {isEditMode ? 'update the' : 'create a'} team.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="mb-8 pb-6 border-b border-slate-100 flex items-center gap-3">
             <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Users size={24} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-slate-800">Team Information</h2>
                <p className="text-slate-500 text-sm">Basic details and leadership assignment.</p>
             </div>
          </div>
          
          <TeamForm 
            onSave={handleSave} 
            onCancel={() => navigate('/teams/list')}
            initialData={isEditMode ? { name: 'Insurance Ops', lead: 'Rahul', department: 'Insurance', status: 'Active' } : null}
          />
        </div>

        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                    <Info size={18} />
                    Tips for Teams
                </h3>
                <ul className="space-y-3">
                    {[
                        'Choose a clear, descriptive name.',
                        'Assign a Team Lead who has management permissions.',
                        'Ensure the department matches the team\'s function.',
                        'You can add members after creating the team.'
                    ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 opacity-70" />
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
