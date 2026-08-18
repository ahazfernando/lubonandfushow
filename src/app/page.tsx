import type { Metadata } from "next";

import { HomePage } from "@/components/pages/HomePage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} — Independent News, Features and Commissioned Writing`,
  description:
    `Investigations, features and market analysis from ${brand.name} — plus commissioned articles written to order.`,
  openGraph: {
    title: `${brand.name} — Independent Daily`,
    description: "Investigations, features and market analysis you can read or commission.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <HomePage />;
}
