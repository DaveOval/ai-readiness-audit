"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import type { Finding, CategoryKey } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { translateFindingName, translateFindingDetail } from "@/lib/translations-data";

interface TechnicalDetailsProps {
  findings: Finding[];
}

const categoryOrder: CategoryKey[] = [
  "technical", "discoverability", "content", "structuredData", "aiReadiness",
];

const catI18nKeys: Record<CategoryKey, string> = {
  technical: "cat.technical",
  discoverability: "cat.discoverability",
  content: "cat.content",
  structuredData: "cat.structuredData",
  aiReadiness: "cat.aiReadiness",
};

export function TechnicalDetails({ findings }: TechnicalDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale } = useI18n();

  const grouped = categoryOrder.reduce(
    (acc, key) => {
      acc[key] = findings.filter((f) => f.category === key);
      return acc;
    },
    {} as Record<CategoryKey, Finding[]>
  );

  const passedCount = findings.filter((f) => f.passed).length;
  const failedCount = findings.filter((f) => !f.passed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="rounded-2xl t-card overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:t-surface-2 transition-colors"
        aria-expanded={isOpen}
      >
        <div>
          <h3 className="text-base font-semibold t-text">{t("report.detected")}</h3>
          <p className="text-sm t-text-tertiary mt-0.5">
            {findings.length} {t("report.checks")} &middot;{" "}
            {passedCount} {t("report.passed")} &middot;{" "}
            {failedCount} {t("report.issues")}
          </p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 t-text-tertiary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t t-border-6 pt-4">
              {categoryOrder.map((key) => {
                const items = grouped[key];
                if (!items || items.length === 0) return null;

                return (
                  <div key={key}>
                    <h4 className="text-xs uppercase tracking-wider t-text-tertiary mb-3 font-medium">
                      {t(catI18nKeys[key] as Parameters<typeof t>[0])}
                    </h4>
                    <div className="space-y-2">
                      {items.map((finding, i) => (
                        <div
                          key={`${finding.name}-${i}`}
                          className="flex items-start gap-3 py-2 px-3 rounded-lg hover:t-surface-2 transition-colors"
                        >
                          {finding.passed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium t-text-secondary">
                              {translateFindingName(finding.name, locale)}
                            </span>
                            <p className="text-xs t-text-tertiary mt-0.5">
                              {translateFindingDetail(finding.detail, locale)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
