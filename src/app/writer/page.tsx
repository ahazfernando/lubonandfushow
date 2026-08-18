import type { Metadata } from "next";

import { WriterPage } from "@/components/pages/WriterPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Write for ${brand.name} — Contributor Dashboard`,
  description:
    `Apply to write for ${brand.name}, draft in Markdown with live preview, submit for editorial review and read editor feedback.`,
  openGraph: {
    title: `Write for ${brand.name}`,
    description: `Pitch, draft and submit stories to the ${brand.name} editorial desk.`,
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <WriterPage />;
}
