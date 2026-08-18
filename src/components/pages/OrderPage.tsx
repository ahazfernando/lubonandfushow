"use client";

import { Check, CreditCard, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Newsletter } from "@/components/site/Newsletter";
import { SectionHeading, SiteLayout } from "@/components/site/SiteLayout";
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
import { orderStages, orders, pricingTiers } from "@/lib/mock-data";

const tierArt: Record<string, { src: string; object: string }> = {
  Brief: { src: "/pricingtiers/pricingtiers.png", object: "object-[18%_center]" },
  Feature: { src: "/pricingtiers/pricingtiersD2.png", object: "object-center" },
  Investigation: { src: "/pricingtiers/pricingtiersD2.png", object: "object-[82%_center]" },
};

const stageLabels: Record<string, string> = {
  submitted: "Submitted",
  in_progress: "In progress",
  draft_ready: "Draft ready",
  revision: "Revision",
  delivered: "Delivered",
};

export function OrderPage() {
  const [tier, setTier] = useState("Feature");
  const [messages, setMessages] = useState([
    {
      from: "Desmond Vale",
      text: "County filed the abstraction figures this morning. I'll put the households in the lede, not the megawatts.",
    },
    { from: "You", text: "Yes — and name the operator on the record if they'll sit." },
  ]);
  const [msg, setMsg] = useState("");
  const active = orders[0]!;

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img
          src="/order/912f27481efe8d0e3f9dc405433d7e3c.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
          <p className="text-primary kicker">Commission the desk</p>
          <h1 className="mt-3 max-w-4xl text-3xl text-white sm:text-4xl md:text-5xl">
            Order an article.
            <br />
            Get newsroom standards, not filler.
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-lg text-white/80">
            Brief us once. We assign a reporter, report it, edit it, and file to your deadline —
            with sources, not recycled talking points.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Assign", "A reporter on the beat — not a freelancer rewriting your deck."],
            ["02", "Report", "Calls, documents and on-the-record quotes. We don't invent colour."],
            ["03", "Edit", "A desk editor cuts fluff, checks figures and holds the voice."],
            ["04", "File", "You get copy that can run. Deadline is a deadline."],
          ].map(([n, t, d]) => (
            <div key={n}>
              <p className="text-primary kicker">{n} {t}</p>
              <p className="mt-2 font-serif text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Pricing tiers" />
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {pricingTiers.map((t) => {
              const selected = tier === t.name;
              const art = tierArt[t.name] ?? {
                src: "/pricingtiers/pricingtiers.png",
                object: "object-center",
              };
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setTier(t.name)}
                  className={`flex flex-col rounded-[2rem] bg-card p-2.5 text-left text-foreground shadow-lift transition-[transform,box-shadow] duration-300 ${
                    selected
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:-translate-y-1"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-[1.6rem] p-6 md:p-7">
                    <img
                      src={art.src}
                      alt=""
                      aria-hidden
                      className={`absolute inset-0 h-full w-full object-cover ${art.object}`}
                    />
                    <div className="absolute inset-0 bg-white/45" />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">{t.name}</h3>
                        {t.popular && (
                          <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-foreground">
                            Most chosen
                          </span>
                        )}
                      </div>
                      <p className="mt-4 flex items-end gap-1 leading-none">
                        <span className="font-display text-5xl tracking-tight">${t.price}</span>
                        <span className="mb-1 text-sm text-foreground/60">/article</span>
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/70">{t.blurb}</p>
                      <span
                        className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-ink text-ink-foreground"
                        }`}
                      >
                        {selected ? "Selected" : "Choose plan"}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3.5 px-5 py-6">
                    <li className="text-xs text-muted-foreground">
                      {t.words.toLocaleString()} words · {t.turnaround} turnaround
                    </li>
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-foreground/80">
                          <Check className="size-3.5" strokeWidth={2.4} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="card-press p-6 md:p-8">
            <SectionHeading title="File a brief" />
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Brief with the desk — checkout is a demo");
              }}
            >
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="topic">Working headline or subject</Label>
                <Input
                  id="topic"
                  maxLength={140}
                  placeholder="e.g. Who pays when the data centre drinks the aquifer"
                  className="rounded-sm"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="brief">Angle, sources, what we must not miss</Label>
                <Textarea
                  id="brief"
                  maxLength={1500}
                  rows={5}
                  placeholder="Who is this for, what has already been said, who should we call, and which claims need documents behind them…"
                  className="rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Length</Label>
                <Select defaultValue="1500">
                  <SelectTrigger className="rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="800">Brief · 800 words</SelectItem>
                    <SelectItem value="1500">Feature · 1,500 words</SelectItem>
                    <SelectItem value="2500">Investigation · 2,500 words</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Voice</Label>
                <Select defaultValue="authoritative">
                  <SelectTrigger className="rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="authoritative">Authoritative — desk, not brochure</SelectItem>
                    <SelectItem value="narrative">Narrative — reported feature</SelectItem>
                    <SelectItem value="punchy">Punchy — short and clean</SelectItem>
                    <SelectItem value="technical">Technical — for readers who know the beat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">File by</Label>
                <Input id="deadline" type="date" className="rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refs">Source pack or reference</Label>
                <Input id="refs" placeholder="https:// — filings, previous coverage, contacts" className="rounded-sm" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full rounded-sm font-semibold uppercase">
                  <CreditCard className="size-4" /> Commission the {tier} — pay to file
                </Button>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Charged when a reporter is assigned. Card handling via Stripe.
                </p>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="card-press p-6">
              <SectionHeading title="On the spike" />
              <p className="text-sm font-semibold">
                {active.id} · {active.topic}
              </p>
              <ol className="mt-5">
                {orderStages.map((s, i) => {
                  const currentIdx = orderStages.indexOf(active.status);
                  const done = i <= currentIdx;
                  const connectorDone = i < currentIdx;
                  const last = i === orderStages.length - 1;
                  return (
                    <li key={s} className="flex items-stretch gap-3">
                      <div className="flex w-7 shrink-0 flex-col items-center">
                        <span
                          className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                            done
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </span>
                        {!last && (
                          <span
                            className={`w-px min-h-4 grow ${connectorDone ? "bg-primary" : "bg-border"}`}
                          />
                        )}
                      </div>
                      <span
                        className={`pt-1.5 ${last ? "" : "pb-5"} ${
                          done ? "font-semibold" : "text-muted-foreground"
                        }`}
                      >
                        {stageLabels[s]}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="card-press p-6">
              <p className="mb-4 flex items-center gap-2 text-primary kicker">
                <MessageSquare className="size-3.5" /> Thread with {active.writer}
              </p>
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] p-3 text-sm ${
                      m.from === "You"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="mb-1 text-[10px] uppercase tracking-wider opacity-70">{m.from}</p>
                    {m.text}
                  </div>
                ))}
              </div>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!msg.trim()) return;
                  setMessages([...messages, { from: "You", text: msg.trim() }]);
                  setMsg("");
                }}
              >
                <Input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  maxLength={500}
                  placeholder="Note to the reporter…"
                  className="rounded-sm"
                />
                <Button type="submit" size="icon" className="rounded-sm">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title="Commissions" />
        <div className="card-press overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left kicker">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Topic</th>
                <th className="p-3">Words</th>
                <th className="p-3">Writer</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Status</th>
                <th className="p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-border">
                  <td className="p-3 font-semibold">{o.id}</td>
                  <td className="p-3">{o.topic}</td>
                  <td className="p-3">{o.words.toLocaleString()}</td>
                  <td className="p-3">{o.writer}</td>
                  <td className="p-3">{o.deadline}</td>
                  <td className="p-3">
                    <span className="bg-secondary px-2 py-1 kicker">{stageLabels[o.status]}</span>
                  </td>
                  <td className="p-3">${o.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Newsletter />
    </SiteLayout>
  );
}
