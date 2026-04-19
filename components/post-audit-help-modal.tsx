"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ExternalLink, Sparkles, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL, HELP_PAGE_URL } from "@/lib/contact";

interface PostAuditHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  websiteUrl?: string;
}

export function PostAuditHelpModal({
  open,
  onOpenChange,
  email = CONTACT_EMAIL,
  websiteUrl = HELP_PAGE_URL,
}: PostAuditHelpModalProps) {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onOpenChange]);

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    t("scan.helpModal.emailSubject")
  )}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="help-modal"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
          aria-describedby="help-modal-body"
        >
          <button
            type="button"
            aria-label={t("scan.helpModal.dismiss")}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl t-card p-6 sm:p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full t-text-tertiary hover:t-text transition-colors hover:bg-white/5"
              aria-label={t("scan.helpModal.dismiss")}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/10 mb-4">
              <Sparkles className="h-5 w-5 text-blue-400" />
            </div>

            <h2
              id="help-modal-title"
              className="text-xl sm:text-2xl font-bold t-text tracking-tight"
            >
              {t("scan.helpModal.title")}
            </h2>
            <p
              id="help-modal-body"
              className="mt-2 text-sm t-text-tertiary leading-relaxed"
            >
              {t("scan.helpModal.body")}
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={mailtoHref}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/20"
              >
                <Mail className="h-4 w-4" />
                {t("scan.helpModal.email")}
              </a>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium t-text transition-all hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
                {t("scan.helpModal.website")}
              </a>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-1 text-xs t-text-tertiary hover:t-text transition-colors py-1.5"
              >
                {t("scan.helpModal.dismiss")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
