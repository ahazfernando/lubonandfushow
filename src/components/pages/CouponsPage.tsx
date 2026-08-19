"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { CouponCard } from "@/components/site/CouponCard";
import { useI18n } from "@/components/site/LanguageProvider";
import { Newsletter } from "@/components/site/Newsletter";
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
      <div className="border-b border-border bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-primary kicker">{t.coupons.kicker}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{t.coupons.title}</h1>
          <p className="mt-3 max-w-2xl opacity-70">{t.coupons.subtitle}</p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          title={t.coupons.latest}
          action={
            <div className="hidden flex-wrap gap-2 md:flex">
              {["All", ...couponCategories].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${
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
          <p className="text-sm text-muted-foreground">{t.coupons.loading}</p>
        ) : filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        ) : (
          <p className="font-serif text-muted-foreground">{t.coupons.empty}</p>
        )}
      </section>

      <Newsletter />
    </SiteLayout>
  );
}
