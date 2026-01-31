import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const InsuranceStatCard = ({
    title,
    value,
    icon: Icon,
    color, // e.g., "text-blue-500"
    trend,
    trendUp,
    subtitle = "Total Value",
    members = [] // Array of image URLs or initials
}) => {

    // Extract color class (e.g., "text-blue-500" -> "bg-blue-50 text-blue-500")
    // For simplicity/consistency with the new theme system, we'll try to derive backgrounds or use the brand color if color prop isn't specific enough
    // But usually we get passed explicit Tailwind classes. Let's handle generic cases.

    const isBrandColor = color?.includes('var(--color-brand');

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full min-h-[180px]">

            {/* Top Row: Icon + Title + Status */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isBrandColor ? 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]' : 'bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-400'}`}>
                        {Icon && <Icon size={24} className={!isBrandColor && color ? color : ''} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-gray-100 text-base">{title}</h3>
                        {/* Mobile/Compact View Subtitle if needed */}
                    </div>
                </div>

                {/* Status / Trend Badge */}
                {trend && (
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${trendUp === true
                            ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                            : trendUp === false
                                ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${trendUp === true ? 'bg-green-500' : trendUp === false ? 'bg-red-500' : 'bg-orange-500'
                            }`}></span>
                        {trend}
                    </div>
                )}
            </div>

            {/* Bottom Row: Value + Members/Extra */}
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{subtitle}</p>
                    <p className="text-3xl font-black text-slate-800 dark:text-gray-100 tracking-tight">{value}</p>
                </div>

                {/* Right Side: Members Stack or Action */}
                {members && members.length > 0 ? (
                    <div className="flex flex-col items-end">
                        <span className="text-slate-400 dark:text-gray-500 text-xs font-bold mb-1">Members</span>
                        <div className="flex -space-x-2">
                            {members.slice(0, 3).map((m, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-slate-200 flex items-center justify-center overflow-hidden">
                                    {m.img ? <img src={m.img} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold text-slate-600">{m.text}</span>}
                                </div>
                            ))}
                            {members.length > 3 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                                    +{members.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // If no members, show a placeholder or subtle action like "See All" arrow
                    <button className="text-slate-400 hover:text-[var(--color-brand-primary)] transition-colors">
                        <MoreHorizontal size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default InsuranceStatCard;
