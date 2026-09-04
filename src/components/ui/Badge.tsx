import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'blue' | 'emerald' | 'amber' | 'purple' | 'slate' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-md whitespace-nowrap transition-colors";

  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200/80",
    blue: "bg-blue-50 text-blue-700 border border-blue-200/70",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
    amber: "bg-amber-50 text-amber-800 border border-amber-200/80",
    purple: "bg-purple-50 text-purple-700 border border-purple-200/70",
    slate: "bg-slate-800 text-slate-100",
    outline: "bg-transparent text-slate-600 border border-slate-300",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </span>
  );
};
