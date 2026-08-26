"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

export type AuthStep = {
  n: number;
  label: string;
};

export function AuthShell({
  title,
  body,
  steps,
  activeStep,
  children,
}: {
  title: string;
  body: string;
  steps: AuthStep[];
  activeStep: number;
  children: ReactNode;
}) {
  return (
    <div className="auth-screen min-h-screen bg-black p-3 text-white sm:p-4 lg:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1400px] lg:min-h-[calc(100vh-2.5rem)] lg:grid-cols-[minmax(300px,42%)_1fr] lg:gap-6">
        <aside className="auth-hero relative hidden overflow-hidden rounded-[1.75rem] p-8 md:flex md:min-h-[300px] md:flex-col lg:min-h-full lg:p-10">
          <div className="auth-hero-grain pointer-events-none absolute inset-0" />
          <Link href="/" className="relative z-10 inline-flex items-center" aria-label={brand.name}>
            <img
              src={brand.authLogo}
              alt={brand.name}
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>

          <div className="relative z-10 mt-16 max-w-md lg:mt-24">
            <h1 className="font-sans text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/55 lg:text-base">{body}</p>
          </div>

          <ol className="relative z-10 mt-10 flex max-w-sm flex-col gap-3 lg:mt-auto lg:pt-16">
            {steps.map((step) => {
              const active = step.n === activeStep;
              return (
                <li
                  key={step.n}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium",
                    active ? "bg-white text-black" : "bg-white/8 text-white/80",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold",
                      active ? "bg-black text-white" : "bg-white/10 text-white/70",
                    )}
                  >
                    {step.n}
                  </span>
                  {step.label}
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="flex flex-col justify-center overflow-y-auto px-4 py-10 sm:px-8 lg:px-16">
          <Link
            href="/"
            className="mb-10 inline-flex items-center md:hidden"
            aria-label={brand.name}
          >
            <img
              src={brand.authLogo}
              alt={brand.name}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div className="mx-auto w-full max-w-[440px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
