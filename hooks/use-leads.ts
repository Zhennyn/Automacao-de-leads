import { useState, useEffect } from "react";
import { Lead } from "@/lib/types";
import { mockLeads } from "@/lib/mock-data";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

const supabase = createBrowserClient();

export function useLeads(filters?: {
  status?: Lead["status"];
  tag?: Lead["tag"];
  search?: string;
}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (filters?.status) {
          query = query.eq("status", filters.status);
        }
        if (filters?.tag) {
          query = query.eq("tag", filters.tag);
        }
        if (filters?.search) {
          query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Supabase error, falling back to mock:", error);
          // Fallback to mock data
          let filtered = [...mockLeads];
          if (filters?.status) filtered = filtered.filter((l) => l.status === filters.status);
          if (filters?.tag) filtered = filtered.filter((l) => l.tag === filters.tag);
          if (filters?.search) {
            const s = filters.search.toLowerCase();
            filtered = filtered.filter(
              (l) => l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s)
            );
          }
          setLeads(filtered);
        } else {
          setLeads((data || []) as Lead[]);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        // Fallback to mock data
        let filtered = [...mockLeads];
        if (filters?.status) filtered = filtered.filter((l) => l.status === filters.status);
        if (filters?.tag) filtered = filtered.filter((l) => l.tag === filters.tag);
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          filtered = filtered.filter(
            (l) => l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s)
          );
        }
        setLeads(filtered);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [filters?.status, filters?.tag, filters?.search]);

  return { leads, loading };
}
