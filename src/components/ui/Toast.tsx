import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden="true" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-950',
    error: 'border-red-200 bg-red-50/90 text-red-950',
    info: 'border-blue-200 bg-blue-50/90 text-blue-950',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-200 max-w-md",
        borders[type]
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium pr-2">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/5 rounded-md transition-colors text-slate-500 hover:text-slate-900"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
