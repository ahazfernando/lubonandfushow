"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogOut, Newspaper, PenLine } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth/AuthShell";
import { useAuth } from "@/components/site/AuthProvider";
import { useI18n } from "@/components/site/LanguageProvider";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export function StaffDashboardPage() {
  const { t, msg, locale } = useI18n();
  const { user, loading, isAdmin, isWriter, isStaff, signOut } = useAuth();
  const router = useRouter();
  const caseClass = locale === "si" ? "" : "uppercase";

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login/staff?next=%2Fdashboard");
    }
  }, [loading, user, router]);

  async function handleSignOut() {
    await signOut();
    toast.success(t.nav.signOut);
    router.replace("/login/staff");
  }

  if (loading || !user) {
    return <PageSkeleton variant="auth" />;
  }

  if (!isStaff) {
    return (
      <AuthShell title={t.dashboard.accessDeniedTitle} body={t.dashboard.accessDeniedBody}>
        <h2 className="font-sans text-3xl font-semibold tracking-tight text-white">
          {t.dashboard.accessDeniedTitle}
        </h2>
        <p className="mt-2 text-sm text-white/45">{t.dashboard.accessDeniedBody}</p>
        <button
          type="button"
          onClick={() => void handleSignOut()}
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold tracking-wide text-black transition-opacity hover:opacity-90"
        >
          <LogOut className="size-4" /> {t.nav.signOut}
        </button>
        <p className="mt-4 text-center text-sm text-white/45">
          <Link href="/" className="font-semibold text-white">
            {t.dashboard.backToSite}
          </Link>
        </p>
      </AuthShell>
    );
  }

  const cards = [
    isAdmin
      ? {
          href: "/admin",
          icon: Newspaper,
          title: t.dashboard.adminTitle,
          body: t.dashboard.adminBody,
          cta: t.dashboard.openAdmin,
        }
      : null,
    isWriter
      ? {
          href: "/writer",
          icon: PenLine,
          title: t.dashboard.authorTitle,
          body: t.dashboard.authorBody,
          cta: t.dashboard.openAuthor,
        }
      : null,
  ].filter(Boolean) as {
    href: string;
    icon: typeof Newspaper;
    title: string;
    body: string;
    cta: string;
  }[];

  return (
    <SiteLayout>
      <div className="border-b border-border bg-background py-12">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-4">
          <div>
            <p className="text-primary kicker">{t.dashboard.kicker}</p>
            <h1 className="mt-2 text-3xl md:text-4xl">{t.dashboard.title}</h1>
            {user.email ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {msg(t.dashboard.signedInAs, { email: user.email })}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className={`rounded-sm ${caseClass}`}>
              <Link href="/">{t.dashboard.backToSite}</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`rounded-sm ${caseClass}`}
              onClick={() => void handleSignOut()}
            >
              <LogOut className="size-4" /> {t.nav.signOut}
            </Button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-5 text-2xl">{card.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {card.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
