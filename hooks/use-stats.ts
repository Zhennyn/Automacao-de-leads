import { useState, useEffect } from "react";
import { DashboardStats, Lead } from "@/lib/types";
import { mockDashboardStats } from "@/lib/mock-data";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

const supabase = createBrowserClient();

export function useStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data: leads, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error, falling back to mock:", error);
          // Fallback to mock data
          await new Promise((resolve) => setTimeout(resolve, 800));
          setStats(mockDashboardStats);
          return;
        }

        const totalLeads = leads?.length || 0;
        const qualifiedLeads = leads?.filter((l: Lead) => l.status === "qualified").length || 0;
        const convertedLeads = leads?.filter((l: Lead) => l.status === "converted").length || 0;
        const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

        // Get leads from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentLeads = leads?.filter((l: Lead) => new Date(l.created_at || l.createdAt || Date.now()).getTime() >= sevenDaysAgo.getTime()).slice(0, 3) || [];

        // Leads by day (last 7 days)
        const leadsByDay = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          const dateStr = date.toISOString().split("T")[0];
          const count = leads?.filter((l: Lead) => (l.created_at || l.createdAt || "").startsWith(dateStr)).length || 0;
          return { date: dateStr, count };
        });

        setStats({
          totalLeads,
          qualifiedLeads,
          conversionRate: Math.round(conversionRate * 10) / 10,
          avgResponseTime: 8, // TODO: Calculate from interactions
          leadsByDay,
          recentLeads: recentLeads as Lead[],
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback to mock data
        setStats(mockDashboardStats);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, loading };
}
