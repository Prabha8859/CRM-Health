import React, { useState } from 'react';
import { Save, Shield, FileText, Activity } from 'lucide-react';

const RoleForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Shield size={16} className="text-blue-600" />
            Role Name
          </label>
          <div className="relative">
            <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                placeholder="e.g. Senior Manager"
            />
          </div>
          <p className="text-xs text-slate-500">Choose a unique and descriptive name for this role.</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <FileText size={16} className="text-blue-600" />
            Description
          </label>
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none"
            placeholder="Describe the responsibilities and access levels of this role..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Activity size={16} className="text-blue-600" />
            Status
          </label>
          <div className="flex gap-4">
            {['Active', 'Disabled'].map((status) => (
                <label key={status} className={`
                    flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.status === status 
                        ? 'border-blue-500 bg-blue-50/50 text-blue-700' 
                        : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                    }
                `}>
                    <input 
                        type="radio" 
                        name="status" 
                        value={status} 
                        checked={formData.status === status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="hidden"
                    />
                    <span className="font-bold">{status}</span>
                </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 font-medium"
        >
          <Save size={18} />
          <span>Save & Continue</span>
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
