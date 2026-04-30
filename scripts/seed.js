const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://jitciokolmuhmsrshdhv.supabase.co'
const supabaseKey = 'sb_publishable_UE8-KYegmUNcJcexD_PL-w_ZbhgIymU'

const supabase = createClient(supabaseUrl, supabaseKey)

const mockLeads = [
  {
    name: 'Lucas Silva',
    email: 'lucas.silva@email.com',
    phone: '+5511999999999',
    status: 'qualified',
    score: 92,
    tag: 'hot',
    source: 'whatsapp',
    budget: 15000,
    pain_point: 'Preciso automatizar o atendimento da minha agência de marketing, estamos perdendo leads fora do horário comercial.',
    ai_summary: 'Lead altamente qualificado. Agência de marketing com orçamento de R$15k, busca automação de atendimento.',
  },
  {
    name: 'Mariana Costa',
    email: 'mariana.costa@infoprodutor.com',
    phone: '+5511988888888',
    status: 'new',
    score: 65,
    tag: 'warm',
    source: 'form',
    budget: 5000,
    pain_point: 'Quero vender mais infoprodutos, mas perco muitos leads no funil de vendas.',
    ai_summary: 'Lead média qualificação. Infoprodutora com orçamento de R$5k, perda de leads no funil.',
  },
  {
    name: 'Ricardo Oliveira',
    email: 'ricardo@lojavirtual.com',
    phone: '+5511977777777',
    status: 'converted',
    score: 88,
    tag: 'hot',
    source: 'api',
    budget: 22000,
    pain_point: 'Loja virtual com alto tráfego mas baixa conversão, preciso de follow-up para carrinhos abandonados.',
    ai_summary: 'Lead convertido. Loja virtual com orçamento de R$22k, foco em recuperação de carrinhos.',
  },
  {
    name: 'Juliana Santos',
    email: 'juliana@consultoria.com',
    phone: '+5511966666666',
    status: 'new',
    score: 42,
    tag: 'cold',
    source: 'whatsapp',
    budget: 3000,
    pain_point: 'Consultoria de RH, quero filtrar candidatos automaticamente.',
    ai_summary: 'Lead baixa qualificação. Consultoria de RH, orçamento limitado.',
  },
]

async function seed() {
  const { data, error } = await supabase
    .from('leads')
    .insert(mockLeads)
    .select()

  if (error) {
    console.error('Error inserting leads:', error)
    return
  }

  console.log('Successfully inserted leads:', data)
}

seed()
