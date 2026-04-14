"use client";

import { motion } from "framer-motion";
import { Shield, Search, FileText, Database, Brain } from "lucide-react";
import type { CategoryScores, CategoryKey } from "@/lib/types";
import { getScoreColor, getScoreBgColor } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

interface CategoryCardsProps {
  scores: CategoryScores;
}

const categoryIcons: Record<CategoryKey, typeof Shield> = {
  technical: Shield,
  discoverability: Search,
  content: FileText,
  structuredData: Database,
  aiReadiness: Brain,
};

const categoryI18nKeys: Record<CategoryKey, string> = {
  technical: "cat.technical",
  discoverability: "cat.discoverability",
  content: "cat.content",
  structuredData: "cat.structuredData",
  aiReadiness: "cat.aiReadiness",
};

const categoryOrder: CategoryKey[] = [
  "technical", "discoverability", "content", "structuredData", "aiReadiness",
];

export function CategoryCards({ scores }: CategoryCardsProps) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {categoryOrder.map((key, i) => {
        const score = scores[key];
        const Icon = categoryIcons[key];
        const colorClass = getScoreColor(score);
        const bgClass = getScoreBgColor(score);

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            className="rounded-2xl t-card p-5 t-card-hover transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bgClass}`}>
                <Icon className={`h-4 w-4 ${colorClass}`} />
              </div>
            </div>
            <div className="text-xs t-text-tertiary mb-2">
              {t(categoryI18nKeys[key] as Parameters<typeof t>[0])}
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-2xl font-bold tabular-nums ${colorClass}`}>{score}</span>
              <span className="text-xs t-text-muted mb-1">/100</span>
            </div>
            <div className="mt-3 h-1 rounded-full t-surface-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  score >= 85 ? "bg-emerald-400"
                    : score >= 70 ? "bg-blue-400"
                      : score >= 50 ? "bg-amber-400"
                        : "bg-red-400"
                }`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
