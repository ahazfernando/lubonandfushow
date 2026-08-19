import type { Metadata } from "next";

import { CouponsPage } from "@/components/pages/CouponsPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Coupons & Deals — ${brand.name}`,
  description: `Reader offers and coupon codes from ${brand.name} partners — dining, travel, shopping and more.`,
  openGraph: {
    title: `Coupons — ${brand.name}`,
    description: "Copy a code, redeem a deal. New coupons are uploaded from the newsroom.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <CouponsPage />;
}
