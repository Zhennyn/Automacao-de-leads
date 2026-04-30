import { Lead, DashboardStats, AIConfig } from "./types";

const generateDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const generateTime = (hoursAgo: number) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Lucas Silva",
    email: "lucas.silva@email.com",
    phone: "+5511999999999",
    status: "qualified",
    score: 92,
    tag: "hot",
    source: "whatsapp",
    budget: 15000,
    painPoint: "Preciso automatizar o atendimento da minha agência de marketing, estamos perdendo leads fora do horário comercial.",
    aiSummary: "Lead altamente qualificado. Agência de marketing com orçamento de R$15k, busca automação de atendimento. Interesse imediato, respondeu em menos de 5 minutos.",
    createdAt: generateDate(2),
    updatedAt: generateTime(1),
    interactions: [
      {
        id: "int-1",
        leadId: "lead-1",
        type: "whatsapp",
        content: "Olá! Vi seu anúncio sobre automação de leads. Quero saber mais.",
        isAI: false,
        createdAt: generateTime(2),
      },
      {
        id: "int-2",
        leadId: "lead-1",
        type: "whatsapp",
        content: "Olá Lucas! Tudo bem? Que bom que você se interessou. Nossa solução automatiza o atendimento via WhatsApp, qualificando leads 24/7. Qual o porte da sua agência?",
        isAI: true,
        createdAt: generateTime(1.9),
      },
      {
        id: "int-3",
        leadId: "lead-1",
        type: "whatsapp",
        content: "Temos uns 15 clientes ativos, faturamento mensal de 80k. Posso investir até 15k nisso.",
        isAI: false,
        createdAt: generateTime(1.5),
      },
    ],
  },
  {
    id: "lead-2",
    name: "Mariana Costa",
    email: "mariana.costa@infoprodutor.com",
    phone: "+5511988888888",
    status: "new",
    score: 65,
    tag: "warm",
    source: "form",
    budget: 5000,
    painPoint: "Quero vender mais infoprodutos, mas perco muitos leads no funil de vendas.",
    aiSummary: "Lead média qualificação. Infoprodutora com orçamento de R$5k, perda de leads no funil. Precisa de acompanhamento para converter.",
    createdAt: generateDate(1),
    updatedAt: generateTime(3),
    interactions: [
      {
        id: "int-5",
        leadId: "lead-2",
        type: "form",
        content: "Formulário preenchido: 'Quero automatizar minhas vendas de infoprodutos'",
        isAI: false,
        createdAt: generateTime(3),
      },
    ],
  },
  {
    id: "lead-3",
    name: "Ricardo Oliveira",
    email: "ricardo@lojavirtual.com",
    phone: "+5511977777777",
    status: "converted",
    score: 88,
    tag: "hot",
    source: "api",
    budget: 22000,
    painPoint: "Loja virtual com alto tráfego mas baixa conversão, preciso de follow-up para carrinhos abandonados.",
    aiSummary: "Lead convertido. Loja virtual com orçamento de R$22k, foco em recuperação de carrinhos. Assinou plano Enterprise.",
    createdAt: generateDate(5),
    updatedAt: generateTime(24),
    interactions: [],
  },
  {
    id: "lead-4",
    name: "Juliana Santos",
    email: "juliana@consultoria.com",
    phone: "+5511966666666",
    status: "new",
    score: 42,
    tag: "cold",
    source: "whatsapp",
    budget: 3000,
    painPoint: "Consultoria de RH, quero filtrar candidatos automaticamente.",
    aiSummary: "Lead baixa qualificação. Consultoria de RH, orçamento limitado. Talvez não seja um fit agora.",
    createdAt: generateDate(3),
    updatedAt: generateTime(12),
    interactions: [],
  },
];

export const mockDashboardStats: DashboardStats = {
  totalLeads: 27,
  qualifiedLeads: 12,
  conversionRate: 24.5,
  avgResponseTime: 8,
  leadsByDay: [
    { date: "2026-04-23", count: 5 },
    { date: "2026-04-24", count: 8 },
    { date: "2026-04-25", count: 3 },
    { date: "2026-04-26", count: 10 },
    { date: "2026-04-27", count: 7 },
    { date: "2026-04-28", count: 9 },
    { date: "2026-04-29", count: 4 },
  ],
  recentLeads: mockLeads.slice(0, 3),
};

export const mockAIConfig: AIConfig = {
  promptTemplates: [
    {
      id: "tpl-1",
      name: "Qualificação Inicial",
      content: "Você é um assistente de qualificação. Analise: '{{lead_message}}'. Extraia nome, orçamento, dor principal. Retorne resumo e score 0-100.",
      isDefault: true,
    },
  ],
  automationEnabled: true,
};
