import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Users, Lock, Activity, Award } from 'lucide-react';
import WorkAssignmentModal from '../admin/WorkAssignmentModal';

const ConsoleButton = ({ icon: Icon, title, subtitle, color, bgColor, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all border border-white/10 group/btn text-left w-full"
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
      <div className="text-left">
        <h4 className="font-bold">{title}</h4>
        <p className="text-xs text-indigo-200">{subtitle}</p>
      </div>
    </div>
    <ChevronRight size={18} className="text-indigo-300 group-hover/btn:translate-x-1 transition-transform" />
  </button>
);

const AuthorityConsole = () => {
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <WorkAssignmentModal isOpen={isWorkModalOpen} onClose={() => setIsWorkModalOpen(false)} />
      
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden group mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Shield className="text-yellow-400 fill-yellow-400" /> Authority Console
              </h2>
              <p className="text-indigo-200 mt-1">Manage system-wide permissions and assignments.</p>
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold uppercase tracking-wider border border-white/10">
              Super Admin Access
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConsoleButton 
              icon={Users} 
              title="Role Assignment" 
              subtitle="Assign roles to staff"
              color="text-blue-300"
              bgColor="bg-blue-500/20"
              onClick={() => navigate('/rolepermison/assign')}
            />
            
            <ConsoleButton 
              icon={Lock} 
              title="Access Matrix" 
              subtitle="Configure permission access"
              color="text-purple-300"
              bgColor="bg-purple-500/20"
              onClick={() => navigate('/rolepermison/matrix')}
            />

            <ConsoleButton 
              icon={Activity} 
              title="System Logs" 
              subtitle="View audit trails"
              color="text-emerald-300"
              bgColor="bg-emerald-500/20"
              onClick={() => navigate('/staff/logs')}
            />

             <ConsoleButton 
              icon={Award} 
              title="Work Assignment" 
              subtitle="Delegate tasks to teams"
              color="text-amber-300"
              bgColor="bg-amber-500/20"
              onClick={() => setIsWorkModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorityConsole;
