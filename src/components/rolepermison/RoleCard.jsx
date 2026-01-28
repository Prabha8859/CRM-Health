import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RoleCard = ({ title, value, icon: Icon, color, bg, trend, trendUp }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${bg} ${color}`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`flex items-center text-xs font-bold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </span>
          <span className="text-xs text-slate-400 font-medium">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default RoleCard;
