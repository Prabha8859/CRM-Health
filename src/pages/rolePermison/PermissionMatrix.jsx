import React from 'react';
import { Settings, Save } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import PermissionTable from '../../components/rolepermison/PermissionTable';

const PermissionMatrix = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Permission Matrix"
        subtitle="Configure module-level permissions for roles."
        icon={Settings}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">Editing Permissions for:</label>
            <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>Manager</option>
              <option>Staff</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
        <PermissionTable />
      </div>
    </div>
  );
};

export default PermissionMatrix;
