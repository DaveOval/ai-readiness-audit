"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import type { Issue, Fix, Severity, Impact } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import {
  translateFindingName,
  translateFindingDetail,
  translateFixTitle,
  translateFixDescription,
} from "@/lib/translations-data";

interface FindingsListProps {
  issues: Issue[];
  fixes: Fix[];
}

const severityConfig: Record<Severity, { icon: typeof AlertTriangle; color: string; bg: string }> = {
  critical: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
  high: { icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-500/10" },
  medium: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10" },
  low: { icon: Info, color: "t-text-tertiary", bg: "t-surface-4" },
};

const impactI18nKeys: Record<Impact, string> = {
  high: "impact.high",
  medium: "impact.medium",
  low: "impact.low",
};

const impactColors: Record<Impact, string> = {
  high: "text-emerald-400",
  medium: "text-blue-400",
  low: "t-text-tertiary",
};

const catI18nKeys: Record<string, string> = {
  technical: "cat.technical",
  discoverability: "cat.discoverability",
  content: "cat.content",
  structuredData: "cat.structuredData",
  aiReadiness: "cat.aiReadiness",
};

export function FindingsList({ issues, fixes }: FindingsListProps) {
  const { t, locale } = useI18n();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-2xl t-card p-6"
      >
        <h3 className="text-base font-semibold t-text mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          {t("report.topIssues")}
        </h3>
        {issues.length === 0 ? (
          <p className="text-sm t-text-tertiary">{t("report.noIssues")}</p>
        ) : (
          <div className="space-y-3">
            {issues.slice(0, 6).map((issue, i) => {
              const config = severityConfig[issue.severity];
              const Icon = config.icon;

              return (
                <motion.div
                  key={`${issue.title}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                  className="flex gap-3 items-start"
                >
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${config.bg}`}>
                    <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium t-text-primary">
                        {translateFindingName(issue.title, locale)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider t-text-muted rounded t-surface-4 px-1.5 py-0.5">
                        {t((catI18nKeys[issue.category] || issue.category) as Parameters<typeof t>[0])}
                      </span>
                    </div>
                    <p className="text-xs t-text-tertiary mt-0.5 leading-relaxed">
                      {translateFindingDetail(issue.description, locale)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="rounded-2xl t-card p-6"
      >
        <h3 className="text-base font-semibold t-text mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-blue-400" />
          {t("report.recommended")}
        </h3>
        {fixes.length === 0 ? (
          <p className="text-sm t-text-tertiary">{t("report.noFixes")}</p>
        ) : (
          <div className="space-y-3">
            {fixes.slice(0, 6).map((fix, i) => (
              <motion.div
                key={`${fix.title}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                className="flex gap-3 items-start"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10">
                  <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium t-text-primary">
                      {translateFixTitle(fix.title, locale)}
                    </span>
                    <span className={`text-[10px] ${impactColors[fix.impact]}`}>
                      {t(impactI18nKeys[fix.impact] as Parameters<typeof t>[0])}
                    </span>
                  </div>
                  <p className="text-xs t-text-tertiary mt-0.5 leading-relaxed">
                    {translateFixDescription(fix.description, locale)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
