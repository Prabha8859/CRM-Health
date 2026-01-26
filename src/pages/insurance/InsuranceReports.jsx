import React from 'react';
import { BarChart3, Download, FileText, TrendingUp, PieChart } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatCard';

const InsuranceReports = () => {
  // Mock Data for Company Performance
  const performanceData = [
    { company: 'LIC', revenue: '$450,000', claims: 120, ratio: '92%' },
    { company: 'HDFC Ergo', revenue: '$320,000', claims: 85, ratio: '88%' },
    { company: 'Star Health', revenue: '$210,000', claims: 60, ratio: '95%' },
    { company: 'Bajaj Allianz', revenue: '$180,000', claims: 45, ratio: '90%' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader 
        title="Reports & Analytics" 
        subtitle="Detailed insights into revenue, claims, and company performance."
        icon={BarChart3}
        actions={
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <FileText size={18} />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
              <Download size={18} />
              <span>Export Excel</span>
            </button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Revenue" value="$1.2M" icon={TrendingUp} color="text-green-600" bg="bg-green-50" trend="+15% vs last month" trendUp={true} />
        <StatsCard label="Avg. Claims Ratio" value="91.5%" icon={PieChart} color="text-blue-600" bg="bg-blue-50" trend="+2% Efficiency" trendUp={true} />
        <StatsCard label="Policies Sold" value="3,450" icon={FileText} color="text-purple-600" bg="bg-purple-50" trend="+120 New" trendUp={true} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Monthly Revenue Growth</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 100].map((h, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group hover:bg-[#0077B6] transition-colors" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium uppercase">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Company Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 text-sm">
                  <th className="pb-3 font-semibold">Company</th>
                  <th className="pb-3 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold">Claims</th>
                  <th className="pb-3 font-semibold">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {performanceData.map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50">
                    <td className="py-4 font-medium text-slate-800">{row.company}</td>
                    <td className="py-4 text-slate-600">{row.revenue}</td>
                    <td className="py-4 text-slate-600">{row.claims}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold">
                        {row.ratio}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceReports;