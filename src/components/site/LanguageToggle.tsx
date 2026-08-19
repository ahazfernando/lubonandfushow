"use client";

import { useI18n } from "./LanguageProvider";
import { locales, type Locale } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.switchTo}
      className="inline-flex h-9 overflow-hidden rounded-sm border border-border"
    >
      {locales.map((item) => {
        const active = locale === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setLocale(item.id as Locale)}
            aria-pressed={active}
            aria-label={item.id === "si" ? t.language.sinhala : t.language.english}
            className={`min-w-9 px-2 text-xs font-bold tracking-wide transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {item.native}
          </button>
        );
      })}
    </div>
  );
}
