"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/site/ProductCard";
import { useI18n } from "@/components/site/LanguageProvider";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  productCategories,
  products,
  type Product,
  type ProductCategory,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

type PriceRangeId = "under100" | "100to500" | "500to1000" | "1000to2000" | "2000plus";

const priceRanges: { id: PriceRangeId; min: number; max: number }[] = [
  { id: "under100", min: 0, max: 99.99 },
  { id: "100to500", min: 100, max: 499.99 },
  { id: "500to1000", min: 500, max: 999.99 },
  { id: "1000to2000", min: 1000, max: 1999.99 },
  { id: "2000plus", min: 2000, max: Number.POSITIVE_INFINITY },
];

function toggleValue<T extends string>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function matchesPrice(product: Product, selected: PriceRangeId[]) {
  if (!selected.length) return true;
  return selected.some((id) => {
    const range = priceRanges.find((item) => item.id === id);
    if (!range) return false;
    return product.price >= range.min && product.price <= range.max;
  });
}

export function ShopPage() {
  const { t, msg } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [prices, setPrices] = useState<PriceRangeId[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const selectedCategories = useMemo(() => {
    const raw = searchParams.get("category");
    if (!raw) return [] as ProductCategory[];
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter((item): item is ProductCategory =>
        productCategories.includes(item as ProductCategory),
      );
  }, [searchParams]);

  function setCategories(next: ProductCategory[]) {
    const params = new URLSearchParams(searchParams.toString());
    if (!next.length) params.delete("category");
    else params.set("category", next.join(","));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function clearAll() {
    setQuery("");
    setSort("featured");
    setPrices([]);
    setInStockOnly(false);
    setPopularOnly(false);
    setCategories([]);
  }

  const hasActiveFilters =
    Boolean(query.trim()) ||
    selectedCategories.length > 0 ||
    prices.length > 0 ||
    inStockOnly ||
    popularOnly;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory =
        !selectedCategories.length || selectedCategories.includes(product.category);
      const matchesQuery =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle);
      const matchesStock = !inStockOnly || product.inStock;
      const matchesPopular = !popularOnly || product.popular;
      return (
        matchesCategory &&
        matchesQuery &&
        matchesStock &&
        matchesPopular &&
        matchesPrice(product, prices)
      );
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(b.popular) - Number(a.popular);
    });
  }, [inStockOnly, popularOnly, prices, query, selectedCategories, sort]);

  const priceLabels: Record<PriceRangeId, string> = {
    under100: t.shop.priceUnder100,
    "100to500": t.shop.price100to500,
    "500to1000": t.shop.price500to1000,
    "1000to2000": t.shop.price1000to2000,
    "2000plus": t.shop.price2000plus,
  };

  const filterPanel = (
    <aside className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{t.shop.filter}</h2>
        <button
          type="button"
          onClick={clearAll}
          disabled={!hasActiveFilters}
          className="text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-primary disabled:opacity-40"
        >
          {t.shop.clearAll}
        </button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "category", "availability"]}>
        <AccordionItem value="price" className="border-border">
          <AccordionTrigger className="py-3 text-xs font-semibold tracking-[0.14em] uppercase hover:no-underline">
            {t.shop.priceRange}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2.5">
              {priceRanges.map((range) => {
                const checked = prices.includes(range.id);
                return (
                  <li key={range.id}>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => setPrices((current) => toggleValue(current, range.id))}
                      />
                      <span className={cn(checked && "font-medium")}>{priceLabels[range.id]}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category" className="border-border">
          <AccordionTrigger className="py-3 text-xs font-semibold tracking-[0.14em] uppercase hover:no-underline">
            {t.shop.productCategory}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2.5">
              {productCategories.map((category) => {
                const checked = selectedCategories.includes(category);
                return (
                  <li key={category}>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() =>
                          setCategories(toggleValue(selectedCategories, category))
                        }
                      />
                      <span className={cn(checked && "font-medium")}>
                        {t.productCategories[category]}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability" className="border-b-0 border-border">
          <AccordionTrigger className="py-3 text-xs font-semibold tracking-[0.14em] uppercase hover:no-underline">
            {t.shop.availability}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2.5">
              <li>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <Checkbox
                    checked={inStockOnly}
                    onCheckedChange={(value) => setInStockOnly(value === true)}
                  />
                  <span className={cn(inStockOnly && "font-medium")}>{t.shop.inStock}</span>
                </label>
              </li>
              <li>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <Checkbox
                    checked={popularOnly}
                    onCheckedChange={(value) => setPopularOnly(value === true)}
                  />
                  <span className={cn(popularOnly && "font-medium")}>{t.shop.popularOnly}</span>
                </label>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );

  return (
    <SiteLayout>
      <div className="w-full border-b border-border bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <p className="text-primary kicker">{t.shop.kicker}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{t.shop.title}</h1>
          <p className="mt-3 max-w-2xl opacity-70">{t.shop.subtitle}</p>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="relative mb-8">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.shop.searchPlaceholder}
            aria-label={t.shop.search}
            className="h-12 rounded-xl border-border bg-card pl-11 shadow-sm"
          />
        </div>

        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold"
          >
            <SlidersHorizontal className="size-4" />
            {t.shop.filter}
          </button>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold tracking-wide text-primary uppercase"
            >
              {t.shop.clearAll}
            </button>
          ) : null}
        </div>

        {mobileFiltersOpen ? <div className="mb-6 lg:hidden">{filterPanel}</div> : null}

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden lg:block">{filterPanel}</div>

          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl">{t.shop.chooseProducts}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {msg(t.shop.showingCount, {
                    shown: filtered.length,
                    total: products.length,
                  })}
                </p>
              </div>
              <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
                <SelectTrigger className="rounded-xl sm:w-52" aria-label={t.shop.sort}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t.shop.sortFeatured}</SelectItem>
                  <SelectItem value="price-asc">{t.shop.sortPriceAsc}</SelectItem>
                  <SelectItem value="price-desc">{t.shop.sortPriceDesc}</SelectItem>
                  <SelectItem value="name">{t.shop.sortName}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length ? (
              <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                <p className="font-serif text-muted-foreground">{t.shop.empty}</p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-4 text-sm font-semibold text-primary"
                >
                  {t.shop.clearAll}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
