import type { Metadata } from "next";

import { AdminPage } from "@/components/pages/AdminPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Newsroom Dashboard — ${brand.name}`,
  description:
    "Editorial control room: write and schedule articles, moderate submissions, manage sections and roles.",
  robots: { index: false },
  openGraph: {
    title: `Newsroom Dashboard — ${brand.name}`,
    description: "Editing, scheduling, moderation and analytics.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <AdminPage />;
}
