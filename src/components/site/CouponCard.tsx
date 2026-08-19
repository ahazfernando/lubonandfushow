"use client";

import { Copy, Ticket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useI18n } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { couponIsExpired, type Coupon } from "@/lib/coupons";

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const { t, msg, formatDate, categoryName } = useI18n();
  const [copied, setCopied] = useState(false);
  const expired = couponIsExpired(coupon);
  const category = t.couponCategories[coupon.category] ?? categoryName(coupon.category);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      toast.success(t.coupons.copied);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error(t.coupons.copyFailed);
    }
  }

  return (
    <article
      className={`card-press overflow-hidden ${expired ? "opacity-60" : "card-press-hover"}`}
    >
      <div className="relative">
        {coupon.image ? (
          <img
            src={coupon.image}
            alt=""
            className="h-44 w-full object-cover"
            width={800}
            height={352}
          />
        ) : (
          <div className="grid h-44 place-items-center bg-secondary">
            <Ticket className="size-10 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="bg-primary px-2 py-1 text-primary-foreground kicker">{category}</span>
          {coupon.featured && !expired && (
            <span className="bg-ink px-2 py-1 text-ink-foreground kicker">
              {t.coupons.featured}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
          <p className="font-display text-3xl tracking-tight text-white">{coupon.discount}</p>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {coupon.merchant}
          </p>
          <h3 className="mt-1 text-lg leading-snug">{coupon.title}</h3>
          <p className="mt-1.5 line-clamp-2 font-serif text-sm text-muted-foreground">
            {coupon.description}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-sm border border-dashed border-border bg-secondary/50 p-2">
          <code className="flex-1 truncate px-1 font-semibold tracking-[0.18em]">
            {coupon.code}
          </code>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-sm"
            disabled={expired}
            onClick={copyCode}
          >
            <Copy className="size-3.5" /> {copied ? t.coupons.copied : t.coupons.copyCode}
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>
            {expired
              ? t.coupons.expired
              : msg(t.coupons.expires, { date: formatDate(coupon.expiresAt) })}
          </span>
          {coupon.url ? (
            <a
              href={coupon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary"
            >
              {t.coupons.redeem} →
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
