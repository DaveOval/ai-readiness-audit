"use client";

import { Activity } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t t-border-6 py-6 sm:py-10 px-4 sm:px-6 mt-auto">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 t-text-tertiary">
          <Activity className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-medium">{t("nav.brand")}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs t-text-muted">
          <span>{t("footer.madeBy")}</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>{t("footer.builtWith")}</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
