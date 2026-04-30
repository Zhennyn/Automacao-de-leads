export type LeadStatus = "new" | "qualified" | "converted" | "lost";
export type LeadTag = "hot" | "warm" | "cold";
export type InteractionType = "whatsapp" | "form" | "api" | "email";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  score: number;
  tag: LeadTag;
  source: InteractionType;
  budget?: number;
  painPoint?: string;
  aiSummary?: string;
  createdAt: string;
  updatedAt: string;
  created_at?: string;
  updated_at?: string;
  interactions: Interaction[];
}

export interface Interaction {
  id: string;
  leadId: string;
  lead_id?: string;
  type: InteractionType;
  content: string;
  isAI: boolean;
  createdAt: string;
  created_at?: string;
}

export interface DashboardStats {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
  leadsByDay: { date: string; count: number }[];
  recentLeads: Lead[];
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
}

export interface AIConfig {
  promptTemplates: PromptTemplate[];
  automationEnabled: boolean;
}
