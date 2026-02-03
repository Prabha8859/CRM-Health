import React from 'react';
import { Plus, FileText, Clock, BarChart3, Send, CheckCircle } from 'lucide-react';

const QuickActionsWidget = () => {
    const actions = [
        { icon: Plus, label: 'Create Policy', color: 'from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700' },
        { icon: FileText, label: 'Process Claim', color: 'from-emerald-500 to-emerald-600', hoverColor: 'hover:from-emerald-600 hover:to-emerald-700' },
        { icon: Clock, label: 'Schedule Renewal', color: 'from-amber-500 to-amber-600', hoverColor: 'hover:from-amber-600 hover:to-amber-700' },
        { icon: BarChart3, label: 'Generate Report', color: 'from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700' },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-xl text-white shadow-sm">
                        <Send size={20} strokeWidth={2.5} />
                    </div>
                    Quick Actions
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1.5 ml-1">Common tasks at your fingertips</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className={`group relative overflow-hidden bg-gradient-to-br ${action.color} ${action.hoverColor} p-6 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-${action.color}/30`}
                    >
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

                        {/* Content */}
                        <div className="relative flex flex-col items-center gap-3">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                <action.icon size={28} strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-bold text-center leading-tight">{action.label}</span>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActionsWidget;
