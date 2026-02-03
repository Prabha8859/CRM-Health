import React from 'react';
import { TrendingUp, Clock, AlertCircle } from 'lucide-react';

const PolicyStatusWidget = () => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-slate-100 dark:border-gray-800 shadow-sm h-full flex flex-col justify-center">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-xl text-white shadow-sm">
                        <TrendingUp size={20} strokeWidth={2.5} />
                    </div>
                    Policy Status
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1.5 ml-1">Active and expired policies</p>
            </div>

            {/* Custom Chart Visualization */}
            <div className="space-y-8">
                <div className="relative pt-4">
                    <div className="flex justify-between mb-2 text-sm font-bold text-slate-700 dark:text-gray-300">
                        <span>Active Policies (78%)</span>
                        <span>980</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] h-3 rounded-full shadow-[0_0_10px_rgba(0,180,216,0.5)]" style={{ width: '78%' }}></div>
                    </div>
                </div>

                <div className="relative">
                    <div className="flex justify-between mb-2 text-sm font-bold text-slate-700 dark:text-gray-300">
                        <span>Expired Policies (22%)</span>
                        <span>270</span>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.5)]" style={{ width: '22%' }}></div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <div className="flex-1 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1">Renewals Due</div>
                            <div className="text-2xl font-black text-[#0077B6] dark:text-blue-400">45</div>
                        </div>
                        <Clock className="text-blue-200 dark:text-blue-800" size={32} />
                    </div>
                    <div className="flex-1 p-4 bg-red-50/50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-800/30 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-1">Critical</div>
                            <div className="text-2xl font-black text-red-500 dark:text-red-400">12</div>
                        </div>
                        <AlertCircle className="text-red-200 dark:text-red-800" size={32} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyStatusWidget;
