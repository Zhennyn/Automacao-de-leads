"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Webhook, Key } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrações</h1>
        <p className="text-muted-foreground">Conecte suas ferramentas favoritas</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-500" />
            <CardTitle>WhatsApp Business</CardTitle>
            <Badge variant="outline" className="ml-auto">Mock</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Conecte sua conta do WhatsApp Business para capturar leads automaticamente.</p>
          <Button>Conectar WhatsApp</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Webhook className="h-5 w-5 text-blue-500" />
            <CardTitle>Webhooks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Receba notificações em tempo real quando um novo lead for capturado.</p>
          <div>
            <Label>URL do Webhook</Label>
            <div className="flex gap-2">
              <Input readOnly value="https://sua-api.com/webhook/leads" />
              <Button variant="outline">Copiar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-yellow-500" />
            <CardTitle>Chave API Gemini</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Configure sua chave da API Gemini para usar os recursos de IA.</p>
          <div>
            <Label>Chave API</Label>
            <Input type="password" placeholder="Insira sua chave da API Gemini" />
          </div>
          <Button>Salvar Chave</Button>
        </CardContent>
      </Card>
    </div>
  );
}
