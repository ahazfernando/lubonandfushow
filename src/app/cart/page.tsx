import type { Metadata } from "next";

import { CartPage } from "@/components/pages/CartPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Cart — ${brand.name}`,
  description: `Review items in your ${brand.name} shopping cart.`,
  openGraph: {
    title: `Cart — ${brand.name}`,
    description: "Review your bag and place an order.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <CartPage />;
}
