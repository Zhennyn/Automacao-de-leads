"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { StatusBadge } from "./status-badge";

const tagColors = {
  hot: "bg-red-500/20 text-red-500 border-red-500/50",
  warm: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  cold: "bg-blue-500/20 text-blue-500 border-blue-500/50",
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Origem</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                Nenhum lead encontrado
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/50">
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="font-medium hover:text-primary">
                    {lead.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{lead.email}</div>
                  <div className="text-sm text-muted-foreground">{lead.phone}</div>
                </TableCell>
                <TableCell><StatusBadge status={lead.status} /></TableCell>
                <TableCell><span className="font-medium">{lead.score}</span></TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(tagColors[lead.tag])}>
                    {lead.tag}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{lead.source}</TableCell>
                <TableCell>
                  {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
