import React, { useState, useEffect } from 'react';
import { FilePlus, User, Calendar, DollarSign, Shield, ChevronRight, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const AssignPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.plan;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    policyType: '',
    coverage: '',
    startDate: '',
    duration: ''
  });

  useEffect(() => {
    if (selectedPlan) {
      // Parse duration (e.g., "1 Year" -> 12)
      let durationVal = '';
      if (selectedPlan.duration) {
        const years = parseInt(selectedPlan.duration);
        if (!isNaN(years)) {
          durationVal = years * 12;
        }
      }

      // Parse coverage (e.g., "$500,000" -> 500000)
      const coverageVal = selectedPlan.coverage ? selectedPlan.coverage.replace(/[^0-9.]/g, '') : '';

      // Simple type mapping based on name
      let typeVal = '';
      const nameLower = selectedPlan.name.toLowerCase();
      if (nameLower.includes('health')) typeVal = 'health';
      else if (nameLower.includes('family')) typeVal = 'family';
      else if (nameLower.includes('critical')) typeVal = 'critical';

      setFormData(prev => ({
        ...prev,
        coverage: coverageVal,
        duration: durationVal,
        policyType: typeVal
      }));
    }
  }, [selectedPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      navigate('/insurance');
    }, 1500);
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <PageHeader 
          title="Assign New Policy" 
          subtitle="Create a new insurance assignment for a client. Fill in the details below."
          icon={FilePlus}
        />

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* Section 1: Client Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <User size={20} className="text-[#0077B6]" />
                Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Select Client</label>
                  <select 
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
                  >
                    <option value="">Choose a client...</option>
                    <option value="1">John Doe</option>
                    <option value="2">Sarah Smith</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Client ID</label>
                  <input type="text" placeholder="Auto-generated" disabled className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed" />
                </div>
              </div>
            </div>

            {/* Section 2: Policy Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Shield size={20} className="text-[#0077B6]" />
                Policy Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Policy Type</label>
                  <select 
                    name="policyType"
                    value={formData.policyType}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all"
                  >
                    <option value="">Select type...</option>
                    <option value="health">Health Premium</option>
                    <option value="family">Family Shield</option>
                    <option value="critical">Critical Care</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Coverage Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="number" 
                      name="coverage"
                      value={formData.coverage}
                      onChange={handleChange}
                      placeholder="0.00" 
                      className="w-full pl-10 pr-4 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="date" 
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Duration (Months)</label>
                  <input 
                    type="number" 
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="12" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 focus:border-[#0077B6] transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-[#0077B6] to-[#0096C7] text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Assigning...
                  </>
                ) : (
                  <>
                    Assign Policy
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignPolicy;