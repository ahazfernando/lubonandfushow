import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopPage } from "@/components/pages/ShopPage";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Shop - ${brand.name}`,
  description: `Furniture and tools from the ${brand.name} shop.`,
  openGraph: {
    title: `Shop - ${brand.name}`,
    description: "Browse popular products and filter by category.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton variant="coupons" />}>
      <ShopPage />
    </Suspense>
  );
}
