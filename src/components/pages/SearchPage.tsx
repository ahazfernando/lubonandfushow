"use client";

import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { ArticleCard } from "@/components/site/ArticleCard";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authors, categories, published } from "@/lib/mock-data";
import { useI18n } from "@/components/site/LanguageProvider";

export function SearchPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [author, setAuthor] = useState("all");
  const [period, setPeriod] = useState("all");
  const { t, msg, categoryName } = useI18n();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return published.filter((a) => {
      const matchesTerm =
        !term ||
        a.title.toLowerCase().includes(term) ||
        a.excerpt.toLowerCase().includes(term) ||
        a.tags.some((t) => t.includes(term));
      const matchesCat = cat === "all" || a.category === cat;
      const matchesAuthor = author === "all" || a.authorId === author;
      const days = (Date.now() - new Date(a.publishedAt).getTime()) / 86_400_000;
      const matchesPeriod =
        period === "all" ||
        (period === "7" ? days <= 7 : period === "30" ? days <= 30 : days <= 365);
      return matchesTerm && matchesCat && matchesAuthor && matchesPeriod;
    });
  }, [q, cat, author, period]);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-background py-12 text-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl md:text-4xl">{t.search.title}</h1>
          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.search.placeholder}
                maxLength={120}
                className="h-12 rounded-sm pl-9"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[min(100%,38rem)] lg:shrink-0">
              <Select value={cat} onValueChange={setCat}>
                <SelectTrigger className="h-12 rounded-sm">
                  <SelectValue placeholder={t.search.section} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.search.allSections}</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {categoryName(c.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={author} onValueChange={setAuthor}>
                <SelectTrigger className="h-12 rounded-sm">
                  <SelectValue placeholder={t.search.author} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.search.allAuthors}</SelectItem>
                  {authors.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="h-12 rounded-sm">
                  <SelectValue placeholder={t.search.date} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.search.anyTime}</SelectItem>
                  <SelectItem value="7">{t.search.pastWeek}</SelectItem>
                  <SelectItem value="30">{t.search.pastMonth}</SelectItem>
                  <SelectItem value="365">{t.search.pastYear}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading
          title={msg(results.length === 1 ? t.search.results : t.search.resultsPlural, {
            n: results.length,
          })}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
        {results.length === 0 && (
          <p className="font-serif text-muted-foreground">{t.search.empty}</p>
        )}
      </section>
    </SiteLayout>
  );
}
