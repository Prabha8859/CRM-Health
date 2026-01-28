import React from 'react';
import { Users, UserCheck, UserX, Briefcase } from 'lucide-react';
import StatsCard from '../common/StatCard';

const EmployeeStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard 
        label="Total Employees" 
        value="124" 
        icon={Users} 
        color="text-blue-600" 
        bg="bg-blue-50" 
        trend="+12 New" 
        trendUp={true} 
      />
      <StatsCard 
        label="Active Employees" 
        value="110" 
        icon={UserCheck} 
        color="text-green-600" 
        bg="bg-green-50" 
        trend="98%" 
        trendUp={true} 
      />
      <StatsCard 
        label="Inactive / On Leave" 
        value="14" 
        icon={UserX} 
        color="text-red-600" 
        bg="bg-red-50" 
        trend="Needs Attention" 
        trendUp={false} 
      />
      <StatsCard 
        label="Unassigned" 
        value="8" 
        icon={Briefcase} 
        color="text-orange-600" 
        bg="bg-orange-50" 
        trend="Assign Teams" 
        trendUp={false} 
      />
    </div>
  );
};

export default EmployeeStats;
