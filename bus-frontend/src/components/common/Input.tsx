import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-slate-300 tracking-wide">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</div>}
          <input
            ref={ref}
            className={`w-full glass-input rounded-xl px-4 py-3 outline-none transition-all duration-300 ${icon ? 'pl-10' : ''} ${error ? '!border-rose-500 !focus:ring-rose-500/30' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs font-medium text-rose-400 mt-1 animate-pulse">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
