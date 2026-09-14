"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { useI18n } from "./LanguageProvider";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={t.common.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-4 bottom-4 z-50 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_28px_-10px_rgba(220,38,38,0.75)] transition-[opacity,transform,visibility] duration-300 hover:scale-105 hover:bg-primary/90 md:right-6 md:bottom-6",
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-2 opacity-0 pointer-events-none",
      )}
    >
      <ArrowUp className="size-5" strokeWidth={2.25} />
    </button>
  );
}
