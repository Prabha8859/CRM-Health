import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const StaffModal = ({ isOpen, onClose, onSave, staff, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Doctor',
    department: '',
    status: 'Active'
  });

  useEffect(() => {
    if (staff && mode === 'edit') {
      setFormData(staff);
    } else {
      setFormData({ name: '', email: '', phone: '', role: 'Doctor', department: '', status: 'Active' });
    }
  }, [staff, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">{mode === 'add' ? 'Add New Staff' : 'Edit Staff Member'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" className={inputClass} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="e.g. Dr. John Doe" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className={inputClass} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="john@hospital.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input type="tel" className={inputClass} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required placeholder="+1 234 567 8900" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <select className={inputClass} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Admin">Admin</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <input type="text" className={inputClass} value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required placeholder="e.g. Cardiology" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-[#0077B6] hover:bg-[#023e8a] text-white font-bold shadow-lg shadow-blue-500/30 transition-colors">Save Staff</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;