import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasAccess } from '../../utils/rbac';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess(user.role, location.pathname)) {
    // Redirect to dashboard or a 403 Unauthorised page
    // For now, redirecting to the dashboard which everyone typically has access to,
    // or if they don't even have that, maybe the login page or a "Not Found" style page.
    // Let's assume dashboard is safe or check if they have dashboard access.
    
    // If they are on a page they don't have access to, send them to their "home" or default page.
    // For simplicity, we send them to /dashboard, assuming it handles its own internal checks or is generic.
    // Better: show a "Unauthorized" message.
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6">You do not have permission to view this page.</p>
        <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-[var(--color-brand-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
            Go Back
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
