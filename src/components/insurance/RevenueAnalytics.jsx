import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const RevenueAnalytics = () => {
    const monthlyData = {
        thisMonth: 124500,
        lastMonth: 98300,
        growth: 26.7
    };

    const breakdown = [
        { category: 'Health Insurance', amount: 52400, percentage: 42, color: 'bg-blue-500' },
        { category: 'Family Plans', amount: 38900, percentage: 31, color: 'bg-emerald-500' },
        { category: 'Critical Illness', amount: 21200, percentage: 17, color: 'bg-purple-500' },
        { category: 'Life Insurance', amount: 12000, percentage: 10, color: 'bg-amber-500' },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-xl text-white shadow-sm">
                        <DollarSign size={20} strokeWidth={2.5} />
                    </div>
                    Revenue Analytics
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1.5 ml-1">Monthly performance breakdown</p>
            </div>

            {/* Monthly Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                    <div className="relative">
                        <p className="text-xs opacity-90 mb-2 font-medium">This Month</p>
                        <p className="text-2xl font-black mb-1">${(monthlyData.thisMonth / 1000).toFixed(1)}k</p>
                        <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded-full w-fit">
                            <TrendingUp size={12} />
                            +{monthlyData.growth}%
                        </div>
                    </div>
                </div>

                <div className="bg-slate-100 dark:bg-gray-800 rounded-2xl p-5 relative overflow-hidden">
                    <div className="relative">
                        <p className="text-xs text-slate-500 dark:text-gray-400 mb-2 font-medium">Last Month</p>
                        <p className="text-2xl font-black text-slate-800 dark:text-gray-100 mb-1">${(monthlyData.lastMonth / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-slate-500 dark:text-gray-400 font-bold">Baseline</p>
                    </div>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-gray-300 mb-4">Revenue by Category</h4>
                <div className="space-y-4">
                    {breakdown.map((item, index) => (
                        <div key={index} className="group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-gray-300">{item.category}</span>
                                <span className="text-sm font-black text-slate-800 dark:text-gray-100">${(item.amount / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="relative h-3 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out relative`}
                                    style={{ width: `${item.percentage}%` }}
                                >
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-end pr-2">
                                    <span className="text-[10px] font-bold text-slate-600 dark:text-gray-400">{item.percentage}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RevenueAnalytics;
