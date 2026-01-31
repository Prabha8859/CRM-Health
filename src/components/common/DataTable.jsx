import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, onRowClick }) => {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-gray-800/50 text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-gray-800">
              {columns.map((col, index) => (
                <th key={index} className={`p-4 first:pl-6 last:pr-6 ${col.className || ''}`}>
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
                  className={`group transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800/50' : 'hover:bg-slate-50/50 dark:hover:bg-gray-800/20'}`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`p-4 first:pl-6 last:pr-6 text-sm text-slate-600 dark:text-gray-300 ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-12 text-center text-slate-500 dark:text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-medium">No results found</p>
                    <p className="text-sm opacity-80 mt-1">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="p-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-gray-400 bg-slate-50/30 dark:bg-gray-800/30">
        <span className="font-medium">Showing <span className="text-slate-800 dark:text-gray-200">{data.length}</span> results</span>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-gray-600 transition-all disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-gray-600 transition-all disabled:opacity-50" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;