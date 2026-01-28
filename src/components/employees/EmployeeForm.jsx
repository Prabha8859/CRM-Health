import React, { useState } from 'react';
import { Save, X, User, Mail, Phone, Briefcase, Building2, Calendar } from 'lucide-react';

const EmployeeForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    joiningDate: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className={labelClass}>Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={inputClass}
              placeholder="e.g. John Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={inputClass}
              placeholder="john@company.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={inputClass}
              placeholder="+1 234 567 890"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className={labelClass}>Role</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className={inputClass}
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className={labelClass}>Department</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className={inputClass}
            >
              <option value="">Select Department</option>
              <option value="Insurance">Insurance</option>
              <option value="Sales">Sales</option>
              <option value="IT">IT & Support</option>
              <option value="HR">Human Resources</option>
            </select>
          </div>
        </div>

        {/* Joining Date */}
        <div>
          <label className={labelClass}>Joining Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
              className={inputClass}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>
          <div className="flex gap-2">
            {['Active', 'Inactive'].map((status) => (
              <label key={status} className={`
                flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all
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
                <span className="font-bold text-sm">{status}</span>
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
          Save Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
