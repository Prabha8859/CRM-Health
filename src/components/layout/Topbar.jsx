import React, { useState } from 'react';
import { LayoutDashboard, ChevronDown, Search, Bell, Settings } from 'lucide-react';
import ThemeModal from '../common/ThemeModal';

export const Topbar = () => {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30 transition-colors duration-300">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                  <LayoutDashboard className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight transition-colors">Dashboard</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">CRM Management System</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-72 px-5 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-[var(--color-brand-primary)] text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none transition-all duration-300"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>

              {/* Theme Settings Trigger */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                className="relative p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-[var(--color-brand-light)]/20 hover:text-[var(--color-brand-primary)] text-gray-400 transition-all duration-300 group"
              >
                <Settings className="group-hover:rotate-90 transition-transform duration-500" size={22} strokeWidth={2.5} />
              </button>

              {/* Notifications */}
              <button className="relative p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-[var(--color-brand-light)]/20 hover:text-[var(--color-brand-primary)] text-gray-400 transition-all duration-300 group">
                <Bell className="group-hover:text-[var(--color-brand-primary)] transition-colors" size={22} strokeWidth={2.5} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer group border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center font-black text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                  AS
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 transition-colors">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
                </div>
                <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </>
  );
};