"use client";

import { Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BrandLogo } from "./BrandLogo";
import { XIcon } from "./XIcon";
import footerBg from "@/assets/footer-bg.jpg";

const socials = [
  { label: "X", icon: XIcon },
  { label: "LinkedIn", icon: Linkedin },
  { label: "Instagram", icon: Instagram },
];

export function Footer() {
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid email address");
      return;
    }
    toast.success("You're on the list — watch your inbox.");
    setEmail("");
  }

  return (
    <footer className="relative mt-20 overflow-hidden bg-ink text-ink-foreground">
      {/* Photographic band */}
      <img
        src={footerBg.src}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1088}
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] w-full object-cover opacity-70"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-ink/50 via-ink/70 to-ink" />

      <div className="relative">
        {/* Signup */}
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-14 text-center md:pt-20">
          <div className="flex items-center justify-center">
            <BrandLogo className="h-12 w-auto sm:h-14" />
          </div>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 kicker text-ink-foreground/80">
            <span className="size-1.5 rounded-full bg-primary" />
            Coming soon
          </span>

          <h2 className="mt-6 text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            Sign Up To Our Email List To Get Notified When We{" "}
            <span className="text-primary">Launch.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-foreground/70">
            We craft newsroom-grade reporting and commissioned features — built for credibility,
            clarity and stories that keep their value.
          </p>

          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-white/25 bg-white/10 p-1.5 pl-5 backdrop-blur"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              maxLength={255}
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink-foreground placeholder:text-ink-foreground/55 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Submit
            </button>
          </form>

          <div className="mt-9 flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border border-white/25 bg-white/10 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center px-4 pb-4" aria-hidden>
          <BrandLogo className="h-16 w-auto opacity-90 sm:h-24 md:h-28" />
        </div>


        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-4 py-6 text-xs text-ink-foreground/60 sm:flex-row">
          <span>Copyright © {new Date().getFullYear()}</span>
          <span>
            Independent Daily by <span className="font-semibold italic">Pressroom</span>
          </span>
          <a
            href="https://www.wewillaustralia.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink-foreground/80 transition-colors hover:text-primary"
          >
            Powered by We Will Australia
          </a>
        </div>
      </div>
    </footer>
  );
}
