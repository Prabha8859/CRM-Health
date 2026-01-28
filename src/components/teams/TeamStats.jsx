import React from 'react';
import { Users, CheckCircle2, XCircle, Briefcase } from 'lucide-react';
import StatsCard from '../common/StatCard';

const TeamStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard 
        label="Total Teams" 
        value="6" 
        icon={Briefcase} 
        color="text-blue-600" 
        bg="bg-blue-50" 
        trend="+2 New" 
        trendUp={true} 
      />
      <StatsCard 
        label="Active Teams" 
        value="5" 
        icon={CheckCircle2} 
        color="text-green-600" 
        bg="bg-green-50" 
        trend="Stable" 
        trendUp={true} 
      />
      <StatsCard 
        label="Inactive Teams" 
        value="1" 
        icon={XCircle} 
        color="text-red-600" 
        bg="bg-red-50" 
        trend="Needs Review" 
        trendUp={false} 
      />
      <StatsCard 
        label="Total Members" 
        value="42" 
        icon={Users} 
        color="text-purple-600" 
        bg="bg-purple-50" 
        trend="+5 this month" 
        trendUp={true} 
      />
    </div>
  );
};

export default TeamStats;
