"use client";

import { ArticleCard } from "@/components/site/ArticleCard";
import { useI18n } from "@/components/site/LanguageProvider";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import type { Article, Author } from "@/lib/mock-data";

export function AuthorPage({ author, items }: { author: Author; items: Article[] }) {
  const { t, msg } = useI18n();

  return (
    <SiteLayout>
      <div className="border-b border-border bg-secondary/40 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center">
          <span className="grid size-20 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground">
            {author.avatarInitials}
          </span>
          <div>
            <p className="text-primary kicker">{t.roles[author.role] ?? author.role}</p>
            <h1 className="mt-1 text-3xl md:text-4xl">{author.name}</h1>
            <p className="mt-2 max-w-2xl font-serif text-muted-foreground">{author.bio}</p>
            <div className="mt-3 flex gap-3 text-sm font-semibold">
              {author.socials.map((s) => (
                <a key={s.label} href={s.url} className="text-primary">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading title={msg(t.author.stories, { n: items.length })} />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
