"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  en,
  formatDate,
  formatNumber,
  interpolate,
  si,
  type Locale,
  type Messages,
} from "@/lib/i18n";

const STORAGE_KEY = "pressroom-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
  msg: (template: string, vars?: Record<string, string | number>) => string;
  formatDate: (d: string) => string;
  formatNumber: (n: number) => string;
  categoryName: (name: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "si") {
      setLocaleState(stored);
      return;
    }
    if (navigator.language.toLowerCase().startsWith("si")) {
      setLocaleState("si");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "si" ? "si" : "en";
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const t = locale === "si" ? si : en;
    return {
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        localStorage.setItem(STORAGE_KEY, next);
      },
      t,
      msg: interpolate,
      formatDate: (d) => formatDate(d, locale),
      formatNumber: (n) => formatNumber(n, locale),
      categoryName: (name) => t.categories[name] ?? name,
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return ctx;
}
