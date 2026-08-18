import Link from "next/link";
import { Clock, Eye, MessageSquare } from "lucide-react";

import { authorById, formatDate, readingTime, type Article } from "@/lib/mock-data";

export function CategoryTag({ name }: { name: string }) {
  return (
    <span className="bg-primary px-2 py-1 text-primary-foreground kicker">{name}</span>
  );
}

export function ArticleCard({ article, size = "md" }: { article: Article; size?: "sm" | "md" }) {
  const author = authorById(article.authorId);
  return (
    <article className="card-press card-press-hover overflow-hidden">
      <Link href={`/article/${article.slug}`} className="block">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width={1200}
          height={800}
          className={size === "sm" ? "h-40 w-full object-cover" : "h-52 w-full object-cover"}
        />
      </Link>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-3">
          <CategoryTag name={article.category} />
          <span className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className={size === "sm" ? "text-base" : "text-lg"}>
          <Link href={`/article/${article.slug}`} className="transition-colors hover:text-primary">
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-2 font-serif text-sm text-muted-foreground">{article.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
          <Link href={`/author/${author.id}`} className="font-semibold">
            {author.name}
          </Link>
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> {readingTime(article.content)} min
          </span>
          <span className="flex items-center gap-1">
            <Eye className="size-3" /> {article.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3" /> {article.comments}
          </span>
        </div>
      </div>
    </article>
  );
}

export function ArticleRow({ article }: { article: Article }) {
  return (
    <article className="flex gap-4 border-b border-border pb-4 last:border-0">
      <Link href={`/article/${article.slug}`} className="shrink-0">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width={160}
          height={112}
          className="h-20 w-28 object-cover"
        />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-primary kicker">{article.category}</span>
          <span className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="text-sm leading-snug">
          <Link href={`/article/${article.slug}`} className="transition-colors hover:text-primary">
            {article.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
