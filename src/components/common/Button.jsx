import React from 'react';

const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  icon: Icon,
  title,
}) => {
  // Base classes for layout and interaction
  const baseClass = "rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  // Variants definition
  const variants = {
    primary: "bg-[var(--color-brand-primary)] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95",
    secondary: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
    outline: "border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30",
    ghost: "hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 dark:hover:text-gray-200",
    // Special variants for dashboard actions
    'ghost-brand': "hover:bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]",
    'ghost-danger': "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
  };

  // Size definition
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2', // Specific size for icon-only buttons
  };

  // Determine size class: if variant is 'icon' or explicit size is 'icon', use icon padding
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant] || variants.primary} ${sizeClass} ${className}`}
      title={title}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
