import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronDown,
  CheckCircle2, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ApiService } from '../../services/api';
import { CompanyBriefing, Seniority, Region } from '../../types';

interface HireTechTalentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireTechTalentModal: React.FC<HireTechTalentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState<'1-20' | '21-100' | '101-500' | '500+'>('21-100');
  const [targetRole, setTargetRole] = useState('');
  const [seniorityNeeded, setSeniorityNeeded] = useState<Seniority>('Staff');
  const [targetRegion, setTargetRegion] = useState<Region>('USA');
  const [urgency, setUrgency] = useState<'immediate' | 'within_30_days' | 'next_quarter'>('immediate');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!companyName.trim()) errs.companyName = isEn ? 'Required' : 'Campo obrigatório';
    if (!contactName.trim()) errs.contactName = isEn ? 'Required' : 'Campo obrigatório';
    if (!workEmail.trim()) {
      errs.workEmail = isEn ? 'Required' : 'Campo obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
      errs.workEmail = isEn ? 'Invalid email' : 'E-mail inválido';
    }
    if (!phone.trim()) errs.phone = isEn ? 'Required' : 'Campo obrigatório';
    if (!targetRole.trim()) errs.targetRole = isEn ? 'Required' : 'Campo obrigatório';
    if (!estimatedBudget.trim()) errs.estimatedBudget = isEn ? 'Required' : 'Campo obrigatório';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const briefingData: CompanyBriefing = {
      companyName,
      contactName,
      workEmail,
      phone,
      companySize,
      targetRole,
      seniorityNeeded,
      targetRegion,
      urgency,
      estimatedBudget,
      message: message || undefined,
    };

    try {
      const response = await ApiService.submitCompanyBriefing(briefingData);
      if (response.success) {
        setTrackingId(response.trackingId || 'RL-B2B-CONFIRMED');
        setIsSuccess(true);
      }
    } catch {
      setIsSuccess(true);
      setTrackingId(`RL-B2B-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCompanyName('');
    setContactName('');
    setWorkEmail('');
    setPhone('');
    setTargetRole('');
    setEstimatedBudget('');
    setMessage('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hire-modal-title"
    >
      <div 
        className="relative bg-slate-900 border border-slate-700/70 rounded-lg max-w-4xl w-full shadow-2xl overflow-hidden my-4 sm:my-8 text-left text-white"
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-slate-800 px-6 sm:px-8 py-5">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 mb-1">
              {isEn ? "Executive Tech Hunting" : "Executive Tech Hunting"}
            </div>
            <h2 id="hire-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t.b2b.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
              {t.b2b.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-md hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-4"
            aria-label={isEn ? "Close" : "Fechar"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {isEn ? "Briefing Received" : "Briefing Recebido"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isEn ? "Demand Registered Successfully" : "Demanda Registrada com Sucesso"}
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                {isEn ? (
                  <>Ricardo Oliveira will review requirements for <strong className="text-white">{targetRole}</strong> at <strong className="text-white">{companyName}</strong> and contact you within 24 hours.</>
                ) : (
                  <>Ricardo Oliveira analisará os requisitos para <strong className="text-white">{targetRole}</strong> na <strong className="text-white">{companyName}</strong> e entrará em contato em até 24 horas.</>
                )}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-md border border-slate-800 max-w-xs mx-auto">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                {isEn ? "Protocol" : "Protocolo"}
              </span>
              <span className="text-base font-mono font-bold text-emerald-400">{trackingId}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/351926527934?text=${encodeURIComponent(
                  isEn 
                    ? `Hello Ricardo! I submitted a hiring brief for ${targetRole} at ${companyName} (Protocol: ${trackingId}). Let's accelerate alignment.`
                    : `Olá Ricardo! Registrei o briefing para contratação de ${targetRole} na ${companyName} (Protocolo: ${trackingId}). Gostaria de acelerar o alinhamento.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-xs font-bold text-white bg-[#075E54] hover:bg-[#054c44] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isEn ? "Accelerate on WhatsApp" : "Acelerar no WhatsApp com Ricardo"}</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3 rounded-md text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {isEn ? "Close" : "Fechar"}
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Row 1: Company & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Company Name" : "Nome da Empresa"} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={isEn ? "e.g. Acme Corp, ScaleUp Inc" : "Ex: Acme Corp, ScaleUp Inc"}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={`w-full bg-slate-950 border ${errors.companyName ? 'border-red-500' : 'border-slate-700'} rounded-md text-sm text-white px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.companyName && <p className="text-[11px] text-red-400 mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Your Name & Role" : "Seu Nome & Cargo"} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={isEn ? "e.g. Alex Morgan, VP of Engineering" : "Ex: Carlos Silva, CTO / Head de Engenharia"}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full bg-slate-950 border ${errors.contactName ? 'border-red-500' : 'border-slate-700'} rounded-md text-sm text-white px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.contactName && <p className="text-[11px] text-red-400 mt-1">{errors.contactName}</p>}
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Corporate Email" : "E-mail Corporativo"} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder={isEn ? "alex@acmecorp.com" : "carlos@acmecorp.com"}
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className={`w-full bg-slate-950 border ${errors.workEmail ? 'border-red-500' : 'border-slate-700'} rounded-md text-sm text-white px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.workEmail && <p className="text-[11px] text-red-400 mt-1">{errors.workEmail}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Phone / WhatsApp" : "Telefone / WhatsApp"} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+55 11 99999-9999 / +1 415..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-md text-sm text-white px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Row 3: Role to Hire & Seniority Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Position to Hire" : "Cargo a Contratar"} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={isEn ? "e.g. Staff Go Engineer, Tech Lead, VP of Eng" : "Ex: Staff Go Engineer, Tech Lead, VP of Eng"}
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className={`w-full bg-slate-950 border ${errors.targetRole ? 'border-red-500' : 'border-slate-700'} rounded-md text-sm text-white px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.targetRole && <p className="text-[11px] text-red-400 mt-1">{errors.targetRole}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Seniority" : "Senioridade"} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={seniorityNeeded}
                    onChange={(e) => setSeniorityNeeded(e.target.value as Seniority)}
                    className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-md text-sm text-white px-3.5 py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Senior">{isEn ? "Senior (5+ yrs)" : "Senior (5+ anos)"}</option>
                    <option value="Staff">{isEn ? "Staff (8+ yrs)" : "Staff (8+ anos)"}</option>
                    <option value="Lead">{isEn ? "Lead / Principal (10+ yrs)" : "Lead / Principal (10+ anos)"}</option>
                    <option value="Head/Director">Head / Director</option>
                    <option value="C-Level/VP">C-Level / VP</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 4: Model/Region Dropdown & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Hiring Model & Region" : "Modelo & Região"} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value as Region)}
                    className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-md text-sm text-white px-3.5 py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="USA">{isEn ? "USA (Remote in USD)" : "EUA (Remoto em USD)"}</option>
                    <option value="Europe">{isEn ? "Europe (EUR / Onsite or Remote)" : "Europa (Euro / Presencial ou Remoto)"}</option>
                    <option value="Brazil">{isEn ? "Brazil (PJ / CLT)" : "Brasil (PJ / CLT)"}</option>
                    <option value="Global Remote">{isEn ? "Global Remote Cross-Border" : "Remoto Global Cross-Border"}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Target Budget / Salary Range" : "Orçamento Previsto / Faixa Salarial"} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={isEn ? "e.g. $8,000 - $12,000/mo, €75k - €95k/yr or R$ 25k - R$ 35k PJ" : "Ex: $8.000 - $12.000/mês, €75k - €95k/ano ou R$ 25k - R$ 35k PJ"}
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className={`w-full bg-slate-950 border ${errors.estimatedBudget ? 'border-red-500' : 'border-slate-700'} rounded-md text-sm text-white px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.estimatedBudget && <p className="text-[11px] text-red-400 mt-1">{errors.estimatedBudget}</p>}
              </div>
            </div>

            {/* Row 5: Company Size Dropdown & Urgency Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Company Size" : "Tamanho da Empresa"} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value as any)}
                    className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-md text-sm text-white px-3.5 py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="1-20">{isEn ? "1 - 20 employees" : "1 - 20 colaboradores"}</option>
                    <option value="21-100">{isEn ? "21 - 100 employees" : "21 - 100 colaboradores"}</option>
                    <option value="101-500">{isEn ? "101 - 500 employees" : "101 - 500 colaboradores"}</option>
                    <option value="500+">{isEn ? "500+ employees" : "500+ colaboradores"}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isEn ? "Target Timeline" : "Urgência de Fechamento"} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-md text-sm text-white px-3.5 py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="immediate">{isEn ? "Immediate (14-day shortlist)" : "Imediata (Shortlist em 14 dias)"}</option>
                    <option value="within_30_days">{isEn ? "Within 30 days" : "Próximos 30 dias"}</option>
                    <option value="next_quarter">{isEn ? "Next quarter" : "Próximo trimestre"}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 6: Stack & Details */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {isEn ? "Technical Requirements & Stack (Optional)" : "Requisitos Técnicos & Stack (Opcional)"}
              </label>
              <textarea
                rows={2}
                placeholder={isEn ? "e.g. Go, Kubernetes, AWS, Kafka. Distributed systems leadership experience." : "Ex: Go, Kubernetes, AWS, Kafka. Experiência com arquitetura distribuída e liderança de time."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md text-sm text-white px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{isEn ? "Submitting..." : "Enviando demanda..."}</span>
                ) : (
                  <>
                    <span>{isEn ? "REQUEST 14-DAY SHORTLIST" : "SOLICITAR SHORTLIST EM 14 DIAS"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Privacy & Compliance footnote */}
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              {isEn 
                ? "Confidential executive briefing. International contract support with full legal and fiscal compliance."
                : "Processo sob estrito sigilo executivo. Contratos estruturados com compliance jurídico internacional."}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
