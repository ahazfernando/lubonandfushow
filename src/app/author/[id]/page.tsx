import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorPage } from "@/components/pages/AuthorPage";
import { brandOpenGraphImages } from "@/lib/brand";
import { authors, published } from "@/lib/mock-data";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return authors.map((author) => ({ id: author.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = authors.find((item) => item.id === id);
  if (!author) {
    return { title: "Author — Pressroom", robots: { index: false } };
  }
  const title = `${author.name} — Pressroom`;
  return {
    title,
    description: author.bio,
    openGraph: {
      title,
      description: author.bio,
      type: "profile",
      images: brandOpenGraphImages,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const author = authors.find((item) => item.id === id);
  if (!author) notFound();
  const items = published.filter((article) => article.authorId === author.id);
  return <AuthorPage author={author} items={items} />;
}
