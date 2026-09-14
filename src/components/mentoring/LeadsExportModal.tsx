import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Search
} from 'lucide-react';
import { MentoringLeadSubmission, LeadClassification } from '../../types/mentoring';
import { getStoredLeads, exportLeadsToCsv, clearStoredLeads } from '../../services/mentoringService';

interface LeadsExportModalProps {
  onClose: () => void;
}

export const LeadsExportModal: React.FC<LeadsExportModalProps> = ({ onClose }) => {
  const [leads, setLeads] = useState<MentoringLeadSubmission[]>([]);
  const [filterClass, setFilterClass] = useState<'ALL' | LeadClassification>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const loadLeads = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleExport = () => {
    exportLeadsToCsv(filteredLeads);
  };

  const handleClear = () => {
    if (window.confirm('Deseja realmente limpar todos os leads salvos localmente neste navegador?')) {
      clearStoredLeads();
      loadLeads();
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesClass = filterClass === 'ALL' || lead.classification === filterClass;
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.currentCountry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full p-6 sm:p-8 text-left shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Painel de Gestão • RL Headhunter
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              Leads de Pré-Qualificação de Mentoria ({leads.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3">
          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, cargo, país..."
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setFilterClass('ALL')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  filterClass === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos ({leads.length})
              </button>
              <button
                onClick={() => setFilterClass('A')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  filterClass === 'A' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-400'
                }`}
              >
                Lead A ({leads.filter((l) => l.classification === 'A').length})
              </button>
              <button
                onClick={() => setFilterClass('B')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  filterClass === 'B' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-blue-400'
                }`}
              >
                Lead B ({leads.filter((l) => l.classification === 'B').length})
              </button>
              <button
                onClick={() => setFilterClass('C')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  filterClass === 'C' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Lead C ({leads.filter((l) => l.classification === 'C').length})
              </button>
            </div>
          </div>

          {/* Export / Clear buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={filteredLeads.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Planilha CSV</span>
            </button>
            {leads.length > 0 && (
              <button
                onClick={handleClear}
                className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
                title="Limpar registros"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Leads Table */}
        <div className="flex-1 overflow-y-auto border border-slate-800 rounded-xl bg-slate-950/50">
          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-xs">
              Nenhum lead encontrado com os filtros aplicados.
            </div>
          ) : (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 text-[11px] uppercase tracking-wider sticky top-0 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Nome & Contato</th>
                  <th className="py-3 px-4">Cargo / Senioridade</th>
                  <th className="py-3 px-4">Documentação</th>
                  <th className="py-3 px-4">Mercado Alvo</th>
                  <th className="py-3 px-4">Investimento</th>
                  <th className="py-3 px-4">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4">
                      {lead.classification === 'A' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-extrabold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Lead A</span>
                        </span>
                      )}
                      {lead.classification === 'B' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 text-[10px] font-extrabold">
                          <Clock className="w-3 h-3" />
                          <span>Lead B</span>
                        </span>
                      )}
                      {lead.classification === 'C' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold">
                          <Compass className="w-3 h-3" />
                          <span>Lead C</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-white block">{lead.fullName}</strong>
                      <span className="text-[11px] text-slate-400 block">{lead.email}</span>
                      <span className="text-[11px] text-emerald-400 font-mono">{lead.phoneWhatsApp}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white block">{lead.currentRole}</span>
                      <span className="text-[11px] text-slate-400">
                        {lead.currentSeniority} • {lead.yearsExperience} anos exp.
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white block">{lead.migrationDocument}</span>
                      <span className="text-[11px] text-slate-400">
                        Dir. Trab: {lead.workRightTargetMarket}
                        {lead.migrationProcessEta ? ` (${lead.migrationProcessEta})` : ''}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-300 block">{lead.targetMarkets.join(', ')}</span>
                      <span className="text-[11px] text-blue-400">Inglês: {lead.englishLevel}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs">
                        {lead.commercialReadiness === 'ready_to_invest' && (
                          <span className="text-emerald-400 font-bold">Preparado</span>
                        )}
                        {lead.commercialReadiness === 'want_conditions_first' && (
                          <span className="text-amber-400 font-medium">Ver condições</span>
                        )}
                        {lead.commercialReadiness === 'no_financial_availability' && (
                          <span className="text-slate-500">Sem disp.</span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Dados em conformidade com LGPD & GDPR. Uso confidencial interno.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
