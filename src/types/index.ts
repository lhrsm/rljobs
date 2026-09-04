export type Language = 'pt' | 'en';

export type Region = 'USA' | 'Europe' | 'Brazil' | 'Global Remote';

export type Seniority = 'Senior' | 'Staff' | 'Lead' | 'Principal' | 'Head/Director' | 'C-Level/VP';

export type WorkModel = 'Remote' | 'Hybrid' | 'Relocation' | 'On-site';

export type ContractType = 'PJ / B2B' | 'CLT' | 'W2' | 'Contractor USD' | 'Contractor EUR' | string;

export type Currency = 'USD' | 'EUR' | 'BRL';

export interface SalaryRange {
  min?: number;
  max?: number;
  currency: Currency;
  period: 'yearly' | 'monthly' | 'hourly';
  isConfidential?: boolean;
}

export interface Job {
  id: string;
  title: string;
  department: 'Engineering' | 'Product' | 'Leadership' | 'Data & AI' | 'DevOps & Cloud' | 'Design & UX' | string;
  companyType: 'US Scale-up' | 'European Tech Group' | 'Brazilian Multinational' | 'Global Fintech' | 'Silicon Valley AI Lab' | string;
  region: Region;
  location: string;
  timezone: string;
  seniority: Seniority;
  workModel: WorkModel;
  contractType: ContractType;
  salary: SalaryRange;
  skills: string[];
  description: {
    pt: {
      summary: string;
      responsibilities: string[];
      requirements: string[];
      benefits: string[];
      crossBorderNotes?: string;
    };
    en: {
      summary: string;
      responsibilities: string[];
      requirements: string[];
      benefits: string[];
      crossBorderNotes?: string;
    };
  };
  postedAt: string;
  isFeatured?: boolean;
  isHot?: boolean;
  relocationSupported?: boolean;
  visaSupported?: boolean;
}

export interface JobFiltersState {
  keyword: string;
  region: string;
  seniority: string;
  workModel: string;
  contractType: string;
  currency: string;
  department: string;
  sortBy: string;
}

export interface CandidateApplication {
  id?: string;
  jobId?: string;
  jobTitle?: string;
  trackingId?: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubOrPortfolio?: string;
  currentRole: string;
  yearsOfExperience: number;
  englishLevel: 'fluent_native' | 'advanced' | 'intermediate';
  salaryExpectation: {
    amount: string;
    currency: Currency;
    period: 'yearly' | 'monthly';
  };
  preferredContract: 'remote_international' | 'relocation' | 'national_pj_clt' | 'open_to_all';
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeBase64?: string;
  resumeMimeType?: string;
  coverNote?: string;
  createdAt?: string;
}

export interface CompanyBriefing {
  id?: string;
  trackingId?: string;
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  companySize: '1-20' | '21-100' | '101-500' | '500+';
  targetRole: string;
  seniorityNeeded: Seniority;
  targetRegion: Region;
  urgency: 'immediate' | 'within_30_days' | 'next_quarter';
  estimatedBudget: string;
  message?: string;
  meetingDate?: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  trackingId?: string;
  error?: string;
}
