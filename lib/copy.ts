import type { CategoryScores, Verdict } from "./types";

export function getVerdictCopy(
  verdict: Verdict,
  scores: CategoryScores
): string {
  const strong = Object.entries(scores)
    .filter(([, v]) => v >= 70)
    .map(([k]) => k);
  const weak = Object.entries(scores)
    .filter(([, v]) => v < 50)
    .map(([k]) => k);

  if (verdict === "Excellent") {
    return "This page is well-optimized for both search engines and AI discovery. Keep it up.";
  }

  if (verdict === "Strong") {
    if (weak.includes("structuredData")) {
      return "Strong metadata foundation, but missing machine-readable context for AI systems.";
    }
    if (weak.includes("aiReadiness")) {
      return "Good page hygiene. Biggest gains are in structured data and answer-first content.";
    }
    return "Solid overall presence. A few targeted improvements could push this into excellent territory.";
  }

  if (verdict === "Needs Work") {
    if (strong.includes("technical") && weak.includes("aiReadiness")) {
      return "Technically reachable, but weakly structured for AI summarization.";
    }
    if (weak.includes("content")) {
      return "This page is indexable, but not especially quotable. Content depth and structure need attention.";
    }
    if (weak.includes("structuredData") && weak.includes("aiReadiness")) {
      return "Missing the signals that help AI systems understand, summarize, and cite your content.";
    }
    return "Several areas need improvement before this page performs well in AI-driven discovery.";
  }

  // Weak
  if (weak.length >= 4) {
    return "This page has fundamental issues across most categories. Start with the basics: title, description, and structured content.";
  }
  return "Significant gaps in visibility and AI readiness. Prioritize the recommended fixes below.";
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Fair";
  return "Needs Work";
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-blue-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

export function getScoreBgColor(score: number): string {
  if (score >= 85) return "bg-emerald-500/20";
  if (score >= 70) return "bg-blue-500/20";
  if (score >= 50) return "bg-amber-500/20";
  return "bg-red-500/20";
}

export function getScoreRingColor(score: number): string {
  if (score >= 85) return "#34d399";
  if (score >= 70) return "#60a5fa";
  if (score >= 50) return "#fbbf24";
  return "#f87171";
}
