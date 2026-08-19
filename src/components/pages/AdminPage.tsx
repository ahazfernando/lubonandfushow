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
import { articles, authorById, authors, categories, readingTime } from "@/lib/mock-data";
import { useI18n } from "@/components/site/LanguageProvider";

export function AdminPage() {
  const queue = articles.filter((a) => a.status === "pending_review");
  const totalViews = articles.reduce((s, a) => s + a.views, 0);
  const { t, msg, formatDate, formatNumber, categoryName, locale } = useI18n();
  const caseClass = locale === "si" ? "" : "uppercase";

  return (
    <SiteLayout>
      <div className="border-b border-border bg-ink py-10 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-primary kicker">{t.admin.kicker}</p>
          <h1 className="mt-2 text-3xl md:text-4xl">{t.admin.title}</h1>
        </div>
      </div>

      <div className="w-full py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 grid gap-4 sm:grid-cols-4">
            {[
              [t.admin.published, articles.filter((a) => a.status === "published").length],
              [t.admin.inQueue, queue.length],
              [t.admin.totalViews, formatNumber(totalViews)],
              [t.admin.contributors, authors.length],
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
              <TabsTrigger value="editor" className="flex-1 rounded-sm">
                {t.admin.editor}
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex-1 rounded-sm">
                {t.admin.articles}
              </TabsTrigger>
              <TabsTrigger value="queue" className="flex-1 rounded-sm">
                {msg(t.admin.moderation, { n: queue.length })}
              </TabsTrigger>
              <TabsTrigger value="taxonomy" className="flex-1 rounded-sm">
                {t.admin.taxonomy}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1 rounded-sm">
                {t.admin.analytics}
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-1 rounded-sm">
                {t.admin.users}
              </TabsTrigger>
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
                <SectionHeading title={t.admin.allArticles} />
                <div className="card-press overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/60 text-left kicker">
                      <tr>
                        <th className="p-3">{t.admin.colHeadline}</th>
                        <th className="p-3">{t.admin.colAuthor}</th>
                        <th className="p-3">{t.admin.colSection}</th>
                        <th className="p-3">{t.admin.colStatus}</th>
                        <th className="p-3">{t.admin.colDate}</th>
                        <th className="p-3">{t.admin.colViews}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((a) => (
                        <tr key={a.id} className="border-t border-border">
                          <td className="max-w-xs p-3 font-semibold">{a.title}</td>
                          <td className="p-3">{authorById(a.authorId).name}</td>
                          <td className="p-3">{categoryName(a.category)}</td>
                          <td className="p-3">
                            <span className="bg-secondary px-2 py-1 kicker">
                              {t.status[a.status] ?? a.status}
                            </span>
                          </td>
                          <td className="p-3">{formatDate(a.publishedAt)}</td>
                          <td className="p-3">{formatNumber(a.views)}</td>
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
              <SectionHeading title={t.admin.queueTitle} />
              {queue.map((a) => (
                <div key={a.id} className="card-press p-6">
                  <p className="text-primary kicker">{categoryName(a.category)}</p>
                  <h3 className="mt-1 text-xl">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {msg(t.admin.submittedBy, {
                      name: authorById(a.authorId).name,
                      n: readingTime(a.content),
                    })}
                  </p>
                  <p className="mt-3 font-serif text-sm text-muted-foreground">{a.excerpt}</p>
                  <Textarea
                    placeholder={t.admin.feedbackPlaceholder}
                    className="mt-4 rounded-sm"
                    maxLength={1000}
                  />
                  <div className="mt-3 flex gap-2">
                    <Button
                      className={`rounded-sm font-semibold ${caseClass}`}
                      onClick={() => toast.success(t.admin.approved)}
                    >
                      <Check className="size-4" /> {t.admin.approve}
                    </Button>
                    <Button
                      variant="outline"
                      className={`rounded-sm font-semibold ${caseClass}`}
                      onClick={() => toast.success(t.admin.revisionRequested)}
                    >
                      {t.admin.requestRevision}
                    </Button>
                    <Button
                      variant="outline"
                      className={`rounded-sm font-semibold ${caseClass} text-destructive`}
                      onClick={() => toast(t.admin.rejected)}
                    >
                      <X className="size-4" /> {t.admin.reject}
                    </Button>
                  </div>
                </div>
              ))}
              {queue.length === 0 && <p className="text-muted-foreground">{t.admin.queueClear}</p>}
            </div>
          </TabsContent>

          <TabsContent value="taxonomy" className="mt-8">
            <div className="mx-auto max-w-7xl px-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card-press p-6">
                  <SectionHeading title={t.admin.sections} />
                  <ul className="space-y-2 text-sm">
                    {categories.map((c) => (
                      <li key={c.id} className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">{categoryName(c.name)}</span>
                        <span className="text-xs text-muted-foreground">
                          /{c.slug} · {c.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Input placeholder={t.admin.newSection} className="rounded-sm" />
                    <Button
                      className="rounded-sm"
                      onClick={() => toast.success(t.admin.sectionCreated)}
                    >
                      {t.common.add}
                    </Button>
                  </div>
                </div>
                <div className="card-press p-6">
                  <SectionHeading title={t.admin.tags} />
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(articles.flatMap((a) => a.tags))].map((t) => (
                      <span key={t} className="border border-border px-2 py-1 kicker">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Input placeholder={t.admin.newTag} className="rounded-sm" />
                    <Button
                      className="rounded-sm"
                      onClick={() => toast.success(t.admin.tagCreated)}
                    >
                      {t.common.add}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeading title={t.admin.performance} />
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
                            <Eye className="size-3.5" /> {formatNumber(a.views)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="size-3.5" /> {a.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="size-3.5" />{" "}
                            {msg(t.common.min, { n: readingTime(a.content) })}
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
              <SectionHeading title={t.admin.usersTitle} />
              <div className="card-press overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-left kicker">
                    <tr>
                      <th className="p-3">{t.admin.colName}</th>
                      <th className="p-3">{t.admin.colRole}</th>
                      <th className="p-3">{t.admin.colChangeRole}</th>
                      <th className="p-3">{t.admin.colAction}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((a) => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="p-3 font-semibold">{a.name}</td>
                        <td className="p-3">{t.roles[a.role] ?? a.role}</td>
                        <td className="p-3">
                          <Select defaultValue={a.role}>
                            <SelectTrigger className="w-36 rounded-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["reader", "writer", "client", "admin"].map((r) => (
                                <SelectItem key={r} value={r}>
                                  {t.roles[r] ?? r}
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
                            onClick={() => toast.success(t.admin.roleUpdated)}
                          >
                            {t.common.save}
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-border bg-primary/5">
                      <td className="p-3 font-semibold">Priya Raman</td>
                      <td className="p-3">{t.admin.pendingWriter}</td>
                      <td className="p-3 text-xs text-muted-foreground">{t.admin.pendingNiche}</td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          className="rounded-sm"
                          onClick={() => toast.success(t.admin.appApproved)}
                        >
                          {t.admin.approve}
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
