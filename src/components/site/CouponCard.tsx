"use client";

import { Check, Copy, Scissors, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useI18n } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { couponIsExpired, type Coupon } from "@/lib/coupons";

function barcodeWidths(code: string) {
  const seed = code.length ? code : "COUPON";
  const widths: number[] = [3, 1, 2];
  for (const ch of seed.repeat(4).slice(0, 18)) {
    const n = ch.charCodeAt(0);
    widths.push(1 + (n % 3), 1 + ((n >> 2) % 2), 2 + (n % 2));
  }
  widths.push(2, 1, 3);
  return widths;
}

function CouponBarcode({ code }: { code: string }) {
  const widths = useMemo(() => barcodeWidths(code), [code]);
  return (
    <div className="coupon-barcode px-1 text-foreground" aria-hidden>
      {widths.map((width, i) => (
        <span
          key={`${width}-${i}`}
          className="bg-current"
          style={{
            width,
            opacity: i % 7 === 0 ? 0.35 : 0.82,
            transform: i % 5 === 0 ? "scaleY(0.86)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

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
      className={`coupon-ticket flex flex-col ${expired ? "opacity-60" : "coupon-ticket-hover"}`}
    >
      <div className="relative shrink-0 overflow-hidden rounded-t-[1.05rem]">
        {coupon.image ? (
          <img
            src={coupon.image}
            alt=""
            className="aspect-[16/10] h-auto w-full object-cover"
            width={800}
            height={500}
          />
        ) : (
          <div className="grid aspect-[16/10] place-items-center bg-secondary">
            <Ticket className="size-10 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="bg-primary px-2 py-1 text-primary-foreground kicker">{category}</span>
          {coupon.featured && !expired && (
            <span className="bg-ink px-2 py-1 text-ink-foreground kicker">{t.coupons.featured}</span>
          )}
        </div>
        {expired && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="-rotate-12 border-2 border-white/90 px-3 py-1 text-lg font-display tracking-widest text-white">
              {t.coupons.expired}
            </span>
          </span>
        )}
      </div>

      <div className="px-5 pb-3 pt-4">
        <p className="font-display text-[1.85rem] leading-none tracking-tight text-primary">
          {coupon.discount}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {coupon.merchant}
        </p>
        <h3 className="mt-1 line-clamp-2 text-lg leading-snug">{coupon.title}</h3>
        <p className="mt-1.5 line-clamp-2 font-serif text-sm text-muted-foreground">
          {coupon.description}
        </p>
      </div>

      <div className="relative h-5 shrink-0">
        <span className="coupon-notch -left-px -translate-x-1/2 -translate-y-1/2 border-r border-border" />
        <span className="coupon-notch -right-px -translate-y-1/2 translate-x-1/2 border-l border-border" />
        <div className="absolute inset-x-7 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <Scissors className="size-3.5 shrink-0 -scale-x-100 text-muted-foreground" aria-hidden />
          <span className="h-px flex-1 border-t-2 border-dashed border-border" />
        </div>
      </div>

      <div className="coupon-stub mt-0 shrink-0 space-y-3 px-5 pb-4 pt-3">
        <CouponBarcode code={coupon.code} />
        <div>
          <p className="mb-1.5 text-muted-foreground kicker">{t.coupons.promoCode}</p>
          <div className="flex items-center gap-2 rounded-md border border-dashed border-primary/40 bg-card px-2.5 py-2">
            <code className="flex-1 truncate text-base font-bold tracking-[0.22em] text-foreground">
              {coupon.code}
            </code>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-3"
              disabled={expired}
              onClick={copyCode}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? t.coupons.copied : t.coupons.copyCode}
            </Button>
          </div>
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
