"use client";

import { motion } from "framer-motion";
import type { Verdict } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { translateVerdict, translateVerdictCopy } from "@/lib/translations-data";

interface VerdictBadgeProps {
  verdict: Verdict;
  copy: string;
}

const verdictStyles: Record<Verdict, { bg: string; text: string; border: string; glow: string }> = {
  Excellent: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
  Strong: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
  },
  "Needs Work": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/20",
  },
  Weak: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    glow: "shadow-red-500/20",
  },
};

export function VerdictBadge({ verdict, copy }: VerdictBadgeProps) {
  const style = verdictStyles[verdict];
  const { locale } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-3"
    >
      <div
        className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold border shadow-lg ${style.bg} ${style.text} ${style.border} ${style.glow}`}
      >
        {translateVerdict(verdict, locale)}
      </div>
      <p className="t-text-secondary text-sm leading-relaxed max-w-md">
        {translateVerdictCopy(copy, locale)}
      </p>
    </motion.div>
  );
}
