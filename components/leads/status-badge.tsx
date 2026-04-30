import { Badge } from "@/components/ui/badge";
import { LeadStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusConfig = {
  new: { label: "Novo", className: "bg-blue-500/20 text-blue-500 border-blue-500/50" },
  qualified: { label: "Qualificado", className: "bg-green-500/20 text-green-500 border-green-500/50" },
  converted: { label: "Convertido", className: "bg-purple-500/20 text-purple-500 border-purple-500/50" },
  lost: { label: "Perdido", className: "bg-gray-500/20 text-gray-500 border-gray-500/50" },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
