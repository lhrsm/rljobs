import React, { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      name: "Marcus Vinicius Ferreira",
      role: "Staff Backend Engineer",
      company: "US FinTech (São Francisco / Remoto Brasil)",
      rating: 5,
      feedback: language === 'pt'
        ? "O Ricardo Oliveira conduziu todo o processo de forma impecável. Desde a preparação técnica para as etapas arquiteturais até a estruturação do contrato B2B internacional e planejamento tributário. Transição de carreira executada com precisão cirúrgica."
        : "Ricardo Oliveira managed the entire hiring journey with supreme professionalism. From architectural discussions to international B2B contracting and cross-border tax planning. Flawless execution.",
      initials: "MV",
    },
    {
      name: "Camila Duarte",
      role: "Head of Product",
      company: "European Healthtech Group (Lisboa)",
      rating: 5,
      feedback: language === 'pt'
        ? "A assessoria executiva foi determinante para a minha mudança para a Europa. A clareza no alinhamento de expectativas com o Board e a agilidade em todas as fases foram exemplares."
        : "The executive advisory was instrumental in my relocation to Europe. Exceptional clarity during Board alignments and seamless management across all milestones.",
      initials: "CD",
    },
    {
      name: "Rodrigo M. Tavares",
      role: "Lead AI & LLM Engineer",
      company: "Silicon Valley AI Scale-up (Remoto EUA / USD)",
      rating: 5,
      feedback: language === 'pt'
        ? "Consegui meu contrato internacional direto em Dólar para atuar com LLMs e engenharia de IA de ponta nos EUA. O Ricardo conhecia exatamente as exigências do time técnico de São Francisco e me preparou em cada detalhe."
        : "Secured my direct USD contract working on enterprise LLM applications in the US. Ricardo understood the exact expectations of the SF tech leadership.",
      initials: "RT",
    },
    {
      name: "Mariana Silveira",
      role: "Principal Product Manager",
      company: "Global Payments Corp (Nova York • Lisboa)",
      rating: 5,
      feedback: language === 'pt'
        ? "A transição de uma scale-up para um produto global em moeda forte parecia complexa, mas o direcionamento do Ricardo sobre posicionamento executivo e negociação salarial fez toda a diferença."
        : "Transitioning to a global product in hard currency was seamless with Ricardo's strategic guidance on positioning and compensation.",
      initials: "MS",
    },
    {
      name: "Lucas Mendes Prado",
      role: "Staff UX & Design Systems Lead",
      company: "European Tech Group (Berlim • Porto)",
      rating: 5,
      feedback: language === 'pt'
        ? "O processo foi extremamente ágil e transparente. O Ricardo me conectou com a liderança certa na Europa para liderar a unificação do Design System global da empresa, com pacote completo de relocation."
        : "Extremely transparent process. Ricardo connected me with the right leadership in Europe to lead the global Design System unification with relocation support.",
      initials: "LP",
    },
    {
      name: "Fernanda Guimarães",
      role: "Senior Backend Engineer (Go & Kafka)",
      company: "US Enterprise Cloud (Remoto Brasil / USD)",
      rating: 5,
      feedback: language === 'pt'
        ? "Receber em Dólar trabalhando 100% de casa no Brasil mudou minha vida financeira. O suporte do Ricardo em toda a parte contratual e tributária internacional foi essencial para eu ter total segurança."
        : "Earning in USD while working 100% remotely from Brazil transformed my finances. Ricardo's legal and contract advisory provided complete peace of mind.",
      initials: "FG",
    },
    {
      name: "Gabriel Valente",
      role: "Principal DevOps & Platform Architect",
      company: "UK Tech Scale-up (Londres • Lisboa)",
      rating: 5,
      feedback: language === 'pt'
        ? "Em menos de 3 semanas já estava com propostas de empresas internacionais na mesa. A qualidade das oportunidades e o acesso que o Ricardo proporciona são de outro nível."
        : "In less than 3 weeks I had international offers on the table. The caliber of opportunities Ricardo brings is leagues ahead of standard platforms.",
      initials: "GV",
    },
    {
      name: "Eduardo S. Albuquerque",
      role: "VP of Engineering & Hiring Executive",
      company: "Enterprise Software Group (EUA / Brasil)",
      rating: 5,
      feedback: language === 'pt'
        ? "Contratamos Staff Engineers e Líderes Técnicos com a shortlist do Ricardo em tempo recorde. O filtro de competências e a maturidade dos candidatos apresentados são de um nível muito acima do padrão de mercado."
        : "We hired Staff Engineers and Tech Leads through Ricardo's shortlist in record time. The assessment depth and leadership maturity of the candidates stand far above industry standards.",
      initials: "EA",
    }
  ];

  // Marcas Oficiais Originais
  const officialBrands = [
    { name: "BNP Paribas", logo: "/logos/bnpparibas.svg" },
    { name: "Capgemini", logo: "/logos/capgemini.svg" },
    { name: "Deloitte", logo: "/logos/deloitte.svg" },
    { name: "Accenture", logo: "/logos/accenture.svg" },
    { name: "IBM", logo: "/logos/ibm.svg" },
    { name: "CGI", logo: "/logos/cgi.svg" },
    { name: "TOTVS", logo: "/logos/totvs.svg" },
    { name: "Nubank", logo: "/logos/nubank.svg" },
    { name: "Mercado Pago", logo: "/logos/mercadopago.svg" },
    { name: "Stripe", logo: "/logos/stripe.svg" },
    { name: "AWS", logo: "/logos/aws.svg" },
    { name: "OpenAI", logo: "/logos/openai.svg" },
    { name: "Google Cloud", logo: "/logos/googlecloud.svg" },
    { name: "Salesforce", logo: "/logos/salesforce.svg" },
    { name: "SAP", logo: "/logos/sap.svg" },
    { name: "Cisco", logo: "/logos/cisco.svg" },
    { name: "Uber", logo: "/logos/uber.svg" }
  ];

  // Carousel State & Responsiveness
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Auto-play every 6 seconds if not hovered
  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, maxIndex]);

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/70 overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 block mb-2">
              {t.testimonials.badge}
            </span>
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Prev / Next Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Depoimento anterior"
              className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-900 flex items-center justify-center transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Próximo depoimento"
              className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-900 flex items-center justify-center transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Testimonials Carousel Viewport */}
        <div
          className="relative overflow-hidden mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage + (itemsPerPage === 1 ? 0 : 24 / itemsPerPage / 16))}%)`
            }}
          >
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0"
                style={{
                  width: `calc(${100 / itemsPerPage}% - ${(24 * (itemsPerPage - 1)) / itemsPerPage}px)`
                }}
              >
                <article className="h-full bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-600/30 hover:shadow-md transition-all duration-300">
                  <div>
                    {/* Top Row: Quote Icon + 5 Stars */}
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-6 h-6 text-blue-600/40" />
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(item.rating)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                      "{item.feedback}"
                    </p>
                  </div>

                  {/* Author Card */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      {item.initials}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-700 mt-0.5 truncate">
                        {item.role}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.company}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mb-20">
          {[...Array(maxIndex + 1)].map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Ir para slide ${dotIdx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === dotIdx
                  ? 'w-7 h-2.5 bg-blue-800'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Brands Section (Apenas Nome + Logo Oficial) */}
        <div className="pt-10 border-t border-slate-200">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
              {t.testimonials.brandsTitle}
            </span>
          </div>

          {/* Carousel Viewport with Soft Gradient Edge Fade */}
          <div className="relative w-full overflow-hidden py-2">
            {/* Left Gradient Edge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10" />

            {/* Continuous Slower Marquee Ticker */}
            <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First Track */}
              {officialBrands.map((brand, i) => (
                <div
                  key={`brand-pure-t1-${i}`}
                  className="group bg-white hover:bg-slate-50/80 rounded-xl px-5 py-3 border border-slate-200 shadow-2xs flex items-center gap-3.5 shrink-0 transition-all duration-300 cursor-default hover:border-slate-300 hover:shadow-xs"
                >
                  <div className="w-10 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1.5 transition-colors group-hover:bg-white">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo oficial`}
                      className="max-h-6 max-w-[32px] w-auto h-auto object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              ))}

              {/* Duplicate Track for Seamless Endless Loop */}
              {officialBrands.map((brand, i) => (
                <div
                  key={`brand-pure-t2-${i}`}
                  className="group bg-white hover:bg-slate-50/80 rounded-xl px-5 py-3 border border-slate-200 shadow-2xs flex items-center gap-3.5 shrink-0 transition-all duration-300 cursor-default hover:border-slate-300 hover:shadow-xs"
                  aria-hidden="true"
                >
                  <div className="w-10 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1.5 transition-colors group-hover:bg-white">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo oficial`}
                      className="max-h-6 max-w-[32px] w-auto h-auto object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Gradient Edge */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10" />
          </div>
        </div>

      </div>
    </section>
  );
};
