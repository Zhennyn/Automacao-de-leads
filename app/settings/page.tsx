"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Perfil do Usuário</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">LS</AvatarFallback>
            </Avatar>
            <Button variant="outline">Alterar Foto</Button>
          </div>
          <div className="grid gap-2">
            <Label>Nome</Label>
            <Input defaultValue="Lucas Silva" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input defaultValue="lucas@leadautomate.com" />
          </div>
          <Button>Salvar Perfil</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Plano e Faturamento</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Plano Atual: Pro</p>
              <p className="text-sm text-muted-foreground">Até 1000 leads/mês</p>
            </div>
            <Button variant="outline">Gerenciar Plano</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
