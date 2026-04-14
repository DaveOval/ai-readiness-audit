export type Verdict = "Excellent" | "Strong" | "Needs Work" | "Weak";

export type CategoryKey =
  | "technical"
  | "discoverability"
  | "content"
  | "structuredData"
  | "aiReadiness";

export type Severity = "critical" | "high" | "medium" | "low";
export type Impact = "high" | "medium" | "low";

export interface Finding {
  name: string;
  passed: boolean;
  value: string | number | boolean | null;
  detail: string;
  category: CategoryKey;
  weight: number;
}

export interface CategoryScores {
  technical: number;
  discoverability: number;
  content: number;
  structuredData: number;
  aiReadiness: number;
}

export interface Issue {
  title: string;
  severity: Severity;
  category: CategoryKey;
  description: string;
}

export interface Fix {
  title: string;
  description: string;
  impact: Impact;
  category: CategoryKey;
}

export interface AuditMeta {
  url: string;
  fetchedAt: string;
  responseTimeMs: number;
  statusCode: number;
}

export interface AuditResponse {
  overallScore: number;
  categoryScores: CategoryScores;
  verdict: Verdict;
  verdictCopy: string;
  prioritizedIssues: Issue[];
  recommendedFixes: Fix[];
  findings: Finding[];
  meta: AuditMeta;
}

export interface AuditError {
  error: string;
  code: string;
}

export interface ScanPhase {
  label: string;
  startPct: number;
  endPct: number;
}
