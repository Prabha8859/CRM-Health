import React from 'react';
import { PlusCircle, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleForm from '../../components/rolepermison/RoleForm';

const CreateRole = () => {
  const navigate = useNavigate();

  const handleSave = (data) => {
    console.log('Role Created:', data);
    // In real app, save to API then navigate
    navigate('/rolepermison/matrix');
  };

  const handleCancel = () => {
    navigate('/rolepermison/list');
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      {/* Custom Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button 
            onClick={handleCancel}
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-500 hover:text-slate-700"
        >
            <ArrowLeft size={20} />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Role</h1>
            <p className="text-slate-500 text-sm">Define role details and configure permissions.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/30">1</div>
                <span className="font-bold text-slate-800">Role Details</span>
            </div>
            <div className="w-24 h-0.5 bg-slate-200 mx-4 rounded-full"></div>
            <div className="flex items-center gap-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">2</div>
                <span className="font-medium text-slate-500">Permissions</span>
            </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="mb-8 pb-6 border-b border-slate-100">
             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <PlusCircle size={20} className="text-blue-600" />
                Basic Information
             </h2>
             <p className="text-slate-500 text-sm mt-1">Set the name and description for the new role.</p>
          </div>
          
          <RoleForm onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
