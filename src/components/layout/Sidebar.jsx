import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCog, 
  Shield, 
  Users, 
  Stethoscope, 
  ShieldCheck, 
  Gift, 
  TestTube, 
  Package, 
  ChevronDown, 
  ChevronRight, 
  Box, 
  ChevronLeft, 
  LogOut,
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
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (title) => {
    if (isCollapsed) setIsCollapsed(false);
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const menuItems = [
    {
      category: 'OVERVIEW',
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      gradient: 'from-[#03045E] to-[#0077B6]'
    },
    {
      category: 'INSURANCE MANAGEMENT',
      title: 'Insurance',
      icon: ShieldCheck,
      path: '/insurance',
      gradient: 'from-[#0077B6] to-[#00B4D8]',
      submenu: [
        { title: 'Overview', path: '/insurance', icon: LayoutDashboard },
        { title: 'All Policies', path: '/insurance/list', icon: FileText },
        { title: 'Assign Policy', path: '/insurance/assign', icon: FilePlus },
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
      path: '/staff', // Main path for the dashboard
      gradient: 'from-[#00B4D8] to-[#90E0EF]',
      submenu: [
        { title: 'Dashboard', path: '/staff', icon: LayoutDashboard },
        { title: 'Staff List', path: '/staff/list', icon: Users },
        { title: 'Roles & Permissions', path: '/staff/roles', icon: Shield },
        { title: 'Departments', path: '/staff/departments', icon: Building2 },
        { title: 'Activity Logs', path: '/staff/logs', icon: Activity },
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: Shield, // This seems like a duplicate, consider removing if Staff submenu is preferred
      path: '/roles',
      gradient: 'from-[#00B4D8] to-[#90E0EF]',
      submenu: [
        { title: 'Roles List', path: '/roles/list', icon: List },
        { title: 'Create Role', path: '/roles/create', icon: PlusCircle },
        { title: 'Permissions', path: '/roles/permissions', icon: Settings }
      ]
    },
    {
      title: 'Teams',
      icon: Users,
      path: '/teams',
      gradient: 'from-[#90E0EF] to-[#CAF0F8]',
      submenu: [
        { title: 'Team List', path: '/teams/list', icon: List },
        { title: 'Team Details', path: '/teams/details', icon: FileText }
      ]
    },
    {
      title: 'Employees',
      icon: Stethoscope,
      path: '/employees',
      gradient: 'from-[#CAF0F8] to-[#90E0EF]',
      submenu: [
        { title: 'Employee List', path: '/employees/list', icon: List }
      ]
    },
    {
      category: 'HEALTH MANAGEMENT',
      title: 'Health Tests',
      icon: TestTube,
      path: '/health-tests',
      gradient: 'from-[#03045E] to-[#0077B6]',
      submenu: [
        { title: 'Test List', path: '/health-tests/list', icon: List },
        { title: 'Assign Test', path: '/health-tests/assign', icon: Activity }
      ]
    },
    {
      title: 'Health Packages',
      icon: Package,
      path: '/health-packages',
      gradient: 'from-[#0077B6] to-[#00B4D8]',
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
      gradient: 'from-[#90E0EF] to-[#00B4D8]'
    },
    {
      category: 'PROMOTIONS',
      title: 'Offers',
      icon: Gift,
      path: '/offers',
      gradient: 'from-[#0077B6] to-[#03045E]',
      submenu: [
        { title: 'Offers List', path: '/offers/list', icon: List },
        { title: 'Assigned Offers', path: '/offers/assigned', icon: FileText }
      ]
    }
  ];

  // Automatically expand the menu if the current path is within a submenu
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenu && (item.submenu.some(sub => location.pathname === sub.path) || location.pathname === item.path)) {
        setExpandedMenus(prev => ({ ...prev, [item.title]: true }));
      }
    });
  }, [location.pathname]);

  return (
      <aside className={`
        ${isCollapsed ? 'w-20' : 'w-80'} 
        bg-gradient-to-b from-[#020344] via-[#005f91] to-[#0096b4]
        transition-all duration-500 ease-in-out
        flex flex-col
        relative
        overflow-hidden
        h-screen sticky top-0 z-40
      `}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CAF0F8] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#90E0EF] to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="p-6 flex items-center justify-between relative z-10 border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl shrink-0 bg-gradient-to-br from-[#CAF0F8] to-[#90E0EF] transform hover:scale-110 transition-transform duration-300">
              <Box className="text-[#03045E]" size={24} strokeWidth={2.5} />
            </div>
            <div className={`transition-all duration-500 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              <h1 className="text-xl font-black tracking-tight text-white drop-shadow-lg">
                CRM Admin
              </h1>
              <p className="text-xs text-[#CAF0F8] font-medium">Dashboard Panel</p>
            </div>
          </div>

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto relative z-10 custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            const isExpanded = expandedMenus[item.title];
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={index} className="relative group mb-1">
                {/* Category Header */}
                {item.category && !isCollapsed && (
                  <div className="px-4 mt-4 mb-2 text-[10px] font-extrabold text-blue-200/60 uppercase tracking-widest">
                    {item.category}
                  </div>
                )}

                <div
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleSubmenu(item.title);
                      if (item.path) navigate(item.path);
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className={`
                    relative flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer
                    transition-all duration-300 ease-in-out border
                    ${isActive 
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg border-white/30` 
                      : 'border-transparent hover:bg-white/10 hover:border-white/20'
                    }
                    backdrop-blur-sm
                    overflow-hidden
                  `}
                >
                  {/* Hover Glow Effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 
                    transition-opacity duration-500 rounded-2xl blur-xl
                  `}></div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`
                      p-2 rounded-lg transition-all duration-500
                      ${isActive 
                        ? 'bg-white/20 shadow-sm' 
                        : 'bg-white/5 group-hover:bg-white/20 group-hover:text-white'
                      }
                    `}>
                      <item.icon 
                        size={20} 
                        className={`
                          transition-all duration-500
                          ${isActive ? 'text-white' : 'text-[#CAF0F8] group-hover:text-white'}
                        `}
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className={`
                      font-bold text-sm whitespace-nowrap transition-all duration-500
                      ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}
                      ${isActive ? 'text-white' : 'text-[#90E0EF] group-hover:text-white'}
                    `}>
                      {item.title}
                    </span>
                  </div>

                  {!isCollapsed && hasSubmenu && (
                    <ChevronDown 
                      size={18} 
                      className={`
                        transition-all duration-500 relative z-10
                        ${isExpanded ? 'rotate-180' : ''} 
                        ${isActive ? 'text-white' : 'text-[#90E0EF] group-hover:text-white'}
                      `}
                      strokeWidth={2.5}
                    />
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                  )}
                </div>

                {/* Submenu */}
                {hasSubmenu && (
                  <div className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded && !isCollapsed ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="ml-5 pl-4 border-l border-white/10 space-y-1 my-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`
                            py-2.5 px-3 text-sm rounded-xl cursor-pointer flex items-center gap-3
                            transition-all duration-300
                            ${location.pathname === subItem.path
                              ? 'bg-white/20 text-white font-bold border-l-4 border-[#CAF0F8] shadow-lg backdrop-blur-sm'
                              : 'text-[#90E0EF] hover:text-white hover:bg-white/10 hover:translate-x-2 hover:border-l-2 hover:border-white/30'
                            }
                          `}
                        >
                          {subItem.icon && (
                            <subItem.icon 
                              size={16} 
                              className={`transition-all duration-300 ${location.pathname === subItem.path ? 'text-white' : 'opacity-70'}`} 
                            />
                          )}
                          <span className="font-medium">{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 relative z-10">
          <button className={`
            w-full flex items-center gap-4 px-4 py-4 rounded-2xl
            transition-all duration-500 group
            bg-white/5 hover:bg-gradient-to-r hover:from-red-500/80 hover:to-red-600/80
            border-2 border-transparent hover:border-red-300/30
            backdrop-blur-sm hover:scale-[1.02]
          `}>
            <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <LogOut size={20} className="text-[#CAF0F8] group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
            </div>
            <span className={`
              font-bold text-sm whitespace-nowrap transition-all duration-500
              ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}
              text-[#90E0EF] group-hover:text-white
            `}>
              Logout
            </span>
          </button>
        </div>

        <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
      </aside>
  );
};

export default Sidebar;