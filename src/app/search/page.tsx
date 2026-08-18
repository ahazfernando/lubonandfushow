import type { Metadata } from "next";

import { SearchPage } from "@/components/pages/SearchPage";
import { brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Search the Archive — Pressroom",
  description: "Full-text search across Pressroom reporting, filtered by section, author and date.",
  openGraph: {
    title: "Search the Pressroom Archive",
    description: "Find any story by keyword, section, author or date.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <SearchPage />;
}
