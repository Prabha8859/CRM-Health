import React from 'react';
import { FileText, Search, ArrowUpDown } from 'lucide-react';
import DataTable from '../common/DataTable';

const InsurancePlansTable = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, columns, filteredPlans, sortConfig, onSort }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Section with improved typography and spacing */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl text-[var(--color-brand-primary)] shadow-sm border border-blue-200/50 dark:border-blue-700/30">
              <FileText size={22} />
            </div>
            Available Health Plans
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[var(--color-brand-primary)] text-xs font-bold border border-blue-100 dark:border-blue-800/50">
              {filteredPlans.length}
            </span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 ml-1">
            Browse and manage the complete list of insurance plans available for assignment.
          </p>
        </div>
      </div>

      {/* Enhanced Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-900 p-2 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 group-focus-within:text-[var(--color-brand-primary)] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by plan name, provider, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 rounded-xl border border-transparent focus:border-[var(--color-brand-primary)]/30 focus:ring-4 focus:ring-[var(--color-brand-primary)]/10 transition-all outline-none text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 rounded-xl text-slate-600 dark:text-gray-300 transition-all text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] appearance-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="relative">
            <select
              value={sortConfig?.key ? `${sortConfig.key}-${sortConfig.direction}` : ''}
              onChange={(e) => onSort(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2.5 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 rounded-xl text-slate-600 dark:text-gray-300 transition-all text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="premium-asc">Premium (Low-High)</option>
              <option value="premium-desc">Premium (High-Low)</option>
            </select>
            <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Container with better shadow and border */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <DataTable
          columns={columns}
          data={filteredPlans}
        />
      </div>
    </div>
  );
};

export default InsurancePlansTable;