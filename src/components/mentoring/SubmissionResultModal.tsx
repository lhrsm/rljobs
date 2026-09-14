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
import { useLanguage } from '../../context/LanguageContext';
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
  const { language } = useLanguage();
  const isEn = language === 'en';

  const isLeadA = submission.classification === 'A';
  const isLeadB = submission.classification === 'B';
  const isLeadC = submission.classification === 'C';

  const whatsAppLink = getWhatsAppLeadLink(submission);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white border border-slate-200 rounded-lg max-w-xl w-full p-6 sm:p-8 text-left shadow-2xl overflow-hidden animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label={isEn ? "Close modal" : "Fechar modal"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* ----------------- LEAD A: PRIORITÁRIO (VIP) ----------------- */}
        {isLeadA && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isEn ? "Pre-Qualified Profile • Priority Lead" : "Perfil Pré-Qualificado • Lead Prioritário"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {isEn ? `Congratulations, ${submission.fullName.split(' ')[0]}!` : `Parabéns, ${submission.fullName.split(' ')[0]}!`}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-600">
              <p className="leading-relaxed">
                {isEn ? (
                  <>We identified high alignment between your profile (<strong className="text-slate-900">{submission.currentRole}</strong>, {submission.yearsExperience} years of experience, confirmed work authorization) and the demands of target international markets.</>
                ) : (
                  <>Identificamos alta aderência entre o seu perfil (<strong className="text-slate-900">{submission.currentRole}</strong>, {submission.yearsExperience} anos de experiência, direito de trabalho confirmado) e as demandas do mercado internacional.</>
                )}
              </p>
              <p className="text-emerald-700 font-semibold">
                {isEn 
                  ? "Your request has been classified with maximum priority for direct attention by Ricardo Oliveira."
                  : "Sua solicitação foi classificada com prioridade máxima para atendimento direto por Ricardo Oliveira."}
              </p>
            </div>

            {/* CTAs for Lead A */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-extrabold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>{isEn ? "START VIP WHATSAPP CONVERSATION" : "INICIAR CONVERSA VIP NO WHATSAPP"}</span>
              </a>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  {isEn 
                    ? "Your pre-qualification data and CV have been securely transmitted."
                    : "Os dados da sua pré-qualificação e CV já foram transmitidos com segurança."}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- LEAD B: AVALIAR ----------------- */}
        {isLeadB && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                  <span>{isEn ? "Profile Under Strategic Review" : "Perfil em Análise Estratégica"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {isEn ? "Thank you for submitting!" : "Obrigado pelo envio!"}
                </h3>
              </div>
            </div>

            {/* Texto oficial requerido */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                {isEn 
                  ? "Your profile will be reviewed taking into account your experience, target market, documentation, language proficiency, and professional goals."
                  : "Seu perfil será analisado considerando experiência, mercado-alvo, documentação, idioma e objetivo profissional."}
              </p>
              <p>
                {isEn ? (
                  <>If there is strong alignment with the <strong>International Job Hunting & Career Mentoring</strong> program, our team will reach out with program details and strategy.</>
                ) : (
                  <>Caso exista aderência ao <strong>International Job Hunting & Career Mentoring</strong>, entraremos em contato para apresentar a estratégia e as condições do programa.</>
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onViewJobs();
                }}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>{isEn ? "Explore Jobs Board" : "Explorar Mural de Vagas"}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <span>{isEn ? "Close" : "Concluir"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ----------------- LEAD C: CONTEÚDO / VAGAS ----------------- */}
        {isLeadC && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  <span>{isEn ? "Information & Open Positions" : "Informação & Oportunidades Abertas"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {isEn ? "Thank you for your interest!" : "Obrigado pelo seu interesse!"}
                </h3>
              </div>
            </div>

            {/* Texto oficial requerido */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                {isEn 
                  ? "At this stage, our individualized advisory is an exclusive paid professional service."
                  : "Neste momento, o acompanhamento individual é um serviço profissional remunerado."}
              </p>
              <p>
                {isEn ? (
                  <>You can continue exploring our public job openings and content from <strong>RL Headhunter</strong>, and request a new assessment when ready to invest in the program.</>
                ) : (
                  <>Você pode continuar acompanhando as vagas e conteúdos públicos da <strong>RL Headhunter</strong> e voltar a solicitar uma avaliação quando estiver preparado(a) para investir no programa.</>
                )}
              </p>
            </div>

            {/* Actions for Lead C */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onViewJobs();
                }}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>{isEn ? "View Public Job Openings" : "Ver Vagas Abertas no Mural Público"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://www.linkedin.com/in/ricardosoaresoliveira/?locale=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold border border-slate-300 shadow-xs transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span>{isEn ? "Follow Insights & Articles on LinkedIn" : "Acompanhar Artigos e Conteúdos no LinkedIn"}</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
