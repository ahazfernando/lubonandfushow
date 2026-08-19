"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "./LanguageProvider";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const { t, locale } = useI18n();
  const caseClass = locale === "si" ? "" : "uppercase";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error(t.newsletter.invalidEmail);
      return;
    }
    toast.success(t.newsletter.success);
    setEmail("");
  }

  return (
    <section
      className={
        compact ? "card-press p-5" : "bg-ink px-6 py-12 text-ink-foreground md:px-12 md:py-16"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-3xl text-center"}>
        <p className="mb-2 text-primary kicker">
          <Mail className="mr-1 inline size-3" /> {t.newsletter.kicker}
        </p>
        <h2 className={compact ? "text-lg" : "text-3xl md:text-4xl"}>{t.newsletter.title}</h2>
        <p className={compact ? "mt-2 text-sm text-muted-foreground" : "mt-3 opacity-75"}>
          {t.newsletter.body}
        </p>
        <form
          onSubmit={submit}
          className={compact ? "mt-4 flex gap-2" : "mx-auto mt-6 flex max-w-md gap-2"}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter.placeholder}
            maxLength={255}
            className="rounded-sm bg-background text-foreground"
          />
          <Button type="submit" className={`shrink-0 rounded-sm font-semibold ${caseClass}`}>
            {t.newsletter.subscribe}
          </Button>
        </form>
      </div>
    </section>
  );
}
