import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const TeamForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    lead: '',
    department: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelClass}>Team Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={inputClass}
            placeholder="e.g. Insurance Operations"
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className={inputClass}
            placeholder="Describe the team's purpose..."
          />
        </div>

        <div>
          <label className={labelClass}>Team Lead</label>
          <select
            value={formData.lead}
            onChange={(e) => setFormData({...formData, lead: e.target.value})}
            className={inputClass}
          >
            <option value="">Select Staff Member</option>
            <option value="Rahul">Rahul (Manager)</option>
            <option value="Sarah">Sarah (Senior)</option>
            <option value="Mike">Mike (Lead)</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Department</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            className={inputClass}
          >
            <option value="">Select Department</option>
            <option value="Insurance">Insurance</option>
            <option value="Claims">Claims</option>
            <option value="Support">Customer Support</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Status</label>
          <div className="flex gap-4">
            {['Active', 'Inactive'].map((status) => (
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

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <X size={18} />
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 font-bold flex items-center gap-2"
        >
          <Save size={18} />
          Save Team
        </button>
      </div>
    </form>
  );
};

export default TeamForm;
