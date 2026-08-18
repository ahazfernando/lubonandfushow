"use client";

import { BarChart3, Check, Eye, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";

import { ArticleEditor } from "@/components/site/ArticleEditor";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { articles, authorById, authors, categories, formatDate, readingTime } from "@/lib/mock-data";

const statusLabel: Record<string, string> = {
  draft: "Draft",
  pending_review: "Pending review",
  published: "Published",
  scheduled: "Scheduled",
};

export function AdminPage() {
  const queue = articles.filter((a) => a.status === "pending_review");
  const totalViews = articles.reduce((s, a) => s + a.views, 0);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-ink py-10 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-primary kicker">Admin</p>
          <h1 className="mt-2 text-3xl md:text-4xl">Newsroom dashboard</h1>
        </div>
      </div>

      <div className="w-full py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 grid gap-4 sm:grid-cols-4">
            {[
              ["Published", articles.filter((a) => a.status === "published").length],
              ["In queue", queue.length],
              ["Total views", totalViews.toLocaleString()],
              ["Contributors", authors.length],
            ].map(([l, v]) => (
              <div key={String(l)} className="card-press p-5">
                <p className="text-muted-foreground kicker">{l}</p>
                <p className="mt-2 font-display text-3xl text-primary">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="editor">
          <div className="mx-auto max-w-7xl px-4">
            <TabsList className="flex h-auto w-full rounded-sm">
              <TabsTrigger value="editor" className="flex-1 rounded-sm">Editor</TabsTrigger>
              <TabsTrigger value="articles" className="flex-1 rounded-sm">Articles</TabsTrigger>
              <TabsTrigger value="queue" className="flex-1 rounded-sm">Moderation ({queue.length})</TabsTrigger>
              <TabsTrigger value="taxonomy" className="flex-1 rounded-sm">Sections & tags</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1 rounded-sm">Analytics</TabsTrigger>
              <TabsTrigger value="users" className="flex-1 rounded-sm">Users</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="editor" className="mt-8">
            <div className="mx-auto max-w-7xl px-4">
              <ArticleEditor mode="admin" />
            </div>
          </TabsContent>

          <TabsContent value="articles" className="mt-8">
            <div className="px-4">
              <div className="mx-auto max-w-[1800px]">
                <SectionHeading title="All articles" />
                <div className="card-press overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/60 text-left kicker">
                      <tr>
                        <th className="p-3">Headline</th>
                        <th className="p-3">Author</th>
                        <th className="p-3">Section</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((a) => (
                        <tr key={a.id} className="border-t border-border">
                          <td className="max-w-xs p-3 font-semibold">{a.title}</td>
                          <td className="p-3">{authorById(a.authorId).name}</td>
                          <td className="p-3">{a.category}</td>
                          <td className="p-3">
                            <span className="bg-secondary px-2 py-1 kicker">{statusLabel[a.status]}</span>
                          </td>
                          <td className="p-3">{formatDate(a.publishedAt)}</td>
                          <td className="p-3">{a.views.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="queue" className="mt-8">
            <div className="mx-auto max-w-7xl px-4 space-y-6">
              <SectionHeading title="Moderation queue" />
              {queue.map((a) => (
                <div key={a.id} className="card-press p-6">
                  <p className="text-primary kicker">{a.category}</p>
                  <h3 className="mt-1 text-xl">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Submitted by {authorById(a.authorId).name} · {readingTime(a.content)} min read
                  </p>
                  <p className="mt-3 font-serif text-sm text-muted-foreground">{a.excerpt}</p>
                  <Textarea
                    placeholder="Feedback for the writer (sent with your decision)…"
                    className="mt-4 rounded-sm"
                    maxLength={1000}
                  />
                  <div className="mt-3 flex gap-2">
                    <Button
                      className="rounded-sm font-semibold uppercase"
                      onClick={() => toast.success("Approved and published")}
                    >
                      <Check className="size-4" /> Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-sm font-semibold uppercase"
                      onClick={() => toast.success("Revision requested")}
                    >
                      Request revision
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-sm font-semibold uppercase text-destructive"
                      onClick={() => toast("Submission rejected")}
                    >
                      <X className="size-4" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
              {queue.length === 0 && <p className="text-muted-foreground">Queue is clear.</p>}
            </div>
          </TabsContent>

          <TabsContent value="taxonomy" className="mt-8">
            <div className="mx-auto max-w-7xl px-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card-press p-6">
                  <SectionHeading title="Sections" />
                  <ul className="space-y-2 text-sm">
                    {categories.map((c) => (
                      <li key={c.id} className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">{c.name}</span>
                        <span className="text-xs text-muted-foreground">/{c.slug} · {c.count}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Input placeholder="New section name" className="rounded-sm" />
                    <Button className="rounded-sm" onClick={() => toast.success("Section created")}>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="card-press p-6">
                  <SectionHeading title="Tags" />
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(articles.flatMap((a) => a.tags))].map((t) => (
                      <span key={t} className="border border-border px-2 py-1 kicker">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Input placeholder="New tag" className="rounded-sm" />
                    <Button className="rounded-sm" onClick={() => toast.success("Tag created")}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeading title="Per-article performance" />
              <div className="space-y-3">
                {articles
                  .filter((a) => a.status === "published")
                  .sort((a, b) => b.views - a.views)
                  .map((a) => (
                    <div key={a.id} className="card-press p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-semibold">{a.title}</p>
                        <div className="flex gap-5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="size-3.5" /> {a.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="size-3.5" /> {a.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="size-3.5" /> {readingTime(a.content)} min
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 w-full bg-secondary">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(a.views / 18402) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-8">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeading title="Users & applications" />
              <div className="card-press overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-left kicker">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Change role</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((a) => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="p-3 font-semibold">{a.name}</td>
                        <td className="p-3">{a.role}</td>
                        <td className="p-3">
                          <Select defaultValue={a.role}>
                            <SelectTrigger className="w-36 rounded-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["reader", "writer", "client", "admin"].map((r) => (
                                <SelectItem key={r} value={r}>
                                  {r}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-sm"
                            onClick={() => toast.success("Role updated")}
                          >
                            Save
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-border bg-primary/5">
                      <td className="p-3 font-semibold">Priya Raman</td>
                      <td className="p-3">writer (pending)</td>
                      <td className="p-3 text-xs text-muted-foreground">
                        Niche: energy policy · 3 portfolio links
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          className="rounded-sm"
                          onClick={() => toast.success("Application approved")}
                        >
                          Approve
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}
