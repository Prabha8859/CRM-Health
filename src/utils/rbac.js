export const ROLES = {
  SUPER_ADMIN: 'superadmin',
  ADMIN: 'admin',
  STAFF: 'staff',
  TEAM: 'team',
  EMPLOYEE: 'employee',
  USER: 'user',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.STAFF]: 'Staff',
  [ROLES.TEAM]: 'Team',
  [ROLES.EMPLOYEE]: 'Employee',
  [ROLES.USER]: 'User',
};

// Define accessible routes/menus for each role
// This is a simplified permission matrix. 
// In a real app, this might be more granular or come from backend.
export const PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['*'], // Access everything
  [ROLES.ADMIN]: [
    '/dashboard', 
    '/staff', 
    '/teams', 
    '/employees', 
    '/insurance', 
    '/rolepermison',
    '/profile',
    '/staff/logs'
  ],
  [ROLES.STAFF]: [
    '/dashboard', 
    '/insurance', 
    '/teams', 
    '/employees',
    '/profile'
  ],
  [ROLES.TEAM]: [
    '/dashboard', 
    '/teams', 
    '/employees',
    '/profile'
  ],
  [ROLES.EMPLOYEE]: [
    '/dashboard', 
    '/employees/activity', 
    '/employees/details',
    '/profile'
  ],
  [ROLES.USER]: [
    '/dashboard', 
    '/health-tests', 
    '/health-packages',
    '/profile'
  ],
};

/**
 * Checks if a role has access to a specific path/key
 * @param {string} role 
 * @param {string} path 
 * @returns {boolean}
 */
export const hasAccess = (role, path) => {
  if (!role) return false;
  if (role === ROLES.SUPER_ADMIN) return true;
  
  // Universal routes
  if (path === '/profile') return true;
  
  const allowed = PERMISSIONS[role];
  if (!allowed) return false;

  // Simple check: if the allowed list contains the base path
  return allowed.some(p => path.startsWith(p));
};

/**
 * Filters menu items based on role
 * @param {Array} menuItems 
 * @param {string} role 
 */
export const filterMenuForRole = (menuItems, role) => {
  if (role === ROLES.SUPER_ADMIN) return menuItems;

  return menuItems.reduce((acc, item) => {
    // Check if the main item is accessible
    if (hasAccess(role, item.path)) {
      const newItem = { ...item };
      
      // If it has a submenu, filter that too
      if (newItem.submenu) {
        newItem.submenu = newItem.submenu.filter(sub => hasAccess(role, sub.path));
      }
      
      acc.push(newItem);
    }
    return acc;
  }, []);
};
