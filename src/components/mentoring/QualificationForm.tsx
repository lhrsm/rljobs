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
  ChevronLeft
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

interface QualificationFormProps {
  onSuccess: (submission: ReturnType<typeof saveMentoringLead>) => void;
}

export const QualificationForm: React.FC<QualificationFormProps> = ({ onSuccess }) => {
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
        setErrorMessage('Por favor, envie o currículo em formato PDF ou DOCX.');
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
        setErrorMessage('Por favor, informe seu nome completo.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMessage('Por favor, insira um e-mail corporativo ou pessoal válido.');
        return false;
      }
      if (!formData.phoneWhatsApp.trim()) {
        setErrorMessage('Por favor, informe seu WhatsApp com código do país (ex: +351 ou +55).');
        return false;
      }
      if (!formData.linkedinUrl.trim()) {
        setErrorMessage('Por favor, informe a URL do seu perfil no LinkedIn.');
        return false;
      }
      if (!formData.currentCountry.trim()) {
        setErrorMessage('Por favor, informe o país onde você reside atualmente.');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.currentRole.trim()) {
        setErrorMessage('Por favor, informe seu cargo atual ou último cargo.');
        return false;
      }
      if (!formData.professionalArea.trim()) {
        setErrorMessage('Por favor, selecione ou informe sua área profissional.');
        return false;
      }
      if (!formData.mainRelocationChallenge.trim() || formData.mainRelocationChallenge.length < 15) {
        setErrorMessage('Por favor, descreva em algumas palavras sua principal dificuldade ou desafio na recolocação internacional.');
        return false;
      }
    }

    if (step === 3) {
      if (formData.targetMarkets.length === 0) {
        setErrorMessage('Selecione pelo menos um país ou mercado-alvo de interesse.');
        return false;
      }
      const isDocInProcess = formData.workRightTargetMarket === 'Em processo' || formData.migrationDocument === 'Em processo';
      if (isDocInProcess && !formData.migrationProcessEta?.trim()) {
        setErrorMessage('Como sua documentação está em processo, por favor informe a previsão estimada de conclusão.');
        return false;
      }
    }

    if (step === 4) {
      if (!formData.targetSalary.trim()) {
        setErrorMessage('Por favor, informe sua remuneração pretendida (valor, moeda e periodicidade).');
        return false;
      }
      if (!formData.cvFileName) {
        setErrorMessage('O upload do currículo (PDF ou DOCX) é obrigatório para avaliação do perfil.');
        return false;
      }
      if (!formData.privacyConsent) {
        setErrorMessage('Você deve autorizar o consentimento para tratamento dos dados para avançar.');
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

  return (
    <section id="pre-qualificacao" className="py-16 lg:py-24 bg-slate-950 text-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">
            Avaliação Confidencial
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Formulário de Pré-Qualificação
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Preencha os dados abaixo para que a liderança da RL Headhunter avalie a viabilidade da sua transição e a aderência aos mercados internacionais desejados.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-10 text-left">
          
          {/* Progress Bar & Step Tabs */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="text-blue-400 font-bold">Etapa {currentStep} de 4</span>
              <span>
                {currentStep === 1 && 'Identificação & Contato'}
                {currentStep === 2 && 'Carreira & Senioridade'}
                {currentStep === 3 && 'Documentação & Idiomas'}
                {currentStep === 4 && 'Pretensão, CV & Momento Comercial'}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: Dados de Contato e Identificação */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    <span>Dados de Contato & Identificação</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Informações para comunicação oficial e envio do diagnóstico.
                  </p>
                </div>

                {/* 1. Nome completo */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    1. Nome Completo <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ex: Carlos Eduardo Silva"
                    className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 2. E-mail */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>2. E-mail Profissional <span className="text-blue-400">*</span></span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="carlos@exemplo.com"
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* 3. WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>3. WhatsApp com DDI <span className="text-blue-400">*</span></span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneWhatsApp}
                      onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                      placeholder="+351 912 345 678 ou +55 11 99999-9999"
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 4. LinkedIn */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                      <span>4. Link do seu LinkedIn <span className="text-blue-400">*</span></span>
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/seuperfil"
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* 9. País de residência atual */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      9. País onde reside atualmente <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.currentCountry}
                      onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Brasil">Brasil</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Espanha">Espanha</option>
                      <option value="Reino Unido">Reino Unido</option>
                      <option value="Alemanha">Alemanha</option>
                      <option value="França">França</option>
                      <option value="Irlanda">Irlanda</option>
                      <option value="Holanda">Holanda</option>
                      <option value="Itália">Itália</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Canadá">Canadá</option>
                      <option value="Outro">Outro país</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Carreira & Senioridade */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <span>Carreira & Senioridade</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Avaliação do seu posicionamento técnico e maturidade profissional.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 5. Cargo atual / último */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      5. Cargo Atual ou Último Cargo <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentRole}
                      onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                      placeholder="Ex: Senior Software Engineer, Head of Tech, Tech Lead..."
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* 6. Área profissional */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      6. Área Profissional <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.professionalArea}
                      onChange={(e) => setFormData({ ...formData, professionalArea: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Tecnologia / Engenharia de Software">Tecnologia / Engenharia de Software</option>
                      <option value="Inteligência Artificial & Machine Learning">Inteligência Artificial & Machine Learning</option>
                      <option value="Arquitetura de Soluções & Cloud (DevOps)">Arquitetura de Soluções & Cloud (DevOps)</option>
                      <option value="Data Science, Analytics & Big Data">Data Science, Analytics & Big Data</option>
                      <option value="Cybersecurity & Governança">Cybersecurity & Governança</option>
                      <option value="Product Management & UX">Product Management & UX</option>
                      <option value="Liderança Executiva (CTO / VP / Diretor)">Liderança Executiva (CTO / VP / Diretor)</option>
                      <option value="Consultoria / FinTech / Gestão">Consultoria / FinTech / Gestão</option>
                      <option value="Outra Área Estratégica">Outra Área Estratégica</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 7. Anos de experiência */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      7. Anos de Experiência <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value as YearsExperience })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="0-2">0 a 2 anos (Inicial)</option>
                      <option value="3-4">3 a 4 anos</option>
                      <option value="5-7">5 a 7 anos</option>
                      <option value="8-10">8 a 10 anos</option>
                      <option value="10+">10+ anos (Sênior / Executivo)</option>
                    </select>
                  </div>

                  {/* 8. Senioridade */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      8. Senioridade Atual <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.currentSeniority}
                      onChange={(e) => setFormData({ ...formData, currentSeniority: e.target.value as CurrentSeniority })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Júnior">Júnior</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Sênior">Sênior</option>
                      <option value="Especialista">Especialista / Staff</option>
                      <option value="Manager">Manager / Tech Lead</option>
                      <option value="Director">Director / Head</option>
                      <option value="Executive">Executive (VP / C-Level)</option>
                    </select>
                  </div>

                  {/* 17. Situação profissional */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      17. Situação Atual <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.professionalStatus}
                      onChange={(e) => setFormData({ ...formData, professionalStatus: e.target.value as ProfessionalStatus })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Empregado">Empregado(a)</option>
                      <option value="Desempregado">Desempregado(a)</option>
                      <option value="Freelancer">Freelancer / PJ</option>
                      <option value="Em transição">Em transição de carreira</option>
                    </select>
                  </div>
                </div>

                {/* 22. Principal dificuldade */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    22. Principal Dificuldade ou Gargalo na Recolocação Internacional <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.mainRelocationChallenge}
                    onChange={(e) => setFormData({ ...formData, mainRelocationChallenge: e.target.value })}
                    placeholder="Ex: Não consigo retornos nas aplicações para a Europa; sinto insegurança nas entrevistas em inglês; não sei como adaptar meu CV para os ATS europeus; tenho dificuldade de acessar decisores..."
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Documentação, Idiomas & Mercados */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span>Mercados Desejados, Documentação & Idiomas</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Critérios determinantes para viabilidade imediata ou média prazo.
                  </p>
                </div>

                {/* 10. Mercados Alvo */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    10. País ou Mercado onde deseja trabalhar (Selecione todos os de interesse) <span className="text-blue-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {availableMarkets.map((market) => {
                      const isSelected = formData.targetMarkets.includes(market);
                      return (
                        <button
                          key={market}
                          type="button"
                          onClick={() => handleTargetMarketToggle(market)}
                          className={`p-2.5 rounded-lg text-xs font-semibold border transition-all text-center flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-600/30 border-blue-500 text-white shadow-xs'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <span>{market}</span>
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 11-13. Cidadania e Visto */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 11. Cidadania */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      11. Cidadania <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.citizenshipStatus}
                      onChange={(e) => setFormData({ ...formData, citizenshipStatus: e.target.value as CitizenshipStatus })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Brasileira">Brasileira</option>
                      <option value="Europeia">Europeia (Passaporte UE)</option>
                      <option value="Dupla">Dupla Cidadania</option>
                      <option value="Outra">Outra Nacionalidade</option>
                    </select>
                  </div>

                  {/* 12. Direito de trabalho */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      12. Direito de Trabalho <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.workRightTargetMarket}
                      onChange={(e) => setFormData({ ...formData, workRightTargetMarket: e.target.value as WorkRightStatus })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Sim">Sim, possuo</option>
                      <option value="Em processo">Em processo / Em andamento</option>
                      <option value="Não">Não possuo</option>
                    </select>
                  </div>

                  {/* 13. Documento migratório */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      13. Documento Migratório <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.migrationDocument}
                      onChange={(e) => setFormData({ ...formData, migrationDocument: e.target.value as MigrationDocument })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Cidadania">Cidadania Europeia</option>
                      <option value="Visto">Visto de Trabalho Válido</option>
                      <option value="Residência">Título de Residência</option>
                      <option value="Work Permit">Work Permit Homologado</option>
                      <option value="Em processo">Processo em Andamento</option>
                      <option value="Não possuo">Não possuo documento</option>
                    </select>
                  </div>
                </div>

                {/* 14. Se em processo: Previsão (Condicional) */}
                {isProcessConditionalActive && (
                  <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/40 animate-fadeIn">
                    <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider mb-1.5">
                      14. Previsão Estimada de Conclusão da Documentação <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required={isProcessConditionalActive}
                      value={formData.migrationProcessEta || ''}
                      onChange={(e) => setFormData({ ...formData, migrationProcessEta: e.target.value })}
                      placeholder="Ex: Outubro/2026, Em 3 meses, Fase final no consulado..."
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                    />
                  </div>
                )}

                {/* 15-16. Idiomas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      15. Nível de Inglês (CEFR) <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.englishLevel}
                      onChange={(e) => setFormData({ ...formData, englishLevel: e.target.value as EnglishLevel })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="B2">B2 — Intermediário Superior / Profissional Independente</option>
                      <option value="C1">C1 — Avançado / Fluente para Negócios</option>
                      <option value="C2">C2 — Domínio Pleno / Nativo</option>
                      <option value="B1">B1 — Intermediário Básico</option>
                      <option value="A2">A2 — Básico</option>
                      <option value="A1">A1 — Iniciante</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      16. Outros Idiomas (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.otherLanguages || ''}
                      onChange={(e) => setFormData({ ...formData, otherLanguages: e.target.value })}
                      placeholder="Ex: Espanhol C1, Francês B1, Alemão A2..."
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* 20-21. Modalidade e Mudança */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      20. Modalidade Desejada <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.workModel}
                      onChange={(e) => setFormData({ ...formData, workModel: e.target.value as WorkModelDesired })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Remote">100% Remoto (Global Remote / Home Office)</option>
                      <option value="Hybrid">Híbrido (No país de destino)</option>
                      <option value="Relocation">Relocation (Presencial com pacote de mudança)</option>
                      <option value="On-site">On-site (Presencial)</option>
                      <option value="Indiferente">Indiferente / Aberto a propostas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      21. Disponibilidade para Mudança <span className="text-blue-400">*</span>
                    </label>
                    <select
                      value={formData.relocationAvailability}
                      onChange={(e) => setFormData({ ...formData, relocationAvailability: e.target.value as RelocationAvailability })}
                      className="w-full h-11 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="Imediata">Imediata</option>
                      <option value="30 dias">Até 30 dias</option>
                      <option value="60 dias">Até 60 dias</option>
                      <option value="90+ dias">90+ dias</option>
                      <option value="Não">Não pretendo me mudar (Apenas Remoto)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Expectativa Salarial, CV & Momento Comercial */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">
                    Pretensão Salarial, CV & Momento Comercial
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Última etapa para cálculo de viabilidade e triagem executiva.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 18. Remuneração atual */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      18. Remuneração Atual (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.currentSalary || ''}
                      onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                      placeholder="Ex: R$ 22.000 / mês ou € 3.200 / mês"
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* 19. Remuneração pretendida */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      19. Remuneração Pretendida <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.targetSalary}
                      onChange={(e) => setFormData({ ...formData, targetSalary: e.target.value })}
                      placeholder="Ex: € 4.500 / mês ou $ 80.000 / ano"
                      className="w-full h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* 23. Upload do CV */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    23. Upload do Currículo (PDF ou DOCX) <span className="text-blue-400">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700 border-dashed rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors">
                    <div className="space-y-2 text-center">
                      <UploadCloud className="mx-auto h-9 w-9 text-blue-400" />
                      <div className="flex text-xs text-slate-300 justify-center">
                        <label className="relative cursor-pointer rounded-md font-bold text-blue-400 hover:text-blue-300 focus-within:outline-none">
                          <span>Clique para selecionar o arquivo</span>
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
                          ? `Arquivo selecionado: ${formData.cvFileName}`
                          : 'Formatos aceitos: PDF ou DOCX (Tamanho máx: 10MB)'}
                      </p>
                      {formData.cvFileName && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>CV anexado com sucesso</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 24. Pergunta Comercial Obrigatória */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/60 to-slate-800/80 border-2 border-blue-500/40">
                  <label className="block text-xs sm:text-sm font-bold text-white mb-2 leading-snug">
                    24. O International Job Hunting & Career Mentoring é um serviço profissional remunerado. Caso seu perfil seja elegível, qual opção melhor representa seu momento atual? <span className="text-blue-400">*</span>
                  </label>
                  
                  <div className="space-y-2.5 mt-3">
                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.commercialReadiness === 'ready_to_invest'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
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
                        <strong className="text-xs sm:text-sm text-white block">
                          Estou preparado(a) para investir no programa.
                        </strong>
                        <span className="text-[11px] text-slate-400">
                          Priorizo acompanhamento individual e quero acelerar minha contratação internacional.
                        </span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.commercialReadiness === 'want_conditions_first'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
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
                        <strong className="text-xs sm:text-sm text-white block">
                          Quero conhecer o investimento e as condições antes de decidir.
                        </strong>
                        <span className="text-[11px] text-slate-400">
                          Gostaria de entender a proposta comercial e o cronograma na avaliação prévia.
                        </span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.commercialReadiness === 'no_financial_availability'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
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
                        <strong className="text-xs sm:text-sm text-white block">
                          Não tenho disponibilidade financeira neste momento.
                        </strong>
                        <span className="text-[11px] text-slate-400">
                          Prefiro acompanhar apenas as vagas públicas e conteúdos gratuitos.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Consentimento LGPD / GDPR */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer text-left">
                    <input
                      type="checkbox"
                      required
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 shrink-0"
                    />
                    <span className="text-xs text-slate-300 leading-relaxed">
                      Autorizo o tratamento dos dados fornecidos neste formulário e no meu CV para análise do meu perfil profissional, contato comercial relacionado aos serviços da RL Headhunter e avaliação de aderência ao programa solicitado, nos termos da Política de Privacidade aplicável.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-bold transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <span>Próxima Etapa</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-slate-700 text-white text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processando Triagem...</span>
                  ) : (
                    <>
                      <span>ENVIAR PARA PRÉ-QUALIFICAÇÃO</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
