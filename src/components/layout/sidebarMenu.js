import {
    LayoutDashboard,
    UserCog,
    Shield,
    Users,
    ShieldCheck,
    Gift,
    TestTube,
    Package,
    ClipboardList,
    FileText,
    FilePlus,
    List,
    PlusCircle,
    Settings,
    Activity,
    RefreshCw,
    AlertCircle,
    Building2,
    BarChart3,
    UserCog as UserCogIcon,
    Briefcase
} from 'lucide-react';

export const menuItems = [
    {
        category: 'OVERVIEW',
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]'
    },
    {
        category: 'INSURANCE MANAGEMENT',
        title: 'Insurance',
        icon: ShieldCheck,
        path: '/insurance',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Overview', path: '/insurance', icon: LayoutDashboard },
            { title: 'All Policies', path: '/insurance/list', icon: FileText },
            { title: 'Companies', path: '/insurance/companies', icon: Building2 },
            { title: 'Claims', path: '/insurance/claims', icon: AlertCircle },
            { title: 'Renewals', path: '/insurance/renewals', icon: RefreshCw },
            { title: 'Reports', path: '/insurance/reports', icon: BarChart3 }
        ]
    },
    {
        category: 'STAFF & ADMINISTRATION',
        title: 'Staff Management',
        icon: UserCog,
        path: '/staff',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Dashboard', path: '/staff', icon: LayoutDashboard },
            { title: 'Staff List', path: '/staff/list', icon: Users },
            { title: 'Roles & Permissions', path: '/staff/roles', icon: Shield },
            { title: 'Departments', path: '/staff/departments', icon: Building2 },
            { title: 'Activity Logs', path: '/staff/logs', icon: Activity },
        ]
    },
    {
        category: 'SETTINGS',
        title: 'Role & Permission',
        icon: Shield,
        path: '/rolepermison',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Role Dashboard', path: '/rolepermison', icon: LayoutDashboard },
            { title: 'Roles List', path: '/rolepermison/list', icon: List },
            { title: 'Create / Edit Role', path: '/rolepermison/create', icon: PlusCircle },
            { title: 'Permission Matrix', path: '/rolepermison/matrix', icon: Settings },
            { title: 'Role Assignment', path: '/rolepermison/assign', icon: UserCogIcon }
        ]
    },
    {
        category: 'ORGANIZATIONAL STRUCTURE',
        title: 'Teams',
        icon: Users,
        path: '/teams',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Teams Dashboard', path: '/teams', icon: LayoutDashboard },
            { title: 'All Teams', path: '/teams/list', icon: List },
            { title: 'Create Team', path: '/teams/create', icon: PlusCircle },
            { title: 'Team Activity', path: '/teams/activity', icon: Activity }
        ]
    },
    {
        title: 'Employees',
        icon: Briefcase,
        path: '/employees',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Employee Dashboard', path: '/employees', icon: LayoutDashboard },
            { title: 'All Employees', path: '/employees/list', icon: List },
            { title: 'Add Employee', path: '/employees/add', icon: PlusCircle },
            { title: 'Team Assignment', path: '/employees/assignments', icon: Users },
            { title: 'Employee Activity', path: '/employees/activity', icon: Activity }
        ]
    },
    {
        category: 'HEALTH MANAGEMENT',
        title: 'Health Tests',
        icon: TestTube,
        path: '/health-tests',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Test List', path: '/health-tests/list', icon: List },
            { title: 'Assign Test', path: '/health-tests/assign', icon: Activity }
        ]
    },
    {
        title: 'Health Packages',
        icon: Package,
        path: '/health-packages',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Package List', path: '/health-packages/list', icon: List },
            { title: 'Manage Tests', path: '/health-packages/manage', icon: Settings },
            { title: 'Assign Package', path: '/health-packages/assign', icon: PlusCircle }
        ]
    },
    {
        title: 'Assignments',
        icon: ClipboardList,
        path: '/assignments',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]'
    },
    {
        category: 'PROMOTIONS',
        title: 'Offers',
        icon: Gift,
        path: '/offers',
        gradient: 'from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]',
        submenu: [
            { title: 'Offers List', path: '/offers/list', icon: List },
            { title: 'Assigned Offers', path: '/offers/assigned', icon: FileText }
        ]
    }
];
