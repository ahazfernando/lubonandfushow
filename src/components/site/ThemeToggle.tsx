"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { useI18n } from "./LanguageProvider";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const stored = localStorage.getItem("pressroom-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("pressroom-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.common.toggleDark}
      className="inline-flex size-9 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-accent"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
