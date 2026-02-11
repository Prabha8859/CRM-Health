import React, { useState, useEffect } from 'react';
import { Lock, Save, Info, Loader2, AlertCircle } from 'lucide-react';
import { getAllPermissions, getPermissionsForRole, assignPermissionToRole, removePermissionFromRole } from './permissionsApi';
import { getAllRoles } from '../staff/rolesApi';

const PermissionMatrix = () => {
  const [matrix, setMatrix] = useState({});
  const [initialMatrix, setInitialMatrix] = useState({});
  const [allPermissions, setAllPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [fetchedRoles, fetchedPermissions] = await Promise.all([
          getAllRoles(),
          getAllPermissions(),
        ]);

        const filteredRoles = fetchedRoles.filter(role => role.name.toLowerCase() !== 'superadmin');

        setRoles(filteredRoles);
        setAllPermissions(fetchedPermissions);

        const permissionsByRolePromises = filteredRoles.map(role =>
          getPermissionsForRole(role.id).then(rolePermissions => ({
            roleId: role.id,
            permissions: rolePermissions.map(p => p.id),
          }))
        );

        const permissionsByRole = await Promise.all(permissionsByRolePromises);

        const newMatrix = permissionsByRole.reduce((acc, { roleId, permissions }) => {
          acc[roleId] = permissions;
          return acc;
        }, {});

        setMatrix(newMatrix);
        setInitialMatrix(JSON.parse(JSON.stringify(newMatrix)));
      } catch (err) {
        console.error("Failed to load permission data", err);
        setError(err.message || 'Failed to load permission data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (roleId, permissionId) => {
    setMatrix(prev => {
      const rolePermissions = prev[roleId] || [];
      const hasPermission = rolePermissions.includes(permissionId);

      let newPermissions;
      if (hasPermission) {
        newPermissions = rolePermissions.filter(p => p !== permissionId);
      } else {
        newPermissions = [...rolePermissions, permissionId];
      }

      return {
        ...prev,
        [roleId]: newPermissions
      };
    });
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setError(null);
    try {
      const apiCalls = [];

      for (const role of roles) {
        const roleId = role.id;
        const initialPerms = initialMatrix[roleId] || [];
        const currentPerms = matrix[roleId] || [];

        const added = currentPerms.filter(pId => !initialPerms.includes(pId));
        const removed = initialPerms.filter(pId => !currentPerms.includes(pId));

        added.forEach(permissionId => {
          apiCalls.push(assignPermissionToRole({ role_id: roleId, permission_id: permissionId }));
        });

        removed.forEach(permissionId => {
          apiCalls.push(removePermissionFromRole({ role_id: roleId, permission_id: permissionId }));
        });
      }

      if (apiCalls.length > 0) {
        await Promise.all(apiCalls);
        setInitialMatrix(JSON.parse(JSON.stringify(matrix)));
        alert('Changes saved successfully!');
      } else {
        alert('No changes to save.');
      }

    } catch (err) {
      console.error("Failed to save changes", err);
      setError(err.message || 'Failed to save changes. Please try again.');
      alert('Failed to save changes: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const groupedPermissions = allPermissions.reduce((acc, p) => {
    const type = p.permission_type || 'General';
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ');
    if (!acc[typeLabel]) {
      acc[typeLabel] = [];
    }
    acc[typeLabel].push(p);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-gray-900">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-brand-primary)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-6 md:p-8 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 animate-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2 flex items-center gap-3">
            <Lock className="text-[var(--color-brand-primary)]" size={32} />
            Access Control Matrix
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Configure granular access permissions for each role.</p>
        </div>
        <button
          onClick={handleSaveChanges}
          disabled={saving || loading}
          className="px-6 py-3 bg-[var(--color-brand-primary)] text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                <th className="p-6 text-sm font-extrabold text-gray-400 uppercase tracking-widest pl-8 sticky left-0 bg-gray-50 dark:bg-gray-900 z-20 w-72">
                  Permission / Feature
                </th>
                {roles.map(role => (
                  <th key={role.id} className="p-6 text-center min-w-[140px]">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap
                        ${role.name.toLowerCase() === 'admin' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-100 text-gray-600 border-gray-200'}
                       `}>
                        {role.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {Object.entries(groupedPermissions).map(([type, permissions]) => (
                <React.Fragment key={type}>
                  <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                    <td colSpan={roles.length + 1} className="px-8 py-2 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider sticky left-0 bg-gray-50/50 dark:bg-gray-800/20 z-10">
                      {type}
                    </td>
                  </tr>
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 pl-8 sticky left-0 bg-white dark:bg-gray-800 z-10 font-bold text-gray-700 dark:text-gray-200 border-r border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                          <span className="text-sm">{permission.name.replace(/_/g, ' ')}</span>
                        </div>
                      </td>
                      {roles.map(role => {
                        const isActive = matrix[role.id]?.includes(permission.id);
                        return (
                          <td key={`${role.id}-${permission.id}`} className="p-4 text-center">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleToggle(role.id, permission.id)}
                                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ease-in-out relative ${isActive ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200 dark:bg-gray-700'}`}
                              >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl">
        <Info size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-relaxed">
          <strong>Note:</strong> Super Admin permissions are immutable and grant full system access. Changes made here apply immediately to all users with the assigned role upon their next login or page refresh.
        </p>
      </div>

    </div>
  );
};

export default PermissionMatrix;
