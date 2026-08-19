"use client";

import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { ArticleEditor } from "@/components/site/ArticleEditor";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { articles } from "@/lib/mock-data";
import { useI18n } from "@/components/site/LanguageProvider";

const mine = articles.filter((a) => a.authorId === "a2");

const feedback = [
  {
    title: "What the Data Centre Boom Costs a Water Table",
    editor: "Mara Oyelaran",
    note: "Strong reporting. Tighten the second section and get on-record confirmation from the county before we publish.",
    status: "Revision requested",
  },
];

export function WriterPage() {
  const { t, formatDate, categoryName, locale, msg } = useI18n();
  const caseClass = locale === "si" ? "" : "uppercase";
  const statusTitle = {
    draft: t.writer.drafts,
    pending_review: t.writer.submitted,
    published: t.writer.published,
  } as const;
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img
          src="/order/a36fe1ecb742dcb73567fe7cc997cf06.jpg_2K_202608172235.jpeg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="text-primary kicker">{t.writer.kicker}</p>
          <h1 className="mt-2 max-w-4xl text-3xl text-white sm:text-4xl md:text-5xl">
            {t.writer.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <Tabs defaultValue="work">
          <TabsList className="flex-wrap rounded-sm">
            <TabsTrigger value="work" className="rounded-sm">
              {t.writer.myWork}
            </TabsTrigger>
            <TabsTrigger value="write" className="rounded-sm">
              {t.writer.newDraft}
            </TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-sm">
              {t.writer.editorFeedback}
            </TabsTrigger>
            <TabsTrigger value="apply" className="rounded-sm">
              {t.writer.apply}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="mt-8 space-y-8">
            {(["draft", "pending_review", "published"] as const).map((status) => (
              <div key={status}>
                <SectionHeading title={statusTitle[status]} />
                <div className="space-y-3">
                  {mine
                    .filter((a) => a.status === status)
                    .map((a) => (
                      <div
                        key={a.id}
                        className="card-press flex flex-wrap items-center justify-between gap-3 p-4"
                      >
                        <div>
                          <p className="font-semibold">{a.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {categoryName(a.category)} · {formatDate(a.publishedAt)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          {t.writer.openEditor}
                        </Button>
                      </div>
                    ))}
                  {mine.filter((a) => a.status === status).length === 0 && (
                    <p className="text-sm text-muted-foreground">{t.writer.nothingHere}</p>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="write" className="mt-8">
            <p className="mb-6 flex items-center gap-2 border-l-4 border-primary bg-primary/5 p-3 text-sm">
              <AlertCircle className="size-4 text-primary" />
              {t.writer.pendingNote}
            </p>
            <ArticleEditor mode="writer" />
          </TabsContent>

          <TabsContent value="feedback" className="mt-8 space-y-4">
            <SectionHeading title={t.writer.editorialNotes} />
            {feedback.map((f) => (
              <div key={f.title} className="card-press p-6">
                <span className="bg-primary px-2 py-1 text-primary-foreground kicker">
                  {t.writer.revisionRequested}
                </span>
                <h3 className="mt-3 text-lg">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {msg(t.common.from, { name: f.editor })}
                </p>
                <p className="mt-3 font-serif text-sm text-muted-foreground">{f.note}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="apply" className="mt-8">
            <div className="card-press max-w-2xl p-6 md:p-8">
              <SectionHeading title={t.writer.become} />
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success(t.writer.appSubmitted);
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="niche">{t.writer.niche}</Label>
                  <Input
                    id="niche"
                    maxLength={100}
                    placeholder={t.writer.nichePlaceholder}
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">{t.writer.portfolio}</Label>
                  <Textarea
                    id="portfolio"
                    rows={3}
                    maxLength={500}
                    placeholder={t.writer.portfolioPlaceholder}
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sample">{t.writer.sample}</Label>
                  <Textarea
                    id="sample"
                    rows={7}
                    maxLength={3000}
                    placeholder={t.writer.samplePlaceholder}
                    className="rounded-sm"
                  />
                </div>
                <Button type="submit" className={`rounded-sm font-semibold ${caseClass}`}>
                  {t.writer.submitApp}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}
