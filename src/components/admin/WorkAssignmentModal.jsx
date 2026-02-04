import React, { useState } from 'react';
import { X, Check, Users, Calendar, AlertCircle, Briefcase, ChevronDown, AlignLeft } from 'lucide-react';

import { useMockData } from '../../context/MockDataContext';

const WorkAssignmentModal = ({ isOpen, onClose }) => {
  const { assignTask } = useMockData();
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      assignTask({
        title: taskTitle,
        description,
        priority,
        assignee,
        dueDate
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setTaskTitle('');
        setDescription('');
        setAssignee('');
        setDueDate('');
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Assign Work</h2>
              <p className="text-xs text-blue-100">Super Admin Console</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <Check size={32} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Task Assigned!</h3>
              <p className="text-gray-500">The work has been successfully delegated to the team.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Task Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Task Title</label>
                <input 
                  type="text" 
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Q1 Financial Review"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <div className="relative">
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task details and requirements..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                  <div className="relative">
                    <select 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 appearance-none focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none cursor-pointer"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Due Date */}
                <div>
                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                   <div className="relative">
                    <input 
                      type="date" 
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                   </div>
                </div>
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assign To</label>
                <div className="relative">
                  <select 
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 appearance-none focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none cursor-pointer"
                    required
                  >
                    <option value="">Select Team or Staff...</option>
                    <optgroup label="Teams">
                      <option value="admin_team">Admin Team</option>
                      <option value="hr_dept">HR Department</option>
                      <option value="finance_unit">Finance Unit</option>
                    </optgroup>
                    <optgroup label="Staff Members">
                      <option value="john_doe">John Doe (Senior Staff)</option>
                    </optgroup>
                  </select>
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-[var(--color-brand-primary)] text-white font-bold shadow-lg hover:bg-[var(--color-brand-secondary)] hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Assigning...' : 'Confirm Assignment'}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkAssignmentModal;
