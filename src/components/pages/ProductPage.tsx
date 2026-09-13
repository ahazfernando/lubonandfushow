"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/components/site/CartProvider";
import { useI18n } from "@/components/site/LanguageProvider";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StarRating } from "@/components/site/StarRating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { shopFaqs, shopReviews, type ProductReview } from "@/lib/product-reviews";
import { formatPrice, relatedProducts, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type Tab = "details" | "reviews" | "faqs";

export function ProductPage({ product }: { product: Product }) {
  const { t } = useI18n();
  const { addItem } = useCart();
  const related = relatedProducts(product);
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);
  const [color, setColor] = useState(product.colors[0]?.id);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>("reviews");
  const [reviewLimit, setReviewLimit] = useState(3);
  const [reviews, setReviews] = useState<ProductReview[]>(shopReviews);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const visibleReviews = reviews.slice(0, reviewLimit);
  const average = useMemo(() => {
    if (!reviews.length) return product.rating;
    return reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
  }, [product.rating, reviews]);

  function addToCart() {
    addItem(product.id, quantity, { color, size });
    toast.success(t.shop.addedToCart);
  }

  function submitReview() {
    if (!reviewName.trim() || !reviewBody.trim()) return;
    setReviews((current) => [
      {
        id: `rev-${Date.now()}`,
        name: reviewName.trim(),
        rating: reviewRating,
        body: reviewBody.trim(),
      },
      ...current,
    ]);
    setReviewName("");
    setReviewBody("");
    setReviewRating(5);
    setReviewOpen(false);
    toast.success(t.shop.reviewThanks);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "details", label: t.shop.productDetails },
    { id: "reviews", label: t.shop.ratingsReviews },
    { id: "faqs", label: t.shop.faqs },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            {t.nav.home}
          </Link>
          <span className="px-1.5">/</span>
          <Link href="/shop" className="hover:text-foreground">
            {t.shop.breadcrumbShop}
          </Link>
          <span className="px-1.5">/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">
            {t.productCategories[product.category]}
          </Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="flex gap-3 sm:gap-4">
            <div className="flex w-[72px] shrink-0 flex-col gap-3 sm:w-[88px]">
              {product.gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={cn(
                    "aspect-square overflow-hidden rounded-xl border bg-muted/40",
                    activeImage === src ? "border-foreground" : "border-transparent",
                  )}
                >
                  <img src={src} alt="" className="size-full object-contain p-1" />
                </button>
              ))}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-muted/40">
              <img
                src={activeImage}
                alt={product.name}
                width={900}
                height={1100}
                className="aspect-[4/5] w-full object-contain p-6 sm:aspect-square"
              />
            </div>
          </div>

          <div className="lg:pt-2">
            <h1 className="text-3xl leading-[1.1] md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={average} />
              <span className="text-sm text-muted-foreground">
                {average.toFixed(1)}/5
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
              {product.compareAtPrice ? (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              ) : null}
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.colors.length > 0 ? (
              <div className="mt-6">
                <p className="text-sm font-medium">{t.shop.selectColor}</p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((swatch) => (
                    <button
                      key={swatch.id}
                      type="button"
                      aria-label={swatch.name}
                      onClick={() => setColor(swatch.id)}
                      className={cn(
                        "size-7 rounded-full border-2",
                        color === swatch.id ? "border-foreground" : "border-transparent",
                      )}
                      style={{ backgroundColor: swatch.hex }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {product.sizes.length > 0 ? (
              <div className="mt-5">
                <p className="text-sm font-medium">{t.shop.chooseSize}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSize(option)}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-sm",
                        size === option
                          ? "bg-foreground text-background"
                          : "bg-muted text-foreground hover:bg-muted/80",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-4 text-lg">
                <button
                  type="button"
                  aria-label={t.shop.decreaseQty}
                  onClick={() => setQuantity((n) => Math.max(1, n - 1))}
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-4 text-center text-base font-medium">{quantity}</span>
                <button
                  type="button"
                  aria-label={t.shop.increaseQty}
                  onClick={() => setQuantity((n) => n + 1)}
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
                onClick={addToCart}
                disabled={!product.inStock}
              >
                {t.shop.addToCart}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14 border-b border-border">
          <div className="flex justify-center gap-8 text-sm">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "border-b-2 pb-3 font-medium",
                  tab === item.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {tab === "details" ? (
            <div className="mx-auto max-w-2xl">
              <p className="font-serif leading-relaxed text-muted-foreground">{product.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {product.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === "reviews" ? (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {t.shop.allReviews}{" "}
                  <span className="font-normal text-muted-foreground">({reviews.length})</span>
                </h2>
                <Button
                  className="rounded-full bg-foreground px-5 text-background hover:bg-foreground/90"
                  onClick={() => setReviewOpen(true)}
                >
                  {t.shop.writeReview}
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {visibleReviews.map((review) => (
                  <article key={review.id} className="rounded-2xl border border-border p-5">
                    <StarRating rating={review.rating} size="sm" />
                    <h3 className="mt-3 font-semibold">{review.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      “{review.body}”
                    </p>
                  </article>
                ))}
              </div>
              {reviewLimit < reviews.length ? (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setReviewLimit((n) => n + 3)}
                  >
                    {t.shop.loadMoreReviews}
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}

          {tab === "faqs" ? (
            <div className="mx-auto max-w-2xl divide-y divide-border">
              {shopFaqs.map((faq) => (
                <details key={faq.question} className="py-4">
                  <summary className="cursor-pointer font-medium">{faq.question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          ) : null}
        </div>

        {related.length > 0 ? (
          <section className="border-t border-border py-12">
            <h2 className="mb-8 text-center text-2xl">{t.shop.related}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.id} href={`/shop/${item.slug}`} className="group">
                  <div className="overflow-hidden rounded-xl bg-muted/40">
                    <img
                      src={item.image}
                      alt=""
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t.productCategories[item.category]}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {formatPrice(item.price)}
                    {item.compareAtPrice ? (
                      <span className="ml-2 text-muted-foreground line-through">
                        {formatPrice(item.compareAtPrice)}
                      </span>
                    ) : null}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.shop.writeReview}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder={t.shop.reviewName}
            />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setReviewRating(n)}
                  className="p-0.5"
                  aria-label={`${n}`}
                >
                  <Star
                    className={`size-5 ${
                      n <= reviewRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/35"
                    }`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
              placeholder={t.shop.reviewBody}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button onClick={submitReview}>{t.shop.submitReview}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
