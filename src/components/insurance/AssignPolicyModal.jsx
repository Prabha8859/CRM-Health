import React, { useState } from 'react';
import { User, Shield, DollarSign, Calendar, Loader2, ChevronRight, X } from 'lucide-react';

const AssignPolicyModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        clientId: '',
        policyType: '',
        coverage: '',
        startDate: '',
        duration: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-slate-100 dark:border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100">Assign New Policy</h2>
                        <p className="text-sm text-slate-500 dark:text-gray-400">Link a new insurance plan to a client</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Container */}
                <div className="p-6 md:p-8">
                    <form className="space-y-8" onSubmit={handleSubmit}>

                        {/* Section 1: Client Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-2">
                                <User size={20} className="text-[var(--color-brand-primary)]" />
                                Client Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Select Client</label>
                                    <select
                                        name="clientId"
                                        value={formData.clientId}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all text-slate-700 dark:text-gray-200"
                                    >
                                        <option value="">Choose a client...</option>
                                        <option value="1">John Doe</option>
                                        <option value="2">Sarah Smith</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Client ID</label>
                                    <input type="text" placeholder="Auto-generated" disabled className="w-full p-3 bg-slate-100 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-500 dark:text-gray-500 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Policy Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-2">
                                <Shield size={20} className="text-[var(--color-brand-primary)]" />
                                Policy Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Policy Type</label>
                                    <select
                                        name="policyType"
                                        value={formData.policyType}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all text-slate-700 dark:text-gray-200"
                                    >
                                        <option value="">Select type...</option>
                                        <option value="health">Health Premium</option>
                                        <option value="family">Family Shield</option>
                                        <option value="critical">Critical Care</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Coverage Amount</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={18} />
                                        <input
                                            type="number"
                                            name="coverage"
                                            value={formData.coverage}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="w-full pl-10 pr-4 p-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all text-slate-700 dark:text-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Start Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={18} />
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 p-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all text-slate-700 dark:text-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Duration (Months)</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="12"
                                        className="w-full p-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all text-slate-700 dark:text-gray-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-[var(--color-brand-primary)] text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

export default AssignPolicyModal;
