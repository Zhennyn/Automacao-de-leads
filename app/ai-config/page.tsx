"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockAIConfig } from "@/lib/mock-data";
import { PromptTemplate } from "@/lib/types";
import { Input } from "@/components/ui/input";

export default function AIConfigPage() {
  const [config, setConfig] = useState(mockAIConfig);
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    setConfig((prev) => ({
      ...prev,
      promptTemplates: prev.promptTemplates.map((t) =>
        t.id === editingTemplate.id ? editingTemplate : t
      ),
    }));
    setEditingTemplate(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuração de IA</h1>
        <p className="text-muted-foreground">Gerencie prompts e regras de qualificação</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Automação</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">Ativar Follow-up Automático</p>
            <p className="text-sm text-muted-foreground">IA enviará mensagens automáticas para leads qualificados</p>
          </div>
          <Switch
            checked={config.automationEnabled}
            onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, automationEnabled: checked }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Templates de Prompt</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {config.promptTemplates.map((template) => (
            <div key={template.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{template.name}</h3>
                <Button variant="outline" size="sm" onClick={() => setEditingTemplate(template)}>
                  Editar
                </Button>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{template.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {editingTemplate && (
        <Card>
          <CardHeader><CardTitle>Editar Template: {editingTemplate.name}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input
                value={editingTemplate.name}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Conteúdo</Label>
              <Textarea
                value={editingTemplate.content}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                rows={6}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveTemplate}>Salvar</Button>
              <Button variant="outline" onClick={() => setEditingTemplate(null)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
