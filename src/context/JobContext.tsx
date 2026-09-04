import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Job, JobFiltersState } from '../types';
import { ApiService } from '../services/api';

interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  isLoading: boolean;
  filters: JobFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<JobFiltersState>>;
  updateFilter: (key: keyof JobFiltersState, value: string) => void;
  resetFilters: () => void;
  selectedJobForDetails: Job | null;
  setSelectedJobForDetails: (job: Job | null) => void;
  selectedJobForApply: Job | null;
  setSelectedJobForApply: (job: Job | null) => void;
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  openApplyModal: (job?: Job) => void;
  closeApplyModal: () => void;
  toastMessage: { text: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const initialFilters: JobFiltersState = {
  keyword: '',
  region: 'all',
  seniority: 'all',
  workModel: 'all',
  contractType: 'all',
  currency: 'all',
  department: 'all',
  sortBy: 'recent',
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<JobFiltersState>(initialFilters);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.getJobs();
      setJobs(data);
    } catch {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const updateFilter = (key: keyof JobFiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const openApplyModal = (job?: Job) => {
    if (job) {
      setSelectedJobForApply(job);
    } else {
      setSelectedJobForApply(null);
    }
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setSelectedJobForApply(null);
  };

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Keyword search
    if (filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      result = result.filter(j => 
        j.title.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q) ||
        j.companyType.toLowerCase().includes(q) ||
        j.description.pt.summary.toLowerCase().includes(q) ||
        j.description.en.summary.toLowerCase().includes(q)
      );
    }

    // Region
    if (filters.region !== 'all') {
      result = result.filter(j => j.region.toLowerCase() === filters.region.toLowerCase());
    }

    // Seniority
    if (filters.seniority !== 'all') {
      result = result.filter(j => j.seniority.toLowerCase() === filters.seniority.toLowerCase());
    }

    // Work Model
    if (filters.workModel !== 'all') {
      result = result.filter(j => j.workModel.toLowerCase() === filters.workModel.toLowerCase());
    }

    // Contract Type
    if (filters.contractType !== 'all') {
      result = result.filter(j => j.contractType.toLowerCase().includes(filters.contractType.toLowerCase()));
    }

    // Currency
    if (filters.currency !== 'all') {
      result = result.filter(j => j.salary.currency.toLowerCase() === filters.currency.toLowerCase());
    }

    // Department
    if (filters.department !== 'all') {
      result = result.filter(j => j.department.toLowerCase() === filters.department.toLowerCase());
    }

    // Sorting
    if (filters.sortBy === 'recent') {
      result.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    } else if (filters.sortBy === 'salary_high') {
      result.sort((a, b) => {
        const salaryA = a.salary.max || a.salary.min || 0;
        const salaryB = b.salary.max || b.salary.min || 0;
        return salaryB - salaryA;
      });
    } else if (filters.sortBy === 'featured') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [jobs, filters]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        isLoading,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        selectedJobForDetails,
        setSelectedJobForDetails,
        selectedJobForApply,
        setSelectedJobForApply,
        isApplyModalOpen,
        setIsApplyModalOpen,
        openApplyModal,
        closeApplyModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
