"use client";

import Link from "next/link";
import {
  Bookmark,
  Clock,
  Eye,
  Facebook,
  Linkedin,
  MessageSquare,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ArticleCard, ArticleRow, CategoryTag } from "@/components/site/ArticleCard";
import { Markdown } from "@/components/site/Markdown";
import { Newsletter } from "@/components/site/Newsletter";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import { XIcon } from "@/components/site/XIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  authorById,
  commentThread,
  formatDate,
  published,
  readingTime,
  type Article,
  type Comment,
} from "@/lib/mock-data";

export function ArticlePage({ article }: { article: Article }) {
  const author = authorById(article.authorId);
  const [progress, setProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState<Comment[]>(commentThread);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const related = published.filter((a) => a.id !== article.id && a.category === article.category);
  const others = published.filter((a) => a.id !== article.id && a.category !== article.category);
  const recommended = [...related, ...others];
  const featured = recommended.slice(0, 2);
  const moreStories = recommended.slice(2, 6);
  const fallbackRelated = others.slice(0, 3);

  function postComment(e: React.FormEvent) {
    e.preventDefault();
    if (draft.trim().length < 3) {
      toast.error("Write a little more before posting.");
      return;
    }
    setComments([
      ...comments,
      { id: String(Date.now()), author: "You", initials: "YO", createdAt: "just now", content: draft.trim() },
    ]);
    setDraft("");
    toast.success("Comment posted");
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: author.name },
    publisher: { "@type": "Organization", name: "Pressroom" },
  };

  return (
    <SiteLayout>
      <div className="fixed left-0 top-0 z-[60] h-1 bg-primary transition-[width]" style={{ width: `${progress}%` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <article className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-primary kicker">{article.category}</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-[2.75rem]">{article.title}</h1>
            <p className="mt-4 font-serif text-lg text-muted-foreground">{article.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-5 border-y border-border py-4 text-sm text-muted-foreground">
              <Link href={`/author/${author.id}`} className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-ink text-xs font-bold text-ink-foreground">
                  {author.avatarInitials}
                </span>
                <span className="font-semibold text-foreground">{author.name}</span>
              </Link>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" /> {readingTime(article.content)} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" /> {article.views.toLocaleString()}
              </span>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant={saved ? "default" : "outline"}
                  size="sm"
                  className="rounded-sm"
                  onClick={() => {
                    setSaved(!saved);
                    toast.success(saved ? "Removed from reading list" : "Saved to reading list");
                  }}
                >
                  <Bookmark className="size-3.5" /> {saved ? "Saved" : "Save"}
                </Button>
                {[
                  { Icon: XIcon, label: "Share on X" },
                  { Icon: Facebook, label: "Share on Facebook" },
                  { Icon: Linkedin, label: "Share on LinkedIn" },
                  { Icon: Share2, label: "Share" },
                ].map(({ Icon, label }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-sm"
                    aria-label={label}
                  >
                    <Icon className="size-3.5" />
                  </Button>
                ))}
              </div>
            </div>

            <img
              src={article.image}
              alt={article.title}
              width={1200}
              height={800}
              className="mt-8 h-[420px] w-full object-cover md:h-[520px]"
            />

            <div className="mt-8">
              <Markdown source={article.content} />
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span key={t} className="border border-border px-2 py-1 kicker text-muted-foreground">
                  #{t}
                </span>
              ))}
            </div>

            {/* Author card */}
            <div className="card-press mt-10 flex gap-4 p-6">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                {author.avatarInitials}
              </span>
              <div>
                <p className="text-primary kicker">Written by</p>
                <h3 className="text-lg">{author.name}</h3>
                <p className="mt-1 font-serif text-sm text-muted-foreground">{author.bio}</p>
                <Link href={`/author/${author.id}`} className="mt-2 inline-block text-sm font-semibold text-primary">
                  All stories by {author.name.split(" ")[0]} →
                </Link>
              </div>
            </div>

            {/* Comments */}
            <section className="mt-12">
              <SectionHeading title={`Comments (${comments.length})`} />
              <form onSubmit={postComment} className="card-press p-4">
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={1000}
                  placeholder="Add to the discussion…"
                  className="rounded-sm"
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{draft.length}/1000</span>
                  <Button type="submit" className="rounded-sm font-semibold uppercase">
                    Post comment
                  </Button>
                </div>
              </form>
              <div className="mt-6 space-y-6">
                {comments.map((c) => (
                  <CommentItem key={c.id} comment={c} />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4">
              {featured.map((a) => (
                <Link
                  key={a.id}
                  href={`/article/${a.slug}`}
                  className="group flex flex-col rounded-[1.75rem] bg-card p-2 text-left shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative min-h-[360px] overflow-hidden rounded-[1.35rem] p-5 md:min-h-[400px]">
                    <img
                      src={a.image}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                    <div className="relative flex min-h-[340px] flex-col justify-end md:min-h-[380px]">
                      <CategoryTag name={a.category} />
                      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">
                        {a.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/75">
                        {a.excerpt}
                      </p>
                      <span className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-ink">
                        Read story
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="card-press p-5">
              <p className="mb-4 flex items-center gap-2 text-primary kicker">
                <MessageSquare className="size-3.5" /> Related reading
              </p>
              <div className="space-y-4">
                {moreStories.map((a) => (
                  <ArticleRow key={a.id} article={a} />
                ))}
              </div>
            </div>
            <Newsletter compact />
          </aside>
        </div>
      </article>

      <section className="border-t border-border bg-secondary/40 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="More from Pressroom" />
          <div className="grid gap-6 md:grid-cols-3">
            {fallbackRelated.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  return (
    <div style={{ marginLeft: depth * 28 }}>
      <div className="flex gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold">
          {comment.initials}
        </span>
        <div>
          <p className="text-sm font-semibold">
            {comment.author}{" "}
            <span className="font-normal text-muted-foreground">· {comment.createdAt}</span>
          </p>
          <p className="mt-1 font-serif text-sm text-muted-foreground">{comment.content}</p>
        </div>
      </div>
      {comment.replies?.map((r) => (
        <div key={r.id} className="mt-5">
          <CommentItem comment={r} depth={depth + 1} />
        </div>
      ))}
    </div>
  );
}
