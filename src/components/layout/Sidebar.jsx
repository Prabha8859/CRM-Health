import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ConfirmationModal from '../common/ConfirmationModal';
import {
  ChevronDown,
  ChevronRight,
  Box,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { menuItems } from './sidebarMenu';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // State for hovering in collapsed mode
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
  const submenuTimeoutRef = useRef(null);

  const toggleSubmenu = (title) => {
    if (isCollapsed) setIsCollapsed(false);
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleSubmenuEnter = (item, e) => {
    if (!isCollapsed || !item.submenu) return;

    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);

    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredSubmenu({
      title: item.title,
      items: item.submenu,
      top: rect.top,
      left: rect.right + 10, // 10px gap
      category: item.category
    });
  };

  const handleSubmenuLeave = () => {
    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
    submenuTimeoutRef.current = setTimeout(() => {
      setHoveredSubmenu(null);
    }, 300); // Delay to allow moving to the submenu
  };



  // Automatically expand the menu if the current path is within a submenu
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenu && (item.submenu.some(sub => location.pathname === sub.path) || location.pathname === item.path)) {
        setExpandedMenus(prev => ({ ...prev, [item.title]: true }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <aside className={`
        ${isCollapsed ? 'w-20' : 'w-80'} 
        bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800
        transition-all duration-500 ease-in-out
        flex flex-col
        relative
        overflow-hidden
        h-screen sticky top-0 z-40
        shadow-2xl
      `}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl shrink-0 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] transform hover:scale-110 transition-transform duration-300">
            <Box className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <div className={`transition-all duration-500 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <h1 className="text-xl font-black tracking-tight text-gray-800 dark:text-gray-100 drop-shadow-sm transition-colors">
              CRM Admin
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">Dashboard Panel</p>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
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
            <div
              key={index}
              className="relative group mb-1"
              onMouseEnter={(e) => handleSubmenuEnter(item, e)}
              onMouseLeave={handleSubmenuLeave}
            >
              {/* Category Header */}
              {item.category && !isCollapsed && (
                <div className="px-4 mt-4 mb-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
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
                    ? `bg-gradient-to-r ${item.gradient} shadow-lg shadow-blue-500/20 text-white border-transparent`
                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-[var(--color-brand-primary)] hover:border-[var(--color-brand-primary)]/30'
                  }
                    overflow-hidden
                  `}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`
                      p-2 rounded-lg transition-all duration-500
                      ${isActive
                      ? 'bg-white/20 shadow-sm text-white'
                      : 'bg-gray-100/50 dark:bg-gray-800/50 group-hover:bg-[var(--color-brand-light)]/20 group-hover:text-[var(--color-brand-primary)]'
                    }
                    `}>
                    <item.icon
                      size={20}
                      className={`
                          transition-all duration-500
                          ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-[var(--color-brand-primary)]'}
                        `}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span className={`
                      font-bold text-sm whitespace-nowrap transition-all duration-500
                      ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}
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
                        ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-[var(--color-brand-primary)]'}
                      `}
                    strokeWidth={2.5}
                  />
                )}
              </div>

              {/* Submenu (Accordion) */}
              {hasSubmenu && (
                <div className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded && !isCollapsed ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}>
                  <div className="ml-5 pl-4 border-l border-gray-100 dark:border-gray-800 space-y-1 my-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`
                            py-2.5 px-3 text-sm rounded-xl cursor-pointer flex items-center gap-3
                            transition-all duration-300
                            ${location.pathname === subItem.path
                            ? 'bg-[var(--color-brand-light)]/20 text-[var(--color-brand-primary)] font-bold border-l-4 border-l-[var(--color-brand-primary)]'
                            : 'text-gray-500 dark:text-gray-400 hover:text-[var(--color-brand-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-2 hover:border-gray-200 dark:hover:border-gray-800'
                          }
                          `}
                      >
                        {subItem.icon && (
                          <subItem.icon
                            size={16}
                            className={`transition-all duration-300 ${location.pathname === subItem.path ? 'text-[var(--color-brand-primary)]' : 'opacity-70'}`}
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

      {/* User Profile Section */}
      <div className={`p-3 border-t border-gray-100 dark:border-gray-800 relative z-10 transition-all duration-500 ${isCollapsed ? 'p-2' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-4' : 'justify-between gap-3'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="relative group">
              <img
                src="https://i.pravatar.cc/150?u=admin"
                alt="User Avatar"
                className={`
                  rounded-full object-cover border-2 border-[var(--color-brand-secondary)]
                  transition-all duration-500
                  ${isCollapsed ? 'w-12 h-12 shadow-lg' : 'w-10 h-10'}
                `}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
            </div>

            <div className={`transition-all duration-500 overflow-hidden ${isCollapsed ? 'w-0 h-0 opacity-0' : 'w-auto opacity-100'}`}>
              <p className="font-bold text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Super Admin</p>
            </div>
          </div>

          <div className={`flex items-center ${isCollapsed ? 'w-full justify-center' : 'gap-1'}`}>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className={`
                flex items-center justify-center rounded-2xl
                transition-all duration-500 group
                bg-gray-50 hover:bg-red-50
                border-2 border-transparent hover:border-red-100
                hover:scale-[1.02]
                ${isCollapsed ? 'w-10 h-10' : 'w-full gap-4 p-2'}
              `}>
              <div className={`
                  rounded-xl bg-white group-hover:bg-red-100 transition-all duration-300
                  ${isCollapsed ? 'p-2' : 'p-2.5'}
                `}>
                <LogOut size={isCollapsed ? 18 : 20} className="text-gray-400 group-hover:text-red-500 transition-colors duration-300" strokeWidth={2.5} />
              </div>
              <span className={`
                  font-bold text-sm whitespace-nowrap transition-all duration-500
                  ${isCollapsed ? 'opacity-0 w-0 h-0 overflow-hidden' : 'opacity-100'}
                  text-gray-500 group-hover:text-red-600
                `}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={onLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
      />

      {/* Fixed Floating Submenu */}
      {hoveredSubmenu && isCollapsed && (
        <div
          style={{
            top: hoveredSubmenu.top,
            left: hoveredSubmenu.left,
          }}
          className="fixed z-50 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 p-4 animate-in fade-in zoom-in-95 duration-200"
          onMouseEnter={() => {
            if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
          }}
          onMouseLeave={() => setHoveredSubmenu(null)}
        >
          <div className="mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
            {hoveredSubmenu.category && (
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{hoveredSubmenu.category}</p>
            )}
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">{hoveredSubmenu.title}</h3>
          </div>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
            {hoveredSubmenu.items.map((subItem, index) => (
              <Link
                key={index}
                to={subItem.path}
                onClick={() => setHoveredSubmenu(null)}
                className={`
                   flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                   ${location.pathname === subItem.path
                    ? 'bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[var(--color-brand-primary)]'
                  }
                `}
              >
                {subItem.icon && <subItem.icon size={16} strokeWidth={location.pathname === subItem.path ? 2.5 : 2} />}
                <span>{subItem.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;