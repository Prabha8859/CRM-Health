import React, { useState } from 'react';
import { FileText, Search, Filter, Upload, Download, Trash2, Eye, File } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import StatsCard from '../common/StatCard';
import DataTable from '../common/DataTable';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    { id: 'DOC-001', name: 'Employment Contract', type: 'PDF', employee: 'Alice Johnson', date: '2023-01-15', size: '2.4 MB' },
    { id: 'DOC-002', name: 'NDA Agreement', type: 'PDF', employee: 'Bob Smith', date: '2023-03-10', size: '1.1 MB' },
    { id: 'DOC-003', name: 'Tax Form 2023', type: 'PDF', employee: 'Charlie Brown', date: '2023-11-05', size: '850 KB' },
    { id: 'DOC-004', name: 'ID Proof', type: 'JPG', employee: 'Diana Prince', date: '2021-08-20', size: '3.2 MB' },
    { id: 'DOC-005', name: 'Offer Letter', type: 'PDF', employee: 'Evan Wright', date: '2023-06-15', size: '1.5 MB' },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Document Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0077B6]">
            <FileText size={20} />
          </div>
          <div>
            <p className="font-medium text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">{row.type} • {row.size}</p>
          </div>
        </div>
      )
    },
    { header: 'Employee', accessor: 'employee', className: 'text-slate-600' },
    { header: 'Date Added', accessor: 'date', className: 'text-slate-500' },
    {
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-2 justify-end">
          <button className="p-2 hover:bg-slate-100 text-slate-500 hover:text-[#0077B6] rounded-lg transition-colors" title="View">
            <Eye size={18} />
          </button>
          <button className="p-2 hover:bg-slate-100 text-slate-500 hover:text-[#0077B6] rounded-lg transition-colors" title="Download">
            <Download size={18} />
          </button>
          <button className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Documents"
        subtitle="Manage employee contracts, agreements, and other files."
        icon={File}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
            <Upload size={18} />
            <span>Upload File</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Documents" value="1,245" icon={FileText} color="text-blue-600" bg="bg-blue-50" />
        <StatsCard label="Storage Used" value="4.2 GB" icon={Upload} color="text-purple-600" bg="bg-purple-50" />
        <StatsCard label="Recent Uploads" value="12" icon={File} color="text-green-600" bg="bg-green-50" trend="+5 this week" trendUp={true} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-slate-800">All Files</h2>
          <div className="flex gap-3">
             <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredDocuments} />
      </div>
    </div>
  );
};

export default Documents;