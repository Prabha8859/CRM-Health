import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, bg, trend, trendUp }) => {
  return (
    <div className="relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
      {/* Background decoration */}
      <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${bg} opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500 ease-out blur-3xl`} />
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-slate-500 text-sm font-semibold mb-1 group-hover:text-slate-600 transition-colors">{label}</p>
           <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-[#0077B6] transition-colors">
            {typeof value === 'object' && value !== null ? (value.value || JSON.stringify(value)) : value}
          </h3> 
          {trend && (
            <div className={`flex items-center gap-1 mt-3 text-xs font-bold px-2.5 py-1 rounded-full w-fit border ${
              trendUp 
                ? 'bg-green-50 text-green-600 border-green-100' 
                : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {trendUp ? <ArrowUpRight size={14} strokeWidth={2.5} /> : <ArrowDownRight size={14} strokeWidth={2.5} />}
              {typeof trend === 'object' && trend !== null ? (trend.value || JSON.stringify(trend)) : trend}
            </div>
          )}
        </div>

        <div className={`p-3.5 rounded-2xl ${bg} ${color} shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          {Icon && <Icon size={26} strokeWidth={2} />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;