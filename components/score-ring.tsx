"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getScoreRingColor } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
}

export function ScoreRing({
  score,
  size = 128,
  strokeWidth = 8,
  animate = true,
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getScoreRingColor(score);
  const { t } = useI18n();

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let frame: number;

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score, animate]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" strokeWidth={strokeWidth}
          className="stroke-current t-text-muted"
          style={{ opacity: 0.3 }}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - circumference * (score / 100) }}
          transition={{ duration: animate ? 1.5 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold tabular-nums" style={{ color }}>
          {displayScore}
        </span>
        <span className="text-[10px] sm:text-xs t-text-tertiary mt-0.5">{t("report.outOf")}</span>
      </div>
    </div>
  );
}
