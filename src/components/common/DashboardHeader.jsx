import React from 'react';

const DashboardHeader = ({ title, subtitle, children, isDarkMode }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
};

export default DashboardHeader;