"use client";

import { Bold, ImagePlus, Italic, List, ListOrdered, Quote, Save } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Markdown } from "./Markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories, readingTime } from "@/lib/mock-data";
import { useI18n } from "./LanguageProvider";

type BlockStyle = "p" | "h2" | "h3" | "quote" | "bullet" | "numbered";

function stripPrefix(line: string) {
  return line.replace(/^\s*(#{1,6}\s+|>\s?|[-*]\s+|\d+\.\s+)/, "");
}

function applyBlock(text: string, start: number, end: number, style: BlockStyle) {
  const lineStart = text.lastIndexOf("\n", start - 1) + 1;
  const lineEndIdx = text.indexOf("\n", end);
  const lineEnd = lineEndIdx === -1 ? text.length : lineEndIdx;
  const lines = text.slice(lineStart, lineEnd).split("\n");
  const formatted = lines.map((line, i) => {
    const body = stripPrefix(line);
    if (!body.trim()) return body;
    switch (style) {
      case "h2":
        return `## ${body}`;
      case "h3":
        return `### ${body}`;
      case "quote":
        return `> ${body}`;
      case "bullet":
        return `- ${body}`;
      case "numbered":
        return `${i + 1}. ${body}`;
      default:
        return body;
    }
  });
  const next = text.slice(0, lineStart) + formatted.join("\n") + text.slice(lineEnd);
  return { next, selEnd: lineStart + formatted.join("\n").length };
}

export function ArticleEditor({ mode }: { mode: "admin" | "writer" }) {
  const { t, msg, categoryName, locale } = useI18n();
  const caseClass = locale === "si" ? "" : "uppercase";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(t.editor.starter);
  const [slug, setSlug] = useState("");
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [blockStyle, setBlockStyle] = useState<BlockStyle>("p");

  const blockLabels: { value: BlockStyle; label: string }[] = [
    { value: "p", label: t.editor.paragraph },
    { value: "h2", label: t.editor.heading1 },
    { value: "h3", label: t.editor.heading2 },
    { value: "quote", label: t.editor.quote },
    { value: "bullet", label: t.editor.bullet },
    { value: "numbered", label: t.editor.numbered },
  ];

  function withSelection(
    fn: (
      text: string,
      start: number,
      end: number,
    ) => { next: string; selStart?: number; selEnd: number },
  ) {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd, value } = el;
    const { next, selStart, selEnd } = fn(value, selectionStart, selectionEnd);
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(selStart ?? selectionStart, selEnd);
    });
  }

  function setBlock(style: BlockStyle) {
    setBlockStyle(style);
    withSelection((text, start, end) => applyBlock(text, start, end, style));
  }

  function wrap(marker: string) {
    withSelection((text, start, end) => {
      const selected = text.slice(start, end) || t.editor.wrapFallback;
      const next = `${text.slice(0, start)}${marker}${selected}${marker}${text.slice(end)}`;
      return {
        next,
        selStart: start + marker.length,
        selEnd: start + marker.length + selected.length,
      };
    });
  }

  function handleTitle(v: string) {
    setTitle(v);
    setSlug(
      v
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 70),
    );
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error(t.editor.onlyImages);
      return;
    }
    setImage(URL.createObjectURL(file));
    toast.success(t.editor.imageAttached);
  }

  return (
    <div className="space-y-6">
      <div className="card-press space-y-4 p-5">
        <div className="space-y-2">
          <Label htmlFor="title">{t.editor.headline}</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            maxLength={140}
            placeholder={t.editor.headlinePlaceholder}
            className="rounded-sm"
          />
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 text-center text-sm transition-colors ${
            dragging ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          {image ? (
            <img src={image} alt={t.editor.featuredPreview} className="h-32 w-full object-cover" />
          ) : (
            <>
              <ImagePlus className="size-5 text-primary" />
              <p className="font-semibold">{t.editor.dropImage}</p>
              <p className="text-xs text-muted-foreground">{t.editor.dropHint}</p>
            </>
          )}
          <label className="cursor-pointer text-xs font-semibold text-primary">
            {t.editor.browse}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">{t.editor.body}</Label>
          <div className="flex flex-wrap items-center gap-2 border border-border bg-muted/40 p-2">
            <Select value={blockStyle} onValueChange={(v) => setBlock(v as BlockStyle)}>
              <SelectTrigger className="h-9 w-[170px] rounded-sm bg-background text-xs font-semibold uppercase">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {blockLabels.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              {[
                { icon: Bold, title: t.editor.bold, run: () => wrap("**") },
                { icon: Italic, title: t.editor.italic, run: () => wrap("*") },
                { icon: List, title: t.editor.bullet, run: () => setBlock("bullet") },
                { icon: ListOrdered, title: t.editor.numbered, run: () => setBlock("numbered") },
                { icon: Quote, title: t.editor.quote, run: () => setBlock("quote") },
              ].map(({ icon: Icon, title, run }) => (
                <Button
                  key={title}
                  type="button"
                  variant="outline"
                  size="icon"
                  title={title}
                  aria-label={title}
                  className="size-9 rounded-sm bg-background"
                  onClick={run}
                >
                  <Icon className="size-4" />
                </Button>
              ))}
            </div>
            <p className="ml-auto text-xs text-muted-foreground">{t.editor.selectStyle}</p>
          </div>
          <Textarea
            id="body"
            ref={bodyRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={22}
            className="rounded-sm font-serif text-sm"
          />

          <p className="text-xs text-muted-foreground">
            {msg(t.common.wordsRead, {
              words: content.split(/\s+/).filter(Boolean).length,
              n: readingTime(content),
            })}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>{t.editor.section}</Label>
            <Select defaultValue={categories[0]!.name}>
              <SelectTrigger className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {categoryName(c.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">{t.editor.tags}</Label>
            <Input id="tags" placeholder="policy, markets" className="rounded-sm" />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="slug">{t.editor.slug}</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="rounded-sm"
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="meta">{t.editor.meta}</Label>
            <Textarea id="meta" maxLength={160} rows={2} className="rounded-sm" />
          </div>
          {mode === "admin" && (
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="schedule">{t.editor.schedule}</Label>
              <Input id="schedule" type="datetime-local" className="rounded-sm" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          <Button
            variant="outline"
            className={`rounded-sm font-semibold ${caseClass}`}
            onClick={() => toast.success(t.editor.draftSaved)}
          >
            <Save className="size-4" /> {t.editor.saveDraft}
          </Button>
          {mode === "admin" ? (
            <>
              <Button
                variant="outline"
                className={`rounded-sm font-semibold ${caseClass}`}
                onClick={() => toast.success(t.editor.scheduled)}
              >
                {t.editor.scheduleBtn}
              </Button>
              <Button
                className={`rounded-sm font-semibold ${caseClass}`}
                onClick={() => toast.success(t.editor.published)}
              >
                {t.editor.publishNow}
              </Button>
            </>
          ) : (
            <Button
              className={`rounded-sm font-semibold ${caseClass}`}
              onClick={() => toast.success(t.editor.submitted)}
            >
              {t.editor.submitReview}
            </Button>
          )}
        </div>
      </div>

      <div className="card-press p-5">
        <p className="mb-4 text-primary kicker">{t.editor.livePreview}</p>
        {image && <img src={image} alt="" className="mb-5 h-64 w-full object-cover" />}
        <h1 className="text-2xl md:text-4xl">{title || t.editor.headlineFallback}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          /article/{slug || "your-slug"} · {msg(t.common.minRead, { n: readingTime(content) })}
        </p>
        <div className="mt-5">
          <Markdown source={content} />
        </div>
      </div>
    </div>
  );
}
