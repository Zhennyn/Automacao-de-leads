import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lead } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const tagColors = {
  hot: "bg-red-500/20 text-red-500",
  warm: "bg-yellow-500/20 text-yellow-500",
  cold: "bg-blue-500/20 text-blue-500",
};

export function RecentLeads({ leads }: { leads: Lead[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Leads Recentes</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {leads.map((lead) => (
          <Link
            href={`/leads/${lead.id}`}
            key={lead.id}
            className="flex items-center gap-4 hover:bg-muted p-2 rounded-md transition-colors"
          >
            <Avatar>
              <AvatarFallback>
                {lead.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{lead.name}</p>
              <p className="text-sm text-muted-foreground">{lead.email}</p>
            </div>
            <Badge className={cn(tagColors[lead.tag])}>{lead.tag}</Badge>
            <span className="text-sm font-medium">{lead.score}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
