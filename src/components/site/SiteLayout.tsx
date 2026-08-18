import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2 className="shrink-0 text-2xl md:text-3xl">{title}</h2>
      <span className="rule-line" />
      {action}
    </div>
  );
}
