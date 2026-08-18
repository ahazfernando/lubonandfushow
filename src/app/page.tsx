import type { Metadata } from "next";

import { HomePage } from "@/components/pages/HomePage";
import { brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pressroom — Independent News, Features and Commissioned Writing",
  description:
    "Investigations, features and market analysis from the Pressroom newsroom — plus commissioned articles written to order.",
  openGraph: {
    title: "Pressroom — Independent Daily",
    description: "Investigations, features and market analysis you can read or commission.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <HomePage />;
}
