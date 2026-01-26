// Menu configuration with sidebar items and routes
export const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: null,
  },
  {
    key: 'insurance',
    label: 'Insurance',
    path: '/insurance',
    submenu: [
      {
        key: 'insurance-list',
        label: 'All Policies',
        path: '/insurance',
        icon: null,
      },
      {
        key: 'insurance-create',
        label: 'Create Policy',
        path: '/insurance/create',
        icon: null,
      },
    ],
  },
];

// Route configuration
export const routes = [
  {
    path: '/dashboard',
    component: 'DashboardPage',
  },
  {
    path: '/insurance',
    component: 'InsuranceListPage',
  },
  {
    path: '/insurance/create',
    component: 'InsuranceCreatePage',
  },
  {
    path: '/insurance/:id',
    component: 'InsuranceDetailPage',
  },
];
