"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Search,
  Share2,
  FileText,
  Database,
  Brain,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function WhatWeCheck() {
  const { t } = useI18n();

  const items = [
    { icon: Shield, title: t("check.technical"), description: t("check.technicalDesc") },
    { icon: Search, title: t("check.discoverability"), description: t("check.discoverabilityDesc") },
    { icon: Share2, title: t("check.social"), description: t("check.socialDesc") },
    { icon: FileText, title: t("check.content"), description: t("check.contentDesc") },
    { icon: Database, title: t("check.structured"), description: t("check.structuredDesc") },
    { icon: Brain, title: t("check.ai"), description: t("check.aiDesc") },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold t-text tracking-tight">
            {t("check.title")}
          </h2>
          <p className="mt-3 t-text-tertiary max-w-md mx-auto">
            {t("check.subtitle")}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={card}
              className="group rounded-2xl t-card p-6 transition-all t-card-hover hover:-translate-y-0.5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/10">
                <item.icon className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-[15px] font-semibold t-text mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm t-text-tertiary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
