"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { AuditResponse } from "@/lib/types";
import { ScoreRing } from "./score-ring";
import { VerdictBadge } from "./verdict-badge";
import { CategoryCards } from "./category-cards";
import { FindingsList } from "./findings-list";
import { TechnicalDetails } from "./technical-details";
import { UrlInput } from "./url-input";
import { getDisplayUrl } from "@/lib/url";
import { useI18n } from "@/lib/i18n";

interface ReportSummaryProps {
  data: AuditResponse;
}

export function ReportSummary({ data }: ReportSummaryProps) {
  const { t, locale } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl t-card p-8 sm:p-10"
      >
        <div className="flex items-center gap-2 text-xs t-text-tertiary mb-6">
          <ExternalLink className="h-3 w-3" />
          <a
            href={data.meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity truncate"
          >
            {getDisplayUrl(data.meta.url)}
          </a>
          <span className="t-text-muted">&middot;</span>
          <span>
            {new Date(data.meta.fetchedAt).toLocaleDateString(
              locale === "es" ? "es-ES" : "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            )}
          </span>
          <span className="t-text-muted">&middot;</span>
          <span>{data.meta.responseTimeMs}ms</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          <ScoreRing score={data.overallScore} />
          <VerdictBadge verdict={data.verdict} copy={data.verdictCopy} />
        </div>
      </motion.div>

      <CategoryCards scores={data.categoryScores} />

      <FindingsList issues={data.prioritizedIssues} fixes={data.recommendedFixes} />

      <TechnicalDetails findings={data.findings} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="rounded-2xl t-card p-8 text-center"
      >
        <h3 className="text-lg font-semibold t-text mb-2">{t("report.auditAnother")}</h3>
        <p className="text-sm t-text-tertiary mb-6 max-w-md mx-auto">
          {t("report.auditAnotherDesc")}
        </p>
        <UrlInput className="max-w-lg mx-auto" />
      </motion.div>
    </motion.div>
  );
}
