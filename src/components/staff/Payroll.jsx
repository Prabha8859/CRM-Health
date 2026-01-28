import React, { useState } from 'react';
import { DollarSign, Search, Download, TrendingUp, CreditCard, Calendar, Clock } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import StatsCard from '../common/StatCard';
import DataTable from '../common/DataTable';

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const payrollData = [
    { id: 'PAY-001', employee: 'Alice Johnson', role: 'Manager', salary: '$5,000', status: 'Paid', date: '2024-01-31' },
    { id: 'PAY-002', employee: 'Bob Smith', role: 'Agent', salary: '$3,200', status: 'Pending', date: '2024-01-31' },
    { id: 'PAY-003', employee: 'Charlie Brown', role: 'Admin', salary: '$4,000', status: 'Paid', date: '2024-01-31' },
    { id: 'PAY-004', employee: 'Diana Prince', role: 'Specialist', salary: '$6,500', status: 'Processing', date: '2024-01-31' },
  ];

  const filteredPayroll = payrollData.filter(item =>
    item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Employee',
      accessor: 'employee',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{row.employee}</span>
          <span className="text-xs text-slate-500">{row.role}</span>
        </div>
      )
    },
    { header: 'Salary', accessor: 'salary', className: 'font-bold text-slate-700' },
    { header: 'Payment Date', accessor: 'date', className: 'text-slate-600' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const styles = {
          Paid: 'bg-green-50 text-green-600 border-green-200',
          Pending: 'bg-orange-50 text-orange-600 border-orange-200',
          Processing: 'bg-blue-50 text-blue-600 border-blue-200'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[row.status]}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      render: () => (
        <button className="p-2 hover:bg-slate-100 text-slate-500 hover:text-[#0077B6] rounded-lg transition-colors" title="Download Slip">
          <Download size={18} />
        </button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Payroll"
        subtitle="Manage employee salaries and payment history."
        icon={DollarSign}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
            <CreditCard size={18} />
            <span>Run Payroll</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Payroll" value="$18,700" icon={DollarSign} color="text-blue-600" bg="bg-blue-50" trend="+2.5%" trendUp={true} />
        <StatsCard label="Pending Payments" value="$3,200" icon={Clock} color="text-orange-600" bg="bg-orange-50" />
        <StatsCard label="Next Pay Date" value="Feb 28" icon={Calendar} color="text-purple-600" bg="bg-purple-50" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">Payment History</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search payroll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
            />
          </div>
        </div>
        <DataTable columns={columns} data={filteredPayroll} />
      </div>
    </div>
  );
};

export default Payroll;