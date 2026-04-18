"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { BrandMark } from "./brand-mark";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 t-navbar backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
            <BrandMark className="h-5 w-5 text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight t-text-primary group-hover:opacity-100 transition-opacity">
            {t("nav.brand")}
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/#how-it-works"
            className="hidden sm:block text-sm t-text-secondary hover:opacity-80 transition-opacity"
          >
            {t("nav.howItWorks")}
          </Link>
          <Link
            href="/#contact"
            className="hidden sm:block text-sm t-text-secondary hover:opacity-80 transition-opacity"
          >
            {t("nav.contact")}
          </Link>

          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="flex items-center gap-1.5 rounded-lg t-surface-6 px-2.5 py-1.5 text-xs font-medium t-text-secondary hover:t-surface-10 t-border-8 border transition-all"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="uppercase">{locale}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center h-8 w-8 rounded-lg t-surface-6 t-text-secondary hover:t-surface-10 t-border-8 border transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <Link
            href="/#top"
            className="hidden sm:block rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/20"
          >
            {t("nav.startScan")}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex sm:hidden items-center justify-center h-8 w-8 rounded-lg t-surface-6 t-text-secondary hover:t-surface-10 t-border-8 border transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden border-t t-border-6"
          >
            <div className="px-6 py-4 space-y-3 t-surface-2">
              <Link
                href="/#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="block text-sm t-text-secondary hover:opacity-80 transition-opacity py-2"
              >
                {t("nav.howItWorks")}
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="block text-sm t-text-secondary hover:opacity-80 transition-opacity py-2"
              >
                {t("nav.contact")}
              </Link>
              <Link
                href="/#top"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/20"
              >
                {t("nav.startScan")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
