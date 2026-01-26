import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const InsuranceModal = ({ isOpen, onClose, onSave, plan, mode, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    coverage: '',
    duration: '',
    premium: '',
    status: 'Active'
  });

  useEffect(() => {
    if (plan && (mode === 'edit' || mode === 'view')) {
      setFormData(plan);
    } else {
      setFormData({ name: '', provider: '', coverage: '', duration: '', premium: '', status: 'Active' });
    }
  }, [plan, mode, isOpen]);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const inputClass = `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1bd488] ${
    isDarkMode ? 'bg-[#022c33] border-[#45828b]/30 text-white' : 'bg-white border-gray-300 text-gray-900'
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl ${isDarkMode ? 'bg-[#033840] text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200/10">
          <h2 className="text-xl font-bold">{mode === 'add' ? 'Create New Policy' : mode === 'edit' ? 'Edit Policy' : 'Policy Details'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-500/10 rounded-full"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Policy Name</label>
            <input type="text" className={inputClass} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={isViewMode} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <input type="text" className={inputClass} value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} disabled={isViewMode} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Coverage</label>
              <input type="text" className={inputClass} value={formData.coverage} onChange={e => setFormData({...formData, coverage: e.target.value})} disabled={isViewMode} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input type="text" className={inputClass} value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} disabled={isViewMode} required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Premium</label>
              <input type="text" className={inputClass} value={formData.premium} onChange={e => setFormData({...formData, premium: e.target.value})} placeholder="$0.00/mo" disabled={isViewMode} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className={inputClass} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} disabled={isViewMode}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            {isViewMode ? (
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium">Close</button>
            ) : (
              <>
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#1bd488] hover:bg-[#1bd488]/90 text-[#055b65] font-bold">Save Policy</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsuranceModal;