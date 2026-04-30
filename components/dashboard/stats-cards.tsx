import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { DashboardStats } from "@/lib/types";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    { title: "Total de Leads", value: stats.totalLeads, icon: Users, desc: "Todos os leads capturados" },
    { title: "Leads Qualificados", value: stats.qualifiedLeads, icon: CheckCircle, desc: "Leads aprovados pela IA" },
    { title: "Taxa de Conversão", value: `${stats.conversionRate}%`, icon: TrendingUp, desc: "Convertidos vs Total" },
    { title: "Tempo Médio de Resposta", value: `${stats.avgResponseTime}min`, icon: Clock, desc: "Tempo até primeiro contato" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
