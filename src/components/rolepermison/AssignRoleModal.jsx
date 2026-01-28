import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const AssignRoleModal = ({ isOpen, onClose, onAssign, staffName, currentRole }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole || 'Staff');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Assign Role</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {staffName?.charAt(0)}
             </div>
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Staff Member</p>
                <p className="text-slate-800 font-bold text-lg">{staffName}</p>
             </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100 -z-10"></div>
            
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 shrink-0 z-10">
                        <span className="text-xs font-bold">FROM</span>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Role</label>
                        <div className="px-4 py-3 bg-slate-100 rounded-xl text-slate-500 font-medium border border-transparent">
                            {currentRole || 'No Role Assigned'}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 shrink-0 z-10 shadow-sm">
                        <span className="text-xs font-bold">TO</span>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">New Role</label>
                        <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-800 cursor-pointer"
                        >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                        <option value="Support">Support</option>
                        </select>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white font-medium transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => onAssign(selectedRole)}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-colors flex items-center gap-2"
          >
            <Check size={18} />
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoleModal;
