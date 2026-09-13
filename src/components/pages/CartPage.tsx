"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/site/CartProvider";
import { useI18n } from "@/components/site/LanguageProvider";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SHIPPING_PRICE, formatPrice } from "@/lib/products";

export function CartPage() {
  const { t, msg } = useI18n();
  const { items, count, subtotal, setQuantity, removeItem, ready } = useCart();

  if (!ready) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="h-48 animate-pulse rounded-2xl bg-muted" />
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h1 className="text-4xl">{t.cart.title}</h1>
        <p className="mt-2 text-muted-foreground">
          {count ? msg(count === 1 ? t.cart.item : t.cart.items, { n: count }) : t.cart.empty}
        </p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border px-6 py-20 text-center">
            <h2 className="text-2xl">{t.cart.empty}</h2>
            <p className="mt-2 text-muted-foreground">{t.cart.emptyBody}</p>
            <Link href="/shop" className="mt-6 inline-flex">
              <Button className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90">
                {t.cart.browseShop}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <ul className="space-y-4">
              {items.map((item) => {
                const color = item.product.colors.find((c) => c.id === item.color)?.name;
                const variant = [color, item.size].filter(Boolean).join(" / ");
                return (
                  <li
                    key={item.key}
                    className="flex gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4"
                  >
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="size-24 shrink-0 overflow-hidden rounded-xl bg-muted/50"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="size-full object-contain p-2"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-semibold hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                        {variant ? (
                          <p className="mt-1 text-sm text-muted-foreground">{variant}</p>
                        ) : (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {t.productCategories[item.product.category]}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-semibold">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-3 sm:mt-0">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            className="px-2.5 py-1.5"
                            aria-label={t.shop.decreaseQty}
                            onClick={() => setQuantity(item.key, item.quantity - 1)}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-2.5 py-1.5"
                            aria-label={t.shop.increaseQty}
                            onClick={() => setQuantity(item.key, item.quantity + 1)}
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="text-muted-foreground hover:text-primary"
                          aria-label={t.cart.remove}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl">{t.cart.summary}</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t.cart.subtotal}</dt>
                  <dd className="font-semibold">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t.cart.shipping}</dt>
                  <dd>{formatPrice(SHIPPING_PRICE)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-semibold">{t.cart.total}</dt>
                  <dd className="font-semibold">{formatPrice(subtotal + SHIPPING_PRICE)}</dd>
                </div>
              </dl>
              <Button
                className="mt-6 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <Link href="/checkout">{t.cart.checkout}</Link>
              </Button>
              <Link
                href="/shop"
                className="mt-3 block text-center text-sm font-semibold text-primary"
              >
                {t.cart.continueShopping}
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
