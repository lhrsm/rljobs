import { Job } from '../types';

export function localizeJob(job: Job, lang: 'pt' | 'en') {
  if (lang === 'pt') {
    return {
      ...job,
      displayTitle: job.title,
      displayLocation: job.location,
      displayTimezone: job.timezone,
      displayContract: job.contractType,
      displayWorkModel: job.workModel === 'Remote' ? 'Remoto' : (job.workModel === 'Hybrid' ? 'Híbrido' : 'Presencial'),
      displayRegion: job.region === 'USA' ? 'EUA' : (job.region === 'Europe' ? 'Europa' : 'Brasil'),
      summary: job.description.pt.summary,
      responsibilities: job.description.pt.responsibilities,
      requirements: job.description.pt.requirements,
      benefits: job.description.pt.benefits,
      crossBorderNotes: job.description.pt.crossBorderNotes
    };
  }

  // English Localization
  let enTitle = job.title;
  const titleReplacements: [RegExp, string][] = [
    [/\bCandidatura Espontânea(\s*-\s*Banco de Talentos Geral)?\b/gi, 'Spontaneous Application - Executive Talent Pool'],
    [/\bBanco de Talentos\b/gi, 'Executive Talent Pool'],
    [/\bDesenvolvedor(a)? Full Stack\b/gi, 'Full Stack Developer'],
    [/\bDesenvolvedor(a)? Frontend\b/gi, 'Frontend Developer'],
    [/\bDesenvolvedor(a)? Backend\b/gi, 'Backend Developer'],
    [/\bDesenvolvedor(a)?\b/gi, 'Developer'],
    [/\bEngenheiro(a)? de Software\b/gi, 'Software Engineer'],
    [/\bEngenheiro(a)? de Dados\b/gi, 'Data Engineer'],
    [/\bEngenheiro(a)? de IA\b/gi, 'AI Engineer'],
    [/\bEngenheiro(a)?\b/gi, 'Engineer'],
    [/\bAnalista de Sistemas\b/gi, 'Systems Analyst'],
    [/\bAnalista de Negócios\b/gi, 'Business Analyst'],
    [/\bAnalista de Dados\b/gi, 'Data Analyst'],
    [/\bAnalista\b/gi, 'Analyst'],
    [/\bGerente de Engenharia\b/gi, 'Engineering Manager'],
    [/\bGerente de Produto\b/gi, 'Product Manager'],
    [/\bGerente de Projetos\b/gi, 'Project Manager'],
    [/\bGerente\b/gi, 'Manager'],
    [/\bArquiteto(a)? de Soluções\b/gi, 'Solutions Architect'],
    [/\bArquiteto(a)? de Software\b/gi, 'Software Architect'],
    [/\bArquiteto(a)? de Dados\b/gi, 'Data Architect'],
    [/\bArquiteto(a)?\b/gi, 'Architect'],
    [/\bLíder Técnico\b/gi, 'Tech Lead'],
    [/\bCoordenador(a)?\b/gi, 'Coordinator'],
    [/\bDiretor(a)?\b/gi, 'Director'],
    [/\bSênior\b/gi, 'Senior'],
    [/\bPleno\b/gi, 'Mid-Level'],
    [/\bJúnior\b/gi, 'Junior'],
    [/\bEspecialista em\b/gi, 'Specialist in'],
    [/\bEspecialista\b/gi, 'Specialist'],
    [/\bConsultor(a)?\b/gi, 'Consultant'],
    [/\bCientista de Dados\b/gi, 'Data Scientist'],
    [/\bInteligência Artificial\b/gi, 'AI'],
    [/\bSegurança da Informação\b/gi, 'Information Security'],
    [/\bDados\b/gi, 'Data']
  ];

  titleReplacements.forEach(([pattern, repl]) => {
    enTitle = enTitle.replace(pattern, repl);
  });

  let enLocation = job.location;
  if (enLocation.includes('Remoto Global / Brasil') || enLocation.includes('Remoto Global')) {
    enLocation = 'Global Remote / Brazil';
  } else if (enLocation.includes('EUA / Remoto Brasil')) {
    enLocation = 'US Remote (USD)';
  } else if (enLocation.includes('Portugal / Brasil / Remoto')) {
    enLocation = 'Portugal / Remote';
  } else {
    enLocation = enLocation
      .replace(/Brasil/gi, 'Brazil')
      .replace(/\(Remoto\)/gi, '(Remote)')
      .replace(/\(Híbrido\)/gi, '(Hybrid)')
      .replace(/\(Presencial\)/gi, '(On-site)');
  }

  let enTimezone = job.timezone;
  if (enTimezone.includes('Flexível / Horário Comercial') || enTimezone.includes('Horário Comercial')) {
    enTimezone = 'Flexible / Business Hours';
  } else if (enTimezone.includes('Flexível (EUA / Global)')) {
    enTimezone = 'Flexible (US / Global)';
  }

  let enContract = job.contractType;
  if (enContract === 'PJ Brasil' || enContract === 'PJ / B2B') {
    enContract = 'Brazil B2B Contractor';
  }

  return {
    ...job,
    displayTitle: enTitle,
    displayLocation: enLocation,
    displayTimezone: enTimezone,
    displayContract: enContract,
    displayWorkModel: job.workModel,
    displayRegion: job.region,
    summary: job.description.en?.summary || job.description.pt.summary,
    responsibilities: job.description.en?.responsibilities || job.description.pt.responsibilities,
    requirements: job.description.en?.requirements || job.description.pt.requirements,
    benefits: job.description.en?.benefits || job.description.pt.benefits,
    crossBorderNotes: job.description.en?.crossBorderNotes || job.description.pt.crossBorderNotes
  };
}
