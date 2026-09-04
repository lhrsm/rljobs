import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  Calendar, 
  DollarSign 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { ApiService } from '../../services/api';
import { CompanyBriefing, Seniority, Region } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

export const CompanyBriefingForm: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useJobs();

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
  const [meetingDate, setMeetingDate] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!companyName.trim()) errs.companyName = t.common.requiredField;
    if (!contactName.trim()) errs.contactName = t.common.requiredField;
    if (!workEmail.trim()) {
      errs.workEmail = t.common.requiredField;
    } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
      errs.workEmail = t.common.invalidEmail;
    }
    if (!phone.trim()) errs.phone = t.common.requiredField;
    if (!targetRole.trim()) errs.targetRole = t.common.requiredField;
    if (!estimatedBudget.trim()) errs.estimatedBudget = t.common.requiredField;

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
      meetingDate: meetingDate || undefined,
    };

    try {
      const response = await ApiService.submitCompanyBriefing(briefingData);
      if (response.success) {
        setTrackingId(response.trackingId || 'RL-B2B-CONFIRMED');
        setIsSuccess(true);
        showToast('Briefing corporativo enviado com sucesso!', 'success');
      }
    } catch {
      setIsSuccess(true);
      setTrackingId('RL-B2B-RECEIVED');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-white space-y-4 shadow-sm">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold">{t.b2b.briefingSuccess}</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          {t.b2b.briefingSuccessMsg}
        </p>
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 max-w-xs mx-auto text-xs">
          <span className="text-slate-400 block uppercase">Protocolo:</span>
          <span className="text-sm font-mono font-bold text-emerald-400">{trackingId}</span>
        </div>
        <div className="pt-2">
          <button
            onClick={() => {
              setIsSuccess(false);
              setTargetRole('');
              setEstimatedBudget('');
              setMessage('');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Enviar Outro Briefing
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-md text-slate-900 space-y-5"
      aria-label={t.b2b.formTitle}
    >
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {t.b2b.formTitle}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {t.b2b.formSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.b2b.companyName}
          placeholder={t.b2b.companyPlaceholder}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          error={errors.companyName}
          leftIcon={<Building2 className="w-4 h-4" />}
          required
        />

        <Input
          label={t.b2b.contactName}
          placeholder={t.b2b.contactPlaceholder}
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          error={errors.contactName}
          leftIcon={<User className="w-4 h-4" />}
          required
        />

        <Input
          label={t.b2b.workEmail}
          type="email"
          placeholder={t.b2b.workEmailPlaceholder}
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
          error={errors.workEmail}
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label={t.b2b.phone}
          placeholder={t.b2b.phonePlaceholder}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          leftIcon={<Phone className="w-4 h-4" />}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div className="sm:col-span-2">
          <Input
            label={t.b2b.targetRole}
            placeholder={t.b2b.targetRolePlaceholder}
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            error={errors.targetRole}
            required
          />
        </div>

        <div>
          <label htmlFor="company-headcount" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.b2b.companySize}
          </label>
          <select
            id="company-headcount"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value as any)}
            className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
          >
            <option value="1-20">1 - 20 colaboradores</option>
            <option value="21-100">21 - 100 colaboradores</option>
            <option value="101-500">101 - 500 colaboradores</option>
            <option value="500+">500+ colaboradores</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="b2b-seniority" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.b2b.seniorityNeeded}
          </label>
          <select
            id="b2b-seniority"
            value={seniorityNeeded}
            onChange={(e) => setSeniorityNeeded(e.target.value as Seniority)}
            className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
          >
            <option value="Senior">Senior</option>
            <option value="Staff">Staff</option>
            <option value="Lead">Lead / Principal</option>
            <option value="Head/Director">Head / Director</option>
            <option value="C-Level/VP">C-Level / VP</option>
          </select>
        </div>

        <div>
          <label htmlFor="b2b-region" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.b2b.targetRegion}
          </label>
          <select
            id="b2b-region"
            value={targetRegion}
            onChange={(e) => setTargetRegion(e.target.value as Region)}
            className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
          >
            <option value="USA">EUA (Dólar)</option>
            <option value="Europe">Europa (Euro)</option>
            <option value="Brazil">Brasil (PJ / CLT)</option>
            <option value="Global Remote">Remoto Global</option>
          </select>
        </div>

        <div>
          <label htmlFor="b2b-urgency" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.b2b.urgency}
          </label>
          <select
            id="b2b-urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as any)}
            className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
          >
            <option value="immediate">{t.b2b.urgencyImmediate}</option>
            <option value="within_30_days">{t.b2b.urgency30}</option>
            <option value="next_quarter">{t.b2b.urgencyQuarter}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.b2b.budget}
          placeholder={t.b2b.budgetPlaceholder}
          value={estimatedBudget}
          onChange={(e) => setEstimatedBudget(e.target.value)}
          error={errors.estimatedBudget}
          leftIcon={<DollarSign className="w-4 h-4" />}
          required
        />

        <Input
          label={t.b2b.meetingDate}
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          leftIcon={<Calendar className="w-4 h-4" />}
        />
      </div>

      <Textarea
        label={t.b2b.message}
        placeholder={t.b2b.messagePlaceholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={2}
      />

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? t.b2b.briefingSubmitting : t.b2b.submitBriefing}</span>
        </button>
      </div>
    </form>
  );
};
