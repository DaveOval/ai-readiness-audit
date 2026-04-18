import { SITE_URL } from "@/lib/site";

export function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Readiness Audit",
    url: SITE_URL,
    description:
      "Paste any URL and get an instant audit of how search engines and AI systems see your content. 30+ checks across 5 categories.",
    inLanguage: ["en", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/scan?url={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Readiness Audit",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    founder: {
      "@type": "Person",
      name: "David Vazquez",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Readiness Audit",
    url: SITE_URL,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free AI readiness audit tool that checks how search engines and AI systems see your website content.",
    featureList: [
      "Technical Health Analysis",
      "Discoverability Checks",
      "Content Structure Evaluation",
      "Structured Data Validation",
      "AI Readiness Assessment",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AI readiness for a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI readiness measures how well your website can be discovered, understood, and cited by AI systems like ChatGPT, Claude, Perplexity, and Google AI Overviews. It combines traditional SEO signals (titles, meta descriptions, sitemaps) with newer signals like structured data, answer-first content, llms.txt, and explicit AI crawler permissions.",
        },
      },
      {
        "@type": "Question",
        name: "What does the AI Readiness Audit check?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The audit runs 30+ checks across 5 categories: Technical Health (HTTPS, status codes, viewport, page speed), Discoverability (canonical URLs, robots.txt, sitemaps, AI crawler access, Open Graph), Content Structure (headings, word count, image alt text, internal links), Structured Data (JSON-LD, schema.org types, microdata), and AI Readiness (answer-first content, entity clarity, llms.txt, citation-friendly structure).",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The AI Readiness Audit is completely free. There is no signup, no API key, and no usage limit per visitor. Paste any public URL and you will get a full report instantly.",
        },
      },
      {
        "@type": "Question",
        name: "What is llms.txt and should my site have one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "llms.txt is a plain-text Markdown file at the root of your site (e.g. example.com/llms.txt) that gives AI crawlers a structured introduction to your most important content. It complements robots.txt: robots.txt controls access, llms.txt explains meaning. Sites with a well-structured llms.txt see significantly higher AI citation rates, so yes, in 2026 every site should have one.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI crawlers does the audit check for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The audit checks robots.txt rules and on-page signals against major AI crawlers including OpenAI's GPTBot, Anthropic's ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, and Common Crawl's CCBot.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
