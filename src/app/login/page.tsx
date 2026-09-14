import type { Metadata } from "next";
import { Suspense } from "react";

import { SignInPage } from "@/components/pages/SignInPage";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Sign in - ${brand.name}`,
  description: `Sign in to ${brand.name} to save stories, write for the newsroom, or commission an article.`,
  openGraph: {
    title: `Sign in - ${brand.name}`,
    description: "Sign in with email or Google.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton variant="auth" />}>
      <SignInPage />
    </Suspense>
  );
}
