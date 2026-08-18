import type { Metadata } from "next";

import { SearchPage } from "@/components/pages/SearchPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Search the Archive — ${brand.name}`,
  description: `Full-text search across ${brand.name} reporting, filtered by section, author and date.`,
  openGraph: {
    title: `Search the ${brand.name} Archive`,
    description: "Find any story by keyword, section, author or date.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <SearchPage />;
}
