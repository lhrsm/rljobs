import { MentoringFormData, MentoringLeadSubmission, LeadClassification } from '../types/mentoring';

const STORAGE_KEY = 'rl_mentoring_leads';

/**
 * Motor de classificação de leads de mentoria e job hunting:
 * - Lead A — Prioritário: 5+ anos + documentação/direito de trabalho + inglês B2/C1/C2 + preparado para investir
 * - Lead B — Avaliar: Bom perfil, mas documentação em processo ou quer conhecer condições antes
 * - Lead C — Conteúdo/Vagas: Sem disponibilidade financeira, pouca experiência (0-2 anos) ou sem documentação
 */
export function classifyLead(data: MentoringFormData): {
  classification: LeadClassification;
  label: string;
  reason: string;
} {
  const isExp5Plus = ['5-7', '8-10', '10+'].includes(data.yearsExperience);
  const hasSeniority = ['Pleno', 'Sênior', 'Especialista', 'Manager', 'Director', 'Executive'].includes(data.currentSeniority);
  const hasWorkRight = data.workRightTargetMarket === 'Sim' || ['Cidadania', 'Visto', 'Residência', 'Work Permit'].includes(data.migrationDocument);
  const isDocInProcess = data.workRightTargetMarket === 'Em processo' || data.migrationDocument === 'Em processo';
  const hasProficientEnglish = ['B2', 'C1', 'C2'].includes(data.englishLevel);
  const readyToInvest = data.commercialReadiness === 'ready_to_invest';
  const wantsConditionsFirst = data.commercialReadiness === 'want_conditions_first';
  const noFinancialAvailability = data.commercialReadiness === 'no_financial_availability';

  // Lead C: Sem disponibilidade financeira, ou pouca experiência (0-2 anos) ou sem direito de trabalho
  if (noFinancialAvailability || data.yearsExperience === '0-2' || (data.workRightTargetMarket === 'Não' && data.migrationDocument === 'Não possuo')) {
    return {
      classification: 'C',
      label: 'Lead C — Conteúdo / Vagas Públicas',
      reason: noFinancialAvailability
        ? 'Sem disponibilidade financeira no momento'
        : 'Experiência inicial (0-2 anos) ou sem elegibilidade migratória para o mercado-alvo',
    };
  }

  // Lead A: 5+ anos + senioridade + direito de trabalho + idioma + preparado para investir
  if (isExp5Plus && hasSeniority && hasWorkRight && hasProficientEnglish && readyToInvest) {
    return {
      classification: 'A',
      label: 'Lead A — Prioritário (VIP)',
      reason: 'Perfil altamente alinhado: 5+ anos, elegibilidade migratória aprovada, idioma fluente e decisão de investimento confirmada',
    };
  }

  // Lead B: Perfil a ser avaliado manualmente
  let reasonB = 'Perfil qualificado para análise estratégica prévia';
  if (isDocInProcess) {
    reasonB += ' (documentação migratória em andamento)';
  } else if (wantsConditionsFirst) {
    reasonB += ' (deseja alinhar condições e investimento na avaliação)';
  }

  return {
    classification: 'B',
    label: 'Lead B — Avaliação Manual',
    reason: reasonB,
  };
}

/**
 * Salva a submissão no armazenamento local e simula envio à equipe
 */
export function saveMentoringLead(data: MentoringFormData): MentoringLeadSubmission {
  const { classification, label, reason } = classifyLead(data);

  const submission: MentoringLeadSubmission = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
    classification,
    classificationLabel: label,
    classificationReason: reason,
  };

  try {
    const existing = getStoredLeads();
    existing.unshift(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Erro ao salvar lead no localStorage:', error);
  }

  return submission;
}

export function getStoredLeads(): MentoringLeadSubmission[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Erro ao ler leads:', error);
    return [];
  }
}

export function clearStoredLeads(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Gera link de WhatsApp oficial para o Lead A com mensagem preenchida
 */
export function getWhatsAppLeadLink(lead: MentoringLeadSubmission): string {
  const phone = '351926527934';
  const markets = lead.targetMarkets.join(', ');
  const message = `Olá Ricardo Oliveira! Concluí minha pré-qualificação no site da RL Headhunter para o programa International Job Hunting & Career Mentoring (Lead A - Prioritário).%0A%0A` +
    `*Nome:* ${encodeURIComponent(lead.fullName)}%0A` +
    `*Cargo:* ${encodeURIComponent(lead.currentRole)} (${lead.currentSeniority} / ${lead.yearsExperience} anos de exp.)%0A` +
    `*Mercado-alvo:* ${encodeURIComponent(markets)}%0A` +
    `*Situação Migratória:* ${encodeURIComponent(lead.migrationDocument)} (Direito de trabalho: ${lead.workRightTargetMarket})%0A` +
    `*Inglês:* ${lead.englishLevel}%0A` +
    `*LinkedIn:* ${encodeURIComponent(lead.linkedinUrl)}%0A%0A` +
    `Gostaria de agendar o alinhamento estratégico da minha recolocação internacional.`;

  return `https://wa.me/${phone}?text=${message}`;
}

/**
 * Exporta os leads salvos em formato CSV (com BOM UTF-8 para compatibilidade com Excel)
 */
export function exportLeadsToCsv(leads: MentoringLeadSubmission[]): void {
  if (!leads || leads.length === 0) return;

  const headers = [
    'ID',
    'Data/Hora',
    'Classificação',
    'Motivo da Triagem',
    'Nome Completo',
    'E-mail',
    'WhatsApp',
    'LinkedIn',
    'Cargo Atual',
    'Área Profissional',
    'Anos de Experiência',
    'Senioridade',
    'País Atual',
    'Mercados Desejados',
    'Cidadania',
    'Direito de Trabalho',
    'Documento Migratório',
    'Previsão se em Processo',
    'Nível de Inglês',
    'Outros Idiomas',
    'Situação Profissional',
    'Remuneração Atual',
    'Remuneração Pretendida',
    'Modalidade Desejada',
    'Disponibilidade Mudança',
    'Principal Desafio',
    'Nome do Arquivo CV',
    'Disposição de Investimento',
  ];

  const escapeCsv = (val: unknown) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((l) => [
    escapeCsv(l.id),
    escapeCsv(new Date(l.createdAt).toLocaleString('pt-BR')),
    escapeCsv(l.classificationLabel),
    escapeCsv(l.classificationReason),
    escapeCsv(l.fullName),
    escapeCsv(l.email),
    escapeCsv(l.phoneWhatsApp),
    escapeCsv(l.linkedinUrl),
    escapeCsv(l.currentRole),
    escapeCsv(l.professionalArea),
    escapeCsv(l.yearsExperience),
    escapeCsv(l.currentSeniority),
    escapeCsv(l.currentCountry),
    escapeCsv(l.targetMarkets.join('; ')),
    escapeCsv(l.citizenshipStatus),
    escapeCsv(l.workRightTargetMarket),
    escapeCsv(l.migrationDocument),
    escapeCsv(l.migrationProcessEta || 'N/A'),
    escapeCsv(l.englishLevel),
    escapeCsv(l.otherLanguages || 'N/A'),
    escapeCsv(l.professionalStatus),
    escapeCsv(l.currentSalary || 'Não informado'),
    escapeCsv(l.targetSalary),
    escapeCsv(l.workModel),
    escapeCsv(l.relocationAvailability),
    escapeCsv(l.mainRelocationChallenge),
    escapeCsv(l.cvFileName),
    escapeCsv(
      l.commercialReadiness === 'ready_to_invest'
        ? 'Preparado para investir'
        : l.commercialReadiness === 'want_conditions_first'
        ? 'Quer conhecer condições antes'
        : 'Sem disponibilidade financeira no momento'
    ),
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_mentoria_rlheadhunter_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
