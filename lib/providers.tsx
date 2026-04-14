"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme";
import { I18nProvider } from "./i18n";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
