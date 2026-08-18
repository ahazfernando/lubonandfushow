import type { Metadata } from "next";

import { WriterPage } from "@/components/pages/WriterPage";
import { brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Write for Pressroom — Contributor Dashboard",
  description:
    "Apply to write for Pressroom, draft in Markdown with live preview, submit for editorial review and read editor feedback.",
  openGraph: {
    title: "Write for Pressroom",
    description: "Pitch, draft and submit stories to the Pressroom editorial desk.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <WriterPage />;
}
