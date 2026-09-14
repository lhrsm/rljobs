export type YearsExperience = '0-2' | '3-4' | '5-7' | '8-10' | '10+';

export type CurrentSeniority = 
  | 'Júnior' 
  | 'Pleno' 
  | 'Sênior' 
  | 'Especialista' 
  | 'Manager' 
  | 'Director' 
  | 'Executive';

export type CitizenshipStatus = 'Brasileira' | 'Europeia' | 'Dupla' | 'Outra';

export type WorkRightStatus = 'Sim' | 'Não' | 'Em processo';

export type MigrationDocument = 
  | 'Cidadania' 
  | 'Visto' 
  | 'Residência' 
  | 'Work Permit' 
  | 'Em processo' 
  | 'Não possuo';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type ProfessionalStatus = 'Empregado' | 'Desempregado' | 'Freelancer' | 'Em transição';

export type WorkModelDesired = 'Remote' | 'Hybrid' | 'On-site' | 'Relocation' | 'Indiferente';

export type RelocationAvailability = 'Imediata' | '30 dias' | '60 dias' | '90+ dias' | 'Não';

export type CommercialReadiness = 
  | 'ready_to_invest' 
  | 'want_conditions_first' 
  | 'no_financial_availability';

export type LeadClassification = 'A' | 'B' | 'C';

export interface MentoringFormData {
  // 1-4. Dados de contato
  fullName: string;
  email: string;
  phoneWhatsApp: string;
  linkedinUrl: string;

  // 5-8. Carreira e Senioridade
  currentRole: string;
  professionalArea: string;
  yearsExperience: YearsExperience;
  currentSeniority: CurrentSeniority;

  // 9-10. Localização e Mercados
  currentCountry: string;
  targetMarkets: string[]; // Portugal, Espanha, Reino Unido, Europa Geral, Brasil, EUA / Canadá, Global Remote

  // 11-14. Documentação & Situação Migratória
  citizenshipStatus: CitizenshipStatus;
  workRightTargetMarket: WorkRightStatus;
  migrationDocument: MigrationDocument;
  migrationProcessEta?: string; // Se em processo

  // 15-16. Idiomas
  englishLevel: EnglishLevel;
  otherLanguages?: string;

  // 17-21. Momento Profissional, Remuneração e Mudança
  professionalStatus: ProfessionalStatus;
  currentSalary?: string;
  targetSalary: string;
  workModel: WorkModelDesired;
  relocationAvailability: RelocationAvailability;

  // 22-24. Dificuldade, CV e Momento Comercial
  mainRelocationChallenge: string;
  cvFileName: string;
  cvFileSize?: number;
  commercialReadiness: CommercialReadiness;

  // Consentimento LGPD/GDPR
  privacyConsent: boolean;
}

export interface MentoringLeadSubmission extends MentoringFormData {
  id: string;
  createdAt: string;
  classification: LeadClassification;
  classificationLabel: string;
  classificationReason: string;
}
