import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { fetchPage, runChecks } from "@/lib/audit";
import { computeScores, generateIssues, generateFixes } from "@/lib/scoring";
import { getVerdictCopy } from "@/lib/copy";
import { normalizeUrl } from "@/lib/url";
import type { AuditResponse, AuditError } from "@/lib/types";

const RequestSchema = z.object({
  url: z.string().min(1, "URL is required"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<AuditError>(
      { error: "Invalid JSON body", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<AuditError>(
      { error: parsed.error.issues[0].message, code: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  let url: string;
  try {
    url = normalizeUrl(parsed.data.url);
  } catch {
    return NextResponse.json<AuditError>(
      { error: "Invalid URL format", code: "INVALID_URL" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchPage(url);
    const findings = runChecks(data, url);
    const { overallScore, categoryScores, verdict } = computeScores(findings);
    const verdictCopy = getVerdictCopy(verdict, categoryScores);
    const issues = generateIssues(findings);
    const fixes = generateFixes(issues);

    const response: AuditResponse = {
      overallScore,
      categoryScores,
      verdict,
      verdictCopy,
      prioritizedIssues: issues,
      recommendedFixes: fixes,
      findings,
      meta: {
        url,
        fetchedAt: new Date().toISOString(),
        responseTimeMs: data.responseTimeMs,
        statusCode: data.statusCode,
      },
    };

    return NextResponse.json(response);
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return NextResponse.json<AuditError>(
        {
          error: "The target website took too long to respond. Try again or check the URL.",
          code: "TIMEOUT",
        },
        { status: 504 }
      );
    }

    if (err instanceof TypeError && (err.message.includes("fetch") || err.message.includes("URL"))) {
      return NextResponse.json<AuditError>(
        {
          error: "Could not reach the website. Please check the URL and try again.",
          code: "FETCH_FAILED",
        },
        { status: 422 }
      );
    }

    console.error("Audit error:", err);
    return NextResponse.json<AuditError>(
      {
        error: "An unexpected error occurred while auditing the page.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
