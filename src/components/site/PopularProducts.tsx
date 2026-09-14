"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "./ProductCard";
import { useI18n } from "./LanguageProvider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { popularProducts } from "@/lib/products";

export function PopularProducts() {
  const { t } = useI18n();
  const items = popularProducts();

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl">{t.home.popularProducts}</h2>
        <Link
          href="/shop"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary"
        >
          {t.home.viewAllProducts} <ArrowRight className="size-4" />
        </Link>
      </div>
      <Carousel opts={{ align: "start", loop: false }} className="relative">
        <CarouselContent className="-ml-4">
          {items.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-[78%] sm:basis-[46%] md:basis-[32%] lg:basis-[20%] xl:basis-[20%]"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 size-9 border-border bg-background shadow-md disabled:hidden" />
        <CarouselNext className="right-0 size-9 border-border bg-background shadow-md disabled:hidden" />
      </Carousel>
    </section>
  );
}
