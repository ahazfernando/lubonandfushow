import heroCity from "@/assets/hero-city.jpg";
import techDesk from "@/assets/tech-desk.jpg";
import sports from "@/assets/sports.jpg";
import food from "@/assets/food.jpg";
import travel from "@/assets/travel.jpg";
import finance from "@/assets/finance.jpg";

export type Role = "reader" | "writer" | "client" | "admin";
export type ArticleStatus = "draft" | "pending_review" | "published" | "scheduled";

export type Author = {
  id: string;
  name: string;
  role: Role;
  bio: string;
  avatarInitials: string;
  socials: { label: string; url: string }[];
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  authorId: string;
  status: ArticleStatus;
  publishedAt: string;
  views: number;
  comments: number;
  featured?: boolean;
  trending?: boolean;
  metaTitle?: string;
  metaDescription?: string;
};

export const categories = [
  { id: "c1", name: "Business", slug: "business", count: 19 },
  { id: "c2", name: "Technology", slug: "technology", count: 25 },
  { id: "c3", name: "Sports", slug: "sports", count: 13 },
  { id: "c4", name: "Food & Health", slug: "food-health", count: 10 },
  { id: "c5", name: "Travel", slug: "travel", count: 7 },
  { id: "c6", name: "Finance", slug: "finance", count: 11 },
];

export const authors: Author[] = [
  {
    id: "a1",
    name: "Mara Oyelaran",
    role: "admin",
    bio: "Editor-in-chief. Fifteen years covering markets, power and the people caught in between.",
    avatarInitials: "MO",
    socials: [
      { label: "X", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    id: "a2",
    name: "Desmond Vale",
    role: "writer",
    bio: "Technology correspondent focused on platform economics and the machinery of the web.",
    avatarInitials: "DV",
    socials: [{ label: "X", url: "#" }],
  },
  {
    id: "a3",
    name: "Ines Aturo",
    role: "writer",
    bio: "Roving features writer. Food, health and the long walk home.",
    avatarInitials: "IA",
    socials: [{ label: "Instagram", url: "#" }],
  },
];

const body = `The story begins where most of them do: with a number nobody could explain. For six weeks the figures arrived on schedule, neatly formatted, entirely wrong.

## What the records show

Internal documents reviewed for this article describe a process that grew faster than the safeguards built around it. Staff raised concerns early. The concerns were logged, then filed.

> "We were told the model was conservative. It was not conservative. It was quiet."

Three separate reviews reached similar conclusions, and each recommended slowing down. None of the recommendations were adopted in full.

### The people affected

- Households billed for capacity they never used
- Contractors paid on estimates rather than meters
- Auditors handed summaries instead of source data

## Where this goes next

Regulators have opened a preliminary inquiry. Their report is expected before the end of the quarter, and the questions it asks will matter far beyond one balance sheet.

For now, the numbers are being recalculated by hand — a reminder that the most advanced systems still fail in the oldest ways.`;

export const articles: Article[] = [
  {
    id: "1",
    title: "Climate Pledges Meet the Ledger: Inside the Recalculation of a Decade",
    slug: "climate-pledges-meet-the-ledger",
    excerpt:
      "Governments promised deep cuts by 2030. A trove of internal accounting shows how much of it was arithmetic.",
    content: body,
    image: heroCity.src,
    category: "Business",
    tags: ["climate", "policy", "investigation"],
    authorId: "a1",
    status: "published",
    publishedAt: "2026-08-14",
    views: 18402,
    comments: 34,
    trending: true,
  },
  {
    id: "11",
    title: "Salt, Fire and the Night Shift: Inside the Kitchens That Still Cook by Hand",
    slug: "salt-fire-night-shift",
    excerpt:
      "A generation of chefs is slowing the line on purpose. The heat is the same. The margins are not.",
    content: body,
    image: "/images/fb657da85d75647359b4fd7ce4bac8f0.jpg",
    category: "Food & Health",
    tags: ["food", "hospitality", "labour"],
    authorId: "a3",
    status: "published",
    publishedAt: "2026-08-13",
    views: 4320,
    comments: 9,
  },
  {
    id: "12",
    title: "The Notebook Economy: Why the Real Decisions Still Happen on Paper",
    slug: "the-notebook-economy",
    excerpt:
      "The laptop stays open. The numbers that matter are being written by hand — in rooms with no slides.",
    content: body,
    image: "/images/30a337f3f4912da1687cef8b63c17fca.jpg",
    category: "Business",
    tags: ["founders", "work", "culture"],
    authorId: "a1",
    status: "published",
    publishedAt: "2026-08-10",
    views: 5102,
    comments: 11,
  },
  {
    id: "13",
    title: "Table Stakes: The After-Hours Leagues Rewriting Office Sport",
    slug: "table-stakes",
    excerpt: "Foosball was a perk. It is now a fixture, a league and a small economy of its own.",
    content: body,
    image: "/images/e5af72a7d2e126f98bd98d0bf54de120.jpg",
    category: "Sports",
    tags: ["sport", "workplace", "culture"],
    authorId: "a3",
    status: "published",
    publishedAt: "2026-08-08",
    views: 3891,
    comments: 22,
  },
  {
    id: "3",
    title: "Fifteen Straight: The Season That Broke the Form Book",
    slug: "fifteen-straight",
    excerpt: "An unfancied squad, a borrowed tactic and the longest winning run in a generation.",
    content: body,
    image: sports.src,
    category: "Sports",
    tags: ["football", "analysis"],
    authorId: "a3",
    status: "published",
    publishedAt: "2026-08-11",
    views: 8930,
    comments: 47,
    trending: true,
  },
  {
    id: "4",
    title: "Half a Million Tonnes: The Recycling Numbers Nobody Wanted Published",
    slug: "half-a-million-tonnes",
    excerpt: "Sorted, shipped, incinerated. A supply chain audit of what happens after the bin.",
    content: body,
    image: food.src,
    category: "Food & Health",
    tags: ["environment", "health"],
    authorId: "a3",
    status: "published",
    publishedAt: "2026-08-09",
    views: 7712,
    comments: 18,
    featured: true,
  },
  {
    id: "5",
    title: "Still Water: What a Slow Season Did to the Mountain Towns",
    slug: "still-water",
    excerpt: "Bookings fell by a third. The people who stayed rebuilt the economy around locals.",
    content: body,
    image: travel.src,
    category: "Travel",
    tags: ["travel", "economy"],
    authorId: "a2",
    status: "published",
    publishedAt: "2026-08-06",
    views: 5610,
    comments: 12,
    featured: true,
  },
  {
    id: "10",
    title: "The Sofa Studio: Independent Brands Designed After Hours",
    slug: "the-sofa-studio",
    excerpt:
      "A laptop, a late sitting and a product that still has to look expensive. The next consumer labels are being designed from home — and the craft is catching up.",
    content: body,
    image: "/order/29c93b7496b86ac14c1fb035e2b2933b.jpg",
    category: "Technology",
    tags: ["design", "startups", "remote-work"],
    authorId: "a2",
    status: "published",
    publishedAt: "2026-08-16",
    views: 6840,
    comments: 15,
  },
  {
    id: "2",
    title: "The Quiet Rewrite: How Recommendation Engines Learned to Wait",
    slug: "the-quiet-rewrite",
    excerpt:
      "A new generation of ranking systems is optimising for patience — and reshaping what a homepage means.",
    content: body,
    image: "/order/f238b898e4b4606c3e4c43de8a211d4d.jpg",
    category: "Technology",
    tags: ["ai", "platforms"],
    authorId: "a2",
    status: "published",
    publishedAt: "2026-08-12",
    views: 12043,
    comments: 21,
    trending: true,
  },
  {
    id: "6",
    title: "The Long Trade: Volatility Returns to a Market That Forgot It",
    slug: "the-long-trade",
    excerpt: "Two years of calm ended in nine minutes. A reconstruction of the session.",
    content: body,
    image: finance.src,
    category: "Finance",
    tags: ["markets", "finance"],
    authorId: "a1",
    status: "published",
    publishedAt: "2026-08-03",
    views: 9981,
    comments: 26,
    featured: true,
    trending: true,
  },
  {
    id: "7",
    title: "Draft: The Second City's Transit Gamble",
    slug: "second-city-transit-gamble",
    excerpt: "A working draft on the financing behind the new line.",
    content: body,
    image: heroCity.src,
    category: "Business",
    tags: ["transit"],
    authorId: "a2",
    status: "draft",
    publishedAt: "2026-08-16",
    views: 0,
    comments: 0,
  },
  {
    id: "8",
    title: "Submitted: What the Data Centre Boom Costs a Water Table",
    slug: "data-centre-water-table",
    excerpt: "Filed for editorial review — reporting from three counties.",
    content: body,
    image: techDesk.src,
    category: "Technology",
    tags: ["infrastructure"],
    authorId: "a2",
    status: "pending_review",
    publishedAt: "2026-08-15",
    views: 0,
    comments: 0,
  },
  {
    id: "9",
    title: "Scheduled: The Autumn Budget, Line by Line",
    slug: "autumn-budget-line-by-line",
    excerpt: "Queued for release the morning after the statement.",
    content: body,
    image: finance.src,
    category: "Finance",
    tags: ["budget"],
    authorId: "a1",
    status: "scheduled",
    publishedAt: "2026-09-02",
    views: 0,
    comments: 0,
  },
];

export const published = articles.filter((a) => a.status === "published");

/** Homepage bands are sliced from this list so a story never repeats down the page. */
export const breakingStories = published.slice(3, 6);

export function authorById(id: string) {
  return authors.find((a) => a.id === id) ?? authors[0]!;
}

export function articleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function byCategory(slug: string) {
  const cat = categories.find((c) => c.slug === slug);
  return { cat, items: published.filter((a) => a.category === cat?.name) };
}

export function readingTime(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 200));
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export type Comment = {
  id: string;
  author: string;
  initials: string;
  createdAt: string;
  content: string;
  replies?: Comment[];
};

export const commentThread: Comment[] = [
  {
    id: "1",
    author: "Rowan Pike",
    initials: "RP",
    createdAt: "2 days ago",
    content:
      "The paragraph on hand-recalculation is the whole piece in one line. Excellent reporting.",
    replies: [
      {
        id: "1a",
        author: "Mara Oyelaran",
        initials: "MO",
        createdAt: "1 day ago",
        content: "Thank you — the source documents are being prepared for publication this week.",
      },
    ],
  },
  {
    id: "2",
    author: "Kit Anand",
    initials: "KA",
    createdAt: "22 hours ago",
    content: "Would love a follow-up on how the auditors were briefed. That detail felt buried.",
  },
];

export type Order = {
  id: string;
  topic: string;
  words: number;
  tone: string;
  deadline: string;
  status: "submitted" | "in_progress" | "draft_ready" | "revision" | "delivered";
  price: number;
  writer: string;
};

export const orders: Order[] = [
  {
    id: "ORD-2041",
    topic: "What the data-centre boom costs a county water table",
    words: 1500,
    tone: "Authoritative",
    deadline: "2026-08-22",
    status: "in_progress",
    price: 420,
    writer: "Desmond Vale",
  },
  {
    id: "ORD-2038",
    topic: "Profile: the operator who kept the regional grid up",
    words: 2500,
    tone: "Narrative",
    deadline: "2026-08-19",
    status: "draft_ready",
    price: 690,
    writer: "Ines Aturo",
  },
  {
    id: "ORD-2030",
    topic: "How the autumn budget lands on household bills",
    words: 800,
    tone: "Punchy",
    deadline: "2026-08-10",
    status: "delivered",
    price: 240,
    writer: "Desmond Vale",
  },
];

export const orderStages = [
  "submitted",
  "in_progress",
  "draft_ready",
  "revision",
  "delivered",
] as const;

export const pricingTiers = [
  {
    name: "Brief",
    words: 800,
    turnaround: "5 days",
    price: 240,
    blurb: "A reported take from the desk — tight, sourced, and ready to run.",
    perks: ["Assigned reporter", "Headline + standfirst", "One desk revision"],
  },
  {
    name: "Feature",
    words: 1500,
    turnaround: "4 days",
    price: 420,
    blurb: "A reported feature with an editor on the copy, not a rewrite of your notes.",
    perks: ["Two revision rounds", "Editor pass", "Fact-check on names and figures", "Option to publish"],
    popular: true,
  },
  {
    name: "Investigation",
    words: 2500,
    turnaround: "7 days",
    price: 690,
    blurb: "Long-form with calls, documents and a second read before it leaves the building.",
    perks: [
      "Source interviews",
      "Document review",
      "Fact-check + desk edit",
      "Revisions for 14 days",
    ],
  },
];
