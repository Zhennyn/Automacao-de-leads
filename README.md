# 🚀 Automação de Geração de Leads com Python
Pipeline inteligente para captação, enriquecimento e priorização de leads B2B com foco em produtividade comercial.

![Capa do projeto](https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,100:0284C7&height=220&section=header&text=Lead%20Automation&fontSize=42&fontColor=ffffff)

## ✨ Funcionalidades

- 🔎 Busca automatizada de empresas por palavra-chave e cidade via Google Places API
- 🧠 Enriquecimento de dados com site, telefone e URL do Google Maps
- 📧 Varredura de e-mails em páginas estratégicas do site (contato, about, fale-conosco)
- 📊 Score de lead para priorização comercial baseada em rating, reviews e dados de contato
- 📁 Exportação em CSV pronta para análise de dados e importação em CRM
- 🔌 Integração opcional com webhook para envio em tempo real para automações externas

## 🛠️ Tecnologias Utilizadas

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Requests](https://img.shields.io/badge/Requests-2D2D2D?style=for-the-badge&logo=python&logoColor=white)
![Dotenv](https://img.shields.io/badge/python--dotenv-ECD53F?style=for-the-badge&logo=python&logoColor=black)
![Google Places API](https://img.shields.io/badge/Google%20Places%20API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
![CSV](https://img.shields.io/badge/CSV-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white)
![REST Webhook](https://img.shields.io/badge/REST%20Webhook-0F172A?style=for-the-badge&logo=fastapi&logoColor=white)
![Power BI Ready](https://img.shields.io/badge/Power%20BI-Ready-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![Azure Ready](https://img.shields.io/badge/Azure-Ready-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)

## 🚀 Como executar localmente

### Pré-requisitos

- Python 3.10 ou superior
- Chave ativa da Google Maps API com Places API habilitada
- Windows PowerShell (ou terminal equivalente)

### Passo a passo

1. Clone o repositório e acesse a pasta do projeto.

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd "Automação de leads"
```

2. Crie e ative o ambiente virtual.

```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Instale as dependências.

```bash
pip install -r requirements.txt
```

4. Crie o arquivo de ambiente e configure sua chave.

```bash
copy .env.example .env
```

5. Execute a automação.

```bash
python lead_automation.py
```

6. Execução com filtros customizados (opcional).

```bash
python lead_automation.py --keywords "contabilidade,bpo financeiro" --cities "Sao Paulo,Rio de Janeiro" --max-results 40 --min-rating 3.8
```

## 📸 Screenshots

Atualmente o repositório não possui imagens em pastas como img/ ou public/.

Sugestões para destacar o projeto visualmente:

- Print da execução no terminal com logs de coleta e enriquecimento
- Print do CSV final aberto no Excel/Google Sheets
- Print de dashboard simples no Power BI consumindo o CSV de saída

## 🌐 Demonstração

🔗 Demo em vídeo (Loom/YouTube): em breve

🔗 Exemplo de saída CSV: em breve

## 📌 Sobre o projeto

Este projeto foi desenvolvido para automatizar uma etapa crítica de operações comerciais e inteligência de mercado: geração e qualificação de leads.

Contexto: projeto aplicado para portfólio técnico em 2026, com foco em eficiência operacional e qualidade de dados.

Objetivo: demonstrar capacidade de construir automações de ponta a ponta com integração de API, tratamento de dados, exportação estruturada e preparação para integrações cloud.

Como este projeto evidencia habilidades transferíveis para vagas de Suporte TI, Dados e Cloud:

- Automação de processos e redução de trabalho manual
- Consumo e tratamento de APIs REST com controle de erros
- Organização de dados para análise e tomada de decisão
- Integração com webhook (base para fluxos com Azure Functions, Logic Apps ou Power Automate)
- Boas práticas de configuração com variáveis de ambiente e scripts reprodutíveis

Feito com ❤️ por Zhennyn.

Contribuições são muito bem-vindas: abra uma issue com sugestões ou envie um pull request.
