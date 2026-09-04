from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Literal

LanguageType = Literal['pt', 'en']
RegionType = Literal['USA', 'Europe', 'Brazil', 'Global Remote']
SeniorityType = Literal['Senior', 'Staff', 'Lead', 'Principal', 'Head/Director', 'C-Level/VP']
WorkModelType = Literal['Remote', 'Hybrid', 'Relocation', 'On-site']
ContractType = Literal['PJ / B2B', 'CLT', 'W2', 'Contractor USD', 'Contractor EUR']
CurrencyType = Literal['USD', 'EUR', 'BRL']

class SalaryRangeModel(BaseModel):
    min: Optional[int] = None
    max: Optional[int] = None
    currency: CurrencyType = 'USD'
    period: Literal['yearly', 'monthly', 'hourly'] = 'yearly'
    isConfidential: Optional[bool] = False

class JobDescriptionDetail(BaseModel):
    summary: str
    responsibilities: List[str]
    requirements: List[str]
    benefits: List[str]
    crossBorderNotes: Optional[str] = None

class JobDescriptionBilingual(BaseModel):
    pt: JobDescriptionDetail
    en: JobDescriptionDetail

class JobModel(BaseModel):
    id: str
    title: str
    department: str
    companyType: str
    region: RegionType
    location: str
    timezone: str
    seniority: SeniorityType
    workModel: WorkModelType
    contractType: ContractType
    salary: SalaryRangeModel
    skills: List[str]
    description: JobDescriptionBilingual
    postedAt: str
    isHot: Optional[bool] = False
    isFeatured: Optional[bool] = False
    relocationSupported: Optional[bool] = False
    visaSupported: Optional[bool] = False

class SalaryExpectation(BaseModel):
    amount: str
    currency: CurrencyType
    period: Literal['monthly', 'yearly']

class CandidateApplicationModel(BaseModel):
    jobId: Optional[str] = None
    jobTitle: Optional[str] = None
    fullName: str
    email: EmailStr
    phone: str
    linkedinUrl: str
    githubOrPortfolio: Optional[str] = None
    currentRole: str
    yearsOfExperience: int
    englishLevel: Literal['fluent_native', 'advanced', 'intermediate']
    salaryExpectation: SalaryExpectation
    preferredContract: Literal['remote_international', 'relocation', 'national_pj_clt', 'open_to_all']
    resumeFileName: Optional[str] = None
    resumeFileSize: Optional[str] = None
    coverNote: Optional[str] = None
    trackingId: Optional[str] = None

class CompanyBriefingModel(BaseModel):
    companyName: str
    contactName: str
    workEmail: EmailStr
    phone: str
    companySize: Literal['1-20', '21-100', '101-500', '500+']
    targetRole: str
    seniorityNeeded: SeniorityType
    targetRegion: RegionType
    urgency: Literal['immediate', 'within_30_days', 'next_quarter']
    estimatedBudget: str
    message: Optional[str] = None
    meetingDate: Optional[str] = None
    trackingId: Optional[str] = None
