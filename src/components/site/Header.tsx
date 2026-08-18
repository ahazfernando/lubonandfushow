"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Zap } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { breakingStories, categories } from "@/lib/mock-data";

const nav = [
  { label: "Home", to: "/" },
  { label: "Order an Article", to: "/order" },
  { label: "Search", to: "/search" },
  { label: "Newsroom", to: "/admin" },
  { label: "Writers", to: "/writer" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ticker = breakingStories;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 text-xs">
          <span className="flex shrink-0 items-center gap-1.5 bg-primary px-2 py-0.5 font-bold text-primary-foreground kicker">
            <Zap className="size-3" /> Breaking
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap">
              {ticker.map((a) => (
                <Link
                  key={a.id}
                  href={`/article/${a.slug}`}
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  {a.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/auth" className="hidden shrink-0 font-semibold sm:block">
            Sign in
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2">
        <Link href="/" className="flex shrink-0 items-center" aria-label="The Liban & Fu Show home">
          <BrandLogo className="h-14 w-auto sm:h-16" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary ${
                pathname === n.to ? "text-primary" : "text-foreground/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" aria-label="Search articles">
            <Button variant="outline" size="icon" className="rounded-sm">
              <Search className="size-4" />
            </Button>
          </Link>
          <ThemeToggle />
          <Link href="/order" className="hidden sm:block">
            <Button className="rounded-sm font-semibold uppercase tracking-wide">Hire us</Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-sm lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      <div className="border-t border-border bg-secondary/60">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="whitespace-nowrap text-muted-foreground transition-colors hover:text-primary kicker"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-semibold uppercase tracking-wide"
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
