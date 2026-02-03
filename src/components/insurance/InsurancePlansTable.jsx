import React from 'react';
import { FileText, Search, ArrowUpDown, X } from 'lucide-react';
import DataTable from '../common/DataTable';

const InsurancePlansTable = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, columns, filteredPlans, sortConfig, onSort, onAddPlan }) => {
  const hasActiveFilters = searchTerm || statusFilter !== 'All';

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Section with improved typography and spacing */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-gray-100 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-2xl text-white shadow-lg shadow-blue-500/30">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            Available Health Plans
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold shadow-lg shadow-blue-500/30">
              {filteredPlans.length}
            </span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-3 ml-1">
            Browse and manage the complete list of insurance plans available for assignment.
          </p>
        </div>
        {onAddPlan && (
          <button
            onClick={onAddPlan}
            className="px-5 py-2.5 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-blue-500/30 font-bold text-sm flex items-center gap-2"
          >
            + Add Plan
          </button>
        )}
      </div>

      {/* Enhanced Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border-2 border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[var(--color-brand-primary)]/30 transition-all duration-300 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 group-focus-within:text-[var(--color-brand-primary)] transition-colors" size={20} strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search by plan name, provider, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50/80 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 rounded-xl border-2 border-transparent focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-primary)]/10 transition-all outline-none text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 font-medium"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-3 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 border-2 border-slate-200 dark:border-gray-700 hover:border-[var(--color-brand-primary)] rounded-xl text-slate-700 dark:text-gray-300 transition-all text-sm font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] appearance-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="relative">
            <select
              value={sortConfig?.key ? `${sortConfig.key}-${sortConfig.direction}` : ''}
              onChange={(e) => onSort(e.target.value)}
              className="appearance-none pl-11 pr-10 py-3 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 border-2 border-slate-200 dark:border-gray-700 hover:border-[var(--color-brand-primary)] rounded-xl text-slate-700 dark:text-gray-300 transition-all text-sm font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="premium-asc">Premium (Low-High)</option>
              <option value="premium-desc">Premium (High-Low)</option>
            </select>
            <ArrowUpDown size={18} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none" />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
            className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-bold text-sm flex items-center gap-2 whitespace-nowrap"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>

      {/* Table Container with better shadow and border */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-slate-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredPlans}
        />
      </div>
    </div>
  );
};

export default InsurancePlansTable;