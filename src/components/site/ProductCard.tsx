"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "./CartProvider";
import { useI18n } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { defaultVariant, formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useI18n();
  const { addItem } = useCart();

  function addToCart() {
    addItem(product.id, 1, defaultVariant(product));
    toast.success(t.shop.addedToCart);
  }

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/shop/${product.slug}`} className="flex h-full flex-col">
        <div className="aspect-square bg-muted/50 p-5">
          <img
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 items-end p-4 pr-14">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold leading-snug">{product.name}</h3>
            <p className="mt-1 text-sm font-semibold">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute right-4 bottom-4 size-10 rounded-lg"
        aria-label={t.shop.addToCart}
        onClick={addToCart}
      >
        <ShoppingCart className="size-4" />
      </Button>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
