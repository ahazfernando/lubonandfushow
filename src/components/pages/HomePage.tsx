"use client";

import Link from "next/link";
import { Eye, Flame, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { ArticleCard, ArticleRow, CategoryTag } from "@/components/site/ArticleCard";
import { Newsletter } from "@/components/site/Newsletter";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { authorById, categories, formatDate, published, readingTime, type Article } from "@/lib/mock-data";

export function HomePage() {
  const [tab, setTab] = useState("All");
  const heroSlides = [published[0]!, published[3]!, published[6]!];
  const secondary = published.slice(1, 3);
  const usedAbove = new Set([...heroSlides, ...secondary].map((a) => a.id));
  const trendingGrid =
    tab === "All"
      ? published.filter((a) => !usedAbove.has(a.id)).slice(0, 4)
      : published.filter((a) => a.category === tab && a.id !== heroSlides[0]!.id).slice(0, 4);
  const used = new Set([...usedAbove, ...trendingGrid.map((a) => a.id)]);
  const mostRead = published.filter((a) => !used.has(a.id)).slice(0, 4);
  const featured = published.filter((a) => a.featured && !used.has(a.id) && !mostRead.some((m) => m.id === a.id));

  return (
    <SiteLayout>
      <HeroCarousel slides={heroSlides} />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {secondary.map((a) => (
            <article
              key={a.id}
              className="group relative isolate overflow-hidden rounded-2xl bg-ink shadow-lift"
            >
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[340px]"
              />

              {/* top row */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-black/70 to-transparent p-5">
                <span className="font-display text-lg tracking-tight text-white">PRESSROOM</span>
                <span className="text-xs font-medium text-white/85">{formatDate(a.publishedAt)}</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-16 md:p-6 md:pt-20">
                <div className="min-w-0 flex-1">
                  <div className="mb-2">
                    <CategoryTag name={a.category} />
                  </div>
                  <h3 className="text-xl leading-tight text-white md:text-2xl">
                    <Link href={`/article/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 max-w-md text-sm text-white/80">{a.excerpt}</p>
                </div>
                <Link href={`/article/${a.slug}`} className="shrink-0">
                  <span className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary hover:border-primary hover:text-primary-foreground">
                    Learn more
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Trending + tabs */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          title="Trending News"
          action={
            <div className="hidden gap-2 md:flex">
              {["All", ...categories.slice(0, 4).map((c) => c.name)].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                    tab === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        />
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {trendingGrid.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
            {trendingGrid.length === 0 && (
              <p className="text-sm text-muted-foreground">No stories in this section yet.</p>
            )}
          </div>
          <aside className="space-y-8">
            <div className="card-press p-5">
              <p className="mb-4 flex items-center gap-2 text-primary kicker">
                <Flame className="size-3.5" /> Most read
              </p>
              <div className="space-y-4">
                {mostRead.map((a) => (
                  <ArticleRow key={a.id} article={a} />
                ))}
              </div>
            </div>
            <div className="card-press p-5">
              <p className="mb-4 flex items-center gap-2 text-primary kicker">
                <TrendingUp className="size-3.5" /> Sections
              </p>
              <ul className="space-y-2 text-sm">
                {categories.map((c) => (
                  <li key={c.id} className="flex items-center justify-between border-b pb-2">
                    <Link href={`/category/${c.slug}`} className="font-semibold hover:text-primary">
                      {c.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{c.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Newsletter compact />
          </aside>
        </div>
      </section>

      {featured.length > 0 && (
      <section className="border-y border-border bg-secondary/40 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Featured" />
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Commission CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="card-press grid items-center gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <p className="text-primary kicker">For brands and founders</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Commission our writers.</h2>
            <p className="mt-3 max-w-xl font-serif text-muted-foreground">
              Brief us once and get newsroom-grade writing: researched, fact-checked, edited and delivered
              on a deadline you set. Track every stage from your dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/order">
                <Button className="rounded-sm font-semibold uppercase">See pricing</Button>
              </Link>
              <Link href="/writer">
                <Button variant="outline" className="rounded-sm font-semibold uppercase">
                  Write for us
                </Button>
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-6">
            {[
              ["240+", "Commissions delivered"],
              ["4.9/5", "Client rating"],
              ["48h", "Fastest turnaround"],
              ["31", "Vetted writers"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl text-primary">{n}</dt>
                <dd className="text-xs text-muted-foreground kicker">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Newsletter />
    </SiteLayout>
  );
}

function HeroCarousel({ slides }: { slides: Article[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    const timer = window.setInterval(() => api.scrollNext(), 7000);
    return () => {
      api.off("select", onSelect);
      window.clearInterval(timer);
    };
  }, [api]);

  return (
    <section>
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <div className="overflow-hidden">
          <CarouselContent className="-ml-0">
            {slides.map((article) => (
              <CarouselItem key={article.id} className="pl-0">
                <HeroSlide article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((article, i) => (
            <button
              key={article.id}
              type="button"
              aria-label={`Go to story ${i + 1}`}
              aria-current={index === i}
              className={`h-2.5 rounded-full transition-all ${
                index === i ? "w-8 bg-primary" : "w-2.5 bg-foreground/25 hover:bg-foreground/45"
              }`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}

function HeroSlide({ article }: { article: Article }) {
  return (
    <div className="relative">
      <img
        src={article.image}
        alt={article.title}
        width={1600}
        height={1000}
        className="h-[58vh] min-h-[380px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-4 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <CategoryTag name={article.category} />
              <span className="text-xs text-white/80">{formatDate(article.publishedAt)}</span>
            </div>
            <h1 className="text-3xl text-white sm:text-4xl md:text-5xl">
              <Link href={`/article/${article.slug}`}>{article.title}</Link>
            </h1>
            <p className="max-w-2xl font-serif text-white/80">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-white/75">
              <span>By {authorById(article.authorId).name}</span>
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" /> {article.views.toLocaleString()}
              </span>
              <span>{readingTime(article.content)} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
