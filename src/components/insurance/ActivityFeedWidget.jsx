import React from 'react';
import { UserPlus, CheckCircle2, Edit, AlertCircle, Clock, ArrowRight } from 'lucide-react';

const ActivityFeedWidget = () => {
    const activities = [
        { title: 'New Health Policy', desc: 'Comprehensive Care · #402', time: '10m', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-500' },
        { title: 'Claim Approved', desc: 'Surgery Claim · #CLM-882', time: '45m', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500' },
        { title: 'Premium Updated', desc: 'Family Floater Plan', time: '3h', icon: Edit, color: 'text-amber-500', bg: 'bg-amber-500' },
        { title: 'New Claim Filed', desc: 'Cardiac Care · Critical', time: '1d', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500' },
    ];

    return (
        <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-gray-800"></div>

            <div className="space-y-6">
                {activities.map((item, index) => (
                    <div key={index} className="relative flex items-start gap-4 group cursor-pointer">

                        {/* Timeline Dot */}
                        <div className={`relative z-10 w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${item.bg} text-white`}>
                            <item.icon size={16} strokeWidth={2.5} />
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 min-w-0 pt-1">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-slate-800 dark:text-gray-100 group-hover:text-[var(--color-brand-primary)] transition-colors">{item.title}</h4>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-gray-800/50 px-2 py-0.5 rounded-full">{item.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 truncate">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 mt-8 py-2.5 rounded-xl bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)] font-bold text-sm hover:bg-[var(--color-brand-primary)]/10 transition-colors group">
                View All Activity
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default ActivityFeedWidget;
