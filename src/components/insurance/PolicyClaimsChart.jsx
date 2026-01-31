import React, { useState } from 'react';

const PolicyClaimsChart = () => {
    const [timeframe, setTimeframe] = useState('Weekly');

    const data = [
        { date: '3 Feb', earnings: 45, investment: 30 },
        { date: '4 Feb', earnings: 20, investment: 40 },
        { date: '5 Feb', earnings: 75, investment: 55 },
        { date: '6 Feb', earnings: 35, investment: 45 },
        { date: '7 Feb', earnings: 60, investment: 25 },
        { date: '8 Feb', earnings: 50, investment: 80 }, // Highlighted in design
        { date: '9 Feb', earnings: 30, investment: 15 },
    ];

    const maxVal = 100; // Scale based on max mock value

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-gray-800 w-full">

            {/* Header Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100">Policy & Claims</h3>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-700"></span>
                            <span className="text-sm font-bold text-slate-600 dark:text-gray-400">Earnings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                            <span className="text-sm font-bold text-slate-600 dark:text-gray-400">Investment</span>
                        </div>
                    </div>
                </div>

                {/* Timeframe Selector */}
                <div className="flex items-center bg-transparent">
                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${timeframe === tf
                                    ? 'bg-white shadow-sm text-slate-800 border border-slate-100 dark:bg-gray-800 dark:text-white dark:border-gray-700'
                                    : 'text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bar Chart Area */}
            <div className="relative h-64 w-full">
                {/* Grid Background */}
                <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between">
                    {[100, 75, 50, 25, 0].map((line, i) => (
                        <div key={i} className="w-full h-px border-t border-dashed border-slate-100 dark:border-gray-800"></div>
                    ))}
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex justify-between items-end pb-8 px-2 md:px-6">
                    {data.map((item, index) => {
                        const heightEarnings = (item.earnings / maxVal) * 100;
                        const heightInvestment = (item.investment / maxVal) * 100;
                        const isSelected = item.date === '8 Feb'; // Mock selected state

                        return (
                            <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer relative md:w-full">

                                {/* Highlight overlay for selected item */}
                                {isSelected && (
                                    <div className="absolute -inset-x-2 -top-4 bottom-6 bg-slate-50 dark:bg-gray-800/50 rounded-xl -z-10 hidden md:block"></div>
                                )}

                                <div className="flex items-end gap-1 md:gap-3 h-48 md:h-56">
                                    {/* Earnings Bar (Purple) */}
                                    <div
                                        className="w-3 md:w-5 bg-indigo-700 rounded-t-lg transition-all duration-500 hover:opacity-80"
                                        style={{ height: `${heightEarnings}%` }}
                                    ></div>
                                    {/* Investment Bar (Orange) */}
                                    <div
                                        className="w-3 md:w-5 bg-orange-400 rounded-t-lg transition-all duration-500 hover:opacity-80"
                                        style={{ height: `${heightInvestment}%` }}
                                    ></div>
                                </div>

                                {/* X-Axis Label */}
                                <span className={`text-xs font-bold mt-2 ${isSelected ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-gray-500'}`}>
                                    {item.date}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default PolicyClaimsChart;
