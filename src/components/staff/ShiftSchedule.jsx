import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const ShiftSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const shifts = [
    { id: 1, employee: 'Dr. Sarah Wilson', role: 'Doctor', mon: '09:00 - 17:00', tue: '09:00 - 17:00', wed: 'Off', thu: '09:00 - 17:00', fri: '09:00 - 17:00', sat: '10:00 - 14:00', sun: 'Off' },
    { id: 2, employee: 'James Rodriguez', role: 'Nurse', mon: '07:00 - 15:00', tue: '07:00 - 15:00', wed: '07:00 - 15:00', thu: '07:00 - 15:00', fri: 'Off', sat: 'Off', sun: 'Off' },
    { id: 3, employee: 'Emily Chen', role: 'Admin', mon: '09:00 - 17:00', tue: '09:00 - 17:00', wed: '09:00 - 17:00', thu: '09:00 - 17:00', fri: '09:00 - 17:00', sat: 'Off', sun: 'Off' },
    { id: 4, employee: 'Dr. Michael Chang', role: 'Doctor', mon: 'Off', tue: '13:00 - 21:00', wed: '13:00 - 21:00', thu: '13:00 - 21:00', fri: '13:00 - 21:00', sat: '10:00 - 18:00', sun: 'Off' },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <PageHeader
        title="Shift Schedule"
        subtitle="Manage weekly working hours and employee shifts."
        icon={Calendar}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-xl hover:bg-[#023e8a] transition-colors shadow-lg shadow-blue-500/30">
            <Plus size={18} />
            <span>Add Shift</span>
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#0077B6]" />
              <span className="font-bold text-slate-800 text-lg">
                Week of {currentWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex gap-2">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
               <Clock size={14} />
               Day Shift
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">
               <Clock size={14} />
               Night Shift
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 font-semibold sticky left-0 bg-slate-50/95 backdrop-blur-sm z-10 min-w-[200px]">Employee</th>
                {days.map(day => (
                  <th key={day} className="p-4 font-semibold text-center min-w-[140px]">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shifts.map(shift => (
                <tr key={shift.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-4 sticky left-0 bg-white group-hover:bg-slate-50/80 z-10 border-r border-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                        {shift.employee.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{shift.employee}</p>
                        <p className="text-xs text-slate-500">{shift.role}</p>
                      </div>
                    </div>
                  </td>
                  {days.map(day => {
                    const time = shift[day.toLowerCase()];
                    const isOff = time === 'Off';
                    return (
                      <td key={day} className="p-4 text-center">
                        <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium w-full ${
                          isOff 
                            ? 'bg-slate-100 text-slate-400 border border-slate-200' 
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}>
                          {time}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftSchedule;