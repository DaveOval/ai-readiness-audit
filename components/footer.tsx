"use client";

import { useI18n } from "@/lib/i18n";
import { BrandMark } from "./brand-mark";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t t-border-6 py-6 sm:py-10 px-4 sm:px-6 mt-auto">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 t-text-secondary">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 shadow shadow-blue-500/20">
            <BrandMark className="h-4 w-4 text-white" />
          </span>
          <span className="text-sm font-medium">{t("nav.brand")}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs t-text-muted">
          <span>
            {t("footer.madeBy")}{" "}
            <a
              href="https://www.daveoval.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium t-text-secondary hover:text-blue-400 transition-colors"
            >
              David Vazquez
            </a>
          </span>
          <span className="hidden sm:inline">&middot;</span>
          <span>{t("footer.builtWith")}</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
