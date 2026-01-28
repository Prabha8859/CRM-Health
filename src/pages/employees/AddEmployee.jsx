import React from 'react';
import { UserPlus, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../../components/employees/EmployeeForm';

const AddEmployee = () => {
  const navigate = useNavigate();

  const handleSave = (data) => {
    console.log('Employee Added:', data);
    navigate('/employees/list');
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
            <h1 className="text-2xl font-bold text-slate-800">Add New Employee</h1>
            <p className="text-slate-500 text-sm">Onboard a new user to the employee list.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="mb-8 pb-6 border-b border-slate-100 flex items-center gap-3">
             <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <UserPlus size={24} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-slate-800">Employee Details</h2>
                <p className="text-slate-500 text-sm">Enter personal and professional information.</p>
             </div>
          </div>
          
          <EmployeeForm 
            onSave={handleSave} 
            onCancel={() => navigate('/employees/list')}
          />
        </div>

        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                    <Info size={18} />
                    Onboarding Tips
                </h3>
                <ul className="space-y-3">
                    {[
                        'Ensure the email address is unique.',
                        'Assign a temporary password if required.',
                        'Select the correct department for auto-assignment.',
                        'Role determines system access levels.'
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

export default AddEmployee;
