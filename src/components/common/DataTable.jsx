import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, onRowClick }) => {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-gray-800/80 dark:to-gray-800/40 text-slate-600 dark:text-gray-300 text-xs font-bold uppercase tracking-wider border-b-2 border-slate-200 dark:border-gray-700">
              {columns.map((col, index) => (
                <th key={index} className={`p-5 first:pl-8 last:pr-8 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`group transition-all duration-300 ${onRowClick
                    ? 'cursor-pointer hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 hover:shadow-sm'
                    : 'hover:bg-slate-50/50 dark:hover:bg-gray-800/20'
                    } ${rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-slate-50/30 dark:bg-gray-800/10'}`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`p-5 first:pl-8 last:pr-8 text-sm text-slate-700 dark:text-gray-300 ${col.className || ''} group-hover:scale-[1.01] transition-transform duration-300`}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-16 text-center text-slate-500 dark:text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-slate-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-slate-700 dark:text-gray-300">No results found</p>
                    <p className="text-sm opacity-70 mt-1">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="p-5 px-8 border-t-2 border-slate-100 dark:border-gray-800 flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-gray-400 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-gray-800/50 dark:to-gray-800/20">
        <span className="font-bold">
          Showing <span className="text-[var(--color-brand-primary)] text-base">{data.length}</span> results
        </span>
        <div className="flex gap-2">
          <button className="p-2.5 hover:bg-white dark:hover:bg-gray-700 rounded-xl border border-slate-200 dark:border-gray-700 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm" disabled>
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button className="p-2.5 hover:bg-white dark:hover:bg-gray-700 rounded-xl border border-slate-200 dark:border-gray-700 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm" disabled>
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;