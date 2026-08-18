import { ArticleCard } from "@/components/site/ArticleCard";
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
  return (
    <SiteLayout>
      <div className="border-b border-border bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-primary kicker">Section</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{cat.name}</h1>
          <p className="mt-3 opacity-70">{cat.count} stories filed in this section</p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading title="Latest" />
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <p className="font-serif text-muted-foreground">
            Nothing published in this section yet — our writers are on it.
          </p>
        )}
      </section>

      <Newsletter />
    </SiteLayout>
  );
}
