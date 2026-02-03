import React from 'react';
import { Clock, Bell, Phone, Mail, Calendar, UserCircle, MoreVertical } from 'lucide-react';

const UpcomingRenewals = () => {
    const renewals = [
        {
            customer: 'John Doe',
            policy: 'Health Secure Plus',
            policyNo: 'HSP-2024-1247',
            amount: '$1,240',
            daysLeft: 7,
            totalDays: 30,
            expiryDate: '10 Feb 2026',
            phone: '+1 234-567-8900',
            email: 'john.doe@email.com',
            priority: 'high'
        },
        {
            customer: 'Sarah Smith',
            policy: 'Family Care',
            policyNo: 'FC-2024-0893',
            amount: '$2,180',
            daysLeft: 15,
            totalDays: 30,
            expiryDate: '18 Feb 2026',
            phone: '+1 234-567-8901',
            email: 'sarah.s@email.com',
            priority: 'medium'
        },
        {
            customer: 'Mike Johnson',
            policy: 'Life Guard Pro',
            policyNo: 'LGP-2024-1556',
            amount: '$890',
            daysLeft: 28,
            totalDays: 30,
            expiryDate: '3 Mar 2026',
            phone: '+1 234-567-8902',
            email: 'mike.j@email.com',
            priority: 'low'
        },
        {
            customer: 'Emma Wilson',
            policy: 'Critical Illness',
            policyNo: 'CI-2024-2103',
            amount: '$1,550',
            daysLeft: 30,
            totalDays: 30,
            expiryDate: '5 Mar 2026',
            phone: '+1 234-567-8903',
            email: 'emma.w@email.com',
            priority: 'low'
        },
    ];

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'high': return {
                bg: 'bg-red-500',
                progressBg: 'bg-red-500',
                text: 'text-red-600 dark:text-red-400',
                badge: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800',
                label: 'Urgent'
            };
            case 'medium': return {
                bg: 'bg-orange-500',
                progressBg: 'bg-orange-500',
                text: 'text-orange-600 dark:text-orange-400',
                badge: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800',
                label: 'Soon'
            };
            default: return {
                bg: 'bg-blue-500',
                progressBg: 'bg-blue-500',
                text: 'text-blue-600 dark:text-blue-400',
                badge: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
                label: 'Normal'
            };
        }
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-gray-800">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-xl text-white shadow-sm">
                            <Clock size={20} strokeWidth={2.5} />
                        </div>
                        Policy Renewals
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-1.5 ml-1">Manage upcoming renewals</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-2xl font-black text-slate-800 dark:text-gray-100">{renewals.length}</p>
                        <p className="text-xs text-slate-500 dark:text-gray-400 font-bold">Pending</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-gray-800 hover:bg-[var(--color-brand-primary)] hover:text-white text-slate-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-all duration-300">
                        View All
                    </button>
                </div>
            </div>

            {/* Renewals List */}
            <div className="space-y-4">
                {renewals.map((renewal, index) => {
                    const style = getPriorityStyle(renewal.priority);
                    const progressPercentage = ((renewal.totalDays - renewal.daysLeft) / renewal.totalDays) * 100;

                    return (
                        <div
                            key={index}
                            className="group relative flex bg-white dark:bg-gray-800 rounded-2xl border-2 border-slate-200 dark:border-gray-700 hover:border-[var(--color-brand-primary)] hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Left Priority Bar */}
                            <div className={`w-1.5 ${style.bg} flex-shrink-0`}></div>

                            {/* Main Content */}
                            <div className="flex-1 p-5">
                                <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
                                    {/* Avatar & Days Counter */}
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center text-white font-bold text-sm shadow-md">
                                            {getInitials(renewal.customer)}
                                        </div>

                                        {/* Days Counter */}
                                        <div className="text-center">
                                            <div className="text-3xl font-black text-slate-800 dark:text-gray-100">{renewal.daysLeft}</div>
                                            <div className="text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Days Left</div>
                                        </div>
                                    </div>

                                    {/* Customer & Policy Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-base font-bold text-slate-800 dark:text-gray-100">{renewal.customer}</h4>
                                                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${style.badge}`}>
                                                    {style.label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-gray-400 font-semibold">{renewal.policy}</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-500 mt-0.5">{renewal.policyNo}</p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-3">
                                            <div className="h-1.5 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${style.progressBg} transition-all duration-1000 ease-out`}
                                                    style={{ width: `${progressPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Contact Details */}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-slate-400 dark:text-gray-500" strokeWidth={2.5} />
                                                <span className="font-medium">{renewal.expiryDate}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={12} className="text-slate-400 dark:text-gray-500" strokeWidth={2.5} />
                                                <span>{renewal.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={12} className="text-slate-400 dark:text-gray-500" strokeWidth={2.5} />
                                                <span className="truncate">{renewal.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amount & Actions */}
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        {/* Amount */}
                                        <div className="flex flex-col items-end px-4 py-3 bg-slate-50 dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-700">
                                            <p className="text-[10px] text-slate-500 dark:text-gray-400 font-bold uppercase mb-1">Premium</p>
                                            <p className="text-2xl font-black text-slate-800 dark:text-gray-100">{renewal.amount}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] text-white transition-all duration-300 text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5">
                                            <Bell size={14} strokeWidth={2.5} />
                                            Send Reminder
                                        </button>

                                        <button className="flex items-center justify-center p-3 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-600 dark:text-gray-400 transition-all duration-300">
                                            <MoreVertical size={16} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingRenewals;
