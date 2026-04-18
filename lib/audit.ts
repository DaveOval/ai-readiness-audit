import * as cheerio from "cheerio";
import type { Finding } from "./types";
import { FETCH_TIMEOUT_MS, SECONDARY_FETCH_TIMEOUT_MS } from "./constants";

interface RawAuditData {
  statusCode: number;
  html: string;
  robotsTxt: string | null;
  sitemapXml: string | null;
  llmsTxt: string | null;
  responseTimeMs: number;
}

function timedFetch(url: string, timeoutMs: number): Promise<Response> {
  return fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    redirect: "follow",
    headers: {
      "User-Agent": "AIReadinessAudit/1.0 (audit bot)",
      Accept: "text/html,application/xhtml+xml,*/*",
    },
  });
}

async function fetchOptional(url: string): Promise<string | null> {
  try {
    const res = await timedFetch(url, SECONDARY_FETCH_TIMEOUT_MS);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function fetchPage(url: string): Promise<RawAuditData> {
  const start = Date.now();
  const response = await timedFetch(url, FETCH_TIMEOUT_MS);
  const html = await response.text();
  const responseTimeMs = Date.now() - start;

  const origin = new URL(url).origin;
  const [robotsTxt, sitemapXml, llmsTxt] = await Promise.all([
    fetchOptional(`${origin}/robots.txt`),
    fetchOptional(`${origin}/sitemap.xml`),
    fetchOptional(`${origin}/llms.txt`),
  ]);

  return {
    statusCode: response.status,
    html,
    robotsTxt,
    sitemapXml,
    llmsTxt,
    responseTimeMs,
  };
}

export function runChecks(data: RawAuditData, url: string): Finding[] {
  const $ = cheerio.load(data.html);
  const findings: Finding[] = [];

  function add(f: Omit<Finding, "weight"> & { weight?: number }) {
    findings.push({ weight: 1, ...f });
  }

  // ── TECHNICAL ─────────────────────────────────────────────────────
  const isHttps = url.toLowerCase().startsWith("https://");
  add({
    name: "HTTPS",
    passed: isHttps,
    value: isHttps,
    detail: isHttps
      ? "Page is served over HTTPS"
      : "Page is not served over HTTPS — AI crawlers and browsers may distrust or block it",
    category: "technical",
    weight: 3,
  });

  const speedMs = data.responseTimeMs;
  const speedPassed = speedMs > 0 && speedMs < 2000;
  add({
    name: "Page speed",
    passed: speedPassed,
    value: speedMs,
    detail:
      speedMs < 800
        ? `Fast response: ${speedMs}ms — well under the 800ms target`
        : speedMs < 2000
          ? `Acceptable response: ${speedMs}ms — aim for under 800ms for best results`
          : `Slow response: ${speedMs}ms — AI crawlers may time out before fetching this page`,
    category: "technical",
    weight: speedMs >= 2000 ? 2 : 1,
  });

  add({
    name: "HTTP Status",
    passed: data.statusCode >= 200 && data.statusCode < 400,
    value: data.statusCode,
    detail:
      data.statusCode >= 200 && data.statusCode < 400
        ? `Page returned ${data.statusCode}`
        : `Page returned error status ${data.statusCode}`,
    category: "technical",
    weight: 2,
  });

  const lang = $("html").attr("lang");
  add({
    name: "Language attribute",
    passed: !!lang,
    value: lang || null,
    detail: lang
      ? `Document language set to "${lang}"`
      : "No lang attribute on <html> element",
    category: "technical",
  });

  const viewport = $('meta[name="viewport"]').attr("content");
  add({
    name: "Viewport meta",
    passed: !!viewport,
    value: viewport || null,
    detail: viewport
      ? "Viewport meta tag is configured"
      : "Missing viewport meta tag — mobile rendering may be broken",
    category: "technical",
  });

  const title = $("title").first().text().trim();
  add({
    name: "Page title",
    passed: !!title && title.length > 0,
    value: title || null,
    detail: title
      ? `Title: "${title.slice(0, 80)}${title.length > 80 ? "…" : ""}"`
      : "No <title> element found",
    category: "technical",
    weight: 2,
  });

  const metaDesc = $('meta[name="description"]').attr("content");
  add({
    name: "Meta description",
    passed: !!metaDesc && metaDesc.length > 0,
    value: metaDesc || null,
    detail: metaDesc
      ? `Description: "${metaDesc.slice(0, 100)}${metaDesc.length > 100 ? "…" : ""}"`
      : "No meta description found",
    category: "technical",
    weight: 2,
  });

  // ── DISCOVERABILITY ───────────────────────────────────────────────
  const canonical =
    $('link[rel="canonical"]').attr("href") ||
    $('meta[property="og:url"]').attr("content");
  add({
    name: "Canonical URL",
    passed: !!canonical,
    value: canonical || null,
    detail: canonical
      ? `Canonical: ${canonical}`
      : "No canonical URL specified",
    category: "discoverability",
    weight: 2,
  });

  const robotsMeta = $('meta[name="robots"]').attr("content") || "";
  const hasNoindex = robotsMeta.toLowerCase().includes("noindex");
  add({
    name: "Robots meta",
    passed: !!robotsMeta && !hasNoindex,
    value: robotsMeta || null,
    detail: hasNoindex
      ? "Page is marked noindex — search engines will not index this page"
      : robotsMeta
        ? `Robots directive: "${robotsMeta}"`
        : "No robots meta tag (defaults to index,follow)",
    category: "discoverability",
    weight: hasNoindex ? 5 : 1,
  });

  add({
    name: "No noindex directive",
    passed: !hasNoindex,
    value: !hasNoindex,
    detail: hasNoindex
      ? "noindex found — this page is excluded from search results"
      : "Page is indexable",
    category: "discoverability",
    weight: 3,
  });

  add({
    name: "robots.txt reachable",
    passed: data.robotsTxt !== null,
    value: data.robotsTxt !== null,
    detail:
      data.robotsTxt !== null
        ? "robots.txt is accessible"
        : "robots.txt not found or unreachable",
    category: "discoverability",
  });

  const hasSitemap =
    data.sitemapXml !== null &&
    data.sitemapXml.includes("<urlset") || data.sitemapXml?.includes("<sitemapindex");
  add({
    name: "Sitemap reachable",
    passed: !!hasSitemap,
    value: !!hasSitemap,
    detail: hasSitemap
      ? "XML sitemap is accessible"
      : "No valid XML sitemap found at /sitemap.xml",
    category: "discoverability",
  });

  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
  ];
  let aiCrawlersAllowed = true;
  let aiCrawlerDetail = "robots.txt missing — AI crawlers default to allowed but explicit rules are recommended";
  if (data.robotsTxt) {
    const lower = data.robotsTxt.toLowerCase();
    const blockedBots: string[] = [];
    for (const bot of aiCrawlers) {
      const re = new RegExp(
        `user-agent:\\s*${bot.toLowerCase()}[\\s\\S]*?(?=user-agent:|$)`,
        "i"
      );
      const match = lower.match(re);
      if (match && /disallow:\s*\//i.test(match[0]) && !/allow:\s*\//i.test(match[0])) {
        blockedBots.push(bot);
      }
    }
    const wildcardBlocks =
      /user-agent:\s*\*[\s\S]*?disallow:\s*\/\s*(\n|$)/i.test(lower) &&
      !aiCrawlers.some((b) =>
        new RegExp(`user-agent:\\s*${b.toLowerCase()}`, "i").test(lower)
      );
    if (blockedBots.length > 0) {
      aiCrawlersAllowed = false;
      aiCrawlerDetail = `Blocked AI crawler${blockedBots.length > 1 ? "s" : ""}: ${blockedBots.join(", ")}`;
    } else if (wildcardBlocks) {
      aiCrawlersAllowed = false;
      aiCrawlerDetail = "robots.txt blocks all crawlers via wildcard with no AI-specific allow rules";
    } else {
      aiCrawlerDetail = "AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) are not blocked";
    }
  }
  add({
    name: "AI crawler access",
    passed: aiCrawlersAllowed,
    value: aiCrawlersAllowed,
    detail: aiCrawlerDetail,
    category: "discoverability",
    weight: 2,
  });

  // ── SOCIAL / SHARING ──────────────────────────────────────────────
  const ogTitle = $('meta[property="og:title"]').attr("content");
  add({
    name: "Open Graph title",
    passed: !!ogTitle,
    value: ogTitle || null,
    detail: ogTitle
      ? `OG title: "${ogTitle.slice(0, 80)}"`
      : "No og:title meta tag",
    category: "discoverability",
  });

  const ogDesc = $('meta[property="og:description"]').attr("content");
  add({
    name: "Open Graph description",
    passed: !!ogDesc,
    value: ogDesc || null,
    detail: ogDesc
      ? `OG description set (${ogDesc.length} chars)`
      : "No og:description meta tag",
    category: "discoverability",
  });

  const ogImage = $('meta[property="og:image"]').attr("content");
  add({
    name: "Open Graph image",
    passed: !!ogImage,
    value: ogImage || null,
    detail: ogImage ? "OG image specified" : "No og:image meta tag",
    category: "discoverability",
  });

  const twitterCard =
    $('meta[name="twitter:card"]').attr("content") ||
    $('meta[property="twitter:card"]').attr("content");
  add({
    name: "Twitter card",
    passed: !!twitterCard,
    value: twitterCard || null,
    detail: twitterCard
      ? `Twitter card type: "${twitterCard}"`
      : "No twitter:card meta tag",
    category: "discoverability",
  });

  // ── CONTENT STRUCTURE ─────────────────────────────────────────────
  const h1s = $("h1");
  add({
    name: "Single H1",
    passed: h1s.length === 1,
    value: h1s.length,
    detail:
      h1s.length === 1
        ? `One H1 found: "${h1s.first().text().trim().slice(0, 60)}"`
        : h1s.length === 0
          ? "No H1 heading found"
          : `${h1s.length} H1 headings found — prefer exactly one`,
    category: "content",
    weight: 2,
  });

  const headings = ["h1", "h2", "h3", "h4", "h5", "h6"].map(
    (tag) => $(tag).length
  );
  const hasHierarchy = headings[0] > 0 && headings[1] > 0;
  add({
    name: "Heading hierarchy",
    passed: hasHierarchy,
    value: headings.join(", "),
    detail: hasHierarchy
      ? `Heading distribution: H1(${headings[0]}) H2(${headings[1]}) H3(${headings[2]}) H4(${headings[3]})`
      : "Incomplete heading hierarchy — missing H1 or H2 levels",
    category: "content",
  });

  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText.split(/\s+/).filter((w) => w.length > 0).length;
  add({
    name: "Word count",
    passed: wordCount >= 300,
    value: wordCount,
    detail:
      wordCount >= 300
        ? `${wordCount.toLocaleString()} words — sufficient content depth`
        : `Only ${wordCount} words — content appears thin`,
    category: "content",
    weight: wordCount < 100 ? 2 : 1,
  });

  const internalLinks = $("a[href]").filter(function () {
    const href = $(this).attr("href") || "";
    try {
      if (href.startsWith("/") || href.startsWith("#")) return true;
      const linkUrl = new URL(href);
      const pageUrl = new URL(url);
      return linkUrl.hostname === pageUrl.hostname;
    } catch {
      return false;
    }
  }).length;
  add({
    name: "Internal links",
    passed: internalLinks >= 3,
    value: internalLinks,
    detail: `${internalLinks} internal link${internalLinks !== 1 ? "s" : ""} found`,
    category: "content",
  });

  const allImages = $("img");
  const totalImages = allImages.length;
  const imagesWithAlt = allImages.filter(function () {
    const alt = $(this).attr("alt");
    return typeof alt === "string" && alt.trim().length > 0;
  }).length;
  const altCoverage = totalImages > 0 ? imagesWithAlt / totalImages : 1;
  add({
    name: "Image alt text",
    passed: totalImages === 0 || altCoverage >= 0.8,
    value:
      totalImages === 0
        ? "no images"
        : `${imagesWithAlt}/${totalImages} (${Math.round(altCoverage * 100)}%)`,
    detail:
      totalImages === 0
        ? "No images on the page — nothing to describe"
        : altCoverage >= 0.8
          ? `${imagesWithAlt} of ${totalImages} images have alt text (${Math.round(altCoverage * 100)}%)`
          : `Only ${imagesWithAlt} of ${totalImages} images have alt text — AI systems and screen readers cannot describe the rest`,
    category: "content",
  });

  const paragraphs = $("p");
  const avgSentenceLen =
    paragraphs.length > 0
      ? Math.round(
          paragraphs
            .map(function () {
              return $(this).text().split(/[.!?]+/).length;
            })
            .get()
            .reduce((a: number, b: number) => a + b, 0) / paragraphs.length
        )
      : 0;
  add({
    name: "Paragraph readability",
    passed: paragraphs.length >= 3 && avgSentenceLen <= 6,
    value: `${paragraphs.length} paragraphs, ~${avgSentenceLen} sentences each`,
    detail:
      paragraphs.length >= 3
        ? `${paragraphs.length} paragraphs with reasonable structure`
        : "Few or no paragraph elements — content may lack structure",
    category: "content",
  });

  const lists = $("ul, ol").length;
  const tables = $("table").length;
  const hasFaq =
    bodyText.toLowerCase().includes("faq") ||
    $('[itemtype*="FAQPage"]').length > 0 ||
    $("details, summary").length > 0;
  add({
    name: "Rich content elements",
    passed: lists > 0 || tables > 0 || hasFaq,
    value: `${lists} lists, ${tables} tables, FAQ: ${hasFaq}`,
    detail:
      lists > 0 || tables > 0
        ? `Found ${lists} list(s) and ${tables} table(s)${hasFaq ? " plus FAQ-like content" : ""}`
        : "No lists, tables, or FAQ structures found",
    category: "content",
  });

  // ── STRUCTURED DATA ───────────────────────────────────────────────
  const jsonLdScripts = $('script[type="application/ld+json"]');
  const jsonLdCount = jsonLdScripts.length;
  add({
    name: "JSON-LD present",
    passed: jsonLdCount > 0,
    value: jsonLdCount,
    detail:
      jsonLdCount > 0
        ? `${jsonLdCount} JSON-LD block(s) found`
        : "No JSON-LD structured data found",
    category: "structuredData",
    weight: 3,
  });

  const schemaTypes: string[] = [];
  jsonLdScripts.each(function () {
    try {
      const data = JSON.parse($(this).html() || "");
      const types = Array.isArray(data) ? data : [data];
      types.forEach((item: Record<string, unknown>) => {
        if (item["@type"]) {
          const t = item["@type"];
          if (Array.isArray(t)) schemaTypes.push(...t.map(String));
          else schemaTypes.push(String(t));
        }
      });
    } catch {
      // malformed JSON-LD
    }
  });

  add({
    name: "Schema types detected",
    passed: schemaTypes.length > 0,
    value: schemaTypes.join(", ") || null,
    detail:
      schemaTypes.length > 0
        ? `Schema types: ${schemaTypes.slice(0, 5).join(", ")}${schemaTypes.length > 5 ? "…" : ""}`
        : "No identifiable schema.org types",
    category: "structuredData",
    weight: 2,
  });

  const microdata = $("[itemscope]").length;
  const rdfa = $("[typeof]").length;
  add({
    name: "Additional structured markup",
    passed: microdata > 0 || rdfa > 0,
    value: `Microdata: ${microdata}, RDFa: ${rdfa}`,
    detail:
      microdata > 0 || rdfa > 0
        ? `Found ${microdata} microdata and ${rdfa} RDFa elements`
        : "No microdata or RDFa markup detected",
    category: "structuredData",
  });

  // ── AI READINESS ──────────────────────────────────────────────────
  const hasLlmsTxt = data.llmsTxt !== null && data.llmsTxt.trim().length > 0;
  add({
    name: "llms.txt present",
    passed: hasLlmsTxt,
    value: hasLlmsTxt,
    detail: hasLlmsTxt
      ? `llms.txt found at /llms.txt (${data.llmsTxt!.length} chars) — AI crawlers have a structured site introduction`
      : "No /llms.txt file found — AI crawlers must guess your site's purpose and key content",
    category: "aiReadiness",
    weight: 2,
  });

  const firstParagraph = $("p").first().text().trim();
  const startsWithAnswer =
    firstParagraph.length > 20 &&
    !firstParagraph.toLowerCase().startsWith("welcome") &&
    !firstParagraph.toLowerCase().startsWith("click") &&
    !firstParagraph.toLowerCase().startsWith("sign up");
  add({
    name: "Answer-first content",
    passed: startsWithAnswer,
    value: firstParagraph.slice(0, 80) || null,
    detail: startsWithAnswer
      ? "Content begins with substantive information, not a generic greeting"
      : "Content does not lead with a clear, direct answer",
    category: "aiReadiness",
    weight: 2,
  });

  const summaryPotential =
    !!metaDesc &&
    metaDesc.length >= 50 &&
    !!title &&
    h1s.length === 1 &&
    paragraphs.length >= 3;
  add({
    name: "Extractable summary",
    passed: summaryPotential,
    value: summaryPotential,
    detail: summaryPotential
      ? "Page has title, description, and structured paragraphs — easy to summarize"
      : "Missing key elements for AI to generate an accurate summary",
    category: "aiReadiness",
    weight: 2,
  });

  const hasEntityInfo =
    jsonLdCount > 0 ||
    !!$('meta[property="article:author"]').attr("content") ||
    !!$('[rel="author"]').length ||
    schemaTypes.some((t) =>
      ["Organization", "Person", "Product", "Article"].includes(t)
    );
  add({
    name: "Entity clarity",
    passed: hasEntityInfo,
    value: hasEntityInfo,
    detail: hasEntityInfo
      ? "Page provides machine-readable entity information"
      : "No clear entity signals — AI may struggle to attribute content",
    category: "aiReadiness",
    weight: 2,
  });

  const sections = $("section, article, main").length;
  const hasGoodChunking =
    sections >= 2 || (headings[1] >= 2 && paragraphs.length >= 4);
  add({
    name: "Content chunking",
    passed: hasGoodChunking,
    value: `${sections} semantic sections`,
    detail: hasGoodChunking
      ? "Content is well-segmented into logical sections"
      : "Content lacks clear sectioning for chunk-based retrieval",
    category: "aiReadiness",
  });

  const hasBlockquotes = $("blockquote, cite, q").length > 0;
  const hasDefinitions = $("dl, dfn, abbr").length > 0;
  const citationFriendly = hasBlockquotes || hasDefinitions || lists >= 2;
  add({
    name: "Citation-friendly structure",
    passed: citationFriendly,
    value: citationFriendly,
    detail: citationFriendly
      ? "Content uses quotable structures (lists, definitions, or quotes)"
      : "Content lacks easily citable structures",
    category: "aiReadiness",
  });

  const hasAuthor =
    !!$('meta[name="author"]').attr("content") ||
    !!$('meta[property="article:author"]').attr("content") ||
    !!$('[rel="author"]').attr("href");
  const hasDate =
    !!$('meta[property="article:published_time"]').attr("content") ||
    !!$("time[datetime]").length;
  const hasCompany =
    schemaTypes.includes("Organization") ||
    !!$('meta[property="og:site_name"]').attr("content");
  add({
    name: "Transparency signals",
    passed: hasAuthor || hasDate || hasCompany,
    value: `Author: ${hasAuthor}, Date: ${hasDate}, Org: ${hasCompany}`,
    detail:
      hasAuthor || hasDate || hasCompany
        ? [
            hasAuthor && "Author identified",
            hasDate && "Publication date found",
            hasCompany && "Organization attributed",
          ]
            .filter(Boolean)
            .join(", ")
        : "No author, date, or organization signals detected",
    category: "aiReadiness",
  });

  return findings;
}
