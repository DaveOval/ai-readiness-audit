"use client";

import { Activity } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t t-border-6 py-10 px-6 mt-auto">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 t-text-tertiary">
          <Activity className="h-4 w-4" />
          <span className="text-sm font-medium">{t("nav.brand")}</span>
        </div>
        <div className="flex items-center gap-4 text-xs t-text-muted">
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
