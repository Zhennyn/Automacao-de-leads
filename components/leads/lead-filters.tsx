"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadStatus, LeadTag } from "@/lib/types";

export function LeadFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: { status?: LeadStatus; tag?: LeadTag; search?: string }) => void;
}) {
  const handleChange = (key: string, value: unknown) => {
    const stringValue = value as string;
    onFilterChange({ [key]: stringValue === "all" ? undefined : stringValue } as any);
  };

  return (
    <div className="flex gap-2">
      <Select onValueChange={(v) => handleChange("status", v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="new">Novo</SelectItem>
          <SelectItem value="qualified">Qualificado</SelectItem>
          <SelectItem value="converted">Convertido</SelectItem>
          <SelectItem value="lost">Perdido</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(v) => handleChange("tag", v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="hot">Hot</SelectItem>
          <SelectItem value="warm">Warm</SelectItem>
          <SelectItem value="cold">Cold</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
