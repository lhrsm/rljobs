import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  DollarSign, 
  Globe 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { ApiService } from '../../services/api';
import { CandidateApplication, Currency } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

export const QuickApplyModal: React.FC = () => {
  const { t } = useLanguage();
  const { isApplyModalOpen, closeApplyModal, selectedJobForApply, showToast } = useJobs();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubOrPortfolio, setGithubOrPortfolio] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('5');
  const [englishLevel, setEnglishLevel] = useState<'fluent_native' | 'advanced' | 'intermediate'>('fluent_native');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState<Currency>(selectedJobForApply?.salary.currency || 'USD');
  const [salaryPeriod, setSalaryPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [contractPreference, setContractPreference] = useState<'remote_international' | 'relocation' | 'national_pj_clt' | 'open_to_all'>('remote_international');
  const [coverNote, setCoverNote] = useState('');

  // File Upload State
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status & Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTrackingId, setSubmittedTrackingId] = useState<string | null>(null);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setLinkedinUrl('');
    setGithubOrPortfolio('');
    setCurrentRole('');
    setYearsOfExperience('5');
    setEnglishLevel('fluent_native');
    setSalaryAmount('');
    setSalaryCurrency('USD');
    setSalaryPeriod('yearly');
    setContractPreference('remote_international');
    setCoverNote('');
    setResumeFile(null);
    setRawFile(null);
    setErrors({});
    setSubmittedTrackingId(null);
  };

  const handleClose = () => {
    resetForm();
    closeApplyModal();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const validExtensions = ['.pdf', '.docx', '.doc'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setErrors(prev => ({ ...prev, resume: 'Por favor, selecione um arquivo em formato PDF ou DOCX.' }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'O arquivo não pode exceder 10MB.' }));
      return;
    }

    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    setResumeFile({ name: file.name, size: sizeFormatted });
    setRawFile(file);
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.resume;
      return copy;
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = t.common.requiredField;
    if (!email.trim()) {
      errs.email = t.common.requiredField;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'E-mail inválido';
    }
    if (!phone.trim()) errs.phone = t.common.requiredField;
    if (!linkedinUrl.trim()) {
      errs.linkedinUrl = t.common.requiredField;
    } else if (!linkedinUrl.includes('linkedin.com')) {
      errs.linkedinUrl = 'Insira uma URL válida do LinkedIn';
    }
    if (!currentRole.trim()) errs.currentRole = t.common.requiredField;
    if (!salaryAmount.trim()) errs.salaryAmount = t.common.requiredField;
    if (!resumeFile) errs.resume = 'O envio do currículo em PDF/DOCX é obrigatório.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    let base64String: string | undefined = undefined;
    if (rawFile) {
      try {
        base64String = await fileToBase64(rawFile);
      } catch (err) {
        console.error('Falha ao processar arquivo Base64:', err);
      }
    }

    const applicationPayload: CandidateApplication = {
      jobId: selectedJobForApply?.id,
      jobTitle: selectedJobForApply?.title || 'Banco de Talentos Executivo Geral',
      fullName,
      email,
      phone,
      linkedinUrl,
      githubOrPortfolio: githubOrPortfolio || undefined,
      currentRole,
      yearsOfExperience: parseInt(yearsOfExperience, 10) || 5,
      englishLevel,
      salaryExpectation: {
        amount: salaryAmount,
        currency: salaryCurrency,
        period: salaryPeriod,
      },
      preferredContract: contractPreference,
      resumeFileName: resumeFile?.name,
      resumeFileSize: resumeFile?.size,
      resumeBase64: base64String,
      resumeMimeType: rawFile?.type || 'application/pdf',
      coverNote: coverNote || undefined,
    };

    try {
      const response = await ApiService.submitApplication(applicationPayload);
      if (response.success) {
        setSubmittedTrackingId(response.trackingId || 'RL-APP-CONFIRMED');
        showToast('Candidatura enviada com sucesso para Ricardo Oliveira!', 'success');
      }
    } catch {
      setSubmittedTrackingId('RL-APP-SUBMITTED');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isApplyModalOpen}
      onClose={handleClose}
      maxWidth="3xl"
      title={selectedJobForApply ? `${t.applyModal.title}: ${selectedJobForApply.title}` : t.applyModal.generalTitle}
      subtitle={selectedJobForApply ? t.applyModal.subtitle : t.applyModal.generalSubtitle}
    >
      {submittedTrackingId ? (
        /* Success Confirmation View */
        <div className="py-6 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              {t.applyModal.successTitle}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
              {t.applyModal.successMessage}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block text-left max-w-md w-full">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.applyModal.trackingCode}
            </div>
            <div className="text-lg font-mono font-bold text-blue-700 mt-0.5">
              {submittedTrackingId}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
              <strong>Posição:</strong> {selectedJobForApply ? selectedJobForApply.title : 'Banco de Talentos Executivo'}
            </div>
          </div>

          <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-left max-w-md mx-auto space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              {t.applyModal.nextStepsTitle}
            </h4>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li>{t.applyModal.nextStep1}</li>
              <li>{t.applyModal.nextStep2}</li>
              <li>{t.applyModal.nextStep3}</li>
            </ul>
          </div>

          {/* Direct WhatsApp ping button */}
          <div className="pt-2 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/351926527934?text=${encodeURIComponent(`Olá Ricardo! Acabei de me candidatar à vaga ${selectedJobForApply ? selectedJobForApply.title : 'Banco de Talentos'} pelo site. Meu protocolo é ${submittedTrackingId}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#075E54] hover:bg-[#054c44] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>Avisar Ricardo no WhatsApp</span>
            </a>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-5 py-3 text-xs font-bold"
            >
              {t.applyModal.closeBtn}
            </Button>
          </div>
        </div>
      ) : (
        /* Application Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Personal Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {t.applyModal.step1Title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.applyModal.fullName}
                placeholder={t.applyModal.fullNamePlaceholder}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                leftIcon={<User className="w-4 h-4" />}
                required
              />

              <Input
                label={t.applyModal.email}
                type="email"
                placeholder={t.applyModal.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label={t.applyModal.phone}
                placeholder={t.applyModal.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                leftIcon={<Phone className="w-4 h-4" />}
                required
              />

              <Input
                label={t.applyModal.linkedin}
                placeholder={t.applyModal.linkedinPlaceholder}
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                error={errors.linkedinUrl}
                leftIcon={<Linkedin className="w-4 h-4" />}
                required
              />
            </div>
          </div>

          {/* Section 2: Role & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div className="md:col-span-2">
              <Input
                label={t.applyModal.currentRole}
                placeholder={t.applyModal.currentRolePlaceholder}
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                error={errors.currentRole}
                required
              />
            </div>

            <div>
              <Input
                label={t.applyModal.yearsExp}
                type="number"
                min="1"
                max="35"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-3">
              <Input
                label={t.applyModal.github}
                placeholder={t.applyModal.githubPlaceholder}
                value={githubOrPortfolio}
                onChange={(e) => setGithubOrPortfolio(e.target.value)}
                leftIcon={<Globe className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* Section 3: English & Salary */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label htmlFor="english-level" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.applyModal.englishLevel}
              </label>
              <select
                id="english-level"
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
              >
                <option value="fluent_native">{t.applyModal.englishFluent}</option>
                <option value="advanced">{t.applyModal.englishAdvanced}</option>
                <option value="intermediate">{t.applyModal.englishInter}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Input
                  label={t.applyModal.salaryExpectation}
                  placeholder={t.applyModal.salaryPlaceholder}
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(e.target.value)}
                  error={errors.salaryAmount}
                  leftIcon={<DollarSign className="w-4 h-4" />}
                  required
                />
              </div>

              <div>
                <label htmlFor="salary-currency" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.applyModal.salaryCurrency}
                </label>
                <select
                  id="salary-currency"
                  value={salaryCurrency}
                  onChange={(e) => setSalaryCurrency(e.target.value as Currency)}
                  className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="USD">USD ($ Dólar)</option>
                  <option value="EUR">EUR (€ Euro)</option>
                  <option value="BRL">BRL (R$ Reais)</option>
                </select>
              </div>

              <div>
                <label htmlFor="salary-period" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.applyModal.salaryPeriod}
                </label>
                <select
                  id="salary-period"
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="yearly">{t.applyModal.yearly}</option>
                  <option value="monthly">{t.applyModal.monthly}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contract-pref" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.applyModal.contractPreference}
              </label>
              <select
                id="contract-pref"
                value={contractPreference}
                onChange={(e) => setContractPreference(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
              >
                <option value="remote_international">{t.applyModal.remoteIntl}</option>
                <option value="relocation">{t.applyModal.relocation}</option>
                <option value="national_pj_clt">{t.applyModal.nationalOnly}</option>
                <option value="open_to_all">{t.applyModal.openToAll}</option>
              </select>
            </div>
          </div>

          {/* Section 4: Resume Drag & Drop Upload */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.applyModal.resumeUpload}
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc"
              className="hidden"
            />

            {!resumeFile ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-150 ${
                  isDragging
                    ? 'border-blue-600 bg-blue-50/50'
                    : errors.resume
                    ? 'border-red-400 bg-red-50/20 hover:border-red-500'
                    : 'border-slate-300 hover:border-blue-500 bg-slate-50/60'
                }`}
                tabIndex={0}
                role="button"
                aria-label="Upload do currículo"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">
                  {t.applyModal.dragDropText}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {t.applyModal.fileLimit}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-700" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{resumeFile.name}</p>
                    <p className="text-xs text-slate-500">{resumeFile.size}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors focus-ring"
                  aria-label={t.applyModal.removeFile}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            {errors.resume && (
              <p className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
                {errors.resume}
              </p>
            )}
          </div>

          {/* Section 5: Cover Note */}
          <div>
            <Textarea
              label={t.applyModal.coverNote}
              placeholder={t.applyModal.coverNotePlaceholder}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              rows={3}
            />
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>{t.applyModal.privacyNotice}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {t.applyModal.cancel}
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
            >
              {isSubmitting ? t.applyModal.submitting : t.applyModal.submitBtn}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
