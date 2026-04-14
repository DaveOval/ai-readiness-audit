const SITE_URL = "https://ai-readiness-audit-gamma.vercel.app";

export function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Readiness Audit",
    url: SITE_URL,
    description:
      "Paste any URL and get an instant audit of how search engines and AI systems see your content. 30+ checks across 6 categories.",
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
    </>
  );
}
