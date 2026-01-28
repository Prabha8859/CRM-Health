import React from 'react';

const StaffChart = () => (
  <div className="h-64 flex items-end justify-between gap-2 px-4 bg-slate-50 rounded-lg py-4">
    {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 100].map((h, i) => (
      <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group hover:bg-[#0077B6] transition-colors" style={{ height: `${h}%` }}>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {h}
        </div>
      </div>
    ))}
  </div>
);

export default StaffChart;
