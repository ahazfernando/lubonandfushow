import type { Metadata } from "next";

import { CheckoutPage } from "@/components/pages/CheckoutPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Checkout — ${brand.name}`,
  description: `Complete your ${brand.name} order.`,
  openGraph: {
    title: `Checkout — ${brand.name}`,
    description: "Enter delivery and payment details to complete your order.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <CheckoutPage />;
}
