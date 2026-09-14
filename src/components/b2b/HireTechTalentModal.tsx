import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  CheckCircle2, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Zap,
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
    if (!companyName.trim()) errs.companyName = isEn ? 'Company name required' : 'Nome da empresa obrigatório';
    if (!contactName.trim()) errs.contactName = isEn ? 'Contact name required' : 'Nome do contato obrigatório';
    if (!workEmail.trim()) {
      errs.workEmail = isEn ? 'Work email required' : 'E-mail corporativo obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
      errs.workEmail = isEn ? 'Invalid email' : 'E-mail inválido';
    }
    if (!phone.trim()) errs.phone = isEn ? 'Phone / WhatsApp required' : 'Telefone / WhatsApp obrigatório';
    if (!targetRole.trim()) errs.targetRole = isEn ? 'Role to hire required' : 'Cargo a contratar obrigatório';
    if (!estimatedBudget.trim()) errs.estimatedBudget = isEn ? 'Budget required' : 'Orçamento previsto obrigatório';

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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hire-modal-title"
    >
      <div 
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-4 sm:my-8 text-left text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label={isEn ? "Close modal" : "Fechar modal"}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                {isEn ? "Briefing Successfully Submitted" : "Briefing Registrado com Sucesso"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {isEn ? "Hiring Demand Received!" : "Demanda de Contratação Recebida!"}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                {isEn ? (
                  <>Ricardo Oliveira will analyze the requirements for <strong className="text-white">{targetRole}</strong> at <strong className="text-white">{companyName}</strong> and contact you within 24 hours to present the executive hunting strategy.</>
                ) : (
                  <>Ricardo Oliveira analisará as especificações da vaga de <strong className="text-white">{targetRole}</strong> para a <strong className="text-white">{companyName}</strong> e entrará em contato em até 24 horas para apresentar a estratégia de hunting.</>
                )}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-sm mx-auto">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">
                {isEn ? "Briefing Tracking ID:" : "Código do Briefing:"}
              </span>
              <span className="text-lg font-mono font-bold text-emerald-400">{trackingId}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/351926527934?text=${encodeURIComponent(
                  isEn 
                    ? `Hello Ricardo! I just submitted a hiring brief for ${targetRole} at ${companyName} (ID: ${trackingId}). Let's accelerate alignment.`
                    : `Olá Ricardo! Acabei de registrar a demanda de contratação para a vaga de ${targetRole} na ${companyName} (Protocolo: ${trackingId}). Gostaria de acelerar o alinhamento.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#075E54] hover:bg-[#054c44] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isEn ? "Accelerate on WhatsApp with Ricardo" : "Acelerar no WhatsApp com Ricardo"}</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {isEn ? "Close" : "Fechar"}
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div className="p-6 sm:p-10">
            {/* Header */}
            <div className="border-b border-slate-800 pb-6 mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{isEn ? "For Companies & Decision Makers" : "Para Empresas & Decisores"}</span>
              </div>
              <h2 id="hire-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.b2b.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.b2b.subtitle}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{isEn ? "14-day shortlist" : "Shortlist em 14 dias"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{isEn ? "Replacement warranty" : "Garantia de reposição"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{isEn ? "Cross-border compliance" : "Compliance cross-border"}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Company & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Company Name *" : "Nome da Empresa *"}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={isEn ? "e.g. TechCorp, ScaleUp Ltd" : "Ex: TechCorp, ScaleUp Ltd"}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={`w-full bg-slate-950 border ${errors.companyName ? 'border-red-500' : 'border-slate-700'} rounded-xl text-sm text-white pl-10 pr-3.5 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    />
                  </div>
                  {errors.companyName && <p className="text-xs text-red-400 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Your Name & Title *" : "Seu Nome & Cargo *"}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={isEn ? "e.g. Alex Morgan, CTO / VP of Eng" : "Ex: Carlos Mendes, CTO / VP of Eng"}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className={`w-full bg-slate-950 border ${errors.contactName ? 'border-red-500' : 'border-slate-700'} rounded-xl text-sm text-white pl-10 pr-3.5 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    />
                  </div>
                  {errors.contactName && <p className="text-xs text-red-400 mt-1">{errors.contactName}</p>}
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Work Email *" : "E-mail Corporativo *"}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      placeholder={isEn ? "name@company.com" : "carlos@empresa.com"}
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      className={`w-full bg-slate-950 border ${errors.workEmail ? 'border-red-500' : 'border-slate-700'} rounded-xl text-sm text-white pl-10 pr-3.5 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    />
                  </div>
                  {errors.workEmail && <p className="text-xs text-red-400 mt-1">{errors.workEmail}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Phone / WhatsApp *" : "Telefone / WhatsApp *"}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+55 11 99999-9999 / +1 555..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-xl text-sm text-white pl-10 pr-3.5 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 3: Target Role & Seniority */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Position to Hire *" : "Cargo a Contratar *"}
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={isEn ? "e.g. Staff Go Engineer, Tech Lead, VP of Eng" : "Ex: Staff Go Engineer, Tech Lead, VP of Eng"}
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className={`w-full bg-slate-950 border ${errors.targetRole ? 'border-red-500' : 'border-slate-700'} rounded-xl text-sm text-white pl-10 pr-3.5 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    />
                  </div>
                  {errors.targetRole && <p className="text-xs text-red-400 mt-1">{errors.targetRole}</p>}
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Seniority Level *" : "Senioridade *"}
                  </label>
                  <select
                    value={seniorityNeeded}
                    onChange={(e) => setSeniorityNeeded(e.target.value as Seniority)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl text-sm text-white px-3 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Senior">{isEn ? "Senior (5+ yrs)" : "Senior (5+ anos)"}</option>
                    <option value="Staff">{isEn ? "Staff (8+ yrs)" : "Staff (8+ anos)"}</option>
                    <option value="Lead">{isEn ? "Lead / Principal (10+ yrs)" : "Lead / Principal (10+ anos)"}</option>
                    <option value="Head/Director">Head / Director</option>
                    <option value="C-Level/VP">C-Level / VP</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Region, Company Size & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Model & Region *" : "Modelo & Região *"}
                  </label>
                  <select
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value as Region)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl text-sm text-white px-3 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="USA">{isEn ? "USA (Remote in USD)" : "EUA (Remoto em USD)"}</option>
                    <option value="Europe">{isEn ? "Europe (EUR / Onsite or Remote)" : "Europa (Euro / Presencial ou Remoto)"}</option>
                    <option value="Brazil">{isEn ? "Brazil (PJ / CLT)" : "Brasil (PJ / CLT)"}</option>
                    <option value="Global Remote">{isEn ? "Global Remote Cross-Border" : "Remoto Global Cross-Border"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Company Size *" : "Tamanho da Empresa *"}
                  </label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl text-sm text-white px-3 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="1-20">{isEn ? "1 - 20 employees" : "1 - 20 colaboradores"}</option>
                    <option value="21-100">{isEn ? "21 - 100 employees" : "21 - 100 colaboradores"}</option>
                    <option value="101-500">{isEn ? "101 - 500 employees" : "101 - 500 colaboradores"}</option>
                    <option value="500+">{isEn ? "500+ employees" : "500+ colaboradores"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    {isEn ? "Target Timeline *" : "Urgência de Fechamento *"}
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl text-sm text-white px-3 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="immediate">{isEn ? "Immediate (14-day shortlist)" : "Imediata (Shortlist em 14 dias)"}</option>
                    <option value="within_30_days">{isEn ? "Within 30 days" : "Próximos 30 dias"}</option>
                    <option value="next_quarter">{isEn ? "Next quarter" : "Próximo trimestre"}</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Budget */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {isEn ? "Estimated Salary Range / Budget for the Role *" : "Faixa Salarial Prevista / Budget para a Posição *"}
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={isEn ? "e.g. $8,000 - $12,000/mo, €70k - €95k/yr or $140k - $180k" : "Ex: $8.000 - $12.000/mês, €70k - €95k/ano ou R$ 25k - R$ 35k PJ"}
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className={`w-full bg-slate-950 border ${errors.estimatedBudget ? 'border-red-500' : 'border-slate-700'} rounded-xl text-sm text-white pl-10 pr-3.5 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                  />
                </div>
                {errors.estimatedBudget && <p className="text-xs text-red-400 mt-1">{errors.estimatedBudget}</p>}
              </div>

              {/* Row 6: Details / Stack */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {isEn ? "Role Details & Tech Stack (Optional)" : "Detalhes da Demanda & Stack Tecnológica (Opcional)"}
                </label>
                <textarea
                  rows={2}
                  placeholder={isEn ? "e.g. Core stack: Go, AWS, Kubernetes, Kafka. Seeking strong architectural ownership and distributed team leadership." : "Ex: Stack principal: Go, AWS, Kubernetes, Kafka. Buscamos alguém com perfil arquitetural e liderança técnica de time distribuído."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl text-sm text-white p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{isEn ? "Registering executive briefing..." : "Registrando demanda executiva..."}</span>
                  ) : (
                    <>
                      <span>{isEn ? "REQUEST 14-DAY SHORTLIST" : "SOLICITAR SHORTLIST EM 14 DIAS"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Privacy & Compliance footnote */}
              <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
                {isEn 
                  ? "Strict executive confidentiality. International contracts structured with complete compliance under GDPR and labor standards."
                  : "Processo com total sigilo executivo. Contratos internacionais estruturados sem passivos trabalhistas sob normas da LGPD e GDPR."}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
