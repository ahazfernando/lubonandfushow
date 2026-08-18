import type { Metadata } from "next";

import { AuthPage } from "@/components/pages/AuthPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Sign in or Join ${brand.name}`,
  description: `Sign in to ${brand.name} to save stories, write for the newsroom or commission an article.`,
  openGraph: {
    title: `Sign in or Join ${brand.name}`,
    description: "Reader, writer or client — pick how you want to use the site.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <AuthPage />;
}
