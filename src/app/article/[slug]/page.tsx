import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/pages/ArticlePage";
import { brandOpenGraphImages } from "@/lib/brand";
import { articleBySlug, published } from "@/lib/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return published.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) {
    return { title: "Story unavailable — Pressroom", robots: { index: false } };
  }
  return {
    title: `${article.metaTitle ?? article.title} — Pressroom`,
    description: article.metaDescription ?? article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: brandOpenGraphImages,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
