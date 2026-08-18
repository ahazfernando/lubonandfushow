"use client";

import {
  Bold,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Quote,
  Save,
} from "lucide-react";
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


const starter = `## The opening section

Type your story here, then select any text and pick a style from the toolbar — headings, **bold**, lists and quotes render live in the preview beside you.

- Drop an image anywhere in the panel to attach a featured image
- Slug and meta fields drive the page's SEO tags

> Pull quotes look like this.`;

type BlockStyle = "p" | "h2" | "h3" | "quote" | "bullet" | "numbered";

const blockLabels: { value: BlockStyle; label: string }[] = [
  { value: "p", label: "Paragraph" },
  { value: "h2", label: "Heading 1" },
  { value: "h3", label: "Heading 2" },
  { value: "quote", label: "Quote" },
  { value: "bullet", label: "Bulleted list" },
  { value: "numbered", label: "Numbered list" },
];

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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(starter);
  const [slug, setSlug] = useState("");
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [blockStyle, setBlockStyle] = useState<BlockStyle>("p");

  function withSelection(fn: (text: string, start: number, end: number) => { next: string; selStart?: number; selEnd: number }) {
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
      const selected = text.slice(start, end) || "text";
      const next = `${text.slice(0, start)}${marker}${selected}${marker}${text.slice(end)}`;
      return { next, selStart: start + marker.length, selEnd: start + marker.length + selected.length };
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
      toast.error("Only image files can be attached");
      return;
    }
    setImage(URL.createObjectURL(file));
    toast.success("Featured image attached — thumbnail generated");
  }

  return (
    <div className="space-y-6">
      <div className="card-press space-y-4 p-5">
        <div className="space-y-2">
          <Label htmlFor="title">Headline</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            maxLength={140}
            placeholder="Write the headline"
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
            <img src={image} alt="Featured preview" className="h-32 w-full object-cover" />
          ) : (
            <>
              <ImagePlus className="size-5 text-primary" />
              <p className="font-semibold">Drag & drop a featured image</p>
              <p className="text-xs text-muted-foreground">JPG or PNG · thumbnails auto-generated</p>
            </>
          )}
          <label className="cursor-pointer text-xs font-semibold text-primary">
            or browse files
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Body</Label>
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
                { icon: Bold, title: "Bold", run: () => wrap("**") },
                { icon: Italic, title: "Italic", run: () => wrap("*") },
                { icon: List, title: "Bulleted list", run: () => setBlock("bullet") },
                { icon: ListOrdered, title: "Numbered list", run: () => setBlock("numbered") },
                { icon: Quote, title: "Quote", run: () => setBlock("quote") },
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
            <p className="ml-auto text-xs text-muted-foreground">
              Select text, then pick a style
            </p>
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
            {content.split(/\s+/).filter(Boolean).length} words · {readingTime(content)} min read
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>Section</Label>
            <Select defaultValue={categories[0]!.name}>
              <SelectTrigger className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input id="tags" placeholder="policy, markets" className="rounded-sm" />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="rounded-sm" />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="meta">Meta description</Label>
            <Textarea id="meta" maxLength={160} rows={2} className="rounded-sm" />
          </div>
          {mode === "admin" && (
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="schedule">Schedule publication</Label>
              <Input id="schedule" type="datetime-local" className="rounded-sm" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          <Button
            variant="outline"
            className="rounded-sm font-semibold uppercase"
            onClick={() => toast.success("Draft saved")}
          >
            <Save className="size-4" /> Save draft
          </Button>
          {mode === "admin" ? (
            <>
              <Button
                variant="outline"
                className="rounded-sm font-semibold uppercase"
                onClick={() => toast.success("Scheduled")}
              >
                Schedule
              </Button>
              <Button
                className="rounded-sm font-semibold uppercase"
                onClick={() => toast.success("Published")}
              >
                Publish now
              </Button>
            </>
          ) : (
            <Button
              className="rounded-sm font-semibold uppercase"
              onClick={() => toast.success("Submitted for editorial review")}
            >
              Submit for review
            </Button>
          )}
        </div>
      </div>

      <div className="card-press p-5">
        <p className="mb-4 text-primary kicker">Live preview</p>
        {image && <img src={image} alt="" className="mb-5 h-64 w-full object-cover" />}
        <h1 className="text-2xl md:text-4xl">{title || "Your headline will appear here"}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          /article/{slug || "your-slug"} · {readingTime(content)} min read
        </p>
        <div className="mt-5">
          <Markdown source={content} />
        </div>
      </div>
    </div>
  );
}
