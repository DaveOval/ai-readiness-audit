"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ScanAnimation } from "@/components/scan-animation";
import { ReportSummary } from "@/components/report-summary";
import { UrlInput } from "@/components/url-input";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";
import type { AuditResponse } from "@/lib/types";
import { SCAN_PHASES, MIN_SCAN_DISPLAY_MS } from "@/lib/constants";

type ScanState = "scanning" | "complete" | "error";

function ScanContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const { t } = useI18n();

  const [state, setState] = useState<ScanState>("scanning");
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [error, setError] = useState("");

  const resultReadyRef = useRef<AuditResponse | null>(null);
  const animationDoneRef = useRef(false);

  useEffect(() => {
    if (!url) return;

    resultReadyRef.current = null;
    animationDoneRef.current = false;
    setState("scanning");
    setProgress(0);
    setCurrentPhase(0);
    setResult(null);
    setError("");

    const abortController = new AbortController();
    const startTime = Date.now();
    const phaseDuration = MIN_SCAN_DISPLAY_MS / SCAN_PHASES.length;
    let cancelled = false;

    function tryComplete() {
      if (cancelled) return;
      if (resultReadyRef.current && animationDoneRef.current) {
        setResult(resultReadyRef.current);
        setState("complete");
      }
    }

    const progressInterval = setInterval(() => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime;
      const targetPhase = Math.min(
        Math.floor(elapsed / phaseDuration),
        SCAN_PHASES.length - 1
      );

      setCurrentPhase(targetPhase);

      if (targetPhase < SCAN_PHASES.length) {
        const phaseProgress = (elapsed % phaseDuration) / phaseDuration;
        const phase = SCAN_PHASES[targetPhase];
        const pct = phase.startPct + (phase.endPct - phase.startPct) * phaseProgress;
        setProgress(Math.min(pct, 99));
      }

      if (elapsed >= MIN_SCAN_DISPLAY_MS) {
        setProgress(100);
        setCurrentPhase(SCAN_PHASES.length);
        clearInterval(progressInterval);
        animationDoneRef.current = true;
        tryComplete();
      }
    }, 50);

    fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: abortController.signal,
    })
      .then(async (res) => {
        if (cancelled) return;
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Audit failed");
        resultReadyRef.current = data as AuditResponse;
        tryComplete();
      })
      .catch((err) => {
        if (cancelled || abortController.signal.aborted) return;
        clearInterval(progressInterval);
        setError(
          err instanceof Error ? err.message : "Something went wrong. Please try again."
        );
        setState("error");
      });

    return () => {
      cancelled = true;
      clearInterval(progressInterval);
      abortController.abort();
    };
  }, [url]);

  if (!url) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold t-text">{t("scan.noUrl")}</h1>
          <p className="t-text-tertiary">{t("scan.noUrlDesc")}</p>
          <UrlInput className="mt-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pt-20 sm:pt-28 pb-10 sm:pb-16">
      <AnimatePresence mode="wait">
        {state === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
          >
            <div className="text-center mb-6 sm:mb-10">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-bold t-text"
              >
                {t("scan.title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-2 t-text-tertiary text-sm"
              >
                {t("scan.subtitle")}
              </motion.p>
            </div>
            <ScanAnimation url={url} progress={progress} currentPhase={currentPhase} />
          </motion.div>
        )}

        {state === "complete" && result && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="text-center mb-6 sm:mb-10">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm t-text-tertiary hover:opacity-70 transition-opacity mb-4 sm:mb-6"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("scan.backHome")}
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold t-text">
                {t("scan.reportTitle")}
              </h1>
            </div>
            <ReportSummary data={result} />
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md text-center"
          >
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold t-text mb-2">{t("scan.failed")}</h2>
              <p className="text-sm t-text-tertiary mb-6">{error}</p>
              <UrlInput />
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm t-text-tertiary hover:opacity-70 transition-opacity mt-4"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("scan.backHome")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ScanPage() {
  const { t } = useI18n();

  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center pt-28">
            <div className="t-text-tertiary text-sm">{t("scan.loading")}</div>
          </div>
        }
      >
        <ScanContent />
      </Suspense>
      <Footer />
    </>
  );
}
