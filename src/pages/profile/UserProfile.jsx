import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/rbac';
import ProfileHeader from '../../components/profile/ProfileHeader';
import PersonalInfoCard from '../../components/profile/PersonalInfoCard';
import AuthorityConsole from '../../components/profile/AuthorityConsole';
import ActivityFeed from '../../components/profile/ActivityFeed';

const UserProfile = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === ROLES.SUPER_ADMIN;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 pb-12 transition-colors duration-300">
      
      {/* Header Section */}
      <ProfileHeader 
        user={user} 
        onEdit={() => console.log('Edit Profile')} 
        onSettings={() => console.log('Open Settings')} 
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Info */}
          <div className="space-y-6 lg:col-span-1">
             <PersonalInfoCard user={user} />
          </div>

          {/* Right Column: Work & Activity */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Super Admin Console (Standard Logic: Only show if Super Admin) */}
            {isSuperAdmin && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <AuthorityConsole />
              </div>
            )}

            {/* Activity Feed */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <ActivityFeed />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
