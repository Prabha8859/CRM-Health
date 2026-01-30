import React from 'react';
import { AlertCircle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform scale-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] p-6 text-white flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <AlertCircle size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        {/* content */}
        <div className="p-6">
          <p className="text-gray-600 text-lg">{message}</p>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;