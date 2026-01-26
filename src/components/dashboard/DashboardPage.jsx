import { useState } from 'react';
import { StatCard, Card, Table, Grid } from '../common';

const DashboardPage = () => {
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
