"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { CouponCard } from "@/components/site/CouponCard";
import { useI18n } from "@/components/site/LanguageProvider";
import { CouponCardSkeleton } from "@/components/site/PageSkeleton";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import { fetchCoupons } from "@/lib/coupon-api";
import { couponCategories } from "@/lib/coupons";

export function CouponsPage() {
  const { t } = useI18n();
  const [tab, setTab] = useState("All");
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => fetchCoupons(false),
  });

  const filtered = useMemo(
    () => (tab === "All" ? coupons : coupons.filter((c) => c.category === tab)),
    [coupons, tab],
  );

  return (
    <SiteLayout>
      <div className="relative isolate w-full overflow-hidden border-b border-border">
        <img
          src="/images/752b89637641ef17c9b023b064ecef2b.jpg_2K_20260914110122.jpeg"
          alt=""
          width={1920}
          height={640}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative mx-auto flex min-h-[220px] max-w-[1400px] items-end px-4 py-14 text-white sm:min-h-[260px] md:min-h-[300px] md:py-16">
          <div>
            <p className="text-primary kicker">{t.coupons.kicker}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {t.coupons.title}
            </h1>
            <p className="mt-3 max-w-2xl text-white/90 drop-shadow-sm">{t.coupons.subtitle}</p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-14">
        <SectionHeading
          title={t.coupons.latest}
          action={
            <div className="hidden flex-wrap gap-2 md:flex">
              {["All", ...couponCategories].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                    tab === item
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item === "All" ? t.common.all : (t.couponCategories[item] ?? item)}
                </button>
              ))}
            </div>
          }
        />

        {isLoading ? (
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CouponCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        ) : (
          <p className="font-serif text-muted-foreground">{t.coupons.empty}</p>
        )}
      </section>
    </SiteLayout>
  );
}
