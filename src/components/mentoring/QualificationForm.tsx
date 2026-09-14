import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Briefcase, 
  Globe, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  Check
} from 'lucide-react';
import { 
  MentoringFormData, 
  YearsExperience, 
  CurrentSeniority, 
  CitizenshipStatus, 
  WorkRightStatus, 
  MigrationDocument, 
  EnglishLevel, 
  ProfessionalStatus, 
  WorkModelDesired, 
  RelocationAvailability 
} from '../../types/mentoring';
import { saveMentoringLead } from '../../services/mentoringService';
import { useLanguage } from '../../context/LanguageContext';

interface QualificationFormProps {
  onSuccess: (submission: ReturnType<typeof saveMentoringLead>) => void;
  isInsideModal?: boolean;
}

export const QualificationForm: React.FC<QualificationFormProps> = ({ onSuccess, isInsideModal = false }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<MentoringFormData>({
    fullName: '',
    email: '',
    phoneWhatsApp: '',
    linkedinUrl: '',
    currentRole: '',
    professionalArea: 'Tecnologia / Engenharia de Software',
    yearsExperience: '5-7',
    currentSeniority: 'Sênior',
    currentCountry: 'Brasil',
    targetMarkets: ['Portugal', 'Espanha'],
    citizenshipStatus: 'Brasileira',
    workRightTargetMarket: 'Sim',
    migrationDocument: 'Cidadania',
    migrationProcessEta: '',
    englishLevel: 'B2',
    otherLanguages: '',
    professionalStatus: 'Empregado',
    currentSalary: '',
    targetSalary: '€ 4.500 / mês',
    workModel: 'Hybrid',
    relocationAvailability: '30 dias',
    mainRelocationChallenge: '',
    cvFileName: '',
    cvFileSize: 0,
    commercialReadiness: 'ready_to_invest',
    privacyConsent: false,
  });

  const availableMarkets = [
    'Portugal',
    'Espanha',
    'Reino Unido',
    'Europa Geral',
    'Brasil',
    'EUA / Canadá',
    'Global Remote',
  ];

  const steps = [
    { number: 1, title: isEn ? 'Identification' : 'Identificação' },
    { number: 2, title: isEn ? 'Career' : 'Carreira' },
    { number: 3, title: isEn ? 'Documents' : 'Documentação' },
    { number: 4, title: isEn ? 'Finalization' : 'Finalização' },
  ];

  const handleTargetMarketToggle = (market: string) => {
    setFormData((prev) => {
      const exists = prev.targetMarkets.includes(market);
      if (exists) {
        if (prev.targetMarkets.length === 1) return prev; // manter pelo menos 1
        return { ...prev, targetMarkets: prev.targetMarkets.filter((m) => m !== market) };
      } else {
        return { ...prev, targetMarkets: [...prev.targetMarkets, market] };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['.pdf', '.docx', '.doc'];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!validExtensions.includes(ext)) {
        setErrorMessage(isEn ? 'Please upload your CV in PDF or DOCX format.' : 'Por favor, envie o currículo em formato PDF ou DOCX.');
        return;
      }
      setErrorMessage(null);
      setFormData((prev) => ({
        ...prev,
        cvFileName: file.name,
        cvFileSize: file.size,
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    setErrorMessage(null);
    if (step === 1) {
      if (!formData.fullName.trim()) {
        setErrorMessage(isEn ? 'Please provide your full name.' : 'Por favor, informe seu nome completo.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMessage(isEn ? 'Please enter a valid work or personal email.' : 'Por favor, insira um e-mail corporativo ou pessoal válido.');
        return false;
      }
      if (!formData.phoneWhatsApp.trim()) {
        setErrorMessage(isEn ? 'Please provide your WhatsApp with country code (e.g., +351 or +1).' : 'Por favor, informe seu WhatsApp com código do país (ex: +351 ou +55).');
        return false;
      }
      if (!formData.linkedinUrl.trim()) {
        setErrorMessage(isEn ? 'Please provide your LinkedIn profile URL.' : 'Por favor, informe a URL do seu perfil no LinkedIn.');
        return false;
      }
      if (!formData.currentCountry.trim()) {
        setErrorMessage(isEn ? 'Please indicate your current country of residence.' : 'Por favor, informe o país onde você reside atualmente.');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.currentRole.trim()) {
        setErrorMessage(isEn ? 'Please state your current or most recent role.' : 'Por favor, informe seu cargo atual ou último cargo.');
        return false;
      }
      if (!formData.professionalArea.trim()) {
        setErrorMessage(isEn ? 'Please select or provide your professional area.' : 'Por favor, selecione ou informe sua área profissional.');
        return false;
      }
      if (!formData.mainRelocationChallenge.trim() || formData.mainRelocationChallenge.length < 15) {
        setErrorMessage(isEn ? 'Please describe in a few words your primary challenge in international job hunting.' : 'Por favor, descreva em algumas palavras sua principal dificuldade ou desafio na recolocação internacional.');
        return false;
      }
    }

    if (step === 3) {
      if (formData.targetMarkets.length === 0) {
        setErrorMessage(isEn ? 'Select at least one target country or market of interest.' : 'Selecione pelo menos um país ou mercado-alvo de interesse.');
        return false;
      }
      const isDocInProcess = formData.workRightTargetMarket === 'Em processo' || formData.migrationDocument === 'Em processo';
      if (isDocInProcess && !formData.migrationProcessEta?.trim()) {
        setErrorMessage(isEn ? 'Since your documentation is in process, please provide an estimated completion timeline.' : 'Como sua documentação está em processo, por favor informe a previsão estimada de conclusão.');
        return false;
      }
    }

    if (step === 4) {
      if (!formData.targetSalary.trim()) {
        setErrorMessage(isEn ? 'Please provide your target compensation (amount, currency & period).' : 'Por favor, informe sua remuneração pretendida (valor, moeda e periodicidade).');
        return false;
      }
      if (!formData.cvFileName) {
        setErrorMessage(isEn ? 'Uploading your CV (PDF or DOCX) is required for profile assessment.' : 'O upload do currículo (PDF ou DOCX) é obrigatório para avaliação do perfil.');
        return false;
      }
      if (!formData.privacyConsent) {
        setErrorMessage(isEn ? 'You must consent to data processing to proceed.' : 'Você deve autorizar o consentimento para tratamento dos dados para avançar.');
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
      window.scrollTo({ top: document.getElementById('pre-qualificacao')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const submission = saveMentoringLead(formData);
      setIsSubmitting(false);
      onSuccess(submission);
    }, 600);
  };

  const isProcessConditionalActive =
    formData.workRightTargetMarket === 'Em processo' || formData.migrationDocument === 'Em processo';

  const content = (
    <div className={isInsideModal ? "text-left text-slate-900" : "bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 text-left text-slate-900"}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
          {isEn ? "Confidential Assessment" : "Avaliação Confidencial"}
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? "Pre-Qualification Form" : "Formulário de Pré-Qualificação"}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
          {isEn 
            ? "Complete the details below so RL Headhunter leadership can assess the feasibility of your transition and alignment with your target international markets."
            : "Preencha os dados abaixo para que a liderança da RL Headhunter avalie a viabilidade da sua transição e a aderência aos mercados internacionais desejados."}
        </p>
      </div>
          
      {/* Stepper with Circles (Bolinhas cinzentas -> azul na etapa -> verde com check ao finalizar) */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <React.Fragment key={step.number}>
                {/* Circle & Label */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs'
                        : 'bg-slate-100 border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-[11px] sm:text-xs tracking-tight transition-colors hidden sm:block whitespace-nowrap ${
                      isCompleted
                        ? 'text-emerald-700 font-semibold'
                        : isCurrent
                        ? 'text-blue-600 font-bold'
                        : 'text-slate-400 font-medium'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-3 -mt-5 sm:-mt-6">
                    <div
                      className={`h-0.5 sm:h-1 w-full rounded-full transition-all duration-300 ${
                        currentStep > step.number ? 'bg-emerald-600' : 'bg-slate-200'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile current step indicator */}
        <div className="mt-3 text-center sm:hidden">
          <span className="text-xs font-semibold text-slate-500">
            {isEn ? `Step ${currentStep} of 4: ` : `Etapa ${currentStep} de 4: `}
            <span className="text-blue-600 font-bold">{steps[currentStep - 1].title}</span>
          </span>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* STEP 1: Dados de Contato e Identificação */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>{isEn ? "Contact & Identification Data" : "Dados de Contato & Identificação"}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn ? "Information for official communication and assessment delivery." : "Informações para comunicação oficial e envio do diagnóstico."}
              </p>
            </div>

            {/* 1. Nome completo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isEn ? "1. Full Name" : "1. Nome Completo"} <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={isEn ? "e.g. John Doe" : "Ex: Carlos Eduardo Silva"}
                className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 2. E-mail */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? "2. Work or Personal Email" : "2. E-mail Profissional"} <span className="text-blue-600">*</span></span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={isEn ? "john@example.com" : "carlos@exemplo.com"}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>

              {/* 3. WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? "3. WhatsApp with Country Code" : "3. WhatsApp com DDI"} <span className="text-blue-600">*</span></span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneWhatsApp}
                  onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                  placeholder={isEn ? "+1 555 123 4567 or +351 912 345 678" : "+351 912 345 678 ou +55 11 99999-9999"}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 4. LinkedIn */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? "4. LinkedIn Profile URL" : "4. Link do seu LinkedIn"} <span className="text-blue-600">*</span></span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/seuperfil"
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>

              {/* 9. País de residência atual */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "9. Current Country of Residence" : "9. País onde reside atualmente"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.currentCountry}
                  onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Brasil">{isEn ? "Brazil" : "Brasil"}</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Espanha">{isEn ? "Spain" : "Espanha"}</option>
                  <option value="Reino Unido">{isEn ? "United Kingdom" : "Reino Unido"}</option>
                  <option value="Alemanha">{isEn ? "Germany" : "Alemanha"}</option>
                  <option value="França">{isEn ? "France" : "França"}</option>
                  <option value="Irlanda">{isEn ? "Ireland" : "Irlanda"}</option>
                  <option value="Holanda">{isEn ? "Netherlands" : "Holanda"}</option>
                  <option value="Itália">{isEn ? "Italy" : "Itália"}</option>
                  <option value="Estados Unidos">{isEn ? "United States" : "Estados Unidos"}</option>
                  <option value="Canadá">{isEn ? "Canada" : "Canadá"}</option>
                  <option value="Outro">{isEn ? "Other country" : "Outro país"}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Carreira & Senioridade */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>{isEn ? "Career & Seniority" : "Carreira & Senioridade"}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn 
                  ? "Assessment of your technical positioning and professional maturity."
                  : "Avaliação do seu posicionamento técnico e maturidade profissional."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 5. Cargo atual / último */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "5. Current or Most Recent Role" : "5. Cargo Atual ou Último Cargo"} <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  placeholder={isEn ? "e.g. Senior Software Engineer, Head of Tech, Tech Lead..." : "Ex: Senior Software Engineer, Head of Tech, Tech Lead..."}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>

              {/* 6. Área profissional */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "6. Professional Area" : "6. Área Profissional"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.professionalArea}
                  onChange={(e) => setFormData({ ...formData, professionalArea: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Tecnologia / Engenharia de Software">{isEn ? "Technology / Software Engineering" : "Tecnologia / Engenharia de Software"}</option>
                  <option value="Inteligência Artificial & Machine Learning">{isEn ? "AI & Machine Learning" : "Inteligência Artificial & Machine Learning"}</option>
                  <option value="Arquitetura de Soluções & Cloud (DevOps)">{isEn ? "Solutions Architecture & Cloud (DevOps)" : "Arquitetura de Soluções & Cloud (DevOps)"}</option>
                  <option value="Data Science, Analytics & Big Data">{isEn ? "Data Science, Analytics & Big Data" : "Data Science, Analytics & Big Data"}</option>
                  <option value="Cybersecurity & Governança">{isEn ? "Cybersecurity & Governance" : "Cybersecurity & Governança"}</option>
                  <option value="Product Management & UX">{isEn ? "Product Management & UX" : "Product Management & UX"}</option>
                  <option value="Liderança Executiva (CTO / VP / Diretor)">{isEn ? "Executive Leadership (CTO / VP / Director)" : "Liderança Executiva (CTO / VP / Diretor)"}</option>
                  <option value="Consultoria / FinTech / Gestão">{isEn ? "Consulting / FinTech / Management" : "Consultoria / FinTech / Gestão"}</option>
                  <option value="Outra Área Estratégica">{isEn ? "Other Strategic Area" : "Outra Área Estratégica"}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 7. Anos de experiência */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "7. Years of Experience" : "7. Anos de Experiência"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value as YearsExperience })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="0-2">{isEn ? "0 to 2 years" : "0 a 2 anos (Inicial)"}</option>
                  <option value="3-4">{isEn ? "3 to 4 years" : "3 a 4 anos"}</option>
                  <option value="5-7">{isEn ? "5 to 7 years" : "5 a 7 anos"}</option>
                  <option value="8-10">{isEn ? "8 to 10 years" : "8 a 10 anos"}</option>
                  <option value="10+">{isEn ? "10+ years (Senior / Exec)" : "10+ anos (Sênior / Executivo)"}</option>
                </select>
              </div>

              {/* 8. Senioridade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "8. Current Seniority" : "8. Senioridade Atual"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.currentSeniority}
                  onChange={(e) => setFormData({ ...formData, currentSeniority: e.target.value as CurrentSeniority })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Júnior">{isEn ? "Junior" : "Júnior"}</option>
                  <option value="Pleno">{isEn ? "Mid-Level" : "Pleno"}</option>
                  <option value="Sênior">{isEn ? "Senior" : "Sênior"}</option>
                  <option value="Especialista">{isEn ? "Specialist / Staff" : "Especialista / Staff"}</option>
                  <option value="Manager">{isEn ? "Manager / Tech Lead" : "Manager / Tech Lead"}</option>
                  <option value="Director">{isEn ? "Director / Head" : "Director / Head"}</option>
                  <option value="Executive">{isEn ? "Executive (VP / C-Level)" : "Executive (VP / C-Level)"}</option>
                </select>
              </div>

              {/* 17. Situação profissional */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "17. Current Status" : "17. Situação Atual"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.professionalStatus}
                  onChange={(e) => setFormData({ ...formData, professionalStatus: e.target.value as ProfessionalStatus })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Empregado">{isEn ? "Employed" : "Empregado(a)"}</option>
                  <option value="Desempregado">{isEn ? "Unemployed" : "Desempregado(a)"}</option>
                  <option value="Freelancer">{isEn ? "Contractor / Freelancer" : "Freelancer / PJ"}</option>
                  <option value="Em transição">{isEn ? "In Career Transition" : "Em transição de carreira"}</option>
                </select>
              </div>
            </div>

            {/* 22. Principal dificuldade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isEn 
                  ? "22. Primary Challenge or Bottleneck in International Job Hunting" 
                  : "22. Principal Dificuldade ou Gargalo na Recolocação Internacional"} <span className="text-blue-600">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.mainRelocationChallenge}
                onChange={(e) => setFormData({ ...formData, mainRelocationChallenge: e.target.value })}
                placeholder={isEn 
                  ? "e.g. Not getting responses from European applications; feeling insecure in technical interviews in English; unsure how to optimize CV for ATS..."
                  : "Ex: Não consigo retornos nas aplicações para a Europa; sinto insegurança nas entrevistas em inglês; não sei como adaptar meu CV para os ATS europeus; tenho dificuldade de acessar decisores..."}
                className="w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Documentação, Idiomas & Mercados */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>{isEn ? "Target Markets, Documentation & Languages" : "Mercados Desejados, Documentação & Idiomas"}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn 
                  ? "Key criteria determining immediate or medium-term relocation feasibility."
                  : "Critérios determinantes para viabilidade imediata ou média prazo."}
              </p>
            </div>

            {/* 10. Mercados Alvo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isEn 
                  ? "10. Target Country or Market (Select all that apply)" 
                  : "10. País ou Mercado onde deseja trabalhar (Selecione todos os de interesse)"} <span className="text-blue-600">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableMarkets.map((market) => {
                  const isSelected = formData.targetMarkets.includes(market);
                  return (
                    <button
                      key={market}
                      type="button"
                      onClick={() => handleTargetMarketToggle(market)}
                      className={`p-2.5 rounded-lg text-xs font-semibold border transition-all text-center flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{market}</span>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 11-13. Cidadania e Visto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 11. Cidadania */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "11. Citizenship" : "11. Cidadania"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.citizenshipStatus}
                  onChange={(e) => setFormData({ ...formData, citizenshipStatus: e.target.value as CitizenshipStatus })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Brasileira">{isEn ? "Brazilian" : "Brasileira"}</option>
                  <option value="Europeia">{isEn ? "European (EU Passport)" : "Europeia (Passaporte UE)"}</option>
                  <option value="Dupla">{isEn ? "Dual Citizenship" : "Dupla Cidadania"}</option>
                  <option value="Outra">{isEn ? "Other" : "Outra Nacionalidade"}</option>
                </select>
              </div>

              {/* 12. Direito de trabalho */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "12. Work Authorization" : "12. Direito de Trabalho"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.workRightTargetMarket}
                  onChange={(e) => setFormData({ ...formData, workRightTargetMarket: e.target.value as WorkRightStatus })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Sim">{isEn ? "Yes, authorized" : "Sim, possuo"}</option>
                  <option value="Em processo">{isEn ? "In process / pending" : "Em processo / Em andamento"}</option>
                  <option value="Não">{isEn ? "No authorization" : "Não possuo"}</option>
                </select>
              </div>

              {/* 13. Documento migratório */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "13. Migration Document" : "13. Documento Migratório"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.migrationDocument}
                  onChange={(e) => setFormData({ ...formData, migrationDocument: e.target.value as MigrationDocument })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Cidadania">{isEn ? "European Citizenship" : "Cidadania Europeia"}</option>
                  <option value="Visto">{isEn ? "Valid Work Visa" : "Visto de Trabalho Válido"}</option>
                  <option value="Residência">{isEn ? "Residence Permit" : "Título de Residência"}</option>
                  <option value="Work Permit">{isEn ? "Approved Work Permit" : "Work Permit Homologado"}</option>
                  <option value="Em processo">{isEn ? "Application in Progress" : "Processo em Andamento"}</option>
                  <option value="Não possuo">{isEn ? "No Document" : "Não possuo documento"}</option>
                </select>
              </div>
            </div>

            {/* 14. Se em processo: Previsão (Condicional) */}
            {isProcessConditionalActive && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 animate-fadeIn">
                <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-1.5">
                  {isEn ? "14. Estimated Documentation Completion Date" : "14. Previsão Estimada de Conclusão da Documentação"} <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required={isProcessConditionalActive}
                  value={formData.migrationProcessEta || ''}
                  onChange={(e) => setFormData({ ...formData, migrationProcessEta: e.target.value })}
                  placeholder={isEn ? "e.g. October/2026, In 3 months, Final consulate stage..." : "Ex: Outubro/2026, Em 3 meses, Fase final no consulado..."}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-blue-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
            )}

            {/* 15-16. Idiomas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "15. English Level (CEFR)" : "15. Nível de Inglês (CEFR)"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.englishLevel}
                  onChange={(e) => setFormData({ ...formData, englishLevel: e.target.value as EnglishLevel })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="B2">B2 — {isEn ? "Upper Intermediate / Independent Professional" : "Intermediário Superior / Profissional Independente"}</option>
                  <option value="C1">C1 — {isEn ? "Advanced / Fluent for Business" : "Avançado / Fluente para Negócios"}</option>
                  <option value="C2">C2 — {isEn ? "Proficient / Native-like" : "Domínio Pleno / Nativo"}</option>
                  <option value="B1">B1 — {isEn ? "Intermediate" : "Intermediário Básico"}</option>
                  <option value="A2">A2 — {isEn ? "Elementary" : "Básico"}</option>
                  <option value="A1">A1 — {isEn ? "Beginner" : "Iniciante"}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "16. Other Languages (Optional)" : "16. Outros Idiomas (Opcional)"}
                </label>
                <input
                  type="text"
                  value={formData.otherLanguages || ''}
                  onChange={(e) => setFormData({ ...formData, otherLanguages: e.target.value })}
                  placeholder={isEn ? "e.g. Spanish C1, French B1, German A2..." : "Ex: Espanhol C1, Francês B1, Alemão A2..."}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>
            </div>

            {/* 20-21. Modalidade e Mudança */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "20. Desired Work Model" : "20. Modalidade Desejada"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.workModel}
                  onChange={(e) => setFormData({ ...formData, workModel: e.target.value as WorkModelDesired })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Remote">{isEn ? "100% Remote (Global Remote / Home Office)" : "100% Remoto (Global Remote / Home Office)"}</option>
                  <option value="Hybrid">{isEn ? "Hybrid (In destination country)" : "Híbrido (No país de destino)"}</option>
                  <option value="Relocation">{isEn ? "Relocation (On-site with relocation package)" : "Relocation (Presencial com pacote de mudança)"}</option>
                  <option value="On-site">{isEn ? "On-site" : "On-site (Presencial)"}</option>
                  <option value="Indiferente">{isEn ? "Open to opportunities" : "Indiferente / Aberto a propostas"}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "21. Relocation Availability" : "21. Disponibilidade para Mudança"} <span className="text-blue-600">*</span>
                </label>
                <select
                  value={formData.relocationAvailability}
                  onChange={(e) => setFormData({ ...formData, relocationAvailability: e.target.value as RelocationAvailability })}
                  className="w-full h-11 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                >
                  <option value="Imediata">{isEn ? "Immediate" : "Imediata"}</option>
                  <option value="30 dias">{isEn ? "Within 30 days" : "Até 30 dias"}</option>
                  <option value="60 dias">{isEn ? "Within 60 days" : "Até 60 dias"}</option>
                  <option value="90+ dias">{isEn ? "90+ days" : "90+ dias"}</option>
                  <option value="Não">{isEn ? "Not planning to relocate (Remote only)" : "Não pretendo me mudar (Apenas Remoto)"}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Expectativa Salarial, CV & Momento Comercial */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {isEn ? "Target Compensation, CV & Commercial Readiness" : "Pretensão Salarial, CV & Momento Comercial"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn 
                  ? "Final stage for feasibility calculation and executive screening."
                  : "Última etapa para cálculo de viabilidade e triagem executiva."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 18. Remuneração atual */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "18. Current Compensation (Optional)" : "18. Remuneração Atual (Opcional)"}
                </label>
                <input
                  type="text"
                  value={formData.currentSalary || ''}
                  onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                  placeholder="Ex: R$ 22.000 / mês ou € 3.200 / mês"
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>

              {/* 19. Remuneração pretendida */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isEn ? "19. Desired Compensation" : "19. Remuneração Pretendida"} <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.targetSalary}
                  onChange={(e) => setFormData({ ...formData, targetSalary: e.target.value })}
                  placeholder="Ex: € 4.500 / mês ou $ 80.000 / ano"
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>
            </div>

            {/* 23. Upload do CV */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isEn ? "23. CV / Resume Upload (PDF or DOCX)" : "23. Upload do Currículo (PDF ou DOCX)"} <span className="text-blue-600">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors">
                <div className="space-y-2 text-center">
                  <UploadCloud className="mx-auto h-9 w-9 text-blue-600" />
                  <div className="flex text-xs text-slate-600 justify-center">
                    <label className="relative cursor-pointer rounded-md font-bold text-blue-600 hover:text-blue-700 focus-within:outline-none">
                      <span>{isEn ? "Click to select file" : "Clique para selecionar o arquivo"}</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {formData.cvFileName
                      ? `${isEn ? "Selected file: " : "Arquivo selecionado: "}${formData.cvFileName}`
                      : `${isEn ? "Accepted formats: PDF or DOCX (Max 10MB)" : "Formatos aceitos: PDF ou DOCX (Tamanho máx: 10MB)"}`}
                  </p>
                  {formData.cvFileName && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isEn ? "CV successfully attached" : "CV anexado com sucesso"}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 24. Pergunta Comercial Obrigatória */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 leading-snug">
                {isEn 
                  ? "24. The International Job Hunting & Career Mentoring is an exclusive paid professional service. If your profile is eligible, which option best reflects your current readiness?"
                  : "24. O International Job Hunting & Career Mentoring é um serviço profissional remunerado. Caso seu perfil seja elegível, qual opção melhor representa seu momento atual?"} <span className="text-blue-600">*</span>
              </label>
              
              <div className="space-y-2.5 mt-3">
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.commercialReadiness === 'ready_to_invest'
                    ? 'bg-blue-50 border-blue-600 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="commercialReadiness"
                    value="ready_to_invest"
                    checked={formData.commercialReadiness === 'ready_to_invest'}
                    onChange={() => setFormData({ ...formData, commercialReadiness: 'ready_to_invest' })}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <strong className="text-xs sm:text-sm text-slate-900 block">
                      {isEn ? "I am prepared to invest in the program." : "Estou preparado(a) para investir no programa."}
                    </strong>
                    <span className="text-[11px] text-slate-500">
                      {isEn 
                        ? "I prioritize 1-on-1 advisory and want to accelerate my international placement."
                        : "Priorizo acompanhamento individual e quero acelerar minha contratação internacional."}
                    </span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.commercialReadiness === 'want_conditions_first'
                    ? 'bg-blue-50 border-blue-600 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="commercialReadiness"
                    value="want_conditions_first"
                    checked={formData.commercialReadiness === 'want_conditions_first'}
                    onChange={() => setFormData({ ...formData, commercialReadiness: 'want_conditions_first' })}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <strong className="text-xs sm:text-sm text-slate-900 block">
                      {isEn ? "I want to know the investment and conditions before deciding." : "Quero conhecer o investimento e as condições antes de decidir."}
                    </strong>
                    <span className="text-[11px] text-slate-500">
                      {isEn 
                        ? "I would like to understand the commercial proposal and timeline during the initial assessment."
                        : "Gostaria de entender a proposta comercial e o cronograma na avaliação prévia."}
                    </span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.commercialReadiness === 'no_financial_availability'
                    ? 'bg-blue-50 border-blue-600 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="commercialReadiness"
                    value="no_financial_availability"
                    checked={formData.commercialReadiness === 'no_financial_availability'}
                    onChange={() => setFormData({ ...formData, commercialReadiness: 'no_financial_availability' })}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <strong className="text-xs sm:text-sm text-slate-900 block">
                      {isEn ? "I do not have financial availability at this time." : "Não tenho disponibilidade financeira neste momento."}
                    </strong>
                    <span className="text-[11px] text-slate-500">
                      {isEn 
                        ? "I prefer to follow public job openings and free content."
                        : "Prefiro acompanhar apenas as vagas públicas e conteúdos gratuitos."}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Consentimento LGPD / GDPR */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-left">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 shrink-0"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  {isEn 
                    ? "I authorize the processing of my personal details and CV exclusively for evaluation of my profile and contact regarding RL Headhunter services under our Privacy Policy."
                    : "Autorizo o tratamento dos dados fornecidos neste formulário e no meu CV para análise do meu perfil profissional, contato comercial relacionado aos serviços da RL Headhunter e avaliação de aderência ao programa solicitado, nos termos da Política de Privacidade aplicável."}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs font-bold transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isEn ? "Back" : "Voltar"}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>{isEn ? "Next Step" : "Próxima Etapa"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 text-white text-xs font-extrabold transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              {isSubmitting ? (
                <span>{isEn ? "Processing Screening..." : "Processando Triagem..."}</span>
              ) : (
                <>
                  <span>{isEn ? "SUBMIT FOR PRE-QUALIFICATION" : "ENVIAR PARA PRÉ-QUALIFICAÇÃO"}</span>
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

      </form>
    </div>
  );

  if (isInsideModal) {
    return content;
  }

  return (
    <section id="pre-qualificacao" className="py-16 lg:py-24 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};
