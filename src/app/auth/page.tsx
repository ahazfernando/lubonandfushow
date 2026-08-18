import type { Metadata } from "next";

import { AuthPage } from "@/components/pages/AuthPage";
import { brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Sign in or Join Pressroom",
  description: "Sign in to Pressroom to save stories, write for the newsroom or commission an article.",
  openGraph: {
    title: "Sign in or Join Pressroom",
    description: "Reader, writer or client — pick how you want to use Pressroom.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <AuthPage />;
}
