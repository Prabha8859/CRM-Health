import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center text-sm text-slate-500 mb-2 animate-in fade-in slide-in-from-left-4 duration-500">
      <Link 
        to="/dashboard" 
        className="flex items-center hover:text-[#0077B6] transition-colors"
      >
        <Home size={16} className="mr-1" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        if (name === 'dashboard') return null;

        return (
          <div key={name} className="flex items-center">
            <ChevronRight size={16} className="mx-2 text-slate-400" />
            {isLast ? (
              <span className="font-medium text-[#0077B6] capitalize">
                {name.replace(/-/g, ' ')}
              </span>
            ) : (
              <Link 
                to={routeTo}
                className="hover:text-[#0077B6] transition-colors capitalize"
              >
                {name.replace(/-/g, ' ')}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;