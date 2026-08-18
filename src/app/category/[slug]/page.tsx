import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryPage } from "@/components/pages/CategoryPage";
import { brandOpenGraphImages } from "@/lib/brand";
import { byCategory, categories } from "@/lib/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { cat } = byCategory(slug);
  if (!cat) {
    return { title: "Section — Pressroom", robots: { index: false } };
  }
  const title = `${cat.name} News & Features — Pressroom`;
  const description = `Latest ${cat.name.toLowerCase()} reporting, analysis and features from the Pressroom newsroom.`;
  return {
    title,
    description,
    openGraph: { title, description, images: brandOpenGraphImages },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { cat, items } = byCategory(slug);
  if (!cat) notFound();
  return <CategoryPage cat={cat} items={items} />;
}
