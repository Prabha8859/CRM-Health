import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/rbac';
import ProfileHeader from '../../components/profile/ProfileHeader';
import PersonalInfoCard from '../../components/profile/PersonalInfoCard';
import AuthorityConsole from '../../components/profile/AuthorityConsole';
import ActivityFeed from '../../components/profile/ActivityFeed';
import EditProfileModal from '../../components/profile/EditProfileModal';
import RegisterStaffModal from '../../components/profile/RegisterStaffModal';
import Toast from '../../components/common/Toast';
import { getStaffProfile, updateStaffProfile, registerStaff } from './AllprofileApi';

const UserProfile = () => {
<<<<<<< HEAD
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchProfileData = async (showLoading = true) => {
    if (user?.id) {
      if (showLoading) setLoading(true);
      setError(null);
      try {
        const data = await getStaffProfile(user.id);
        setProfile(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        if (err.response?.status === 401) {
          // This handles unauthorized errors, which can happen if the token is expired.
          setError('Your session has expired. Please log in again.');
        } else {
          setError('Failed to load profile.');
        }
      } finally {
        if (showLoading) setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProfileData();
    } else {
      setLoading(false);
      if (!user) {
        setError("Please log in to view your profile.");
      }
    }
  }, [user]);

  const handleUpdateProfile = async (updatedData) => {
    await updateStaffProfile(user.id, updatedData);
    await fetchProfileData(false); // Refresh data without full page loader
    setToast({ message: 'Profile updated successfully', type: 'success' });
  };

  const handleRegisterStaff = async (newStaffData) => {
    await registerStaff(newStaffData);
    setToast({ message: 'Staff registered successfully', type: 'success' });
  };

  const isSuperAdmin = profile?.role_name === ROLES.SUPER_ADMIN;

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading profile...</div>;
  }

  if (error || !profile) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error || 'Could not load profile.'}</div>;
=======
  const { user } = useAuth();
  const isSuperAdmin = user?.role === ROLES.SUPER_ADMIN;
  const [profileData, setProfileData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
      const loadProfile = async () => {
          setIsLoading(true);
          try {
              // Import dynamically or at top lvl
              const { profileService } = await import('../../services/profileService');
              const data = await profileService.fetchProfile(user?.id);
              setProfileData({ ...user, ...data });
          } catch (error) {
              console.error("Failed to load profile", error);
              // Fallback to basic user info
              setProfileData(user);
          } finally {
              setIsLoading(false);
          }
      };
      
      if (user) {
          loadProfile();
      }
  }, [user]);

  if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;
>>>>>>> 2dfbe76 (role base)
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 pb-12 transition-colors duration-300">

      {/* Header Section */}
      <ProfileHeader
        user={profile}
        onEdit={() => setIsEditModalOpen(true)}
        onRegister={() => setIsRegisterModalOpen(true)}
        onSettings={() => console.log('Open Settings')}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Personal Info */}
          <div className="space-y-6 lg:col-span-1">
<<<<<<< HEAD
            <PersonalInfoCard user={profile} />
=======
             <PersonalInfoCard user={profileData} />
>>>>>>> 2dfbe76 (role base)
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

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={profile}
        onSave={handleUpdateProfile}
      />

      <RegisterStaffModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterStaff}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default UserProfile;
