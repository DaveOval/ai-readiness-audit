"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  FileSearch,
  ShieldCheck,
  Database,
  FileText,
  Sparkles,
  Check,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ScanPhase } from "@/lib/types";

interface ScanAnimationProps {
  url: string;
  progress: number;
  currentPhase: number;
}

const phaseIcons = [Globe, FileSearch, ShieldCheck, Database, FileText, Sparkles];

const PHASE_KEYS = [
  "phase.fetchingHtml",
  "phase.inspectingMetadata",
  "phase.checkingIndexability",
  "phase.parsingStructured",
  "phase.evaluatingContent",
  "phase.generatingVerdict",
] as const;

const PHASE_RANGES: ScanPhase[] = [
  { label: "", startPct: 0, endPct: 15 },
  { label: "", startPct: 15, endPct: 35 },
  { label: "", startPct: 35, endPct: 50 },
  { label: "", startPct: 50, endPct: 65 },
  { label: "", startPct: 65, endPct: 80 },
  { label: "", startPct: 80, endPct: 100 },
];

export function ScanAnimation({ url, progress, currentPhase }: ScanAnimationProps) {
  const { t } = useI18n();

  const phases = PHASE_KEYS.map((key, i) => ({
    ...PHASE_RANGES[i],
    label: t(key),
  }));

  const displayUrl = (() => {
    try {
      const parsed = new URL(url);
      return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
    } catch {
      return url;
    }
  })();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl t-card overflow-hidden shadow-2xl shadow-black/20"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b t-border-6 t-surface-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full t-surface-10" />
            <div className="h-2.5 w-2.5 rounded-full t-surface-10" />
            <div className="h-2.5 w-2.5 rounded-full t-surface-10" />
          </div>
          <div className="ml-3 flex-1 rounded-md t-surface-4 px-3 py-1 text-xs t-text-tertiary font-mono truncate">
            {displayUrl}
          </div>
        </div>

        <div className="relative p-4 sm:p-8 min-h-[240px] sm:min-h-[280px] overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-0 bottom-0 w-[2px]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, oklch(0.6 0.2 265 / 0.6) 30%, oklch(0.6 0.2 265 / 0.8) 50%, oklch(0.6 0.2 265 / 0.6) 70%, transparent 100%)",
                boxShadow: "0 0 20px oklch(0.6 0.2 265 / 0.5), 0 0 60px oklch(0.6 0.2 265 / 0.2)",
              }}
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-3 mb-8 opacity-20">
            <div className="h-4 w-3/4 rounded t-surface-10" />
            <div className="h-3 w-full rounded t-surface-10" />
            <div className="h-3 w-5/6 rounded t-surface-10" />
            <div className="h-3 w-2/3 rounded t-surface-10" />
            <div className="h-8 w-full rounded t-surface-4 mt-4" />
            <div className="h-3 w-full rounded t-surface-10" />
            <div className="h-3 w-4/5 rounded t-surface-10" />
          </div>

          <AnimatePresence>
            {phases.slice(0, currentPhase + 1).map((phase, i) => {
              const Icon = phaseIcons[i];
              const isActive = i === currentPhase;
              const isDone = i < currentPhase;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`absolute ${getNodePosition(i)}`}
                >
                  <div
                    className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium border transition-all max-w-[45vw] sm:max-w-none ${
                      isDone
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : isActive
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-400 glow-blue-sm"
                          : "t-surface-4 t-border-8 t-text-tertiary"
                    }`}
                  >
                    {isDone ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                    {phase.label}
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-1.5 w-1.5 rounded-full bg-blue-400"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 space-y-4"
      >
        <div className="relative h-1.5 rounded-full t-surface-6 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400/50 to-indigo-400/50 blur-sm"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="t-text-tertiary min-w-0 truncate">
            {currentPhase < phases.length ? phases[currentPhase].label : t("scan.complete")}
          </span>
          <span className="font-mono t-text-secondary tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {phases.map((phase, i) => {
            const isDone = i < currentPhase;
            const isActive = i === currentPhase;

            return (
              <div
                key={i}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all ${
                  isDone
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : isActive
                      ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                      : "t-surface-3 t-text-muted border t-border-6"
                }`}
              >
                {isDone && <Check className="h-3 w-3" />}
                {isActive && (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-blue-400"
                  />
                )}
                {phase.label}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function getNodePosition(index: number): string {
  const positions = [
    "top-2 right-2 sm:top-4 sm:right-4",
    "top-10 left-2 sm:top-12 sm:left-4",
    "top-[4.5rem] right-4 sm:top-[5.5rem] sm:right-8",
    "bottom-16 left-2 sm:bottom-20 sm:left-6",
    "bottom-8 right-2 sm:bottom-12 sm:right-4",
    "bottom-2 left-6 sm:bottom-4 sm:left-12",
  ];
  return positions[index] || "top-2 left-2 sm:top-4 sm:left-4";
}
