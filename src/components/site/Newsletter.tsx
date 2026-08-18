"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid email address");
      return;
    }
    toast.success("Subscribed — check your inbox to confirm.");
    setEmail("");
  }

  return (
    <section
      className={
        compact
          ? "card-press p-5"
          : "bg-ink px-6 py-12 text-ink-foreground md:px-12 md:py-16"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-3xl text-center"}>
        <p className="mb-2 text-primary kicker">
          <Mail className="mr-1 inline size-3" /> The Morning Edition
        </p>
        <h2 className={compact ? "text-lg" : "text-3xl md:text-4xl"}>
          One email. Every weekday. No filler.
        </h2>
        <p className={compact ? "mt-2 text-sm text-muted-foreground" : "mt-3 opacity-75"}>
          Our editors pick the five stories that matter and tell you why.
        </p>
        <form
          onSubmit={submit}
          className={compact ? "mt-4 flex gap-2" : "mx-auto mt-6 flex max-w-md gap-2"}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            maxLength={255}
            className="rounded-sm bg-background text-foreground"
          />
          <Button type="submit" className="shrink-0 rounded-sm font-semibold uppercase">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
