import type { Metadata } from "next";

import { AdminPage } from "@/components/pages/AdminPage";
import { brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Newsroom Dashboard — Pressroom Admin",
  description:
    "Editorial control room: write and schedule articles, moderate submissions, manage sections and roles.",
  robots: { index: false },
  openGraph: {
    title: "Newsroom Dashboard — Pressroom",
    description: "Editing, scheduling, moderation and analytics.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <AdminPage />;
}
