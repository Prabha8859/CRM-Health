import React from 'react';
import { TrendingUp, Award, Shield } from 'lucide-react';

const TopPerformingPlans = () => {
    const plans = [
        { name: 'Health Secure Plus', revenue: '$45,200', enrollments: 342, growth: '+24%', rank: 1, color: 'from-amber-400 to-amber-500' },
        { name: 'Family Care Premium', revenue: '$38,900', enrollments: 287, growth: '+18%', rank: 2, color: 'from-slate-300 to-slate-400' },
        { name: 'Critical Illness Cover', revenue: '$32,400', enrollments: 198, growth: '+15%', rank: 3, color: 'from-orange-400 to-orange-500' },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-xl text-white shadow-sm">
                        <Award size={20} strokeWidth={2.5} />
                    </div>
                    Top Performing Plans
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1.5 ml-1">Based on revenue & enrollments</p>
            </div>

            <div className="space-y-4">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="group relative bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-5 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-slate-200 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer hover:shadow-lg"
                    >
                        {/* Rank Badge */}
                        <div className={`absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            {plan.rank}
                        </div>

                        <div className="flex items-start gap-4 pl-6">
                            {/* Icon */}
                            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                <Shield size={24} strokeWidth={2.5} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-800 dark:text-gray-100 mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors">
                                    {plan.name}
                                </h4>

                                <div className="flex items-center gap-4 text-sm">
                                    <div>
                                        <p className="text-slate-500 dark:text-gray-400 text-xs">Revenue</p>
                                        <p className="font-bold text-slate-800 dark:text-gray-200">{plan.revenue}</p>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200 dark:bg-gray-700"></div>
                                    <div>
                                        <p className="text-slate-500 dark:text-gray-400 text-xs">Enrollments</p>
                                        <p className="font-bold text-slate-800 dark:text-gray-200">{plan.enrollments}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Growth Badge */}
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-bold">
                                <TrendingUp size={14} />
                                {plan.growth}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPerformingPlans;
