import type { CategoryKey, ScanPhase } from "./types";

export const CATEGORY_WEIGHTS: Record<CategoryKey, number> = {
  technical: 0.25,
  aiReadiness: 0.25,
  discoverability: 0.2,
  content: 0.15,
  structuredData: 0.15,
};

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  technical: "Technical Health",
  discoverability: "Discoverability",
  content: "Content Structure",
  structuredData: "Structured Data",
  aiReadiness: "AI Readiness",
};

export const CATEGORY_DESCRIPTIONS: Record<CategoryKey, string> = {
  technical: "HTTP status, viewport, lang attribute, and document basics",
  discoverability: "Canonical URLs, robots directives, sitemaps, and indexability",
  content: "Heading hierarchy, word count, readability, and internal links",
  structuredData: "JSON-LD, schema.org types, and machine-readable markup",
  aiReadiness: "Answer-first content, entity clarity, and citation-friendly structure",
};

export const SCAN_PHASES: ScanPhase[] = [
  { label: "Fetching HTML", startPct: 0, endPct: 15 },
  { label: "Inspecting metadata", startPct: 15, endPct: 35 },
  { label: "Checking indexability", startPct: 35, endPct: 50 },
  { label: "Parsing structured data", startPct: 50, endPct: 65 },
  { label: "Evaluating content clarity", startPct: 65, endPct: 80 },
  { label: "Generating verdict", startPct: 80, endPct: 100 },
];

export const VERDICT_THRESHOLDS = {
  excellent: 85,
  strong: 70,
  needsWork: 50,
} as const;

export const FETCH_TIMEOUT_MS = 10_000;
export const SECONDARY_FETCH_TIMEOUT_MS = 5_000;
export const MIN_SCAN_DISPLAY_MS = 4_500;
