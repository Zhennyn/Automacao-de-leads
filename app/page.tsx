"use client";

import { useStats } from "@/hooks/use-stats";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { LeadsChart } from "@/components/dashboard/leads-chart";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { DashboardSkeleton } from "@/components/layout/loading-skeleton";

export default function DashboardPage() {
  const { stats, loading } = useStats();

  if (loading) return <DashboardSkeleton />;
  if (!stats) return <div>Erro ao carregar dados</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral dos seus leads nas últimas 24 horas</p>
      </div>
      <StatsCards stats={stats} />
      <div className="grid gap-4 md:grid-cols-2">
        <LeadsChart data={stats.leadsByDay} />
        <RecentLeads leads={stats.recentLeads} />
      </div>
    </div>
  );
}
