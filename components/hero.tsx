"use client";

import { motion } from "framer-motion";
import { UrlInput } from "./url-input";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative flex min-h-[70vh] sm:min-h-[90vh] flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-10 sm:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[90vw] max-w-[700px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.5 0.2 265 / 0.4), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-3xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full t-border-8 border t-surface-4 px-4 py-1.5 text-sm t-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t("hero.badge")}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight t-text leading-[1.1]">
          {t("hero.title1")}
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
            {t("hero.title2")}
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg t-text-secondary max-w-xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 sm:mt-10 max-w-xl mx-auto"
        >
          <UrlInput size="large" />
        </motion.div>

        <p className="mt-4 text-xs t-text-muted">
          {t("hero.footnote")}
        </p>
      </motion.div>
    </section>
  );
}
