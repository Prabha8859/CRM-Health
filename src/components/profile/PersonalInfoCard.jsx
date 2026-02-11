import React from 'react';
import { Mail, Users, Shield, Calendar } from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
      <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-md font-semibold text-gray-800 dark:text-gray-200">{value || 'N/A'}</p>
    </div>
  </div>
);

const PersonalInfoCard = ({ user }) => {
<<<<<<< HEAD
  const joinDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'N/A';
=======
  // Standard logic: Configuration for profile details
  const details = [
    {
      icon: Mail,
      label: "Email Address",
      value: user?.email || "N/A",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: user?.phone || "N/A",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      icon: MapPin,
      label: "Location",
      value: user?.location || "N/A",
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    {
      icon: Calendar,
      label: "Joining Date",
      value: user?.joiningDate || "N/A",
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      icon: CreditCard,
      label: "Employee ID",
      value: user?.employeeId || "N/A",
      color: "text-pink-600",
      bg: "bg-pink-100"
    },
    {
      icon: ShieldCheck,
      label: "Clearance Level",
      value: user?.clearanceLevel || "N/A",
      color: "text-indigo-600",
      bg: "bg-indigo-100"
    }
  ];
>>>>>>> 2dfbe76 (role base)

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Personal Information</h3>
      <div className="space-y-6">
        <InfoRow icon={Mail} label="Email Address" value={user?.email} />
        <InfoRow icon={Shield} label="Role" value={user?.role_name} />
        <InfoRow icon={Users} label="Team" value={user?.team_name} />
        <InfoRow icon={Calendar} label="Joined On" value={joinDate} />
      </div>
    </div>
  );
};

export default PersonalInfoCard;