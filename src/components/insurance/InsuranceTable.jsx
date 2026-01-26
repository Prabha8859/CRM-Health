import React from 'react';
import { Edit, UserPlus, Eye } from 'lucide-react';

const InsuranceTable = ({ plans, isDarkMode, onEdit, onAssign, onView }) => {
  return (
    <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-[#022c33] border-[#45828b]/30' : 'bg-white border-gray-200'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className={`${isDarkMode ? 'bg-[#033840] text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
            <tr>
              <th className="px-6 py-4 font-semibold">Plan Name</th>
              <th className="px-6 py-4 font-semibold">Provider</th>
              <th className="px-6 py-4 font-semibold">Coverage</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-[#45828b]/20 text-gray-300' : 'divide-gray-100 text-gray-700'}`}>
            {plans.map((plan) => (
              <tr key={plan.id} className={`transition-colors ${isDarkMode ? 'hover:bg-[#033840]/50' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4 font-medium">{plan.name}</td>
                <td className="px-6 py-4">{plan.provider}</td>
                <td className="px-6 py-4">{plan.coverage}</td>
                <td className="px-6 py-4">{plan.duration}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    plan.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {plan.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onAssign(plan)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Assign">
                      <UserPlus size={16} />
                    </button>
                    <button onClick={() => onEdit(plan)} className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceTable;