"use client";

import { useLeads } from "@/hooks/use-leads";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadFilters } from "@/components/leads/lead-filters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { LeadStatus, LeadTag } from "@/lib/types";

export default function LeadsPage() {
  const [filters, setFilters] = useState<{
    status?: LeadStatus;
    tag?: LeadTag;
    search?: string;
  }>({});
  const { leads, loading } = useLeads(filters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground">Gerencie todos os seus leads</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar leads..."
            className="pl-9"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <LeadFilters onFilterChange={(f) => setFilters({ ...filters, ...f })} />
      </div>
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-muted rounded-md animate-pulse" />
          ))}
        </div>
      ) : (
        <LeadsTable leads={leads} />
      )}
    </div>
  );
}
