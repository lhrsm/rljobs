import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Compass, 
  ArrowRight, 
  MessageSquare, 
  Linkedin, 
  Briefcase, 
  X, 
  ShieldCheck 
} from 'lucide-react';
import { MentoringLeadSubmission } from '../../types/mentoring';
import { getWhatsAppLeadLink } from '../../services/mentoringService';

interface SubmissionResultModalProps {
  submission: MentoringLeadSubmission;
  onClose: () => void;
  onViewJobs: () => void;
}

export const SubmissionResultModal: React.FC<SubmissionResultModalProps> = ({
  submission,
  onClose,
  onViewJobs,
}) => {
  const isLeadA = submission.classification === 'A';
  const isLeadB = submission.classification === 'B';
  const isLeadC = submission.classification === 'C';

  const whatsAppLink = getWhatsAppLeadLink(submission);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-left shadow-2xl overflow-hidden animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ----------------- LEAD A: PRIORITÁRIO (VIP) ----------------- */}
        {isLeadA && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Perfil Pré-Qualificado • Lead Prioritário</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Parabéns, {submission.fullName.split(' ')[0]}!
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs sm:text-sm text-slate-300">
              <p className="leading-relaxed">
                Identificamos alta aderência entre o seu perfil (<strong className="text-white">{submission.currentRole}</strong>, {submission.yearsExperience} anos de experiência, direito de trabalho confirmado) e as demandas do mercado internacional.
              </p>
              <p className="text-emerald-400 font-medium">
                Sua solicitação foi classificada com <strong>prioridade máxima</strong> para atendimento direto por Ricardo Oliveira.
              </p>
            </div>

            {/* CTAs for Lead A */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>INICIAR CONVERSA VIP NO WHATSAPP</span>
              </a>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  Os dados da sua pré-qualificação e CV já foram transmitidos com segurança.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- LEAD B: AVALIAR ----------------- */}
        {isLeadB && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                  <span>Perfil em Análise Estratégica</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Obrigado pelo envio!
                </h3>
              </div>
            </div>

            {/* Texto oficial requerido */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              <p>
                Seu perfil será analisado considerando experiência, mercado-alvo, documentação, idioma e objetivo profissional.
              </p>
              <p>
                Caso exista aderência ao <strong>International Job Hunting & Career Mentoring</strong>, entraremos em contato para apresentar a estratégia e as condições do programa.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onViewJobs();
                }}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Explorar Mural de Vagas</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                <span>Concluir</span>
              </button>
            </div>
          </div>
        )}

        {/* ----------------- LEAD C: CONTEÚDO / VAGAS ----------------- */}
        {isLeadC && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <span>Informação & Oportunidades Abertas</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Obrigado pelo seu interesse!
                </h3>
              </div>
            </div>

            {/* Texto oficial requerido */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              <p>
                Neste momento, o acompanhamento individual é um serviço profissional remunerado.
              </p>
              <p>
                Você pode continuar acompanhando as vagas e conteúdos públicos da <strong>RL Headhunter</strong> e voltar a solicitar uma avaliação quando estiver preparado(a) para investir no programa.
              </p>
            </div>

            {/* Actions for Lead C */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onViewJobs();
                }}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Ver Vagas Abertas no Mural Público</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://www.linkedin.com/in/ricardosoaresoliveira/?locale=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>Acompanhar Artigos e Conteúdos no LinkedIn</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
