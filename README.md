# LeadAutomate - AI Lead Automation Suite

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Connected-3ECF8E?style=flat-square&logo=supabase)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square&logo=google)

Complete lead automation ecosystem with AI-powered qualification, scoring, and follow-up automation. Built for small businesses, agencies, and infoproduct creators.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Dashboard Setup](#dashboard-setup)
- [Python Lead Generator](#python-lead-generator)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Next.js Dashboard
- **Dashboard Overview** - Total leads, qualified leads, conversion rate, response time
- **Leads Management** - List, filter, search, and manage leads with real-time Supabase integration
- **Lead Details** - Full conversation history, AI summary, extracted data (name, budget, pain points)
- **AI Configuration** - Edit prompt templates, define qualification rules, toggle automation
- **Integrations** - WhatsApp Business, Webhook endpoints, Gemini API management
- **Dark Mode Default** - Clean SaaS style inspired by Stripe/Linear
- **Responsive Design** - Works on desktop and mobile
- **Loading Skeletons** - Smooth loading states

### Python Lead Generator
- **Automated Search** - Google Places API for business discovery by keyword and city
- **Data Enrichment** - Extract emails, phones, websites from business pages
- **Lead Scoring** - Priority based on rating, reviews, and contact data
- **CSV Export** - Ready for CRM import and Power BI analysis
- **Webhook Integration** - Real-time lead delivery to external systems

---

## Tech Stack

| Component | Technologies |
|-----------|---------------|
| **Dashboard** | Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI, Recharts |
| **Backend** | Supabase (PostgreSQL, Auth, Realtime, SSR Support) |
| **AI Layer** | Gemini API for lead qualification and summarization |
| **Generator** | Python, Google Places API, Requests, CSV |

---

## Quick Start

### Prerequisites
- Node.js 18+ (for dashboard)
- Python 3.10+ (for generator)
- Supabase account (free tier works)
- Google Places API key
- Gemini API key

---

## Dashboard Setup

### 1. Install Dependencies

```bash
cd "C:\Users\Kinomotto\Desktop\Automacao-de-leads"
npm install
```

### 2. Environment Configuration

Create `.env.local` in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key

# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Database Setup

1. Go to your Supabase project SQL Editor
2. Run the schema from `supabase-schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'converted', 'lost')),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  tag TEXT DEFAULT 'cold' CHECK (tag IN ('hot', 'warm', 'cold')),
  source TEXT DEFAULT 'form' CHECK (source IN ('whatsapp', 'form', 'api', 'email')),
  budget INTEGER,
  pain_point TEXT,
  ai_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('whatsapp', 'form', 'api', 'email')),
  content TEXT NOT NULL,
  is_ai BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Seed Mock Data (Optional)

```bash
node scripts/seed.js
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## Python Lead Generator

### 1. Create Virtual Environment

```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
copy .env.example .env
```

Edit `.env` with your Google Places API key:

```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
LEAD_KEYWORDS=contabilidade,bpo financeiro,software house
LEAD_CITIES=Sao Paulo,Rio de Janeiro
LEAD_COUNTRY=BR
MAX_RESULTS_PER_QUERY=40
MIN_RATING=0
CRM_WEBHOOK_URL=
```

### 4. Run Lead Generation

```bash
python lead_automation.py
```

### 5. Custom Filters (Optional)

```bash
python lead_automation.py --keywords "contabilidade,bpo financeiro" --cities "Sao Paulo,Rio de Janeiro" --max-results 40 --min-rating 3.8
```

---

## Project Structure

```
Automacao-de-leads/
├── app/                          # Next.js Dashboard (App Router)
│   ├── layout.tsx               # Root layout with Sidebar + Header
│   ├── page.tsx                 # Dashboard page
│   ├── globals.css              # Global styles + Tailwind
│   ├── leads/
│   │   ├── page.tsx             # Leads management page
│   │   └── [id]/page.tsx       # Lead details page
│   ├── ai-config/page.tsx       # AI configuration
│   ├── integrations/page.tsx    # Integrations setup
│   └── settings/page.tsx       # User settings
├── components/                   # Reusable components
│   ├── ui/                     # ShadCN UI components
│   ├── dashboard/               # Dashboard-specific components
│   ├── leads/                   # Lead management components
│   └── layout/                  # Layout components
├── hooks/                       # Custom React hooks
│   ├── use-stats.ts            # Dashboard statistics
│   └── use-leads.ts           # Lead data fetching
├── lib/                         # Utilities & types
│   ├── types.ts                # TypeScript interfaces
│   ├── mock-data.ts            # Mock data for development
│   ├── utils.ts               # Utility functions
│   └── supabase/              # Supabase clients (SSR)
├── scripts/                     # Utility scripts
├── lead_automation.py          # Python lead generator
├── requirements.txt             # Python dependencies
├── supabase-schema.sql         # Database schema
├── middleware.ts                # Next.js middleware
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## Configuration

### Dashboard Environment Variables

| Variable | Description |
|-----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |
| `GEMINI_API_KEY` | Gemini API key for AI features |

### Python Generator Environment Variables

| Variable | Description |
|-----------|-------------|
| `GOOGLE_MAPS_API_KEY` | Google Places API key |
| `LEAD_KEYWORDS` | Comma-separated keywords to search |
| `LEAD_CITIES` | Comma-separated cities to search |
| `LEAD_COUNTRY` | Country code (default: BR) |
| `MAX_RESULTS_PER_QUERY` | Max results per keyword (default: 40) |
| `MIN_RATING` | Minimum rating filter (default: 0) |
| `CRM_WEBHOOK_URL` | Optional webhook for real-time delivery |

---

## Key Features Explained

### Mock Mode with Supabase Fallback

The dashboard works in two modes:
- **Mock Mode**: Uses realistic Brazilian lead data (no backend needed)
- **Live Mode**: Connects to Supabase when credentials are configured

Hooks automatically fall back to mock data if Supabase is unavailable:

```typescript
const { data, error } = await supabase.from("leads").select("*");
if (error) {
  console.error("Supabase error, falling back to mock:", error);
  // Use mockLeads...
}
```

### Supabase SSR Integration

Uses `@supabase/ssr` for proper server-side rendering support:

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
export const createClient = () => createBrowserClient(supabaseUrl, supabaseKey);
```

### Lead Scoring (0-100)

Leads are scored based on:
- Budget range
- Response time
- Interaction quality
- Source reliability

### Lead Tags

| Tag | Color | Criteria |
|-----|-------|-----------|
| **Hot** | Red | Score 80-100, high budget, immediate interest |
| **Warm** | Yellow | Score 50-79, medium engagement |
| **Cold** | Blue | Score 0-49, low engagement |

### Status Workflow

```
New → Qualified → Converted
  ↓
Lost
```

---

## Available Scripts

### Dashboard (Next.js)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Lead Generator (Python)

| Command | Description |
|---------|-------------|
| `python lead_automation.py` | Run lead generation |
| `python lead_automation.py --help` | Show all options |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Future Enhancements

- [ ] Real-time updates with Supabase Realtime
- [ ] Gemini API integration for AI summaries
- [ ] WhatsApp Business API connection
- [ ] Email automation campaigns
- [ ] Advanced analytics & reporting
- [ ] Team collaboration features
- [ ] Mobile responsive improvements
- [ ] Unit & integration tests
- [ ] Python generator → Dashboard integration
- [ ] Automated lead enrichment pipeline

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For issues or questions:
- Open an issue on GitHub
- Check Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- Google Places API: https://developers.google.com/maps/documentation/places/web-service

---

## Screenshots

### Dashboard

| Page | Preview |
|------|---------|
| **Dashboard Overview** | ![Dashboard](public/screenshots/dashboard.png) |
| **Leads Management** | ![Leads](public/screenshots/leads.png) |
| **Lead Details** | ![Lead Details](public/screenshots/lead-details.png) |
| **AI Configuration** | ![AI Config](public/screenshots/ai-config.png) |
| **Integrations** | ![Integrations](public/screenshots/integrations.png) |

> **How to add screenshots:**
> 1. Run `npm run dev` and open http://localhost:3000
> 2. Take screenshots of each page
> 3. Save them in `public/screenshots/` with the names above
> 4. Commit and push to GitHub

### Python Generator
- Terminal-based progress logs
- CSV export ready for Excel/Power BI
- Webhook integration for CRM systems

---

Built with Next.js, Supabase, Python, and AI.

Made with ❤️ by Zhennyn.
