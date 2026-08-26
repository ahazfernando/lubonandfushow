import type { Metadata } from "next";
import { Suspense } from "react";

import { SignUpPage } from "@/components/pages/SignUpPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Sign up — ${brand.name}`,
  description: `Create your ${brand.name} account to save stories, write for the newsroom, or commission an article.`,
  openGraph: {
    title: `Sign up — ${brand.name}`,
    description: "Create an account with email, Google, or GitHub.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SignUpPage />
    </Suspense>
  );
}
