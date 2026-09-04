import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, required, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-subtle">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
            className={twMerge(
              clsx(
                "block w-full rounded-lg border bg-white text-slate-900 text-sm p-3.5 transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600",
                "placeholder:text-slate-400 placeholder:font-normal",
                error
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20"
                  : "border-slate-300 hover:border-slate-400",
                className
              )
            )}
            {...props}
          />
        </div>
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="mt-1 text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
