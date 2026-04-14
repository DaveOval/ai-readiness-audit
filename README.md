# AI Readiness Audit

A polished web application that audits any public webpage for search engine and AI-readiness. Paste a URL, watch a cinematic scan animation, and get an actionable report with scores, issues, and fixes.

## Features

- **30+ real checks** across 6 categories: Technical Health, Discoverability, Content Structure, Structured Data, Social Sharing, and AI Readiness
- **Weighted scoring model** producing a 0-100 overall score and per-category breakdowns
- **Animated scan experience** with phased progress, scan beam, and status chips
- **Detailed report** with verdict, prioritized issues, recommended fixes, and collapsible technical findings
- **Dark cinematic UI** with glassmorphism, ambient gradients, and smooth Framer Motion animations

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Lucide React icons
- Zod (validation)
- Cheerio (HTML parsing)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. User pastes a URL on the landing page
2. The app navigates to `/scan?url=...` and starts the scan animation
3. A POST request hits `/api/audit` which:
   - Fetches the target URL server-side
   - Parses the HTML with Cheerio
   - Checks `/robots.txt` and `/sitemap.xml`
   - Runs 30+ checks across 6 categories
   - Computes weighted scores and generates a verdict
4. The scan animation completes and transitions into the full report

## Project Structure

```
app/
  page.tsx                 # Landing page
  scan/page.tsx            # Scan + report page
  api/audit/route.ts       # Audit API endpoint
components/
  navbar.tsx, hero.tsx, url-input.tsx, what-we-check.tsx,
  report-preview.tsx, stats-strip.tsx, footer.tsx,
  scan-animation.tsx, score-ring.tsx, verdict-badge.tsx,
  category-cards.tsx, findings-list.tsx, report-summary.tsx,
  technical-details.tsx
lib/
  types.ts                 # Shared TypeScript types
  audit.ts                 # Audit engine
  scoring.ts               # Scoring model
  copy.ts                  # Verdict microcopy
  url.ts                   # URL validation
  constants.ts             # Weights and thresholds
```
