import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/pages/ProductPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";
import { productBySlug, products } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) {
    return { title: `Product unavailable — ${brand.name}`, robots: { index: false } };
  }
  return {
    title: `${product.name} — ${brand.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: brandOpenGraphImages,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  return <ProductPage key={product.slug} product={product} />;
}
