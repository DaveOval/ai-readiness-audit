import type {
  Finding,
  CategoryScores,
  CategoryKey,
  Verdict,
  Issue,
  Fix,
  Severity,
  Impact,
} from "./types";
import { CATEGORY_WEIGHTS, VERDICT_THRESHOLDS } from "./constants";

function computeCategoryScore(findings: Finding[], category: CategoryKey): number {
  const relevant = findings.filter((f) => f.category === category);
  if (relevant.length === 0) return 50;

  const totalWeight = relevant.reduce((sum, f) => sum + f.weight, 0);
  const earnedWeight = relevant
    .filter((f) => f.passed)
    .reduce((sum, f) => sum + f.weight, 0);

  return Math.round((earnedWeight / totalWeight) * 100);
}

export function computeScores(findings: Finding[]): {
  overallScore: number;
  categoryScores: CategoryScores;
  verdict: Verdict;
} {
  const categoryScores: CategoryScores = {
    technical: computeCategoryScore(findings, "technical"),
    discoverability: computeCategoryScore(findings, "discoverability"),
    content: computeCategoryScore(findings, "content"),
    structuredData: computeCategoryScore(findings, "structuredData"),
    aiReadiness: computeCategoryScore(findings, "aiReadiness"),
  };

  const overallScore = Math.round(
    Object.entries(CATEGORY_WEIGHTS).reduce(
      (total, [key, weight]) =>
        total + categoryScores[key as CategoryKey] * weight,
      0
    )
  );

  let verdict: Verdict;
  if (overallScore >= VERDICT_THRESHOLDS.excellent) verdict = "Excellent";
  else if (overallScore >= VERDICT_THRESHOLDS.strong) verdict = "Strong";
  else if (overallScore >= VERDICT_THRESHOLDS.needsWork) verdict = "Needs Work";
  else verdict = "Weak";

  return { overallScore, categoryScores, verdict };
}

function severityFromWeight(weight: number): Severity {
  if (weight >= 4) return "critical";
  if (weight >= 3) return "high";
  if (weight >= 2) return "medium";
  return "low";
}

function impactFromSeverity(severity: Severity): Impact {
  if (severity === "critical" || severity === "high") return "high";
  if (severity === "medium") return "medium";
  return "low";
}

const FIX_MAP: Record<string, { title: string; description: string }> = {
  "Page title": {
    title: "Add a descriptive page title",
    description:
      "Include a unique <title> tag that clearly describes the page content. Keep it under 60 characters for optimal display in search results.",
  },
  "Meta description": {
    title: "Write a compelling meta description",
    description:
      "Add a <meta name=\"description\"> tag with a 150-160 character summary that entices clicks and accurately describes the page.",
  },
  "Canonical URL": {
    title: "Set a canonical URL",
    description:
      "Add <link rel=\"canonical\" href=\"...\"> to prevent duplicate content issues and consolidate ranking signals.",
  },
  "Single H1": {
    title: "Use exactly one H1 heading",
    description:
      "Ensure your page has a single H1 that clearly states the main topic. Use H2-H6 for subsections.",
  },
  "JSON-LD present": {
    title: "Add structured data markup",
    description:
      "Include JSON-LD structured data for your content type (Article, Product, FAQ, Organization) to help search engines and AI systems understand your content.",
  },
  "Answer-first content": {
    title: "Lead with your key message",
    description:
      "Start your content with a direct answer or clear value statement. AI systems prioritize pages that get to the point quickly.",
  },
  "Extractable summary": {
    title: "Improve page summarizability",
    description:
      "Ensure you have a title, meta description, single H1, and well-structured paragraphs so AI can generate accurate summaries.",
  },
  "Entity clarity": {
    title: "Add entity information",
    description:
      "Include structured data about your organization, author, or product to help AI systems attribute and trust your content.",
  },
  "Transparency signals": {
    title: "Add authorship and date signals",
    description:
      "Include author names, publication dates, and organization info to build trust signals for both search engines and AI.",
  },
  "No noindex directive": {
    title: "Remove noindex directive",
    description:
      "Your page has a noindex tag preventing search engines from indexing it. Remove this if you want the page to appear in search results.",
  },
  "Language attribute": {
    title: "Add a language attribute",
    description:
      "Add lang=\"en\" (or your language) to the <html> tag to help search engines and screen readers understand the page language.",
  },
  "Viewport meta": {
    title: "Add a viewport meta tag",
    description:
      "Include <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> for proper mobile rendering.",
  },
  "Open Graph title": {
    title: "Add Open Graph meta tags",
    description:
      "Include og:title, og:description, and og:image tags to control how your page appears when shared on social platforms.",
  },
  "Content chunking": {
    title: "Improve content sectioning",
    description:
      "Use <section>, <article>, and <main> elements with clear headings to help AI systems retrieve specific content chunks.",
  },
  "Citation-friendly structure": {
    title: "Add quotable structures",
    description:
      "Include lists, blockquotes, and definition terms to make your content easier for AI to cite directly.",
  },
};

export function generateIssues(findings: Finding[]): Issue[] {
  return findings
    .filter((f) => !f.passed)
    .sort((a, b) => b.weight - a.weight)
    .map((f) => ({
      title: f.name,
      severity: severityFromWeight(f.weight),
      category: f.category,
      description: f.detail,
    }));
}

export function generateFixes(issues: Issue[]): Fix[] {
  return issues
    .slice(0, 8)
    .map((issue) => {
      const fix = FIX_MAP[issue.title];
      if (!fix) {
        return {
          title: `Fix: ${issue.title}`,
          description: issue.description,
          impact: impactFromSeverity(issue.severity),
          category: issue.category,
        };
      }
      return {
        ...fix,
        impact: impactFromSeverity(issue.severity),
        category: issue.category,
      };
    });
}
