import { useState } from 'react';
import { StatCard, Card, Table, Grid } from '../common';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/rbac';
import { Activity, Shield, Server, Users } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === ROLES.SUPER_ADMIN;

  const [stats] = useState([
    {
      title: 'Total Customers',
      value: '1,234',
      trend: { type: 'up', value: '+12.5%' },
      color: 'blue'
    },
    {
      title: 'Active Policies',
      value: '856',
      trend: { type: 'up', value: '+8.2%' },
      color: 'green'
    },
    {
      title: 'Pending Claims',
      value: '42',
      trend: { type: 'down', value: '-5.1%' },
      color: 'red'
    },
    {
      title: 'Revenue',
      value: '$125,000',
      trend: { type: 'up', value: '+15.3%' },
      color: 'yellow'
    },
  ]);

  const [recentActivities] = useState([
    { id: 1, customer: 'John Doe', action: 'Policy Created', date: '2024-01-20', status: 'Active' },
    { id: 2, customer: 'Jane Smith', action: 'Claim Submitted', date: '2024-01-19', status: 'Pending' },
    { id: 3, customer: 'Bob Johnson', action: 'Policy Renewed', date: '2024-01-18', status: 'Active' },
    { id: 4, customer: 'Alice Brown', action: 'Payment Received', date: '2024-01-17', status: 'Completed' },
  ]);

  const activityColumns = [
    { key: 'customer', label: 'Customer Name' },
    { key: 'action', label: 'Action' },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'Active' ? 'bg-green-100 text-green-800' :
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {status}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your CRM.</p>
      </div>

      {/* Super Admin Exclusive System Health Widget */}
      {isSuperAdmin && (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
             <h2 className="text-xl font-bold flex items-center gap-2">
                <Shield className="text-green-400" /> System Health Overview
             </h2>
             <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium animate-pulse">
                Live Monitoring Active
             </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                   <Server className="text-blue-400" size={20} />
                   <span className="text-sm text-gray-300">Server Status</span>
                </div>
                <p className="text-2xl font-bold text-green-400">99.9% Uptime</p>
                <p className="text-xs text-gray-400 mt-1">Last downtime: 45 days ago</p>
             </div>

             <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                   <Activity className="text-purple-400" size={20} />
                   <span className="text-sm text-gray-300">System Load</span>
                </div>
                <p className="text-2xl font-bold text-white">24%</p>
                <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2">
                   <div className="bg-purple-400 h-1.5 rounded-full w-1/4"></div>
                </div>
             </div>

             <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                   <Users className="text-amber-400" size={20} />
                   <span className="text-sm text-gray-300">Active Sessions</span>
                </div>
                <p className="text-2xl font-bold text-white">142</p>
                <p className="text-xs text-gray-400 mt-1 text-green-400">+12 from last hour</p>
             </div>

             <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                   <Shield className="text-red-400" size={20} />
                   <span className="text-sm text-gray-300">Security Alerts</span>
                </div>
                <p className="text-2xl font-bold text-white">0 Issues</p>
                <p className="text-xs text-gray-400 mt-1">System Secure</p>
             </div>
          </div>
        </div>
      )}

      <Grid responsive={true}>
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </Grid>

      <Card title="Recent Activities">
        <Table
          columns={activityColumns}
          data={recentActivities}
          striped={true}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
