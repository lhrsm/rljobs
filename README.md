# RL Executive Search | Plataforma Internacional de Headhunting & Tech Recruiting

Plataforma web de recrutamento executivo e internacional liderada pelo Headhunter **Ricardo Oliveira**, especializada em conectar talentos tech e líderes C-Level a posições estratégicas nos **EUA, Europa e Brasil**.

---

## 1. Visão Geral da Solução

A plataforma foi desenvolvida para atender tanto candidatos de alta especialização técnica (Engenharia de Software, Produto, Dados/IA, Cloud/SRE e Liderança) quanto empresas internacionais e scale-ups que buscam contratações cross-border com total segurança jurídica, fiscal e agilidade no fechamento.

### Destaques e Diferenciais
- **Headhunter & Liderança:** Condução estratégica de Ricardo Oliveira (+12 anos de experiência em executive search global).
- **Cobertura Internacional:** Vagas nos EUA (USD), Europa (EUR), Brasil (BRL) e Remoto Global com suporte a modelos W2, PJ internacional B2B, CLT e vistos (H-1B, O-1, D3, Blue Card).
- **Acessibilidade WCAG 2.1 AA:** Alto contraste de cores, foco visível, navegação 100% por teclado, atributos ARIA, leitores de tela e link de pulo para o conteúdo (`SkipLink`).
- **Design System Corporativo:** Tipografia moderna (*Plus Jakarta Sans* / *Inter*), paleta elegante (azul marinho, ardósia, branco, esmeralda), iconografia estrita via **Lucide React** (sem emojis na interface).
- **Internacionalização (i18n):** Alternância instantânea e persistida entre **Português (PT-BR)** e **Inglês (EN)**.
- **Job Board Interativo:** Busca global, filtros laterais (Região, Senioridade, Modelo de Trabalho, Moeda, Área de Atuação) e ordenação em tempo real.
- **Candidatura Rápida:** Formulário acessível com **upload de currículo via drag-and-drop** (PDF/DOCX), validações inline e protocolo de acompanhamento.
- **Área B2B (Para Empresas):** Apresentação dos pilares estratégicos e formulário de briefing para contratação de equipes e liderança tech.

---

## 2. Estrutura do Projeto

```
RL/
├── backend/                    # Backend FastAPI (Python 3.11)
│   ├── main.py                 # Rotas REST e CORS
│   ├── models.py               # Schemas Pydantic tipados
│   ├── data.py                 # Mock database inicial
│   └── requirements.txt        # Dependências Python
├── src/
│   ├── assets/                 # Brand Assets (RL Jobs.png, RL tech.png)
│   ├── components/
│   │   ├── about/              # Sobre Ricardo Oliveira & Framework 360°
│   │   ├── b2b/                # Seção B2B & Formulário de Briefing Corporativo
│   │   ├── hero/               # Hero Section, Quick Search & Métricas
│   │   ├── jobs/               # JobBoard, JobCard, JobFilters, JobDetailModal, QuickApplyModal
│   │   ├── layout/             # Navbar (i18n, CTAs) & Footer (LGPD/GDPR)
│   │   ├── testimonials/       # Depoimentos reais & Marcas parceiras
│   │   └── ui/                 # Button, Badge, Modal, Input, Select, Textarea, Toast, SkipLink
│   ├── context/
│   │   ├── LanguageContext.tsx # Gerenciamento reativo de idioma PT/EN
│   │   └── JobContext.tsx      # Estado global de vagas, busca e filtros
│   ├── data/
│   │   ├── jobsData.ts         # Dataset de vagas (USD, EUR, BRL)
│   │   └── translations.ts     # Dicionários completos PT-BR e EN
│   ├── services/
│   │   └── api.ts              # Cliente de API com fallback transparente
│   ├── types/
│   │   └── index.ts            # Tipagens TypeScript completas
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Tailwind CSS & Regras WCAG 2.1 AA
├── public/                     # Assets estáticos e favicons
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 3. Como Executar

### Pré-requisitos
- **Node.js:** v18+ (testado na v24)
- **Python:** 3.10+ (opcional para o backend FastAPI)

### Executando o Frontend
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:3000` no seu navegador.

### Executando o Backend FastAPI (Opcional)
1. Instale os pacotes Python:
   ```bash
   pip install -r backend/requirements.txt
   ```
2. Inicie a API com hot-reload:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```
3. Documentação Swagger interativa disponível em `http://localhost:8000/docs`.

---

## 4. Conformidade e Acessibilidade (WCAG 2.1 AA)

- **Contraste de Cores:** Relação superior a 4.5:1 em todos os elementos de texto e badges.
- **Navegação por Teclado:** Suporte completo à tecla `Tab`, `Shift+Tab`, `Enter`, `Space` e `Escape` em modais e menus.
- **Leitores de Tela:** Utilização de `aria-label`, `aria-expanded`, `aria-describedby`, `role="dialog"`, `role="status"` e `aria-live="polite"`.
- **Skip to Content:** Link oculto acessível pelo teclado para pular a navegação diretamente para o conteúdo principal (`#main-content`).
