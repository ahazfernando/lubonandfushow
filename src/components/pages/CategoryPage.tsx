"use client";

import { ArticleCard } from "@/components/site/ArticleCard";
import { useI18n } from "@/components/site/LanguageProvider";
import { Newsletter } from "@/components/site/Newsletter";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import type { Article } from "@/lib/mock-data";

export function CategoryPage({
  cat,
  items,
}: {
  cat: { id: string; name: string; slug: string; count: number };
  items: Article[];
}) {
  const { t, msg, categoryName, formatNumber } = useI18n();

  return (
    <SiteLayout>
      <div className="border-b border-border bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-primary kicker">{t.category.kicker}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{categoryName(cat.name)}</h1>
          <p className="mt-3 opacity-70">{msg(t.category.count, { n: formatNumber(cat.count) })}</p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading title={t.common.latest} />
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <p className="font-serif text-muted-foreground">{t.category.empty}</p>
        )}
      </section>

      <Newsletter />
    </SiteLayout>
  );
}
