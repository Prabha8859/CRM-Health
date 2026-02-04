import React from 'react';
import { Activity } from 'lucide-react';

const ActivityFeed = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Activity size={20} className="text-[var(--color-brand-secondary)]" /> Recent Activity
        </h3>
        <button className="text-xs text-[var(--color-brand-primary)] font-bold hover:underline">View All</button>
      </div>
      
      <div className="space-y-6 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-2">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="relative pl-6 pb-2 group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-2 border-green-500 group-hover:scale-110 transition-transform"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {i === 0 ? "Logged in to System" : i === 1 ? "Checked Dashboard" : i === 2 ? "Updated Profile" : "Viewed Team Reports"}
              </p>
              <span className="text-xs text-gray-400 font-medium">{i * 2 + 1} hours ago</span>
            </div>
            <p className="text-xs text-gray-500">Authenticated via Secure Portal (IP: 192.168.1.{100 + i})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
