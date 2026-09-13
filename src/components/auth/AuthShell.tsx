"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { brand } from "@/lib/brand";

export function AuthShell({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div className="auth-screen min-h-screen bg-black p-2 text-white sm:p-2.5 lg:p-3">
      <div className="grid min-h-[calc(100vh-1rem)] w-full lg:min-h-[calc(100vh-1.5rem)] lg:grid-cols-[minmax(420px,58%)_1fr] lg:gap-4">
        <aside className="auth-hero relative hidden overflow-hidden rounded-[1.75rem] p-8 md:flex md:min-h-[300px] md:flex-col lg:min-h-full lg:p-10">
          <div className="auth-hero-grain pointer-events-none absolute inset-0" />
          <Link href="/" className="relative z-10 inline-flex items-center" aria-label={brand.name}>
            <img
              src={brand.authLogo}
              alt={brand.name}
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>

          <div className="relative z-10 mt-auto max-w-md pb-4 pt-16">
            <h1 className="whitespace-pre-line font-sans text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/55 lg:text-base">{body}</p>
          </div>
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
