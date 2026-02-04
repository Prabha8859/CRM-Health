import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, ShieldCheck } from 'lucide-react';

const DetailRow = ({ icon: Icon, label, value, colorClass = "text-gray-500", bgClass = "bg-gray-100" }) => (
  <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <div className={`w-10 h-10 rounded-full ${bgClass} ${colorClass} flex items-center justify-center shrink-0`}>
      <Icon size={18} />
    </div>
    <div className="overflow-hidden">
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate" title={value}>{value}</p>
    </div>
  </div>
);

const PersonalInfoCard = ({ user }) => {
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
      value: "+91 98765 43210", // Mock data
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, Maharashtra, IN", // Mock data
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    {
      icon: Calendar,
      label: "Joining Date",
      value: "15 Jan, 2024", // Mock data
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      icon: CreditCard,
      label: "Employee ID",
      value: "EMP-2024-001", // Mock data
      color: "text-pink-600",
      bg: "bg-pink-100"
    },
    {
      icon: ShieldCheck,
      label: "Clearance Level",
      value: "Level 4 (High)", // Mock data
      color: "text-indigo-600",
      bg: "bg-indigo-100"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <User size={20} className="text-[var(--color-brand-primary)]" /> Personal Details
      </h3>
      <div className="space-y-4">
        {details.map((detail, index) => (
          <DetailRow 
            key={index}
            icon={detail.icon} 
            label={detail.label} 
            value={detail.value}
            colorClass={detail.color}
            bgClass={detail.bg}
          />
        ))}
      </div>
      
      {/* Private Data / Deployment Type Work section */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Private Systems</h4>
         <div className="flex flex-wrap gap-2">
           <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-600">VPN Access</span>
           <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-600">Deploy Server</span>
           <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-600">Git Admin</span>
         </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
