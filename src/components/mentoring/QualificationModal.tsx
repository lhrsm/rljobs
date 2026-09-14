import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { QualificationForm } from './QualificationForm';
import { MentoringLeadSubmission } from '../../types/mentoring';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (submission: MentoringLeadSubmission) => void;
}

export const QualificationModal: React.FC<QualificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white border border-slate-200 rounded-lg max-w-4xl w-full shadow-2xl overflow-hidden my-4 sm:my-8 text-left animate-scaleUp"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 text-slate-400 hover:text-slate-700 p-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label={isEn ? "Close form" : "Fechar formulário"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Form Container */}
        <div className="p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
          <QualificationForm
            isInsideModal
            onSuccess={(submission) => {
              onClose();
              onSuccess(submission);
            }}
          />
        </div>
      </div>
    </div>
  );
};
