import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';

const DataViewToolbar = ({
    title,
    subtitle, // Optional: if you want title inside the bar
    searchTerm,
    onSearchChange,
    placeholder = "Search...",
    viewMode, // 'list' | 'grid'
    onViewModeChange,
    actions, // Extra buttons like Export, Add New
}) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Left Side: Title or Search (depending on usage, here we focus on Search/Title mix) */}
                <div className="flex items-center gap-4 flex-1">
                    {title && (
                        <h2 className="font-bold text-lg text-slate-800 dark:text-gray-100 whitespace-nowrap hidden md:block">
                            {title}
                        </h2>
                    )}

                    <div className="relative w-full md:max-w-xs group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 group-focus-within:text-[var(--color-brand-primary)] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all outline-none text-slate-700 dark:text-gray-200"
                        />
                    </div>
                </div>

                {/* Right Side: View Toggles & Actions */}
                <div className="flex items-center gap-3">

                    {/* View Toggles */}
                    <div className="flex items-center bg-slate-50 dark:bg-gray-800 p-1 rounded-xl border border-slate-200 dark:border-gray-700">
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                ? 'bg-white dark:bg-gray-700 shadow-sm text-[var(--color-brand-primary)]'
                                : 'text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300'
                                }`}
                            title="List View"
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                ? 'bg-white dark:bg-gray-700 shadow-sm text-[var(--color-brand-primary)]'
                                : 'text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300'
                                }`}
                            title="Grid View"
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-gray-700 mx-1 hidden md:block"></div>

                    {/* Extra Actions */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors hidden sm:flex">
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>
                        {actions}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DataViewToolbar;
