"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, Newspaper, PenLine } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/site/AuthProvider";
import { useI18n } from "@/components/site/LanguageProvider";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]!.charAt(0)}${parts[1]!.charAt(0)}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "?";
}

export function AccountMenu() {
  const { user, loading, isAdmin, isWriter, isStaff, signOut } = useAuth();
  const { t } = useI18n();

  if (loading) {
    return <Skeleton className="hidden size-8 rounded-full sm:inline-block" />;
  }

  if (!user) {
    return (
      <div className="hidden items-center gap-3 sm:flex">
        <Link href="/login" className="shrink-0 text-sm font-semibold">
          {t.nav.signIn}
        </Link>
        <Link href="/login/staff" className="shrink-0 text-sm font-semibold text-muted-foreground hover:text-foreground">
          {t.nav.staffSignIn}
        </Link>
      </div>
    );
  }

  const label = user.displayName || user.email || t.nav.signIn;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="hidden items-center gap-2 sm:inline-flex"
          aria-label={label}
        >
          <Avatar className="size-8">
            {user.photoURL ? <AvatarImage src={user.photoURL} alt="" /> : null}
            <AvatarFallback className="bg-primary text-[11px] font-semibold text-primary-foreground">
              {initials(label)}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-[10rem] truncate text-xs font-semibold">{label}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-semibold">{user.displayName || t.nav.signIn}</p>
          {user.email ? <p className="truncate text-xs text-muted-foreground">{user.email}</p> : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isStaff ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="size-4" />
                {t.nav.dashboard}
              </Link>
            </DropdownMenuItem>
            {isAdmin ? (
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <Newspaper className="size-4" />
                  {t.nav.newsroom}
                </Link>
              </DropdownMenuItem>
            ) : null}
            {isWriter ? (
              <DropdownMenuItem asChild>
                <Link href="/writer">
                  <PenLine className="size-4" />
                  {t.nav.writers}
                </Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem
          onClick={() => {
            void signOut();
          }}
        >
          <LogOut className="size-4" />
          {t.nav.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
