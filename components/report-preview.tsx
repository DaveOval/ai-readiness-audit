"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 rounded-full t-surface-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs t-text-tertiary font-mono w-7 text-right">
        {value}
      </span>
    </div>
  );
}

export function ReportPreview() {
  const { t } = useI18n();

  const categories = [
    { label: t("cat.technical"), value: 92, color: "bg-emerald-400" },
    { label: t("cat.discoverability"), value: 78, color: "bg-blue-400" },
    { label: t("cat.content"), value: 65, color: "bg-amber-400" },
    { label: t("cat.structuredData"), value: 45, color: "bg-red-400" },
    { label: t("cat.aiReadiness"), value: 58, color: "bg-amber-400" },
  ];

  return (
    <section className="relative py-10 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold t-text tracking-tight">
            {t("preview.title")}
          </h2>
          <p className="mt-3 t-text-tertiary max-w-md mx-auto">
            {t("preview.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="rounded-2xl t-card overflow-hidden shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 px-4 py-3 border-b t-border-6 t-surface-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full t-surface-10" />
                <div className="h-2.5 w-2.5 rounded-full t-surface-10" />
                <div className="h-2.5 w-2.5 rounded-full t-surface-10" />
              </div>
              <div className="ml-3 flex-1 min-w-0 rounded-md t-surface-4 px-3 py-1 text-xs t-text-muted font-mono truncate">
                {SITE_URL.replace(/^https?:\/\//, "")}/scan?url=example.com
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative flex-shrink-0">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      className="stroke-current t-text-muted"
                      strokeWidth="6"
                    />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="url(#previewGrad)" strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={264}
                      strokeDashoffset={264}
                      whileInView={{ strokeDashoffset: 264 - 264 * 0.74 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="previewGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold t-text">74</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold t-text">
                      {t("preview.verdict")}
                    </span>
                    <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-400 border border-blue-500/20">
                      74/100
                    </span>
                  </div>
                  <p className="text-sm t-text-tertiary">
                    {t("preview.verdictCopy")}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {categories.map((cat) => (
                  <div key={cat.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs t-text-secondary">{cat.label}</span>
                    </div>
                    <MiniBar value={cat.value} color={cat.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
