import React from 'react';
import { Mail, Phone, Briefcase, Building2, Calendar, Shield } from 'lucide-react';

const EmployeeProfileCard = ({ employee }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border-4 border-white shadow-lg flex items-center justify-center text-blue-600 text-3xl font-bold mb-4">
          {employee.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{employee.name}</h2>
        <p className="text-slate-500 text-sm font-medium">ID: {employee.id}</p>
        <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${
          employee.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 
          employee.status === 'On Leave' ? 'bg-orange-50 text-orange-600 border-orange-200' :
          'bg-red-50 text-red-600 border-red-200'
        }`}>
          {employee.status}
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
            <Mail size={16} />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
            <p className="text-sm font-medium truncate" title={employee.email}>{employee.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
            <Briefcase size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Role</p>
            <p className="text-sm font-medium">{employee.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
            <Building2 size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Department</p>
            <p className="text-sm font-medium">{employee.department}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
            <Calendar size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Joined</p>
            <p className="text-sm font-medium">{employee.joiningDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileCard;
