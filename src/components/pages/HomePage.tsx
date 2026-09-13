"use client";

import Link from "next/link";
import {
  ArrowRight,
  Armchair,
  Briefcase,
  Car,
  Clapperboard,
  Ellipsis,
  HardHat,
  Home,
  Lightbulb,
  MapPin,
  Plane,
  Shirt,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { CouponCard } from "@/components/site/CouponCard";
import { CouponCardSkeleton } from "@/components/site/PageSkeleton";
import { PopularProducts } from "@/components/site/PopularProducts";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/site/LanguageProvider";
import { fetchCoupons } from "@/lib/coupon-api";
import {
  categoryIcons,
  featuredStories,
  heroImage,
  shopBanners,
  trendingNow,
  type CategoryIconId,
} from "@/lib/home-showcase";
import { useQuery } from "@tanstack/react-query";

const iconMap: Record<CategoryIconId, LucideIcon> = {
  property: Home,
  construction: HardHat,
  trades: Wrench,
  entrepreneurship: Lightbulb,
  business: Briefcase,
  interiors: Armchair,
  food: UtensilsCrossed,
  fashion: Shirt,
  entertainment: Clapperboard,
  travel: Plane,
  cars: Car,
  shop: ShoppingBag,
};

export function HomePage() {
  const { t, categoryName, locale } = useI18n();
  const caseClass = locale === "si" ? "" : "uppercase";
  const { data: coupons = [], isLoading: couponsLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => fetchCoupons(false),
  });
  const featuredCoupons = coupons.filter((c) => c.featured).slice(0, 3);

  return (
    <SiteLayout>
      <section className="w-full">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="relative isolate min-h-[420px] overflow-hidden md:min-h-[500px] lg:min-h-[560px]">
            <img
              src={heroImage}
              alt=""
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-center px-5 py-10 md:min-h-[500px] md:px-10 lg:min-h-[560px] lg:px-12 xl:px-16">
              <p className="text-[11px] font-semibold tracking-[0.32em] text-white/90 uppercase">
                {t.home.heroKicker}
              </p>
              <h1 className="mt-3 max-w-xl text-5xl leading-[0.9] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                {t.home.heroTitle}
                <br />
                {t.home.heroLive}{" "}
                <span className="text-primary">{t.home.heroBetter}</span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90 md:text-[15px]">
                {t.home.heroBody}
              </p>
              <Link href="#featured-stories" className="mt-7 inline-flex w-fit">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]">
                  {t.home.heroCta} <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
            <p className="hero-script pointer-events-none absolute right-[10%] bottom-20 z-10 hidden max-w-[240px] rotate-[-11deg] text-3xl text-white md:block lg:right-[12%] lg:text-[2.15rem]">
              {t.home.heroScript}
              <span className="absolute -bottom-1 left-2 right-6 h-[3px] rounded-full bg-primary/90" />
            </p>
            <p className="absolute bottom-4 left-5 z-10 flex items-center gap-1.5 text-xs font-medium text-white/85 md:left-auto md:right-5">
              <MapPin className="size-3.5" />
              {t.home.heroLocation}
            </p>
          </div>

          <aside className="flex flex-col bg-[#111] px-5 py-5 text-white lg:px-6 lg:py-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-[1.65rem] leading-none text-white">{t.home.trendingNow}</h2>
              <Link
                href="/search"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
              >
                {t.home.seeAll} <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <ol className="flex flex-1 flex-col justify-between gap-1">
              {trendingNow.map((item, i) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl py-1.5 transition-colors hover:bg-white/5"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">
                      {item.title}
                    </span>
                    <img
                      src={item.image}
                      alt=""
                      width={56}
                      height={56}
                      className="size-12 shrink-0 rounded-lg object-cover"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <nav
        aria-label={t.home.sections}
        className="mx-auto max-w-[1400px] px-4 py-8 md:py-10"
      >
        <ul className="flex gap-5 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 xl:justify-between xl:overflow-visible [&::-webkit-scrollbar]:hidden">
          {categoryIcons.map((item) => {
            const Icon = iconMap[item.id];
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={item.href}
                  className="group flex w-[72px] flex-col items-center gap-2 text-center sm:w-[78px]"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-foreground/80 transition-colors group-hover:bg-primary/10 group-hover:text-primary sm:size-16">
                    <Icon className="size-6 sm:size-7" strokeWidth={1.6} />
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                    {categoryName(item.name)}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="shrink-0">
            <Link
              href="/search"
              className="group flex w-[72px] flex-col items-center gap-2 text-center sm:w-[78px]"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-foreground/80 transition-colors group-hover:bg-primary/10 group-hover:text-primary sm:size-16">
                <Ellipsis className="size-6 sm:size-7" strokeWidth={1.6} />
              </span>
              <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                {t.home.more}
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      <section id="featured-stories" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pb-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl">{t.home.featuredStories}</h2>
          <Link
            href="/search"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary"
          >
            {t.home.seeAllStories} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {featuredStories.map((story) => (
            <article key={story.title} className="group">
              <Link href={story.href} className="block">
                <img
                  src={story.image}
                  alt=""
                  width={640}
                  height={420}
                  className="aspect-[5/4] w-full rounded-xl object-cover"
                />
                <p className="mt-3 text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
                  {categoryName(story.category)}
                </p>
                <h3 className="mt-1 text-[15px] leading-snug transition-colors group-hover:text-primary">
                  {story.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{story.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {shopBanners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="group relative isolate min-h-[230px] overflow-hidden rounded-2xl"
            >
              <img
                src={banner.image}
                alt=""
                width={1200}
                height={800}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
              <div className="relative z-10 flex h-full min-h-[230px] flex-col justify-center p-6 md:p-7">
                <h3 className="max-w-[12ch] text-3xl leading-[0.95] text-white">
                  {t.home[banner.titleKey]}
                </h3>
                <p className="mt-2 max-w-[18ch] text-sm text-white/80">
                  {t.home[banner.bodyKey]}
                </p>
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground">
                  {t.home[banner.ctaKey]} <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PopularProducts />

      {(couponsLoading || featuredCoupons.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <SectionHeading
            title={t.home.couponsTitle}
            action={
              <Link href="/coupons" className="text-sm font-semibold text-primary">
                {t.home.viewAllCoupons} →
              </Link>
            }
          />
          <p className="-mt-4 mb-6 text-primary kicker">{t.home.couponsKicker}</p>
          <div className="grid items-start gap-6 md:grid-cols-3">
            {couponsLoading
              ? Array.from({ length: 3 }).map((_, i) => <CouponCardSkeleton key={i} />)
              : featuredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="card-press grid items-center gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <p className="text-primary kicker">{t.home.ctaKicker}</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{t.home.ctaTitle}</h2>
            <p className="mt-3 max-w-xl font-serif text-muted-foreground">{t.home.ctaBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/order">
                <Button className={`rounded-sm font-semibold ${caseClass}`}>
                  {t.home.seePricing}
                </Button>
              </Link>
              <Link href="/writer">
                <Button variant="outline" className={`rounded-sm font-semibold ${caseClass}`}>
                  {t.home.writeForUs}
                </Button>
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-6">
            {[
              ["240+", t.home.statCommissions],
              ["4.9/5", t.home.statRating],
              ["48h", t.home.statTurnaround],
              ["31", t.home.statWriters],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl text-primary">{n}</dt>
                <dd className="text-xs text-muted-foreground kicker">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SiteLayout>
  );
}
