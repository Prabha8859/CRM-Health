import React from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

const InsuranceStatCard = ({
    title,
    value,
    icon: Icon,
    variant = 'default', // primary, success, warning, danger, default
    trend,
    trendUp,
    subtitle = "Total Value",
    members = [] // Array of image URLs or initials
}) => {

    const variants = {
        primary: {
            gradient: 'from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20',
            iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
            shadow: 'hover:shadow-blue-500/20',
            decoration: 'from-blue-500/10'
        },
        success: {
            gradient: 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20',
            iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            shadow: 'hover:shadow-emerald-500/20',
            decoration: 'from-emerald-500/10'
        },
        warning: {
            gradient: 'from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20',
            iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
            shadow: 'hover:shadow-amber-500/20',
            decoration: 'from-amber-500/10'
        },
        danger: {
            gradient: 'from-red-500/10 to-rose-500/10 hover:from-red-500/20 hover:to-rose-500/20',
            iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400',
            shadow: 'hover:shadow-red-500/20',
            decoration: 'from-red-500/10'
        },
        default: {
            gradient: 'from-slate-100 to-slate-50 dark:from-gray-800/50 dark:to-gray-900/50',
            iconBg: 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400',
            shadow: 'hover:shadow-slate-500/20',
            decoration: 'from-slate-500/10'
        }
    };

    const currentVariant = variants[variant] || variants.default;

    return (
        <div className={`group relative bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-2xl ${currentVariant.shadow} transition-all duration-500 flex flex-col justify-between h-full min-h-[180px] overflow-hidden hover:-translate-y-1 cursor-pointer`}>

            {/* Gradient Background Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentVariant.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            {/* Decorative Circle */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${currentVariant.decoration} to-transparent rounded-full group-hover:scale-150 transition-transform duration-700 ease-out`}></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Top Row: Icon + Title + Status */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${currentVariant.iconBg} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                            {Icon && <Icon size={26} strokeWidth={2.5} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-gray-100 text-base group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">{title}</h3>
                        </div>
                    </div>

                    {/* Status / Trend Badge */}
                    {trend && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm group-hover:scale-110 transition-transform duration-300 ${trendUp === true
                            ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : trendUp === false
                                ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                            }`}>
                            {trendUp === true ? <TrendingUp size={12} /> : trendUp === false ? <TrendingDown size={12} /> : null}
                            {trend}
                        </div>
                    )}
                </div>

                {/* Bottom Row: Value + Members/Extra */}
                <div className="flex justify-between items-end mt-auto">
                    <div>
                        <p className="text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{subtitle}</p>
                        <p className="text-4xl font-black text-slate-800 dark:text-gray-100 tracking-tight group-hover:scale-105 transition-transform duration-300 inline-block">{value}</p>
                    </div>

                    {/* Right Side: Members Stack or Action */}
                    {members && members.length > 0 ? (
                        <div className="flex flex-col items-end">
                            <span className="text-slate-400 dark:text-gray-500 text-xs font-bold mb-2">Members</span>
                            <div className="flex -space-x-2">
                                {members.slice(0, 3).map((m, i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ transitionDelay: `${i * 50}ms` }}>
                                        {m.img ? <img src={m.img} alt="" className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-white">{m.text}</span>}
                                    </div>
                                ))}
                                {members.length > 3 && (
                                    <div className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-900 bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                                        +{members.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button className="text-slate-400 hover:text-[var(--color-brand-primary)] transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800">
                            <MoreHorizontal size={24} />
                        </button>
                    )}
                </div>
            </div>

            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
        </div>
    );
};

export default InsuranceStatCard;
