import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const ClaimsStatsWidget = () => {
    const stats = [
        { label: 'Approved', value: '75%', color: 'bg-emerald-500', count: '892', icon: CheckCircle2, text: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
        { label: 'Pending Review', value: '15%', color: 'bg-amber-500', count: '145', icon: Clock, text: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
        { label: 'Rejected', value: '10%', color: 'bg-rose-500', count: '84', icon: AlertCircle, text: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    ];

    return (
        <div className="space-y-4">
            {stats.map((item, index) => (
                <div key={index} className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-slate-200 dark:hover:border-gray-700 transition-all duration-300 cursor-default">

                    {/* Icon Box */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.text} group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={20} strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{item.label}</span>
                            <span className="text-lg font-black text-slate-800 dark:text-gray-100">{item.count}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${item.color} rounded-full relative`}
                                style={{ width: item.value }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-white/30 w-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            </div>
                        </div>
                    </div>

                    <ChevronRight size={16} className="text-slate-300 dark:text-gray-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                </div>
            ))}

            <button className="w-full py-3 mt-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-[var(--color-brand-primary)] hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-dashed border-slate-200 dark:border-gray-700">
                View Detailed Report
            </button>
        </div>
    );
};

export default ClaimsStatsWidget;
