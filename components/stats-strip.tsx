"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  const { t } = useI18n();

  const stats = [
    { value: 30, suffix: "+", label: t("stats.checks") },
    { value: 6, suffix: "", label: t("stats.categories") },
    { value: 5, suffix: "s", label: t("stats.time") },
    { value: 100, suffix: "%", label: t("stats.free") },
  ];

  return (
    <section className="py-16 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-2xl t-card p-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold t-text mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm t-text-tertiary">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
