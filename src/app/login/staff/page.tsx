import type { Metadata } from "next";
import { Suspense } from "react";

import { SignInPage } from "@/components/pages/SignInPage";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Staff sign in - ${brand.name}`,
  description: `Sign in to the ${brand.name} newsroom dashboard for editors and authors.`,
  openGraph: {
    title: `Staff sign in - ${brand.name}`,
    description: "Sign in to access the admin and author dashboards.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton variant="auth" />}>
      <SignInPage variant="staff" />
    </Suspense>
  );
}
