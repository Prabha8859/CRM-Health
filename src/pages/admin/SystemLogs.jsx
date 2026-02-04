import React, { useState } from 'react';
import { 
  Search, Filter, Download, AlertCircle, CheckCircle, 
  Clock, Shield, User, FileText, ChevronDown 
} from 'lucide-react';

import { useMockData } from '../../context/MockDataContext';

const SystemLogs = () => {
  const { logs } = useMockData();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // No mock data needed anymore!

  const getStatusIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} className="text-green-500" />;
      case 'error': return <AlertCircle size={18} className="text-red-500" />;
      case 'warning': return <Shield size={18} className="text-amber-500" />;
      default: return <Clock size={18} className="text-blue-500" />;
    }
  };

  const getStatusStyle = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 text-green-700 border-green-200';
      case 'error': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2 flex items-center gap-3">
            <Shield className="text-[var(--color-brand-primary)]" size={32} />
            System Audit Logs
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Monitor and track all system activities and security events.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 font-semibold">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between animate-in fade-in duration-700">
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1 border border-transparent focus-within:border-[var(--color-brand-primary)] focus-within:bg-white dark:focus-within:bg-gray-800 transition-all">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by user, action, or details..." 
            className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-gray-200 placeholder-gray-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['all', 'error', 'warning', 'success', 'info'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`
                px-4 py-2 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-all
                ${filterType === type 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest pl-8">Event Type</th>
                <th className="p-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Action</th>
                <th className="p-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">User</th>
                <th className="p-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Details</th>
                <th className="p-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-right pr-8">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-default">
                  <td className="p-5 pl-8">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border capitalize ${getStatusStyle(log.type)}`}>
                      {getStatusIcon(log.type)}
                      {log.type}
                    </span>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-gray-800 dark:text-gray-200">{log.action}</p>
                    <p className="text-xs text-gray-500">{log.target}</p>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                        {log.user.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{log.user}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{log.details}</p>
                  </td>
                  <td className="p-5 text-right pr-8">
                    <span className="text-xs font-mono font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {log.time}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination/Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-900/30 flex justify-center">
            <button className="text-sm font-bold text-[var(--color-brand-primary)] hover:underline flex items-center gap-1">
                View All History <ChevronDown size={14} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
