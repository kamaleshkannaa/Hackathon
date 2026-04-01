import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading, className = '', ...props }) => {
  const baseClasses = 'px-5 py-2.5 rounded-xl font-semibold transition-bounce flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ring-indigo-500/30',
    secondary: 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-0.5 active:scale-95 ring-slate-700/50',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)] active:scale-95 ring-rose-500/30',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5 active:scale-95 ring-white/10',
    glass: 'glass-panel text-white hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 border-white/20 ring-white/20'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 mr-2" /> : null}
      {children}
    </button>
  );
};
