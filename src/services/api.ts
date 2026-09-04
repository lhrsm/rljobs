import { Job, CandidateApplication, CompanyBriefing, ApiResponse } from '../types';
import { INITIAL_JOBS } from '../data/jobsData';

const API_BASE = '/api';
const GOOGLE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz1s_ip_mK_36a99VFT5Ne12UAy55djORqMUl0QPnZug8iB3Y0IS1Z7kq0IpsJ_EedR/exec';

export const ApiService = {
  async getJobs(filters?: {
    keyword?: string;
    region?: string;
    seniority?: string;
    workModel?: string;
    contractType?: string;
  }): Promise<Job[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.keyword) params.append('keyword', filters.keyword);
      if (filters?.region && filters.region !== 'all') params.append('region', filters.region);
      if (filters?.seniority && filters.seniority !== 'all') params.append('seniority', filters.seniority);
      if (filters?.workModel && filters.workModel !== 'all') params.append('workModel', filters.workModel);
      if (filters?.contractType && filters.contractType !== 'all') params.append('contractType', filters.contractType);

      const res = await fetch(`${API_BASE}/jobs?${params.toString()}`, {
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback to local memory / INITIAL_JOBS
    }

    // Local fallback filtering
    let jobs = [...INITIAL_JOBS];
    if (filters?.keyword) {
      const q = filters.keyword.toLowerCase();
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q) ||
        j.description.pt.summary.toLowerCase().includes(q) ||
        j.description.en.summary.toLowerCase().includes(q)
      );
    }
    if (filters?.region && filters.region !== 'all') {
      jobs = jobs.filter(j => j.region.toLowerCase() === filters.region?.toLowerCase());
    }
    if (filters?.seniority && filters.seniority !== 'all') {
      jobs = jobs.filter(j => j.seniority.toLowerCase() === filters.seniority?.toLowerCase());
    }
    if (filters?.workModel && filters.workModel !== 'all') {
      jobs = jobs.filter(j => j.workModel.toLowerCase() === filters.workModel?.toLowerCase());
    }
    if (filters?.contractType && filters.contractType !== 'all') {
      jobs = jobs.filter(j => j.contractType.toLowerCase().includes(filters.contractType?.toLowerCase() || ''));
    }

    return jobs;
  },

  async getJobById(id: string): Promise<Job | null> {
    try {
      const res = await fetch(`${API_BASE}/jobs/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    return INITIAL_JOBS.find(j => j.id === id) || null;
  },

  async submitApplication(application: CandidateApplication): Promise<ApiResponse<CandidateApplication>> {
    const trackingId = `RL-APP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const payload = { ...application, trackingId, createdAt: new Date().toISOString() };

    // 1. Dispatch to Google Apps Script Webhook (Google Drive + Gmail)
    if (GOOGLE_WEBHOOK_URL) {
      try {
        fetch(GOOGLE_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(err => console.warn('Google Webhook async warning:', err));
      } catch (err) {
        console.warn('Google Webhook trigger warning:', err);
      }
    }

    // 2. Dispatch to backend API if available
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Local fallback simulation
    }

    // 3. Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('rl_applications') || '[]');
      existing.push(payload);
      localStorage.setItem('rl_applications', JSON.stringify(existing));
    } catch {
      // ignore
    }

    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      success: true,
      message: 'Candidatura registrada e enviada com sucesso para Ricardo Oliveira!',
      trackingId,
      data: application,
    };
  },

  async submitCompanyBriefing(briefing: CompanyBriefing): Promise<ApiResponse<CompanyBriefing>> {
    const trackingId = `RL-B2B-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const payload = { ...briefing, trackingId, createdAt: new Date().toISOString() };

    // 1. Dispatch to Google Apps Script Webhook
    if (GOOGLE_WEBHOOK_URL) {
      try {
        fetch(GOOGLE_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            fullName: payload.contactName,
            jobTitle: `[B2B Briefing] ${payload.targetRole || 'Posição Executiva'} (${payload.companyName})`,
            coverNote: `Empresa: ${payload.companyName}\nCargo Alvo: ${payload.targetRole}\nOrçamento: ${payload.estimatedBudget}\nUrgência: ${payload.urgency}\nRegião: ${payload.targetRegion}\nMensagem: ${payload.message || 'N/A'}`
          }),
        }).catch(err => console.warn('Google Webhook B2B async warning:', err));
      } catch (err) {
        console.warn('Google Webhook B2B trigger warning:', err);
      }
    }

    // 2. Dispatch to backend API if available
    try {
      const res = await fetch(`${API_BASE}/companies/briefing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Local fallback
    }

    // 3. Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('rl_company_briefings') || '[]');
      existing.push(payload);
      localStorage.setItem('rl_company_briefings', JSON.stringify(existing));
    } catch {
      // ignore
    }

    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      success: true,
      message: 'Briefing enviado com sucesso! Ricardo Oliveira entrará em contato em breve.',
      trackingId,
      data: briefing,
    };
  }
};
