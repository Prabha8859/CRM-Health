import React from 'react';
import Breadcrumbs from '../../pages/insurance/Breadcrumbs';

const PageHeader = ({ title, subtitle, icon: Icon, actions }) => {
  return (
    <div className="space-y-4">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            {Icon && <Icon className="text-[#0077B6]" size={28} />}
            {title}
          </h1>
          {subtitle && <p className="text-slate-500 text-sm mt-1 ml-1">{subtitle}</p>}
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