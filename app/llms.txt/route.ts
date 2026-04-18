import { SITE_URL } from "@/lib/site";

export async function GET() {
  const content = `# AI Readiness Audit

> Free tool that audits any public webpage for search engine and AI readiness. Paste a URL and get an actionable report with 30+ checks across 5 categories: Technical Health, Discoverability, Content Structure, Structured Data, and AI Readiness.

## Tool

- [AI Readiness Audit](${SITE_URL}): Instant audit of any URL covering technical health, discoverability, content structure, structured data, and AI readiness. Free, no login required.
- [Run a scan](${SITE_URL}/scan): Paste a URL to receive a 0-100 score, prioritized issues, and recommended fixes.

## About

- Type: WebApplication
- Category: SEO & AI Optimization Tool
- Language: en, es
- Audience: Developers, marketers, content creators, SEO professionals
- Pricing: Free
- Author: David Vazquez
- Last Updated: ${new Date().toISOString().slice(0, 10)}

## Optional

- [API endpoint](${SITE_URL}/api/audit): POST { "url": "https://example.com" } to run an audit programmatically.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
