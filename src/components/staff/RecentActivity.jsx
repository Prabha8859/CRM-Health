import React from 'react';

const RecentActivity = () => (
  <div className="space-y-4">
    {[
      { user: 'Alice Johnson', action: 'added to Sales department', time: '2h ago' },
      { user: 'Bob Smith', action: 'role changed to Senior Agent', time: '5h ago' },
      { user: 'Charlie Brown', action: 'logged in from new device', time: '1d ago' },
    ].map((item, i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
          {item.user.charAt(0)}
        </div>
        <div>
          <p className="text-sm text-slate-700">
            <span className="font-bold">{item.user}</span> {item.action}.
          </p>
          <p className="text-xs text-slate-400">{item.time}</p>
        </div>
      </div>
    ))}
  </div>
);

export default RecentActivity;
