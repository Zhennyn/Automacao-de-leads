"use client";

import { notFound } from "next/navigation";
import { mockLeads } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/leads/status-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, User } from "lucide-react";
import Link from "next/link";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { Lead } from "@/lib/types";
import { useEffect, useState } from "react";

export default function LeadDetailsPage({ params }: { params: { id: string } }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        // Fallback to mock
        const mockLead = mockLeads.find((l) => l.id === params.id);
        if (mockLead) {
          setLead(mockLead as any);
        } else {
          notFound();
        }
      } else {
        setLead(data as Lead);
      }
      setLoading(false);
    };
    fetchLead();
  }, [params.id]);

  if (loading) return <div>Carregando...</div>;
  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/leads" className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{lead.name}</h1>
          <p className="text-muted-foreground">{lead.email} • {lead.phone}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Status</CardTitle></CardHeader>
          <CardContent><StatusBadge status={lead.status} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Score</CardTitle></CardHeader>
          <CardContent><span className="text-2xl font-bold">{lead.score}</span></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Tag</CardTitle></CardHeader>
          <CardContent>
            <Badge className={cn(
              lead.tag === "hot" && "bg-red-500/20 text-red-500 border-red-500/50",
              lead.tag === "warm" && "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
              lead.tag === "cold" && "bg-blue-500/20 text-blue-500 border-blue-500/50"
            )}>{lead.tag}</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Resumo da IA</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{lead.aiSummary}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Orçamento</span>
                <span className="text-sm font-medium">
                  {lead.budget ? `R$${lead.budget.toLocaleString("pt-BR")}` : "Não informado"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dor Principal</span>
                <span className="text-sm font-medium">{lead.painPoint}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Histórico de Interações</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {lead.interactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Nenhuma interação registrada</p>
            ) : (
              lead.interactions.map((int) => (
                <div
                  key={int.id}
                  className={cn(
                    "flex gap-3 p-3 rounded-lg",
                    int.isAI ? "bg-primary/10" : "bg-muted"
                  )}
                >
                  <div className="mt-1">
                    {int.isAI ? <Bot className="h-5 w-5 text-primary" /> : <User className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{int.isAI ? "IA" : lead.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(int.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{int.content}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
