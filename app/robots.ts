import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseRule = { allow: "/", disallow: "/api/" };

  return {
    rules: [
      { userAgent: "*", ...baseRule },
      { userAgent: "GPTBot", ...baseRule },
      { userAgent: "OAI-SearchBot", ...baseRule },
      { userAgent: "ChatGPT-User", ...baseRule },
      { userAgent: "ClaudeBot", ...baseRule },
      { userAgent: "Claude-Web", ...baseRule },
      { userAgent: "anthropic-ai", ...baseRule },
      { userAgent: "PerplexityBot", ...baseRule },
      { userAgent: "Perplexity-User", ...baseRule },
      { userAgent: "Google-Extended", ...baseRule },
      { userAgent: "GoogleOther", ...baseRule },
      { userAgent: "Applebot-Extended", ...baseRule },
      { userAgent: "cohere-ai", ...baseRule },
      { userAgent: "Bytespider", ...baseRule },
      { userAgent: "Meta-ExternalAgent", ...baseRule },
      { userAgent: "DuckAssistBot", ...baseRule },
      { userAgent: "Amazonbot", ...baseRule },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
