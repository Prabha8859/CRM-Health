import React from 'react';
import Breadcrumbs from '../../pages/insurance/Breadcrumbs';

const PageHeader = ({ title, subtitle, icon: Icon, actions }) => {
  return (
    <div className="space-y-4">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100 flex items-center gap-3">
            {Icon && <Icon className="text-[#0077B6] dark:text-[#00B4D8]" size={28} />}
            {title}
          </h1>
          {subtitle && <p className="text-slate-500 dark:text-gray-400 text-sm mt-1 ml-1">{subtitle}</p>}
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;