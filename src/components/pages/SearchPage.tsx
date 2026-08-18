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

export function SearchPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [author, setAuthor] = useState("all");
  const [period, setPeriod] = useState("all");

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
        period === "all" || (period === "7" ? days <= 7 : period === "30" ? days <= 30 : days <= 365);
      return matchesTerm && matchesCat && matchesAuthor && matchesPeriod;
    });
  }, [q, cat, author, period]);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-ink py-12 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl md:text-4xl">Search the archive</h1>
          <div className="relative mt-5 max-w-2xl">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Keywords, headlines, tags…"
              maxLength={120}
              className="h-12 rounded-sm bg-background pl-9 text-foreground"
            />
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="rounded-sm">
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sections</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={author} onValueChange={setAuthor}>
            <SelectTrigger className="rounded-sm">
              <SelectValue placeholder="Author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All authors</SelectItem>
              {authors.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="rounded-sm">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any time</SelectItem>
              <SelectItem value="7">Past week</SelectItem>
              <SelectItem value="30">Past month</SelectItem>
              <SelectItem value="365">Past year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SectionHeading title={`${results.length} result${results.length === 1 ? "" : "s"}`} />
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
        {results.length === 0 && (
          <p className="font-serif text-muted-foreground">
            No stories matched. Try a broader keyword or clear the filters.
          </p>
        )}
      </section>
    </SiteLayout>
  );
}
