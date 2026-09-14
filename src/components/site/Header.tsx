"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { AccountMenu } from "./AccountMenu";
import { BrandLogo } from "./BrandLogo";
import { useCart } from "./CartProvider";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "./LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { moreCategories, navCategories } from "@/lib/home-showcase";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, categoryName, locale } = useI18n();
  const { user, isStaff, signOut } = useAuth();
  const { count } = useCart();
  const caseClass = locale === "si" ? "tracking-wide" : "uppercase tracking-wide";
  const shopActive = pathname === "/shop" || pathname.startsWith("/shop/");

  const nav = [
    { label: t.nav.coupons, to: "/coupons", match: "/coupons" },
    { label: t.nav.shop, to: "/shop", match: "/shop" },
    { label: t.nav.order, to: "/order", match: "/order" },
    { label: t.nav.search, to: "/search", match: "/search" },
    {
      label: t.nav.newsroom,
      to: isStaff ? "/admin" : "/login/staff?next=%2Fadmin",
      match: "/admin",
    },
    {
      label: t.nav.writers,
      to: isStaff ? "/writer" : "/login/staff?next=%2Fwriter",
      match: "/writer",
    },
  ];

  return (
    <header className="sticky top-0 z-50 overflow-x-clip border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center"
          aria-label={t.nav.homeAria}
        >
          <BrandLogo className="h-7 w-auto max-w-[132px] object-contain object-left sm:h-9 sm:max-w-[170px]" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.match}
              href={n.to}
              className={`text-sm font-semibold ${caseClass} transition-colors hover:text-primary ${
                pathname === n.match || pathname.startsWith(`${n.match}/`)
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <AccountMenu />
          <div className="relative">
            <Button
              asChild
              variant="outline"
              size="icon"
              className={`size-8 rounded-sm sm:size-9 ${pathname === "/cart" ? "border-primary text-primary" : ""}`}
            >
              <Link href="/cart" aria-label={t.nav.cartAria}>
                <ShoppingBag className="size-4" />
              </Link>
            </Button>
            {count > 0 ? (
              <span className="pointer-events-none absolute -top-1 -right-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </div>
          <Button asChild variant="outline" size="icon" className="size-8 rounded-sm sm:size-9">
            <Link href="/search" aria-label={t.nav.searchAria}>
              <Search className="size-4" />
            </Link>
          </Button>
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link href="/order" className="hidden md:block">
            <Button className={`rounded-sm font-semibold ${caseClass}`}>{t.nav.hireUs}</Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-sm lg:hidden sm:size-9"
            onClick={() => setOpen(!open)}
            aria-label={t.nav.menuAria}
            aria-expanded={open}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 overflow-x-auto overscroll-x-contain px-3 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-3.5 sm:px-4 lg:gap-4 [&::-webkit-scrollbar]:hidden">
          <Link
            href="/"
            className={`shrink-0 text-xs font-medium transition-colors sm:text-[13px] ${
              pathname === "/"
                ? "border-b-2 border-primary pb-0.5 font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.nav.home}
          </Link>
          {navCategories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={c.slug}
                href={href}
                className={`shrink-0 text-xs font-medium transition-colors sm:text-[13px] ${
                  active
                    ? "border-b-2 border-primary pb-0.5 font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {categoryName(c.name)}
              </Link>
            );
          })}
          <Link
            href="/shop"
            className={`shrink-0 text-xs font-medium transition-colors sm:text-[13px] ${
              shopActive
                ? "border-b-2 border-primary pb-0.5 font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {categoryName("Shop")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground sm:text-[13px]">
              {t.home.more}
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreCategories.map((c) => (
                <DropdownMenuItem key={c.slug} asChild>
                  <Link href={`/category/${c.slug}`}>{categoryName(c.name)}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.match}
              href={n.to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-semibold ${caseClass}`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className={`block py-2 text-sm font-semibold ${caseClass}`}
          >
            {t.nav.cart}
            {count > 0 ? ` (${count})` : ""}
          </Link>
          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className={`block py-2 text-sm font-semibold md:hidden ${caseClass}`}
          >
            {t.nav.hireUs}
          </Link>
          <div className="mt-2 flex items-center gap-2 border-t border-border pt-3 sm:hidden">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          {user ? (
            <>
              {isStaff ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className={`mt-1 block py-2 text-sm font-semibold ${caseClass}`}
                >
                  {t.nav.dashboard}
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void signOut();
                }}
                className={`mt-1 block py-2 text-sm font-semibold ${caseClass}`}
              >
                {t.nav.signOut}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={`mt-1 block py-2 text-sm font-semibold ${caseClass}`}
              >
                {t.nav.signIn}
              </Link>
              <Link
                href="/login/staff"
                onClick={() => setOpen(false)}
                className={`mt-1 block py-2 text-sm font-semibold ${caseClass}`}
              >
                {t.nav.staffSignIn}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
