export const navCategories = [
  { name: "Property", slug: "property" },
  { name: "Construction", slug: "construction" },
  { name: "Trades", slug: "trades" },
  { name: "Entrepreneurship", slug: "entrepreneurship" },
  { name: "Business", slug: "business" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Food", slug: "food-health" },
  { name: "Fashion", slug: "fashion" },
  { name: "Furniture", slug: "furniture" },
  { name: "Tech", slug: "technology" },
  { name: "Travel", slug: "travel" },
  { name: "Cars", slug: "cars" },
] as const;

export const moreCategories = [
  { name: "Sports", slug: "sports" },
  { name: "Finance", slug: "finance" },
] as const;

export type CategoryIconId =
  | "property"
  | "construction"
  | "trades"
  | "entrepreneurship"
  | "business"
  | "interiors"
  | "food"
  | "fashion"
  | "entertainment"
  | "travel"
  | "cars"
  | "shop";

export const categoryIcons: { id: CategoryIconId; name: string; href: string }[] = [
  { id: "property", name: "Property", href: "/category/property" },
  { id: "construction", name: "Construction", href: "/category/construction" },
  { id: "trades", name: "Trades", href: "/category/trades" },
  { id: "entrepreneurship", name: "Entrepreneurship", href: "/category/entrepreneurship" },
  { id: "business", name: "Business", href: "/category/business" },
  { id: "interiors", name: "Interiors", href: "/category/furniture" },
  { id: "food", name: "Food", href: "/category/food-health" },
  { id: "fashion", name: "Fashion", href: "/category/fashion" },
  { id: "entertainment", name: "Entertainment", href: "/category/entertainment" },
  { id: "travel", name: "Travel", href: "/category/travel" },
  { id: "cars", name: "Cars", href: "/category/cars" },
  { id: "shop", name: "Shop", href: "/shop" },
];

export const heroImage = "/images/home-hero.png";

export const trendingNow = [
  {
    title: "10 Smart Investment Ideas for 2025",
    href: "/category/finance",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "How to Start a Business with Low Capital",
    href: "/category/entrepreneurship",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "The Best Street Food Cities in the World",
    href: "/category/food-health",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Luxury Furniture Trends for Modern Homes",
    href: "/category/furniture",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Must-Watch Movies & Shows This Month",
    href: "/category/entertainment",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=200&q=80",
  },
];

export const featuredStories = [
  {
    category: "Property",
    title: "Top 10 Suburbs to Watch in 2025",
    excerpt: "Growth, lifestyle and opportunity.",
    href: "/category/property",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Construction",
    title: "How to Build Smarter and Save More",
    excerpt: "Expert tips from industry professionals.",
    href: "/category/construction",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Food",
    title: "10 Food Spots You Must Try in Melbourne",
    excerpt: "Good food, great experiences.",
    href: "/category/food-health",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Entrepreneurship",
    title: "From Side Hustle to Success",
    excerpt: "Real stories. Real people. Real business.",
    href: "/category/entrepreneurship",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Entertainment",
    title: "The Best Movies & Shows to Watch Right Now",
    excerpt: "Your next obsession is here.",
    href: "/category/entertainment",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Interiors",
    title: "Luxury Furniture Trends for Modern Homes",
    excerpt: "Timeless pieces for a better living space.",
    href: "/category/furniture",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
];

export const shopBanners = [
  {
    id: "collection",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    titleKey: "shopCollectionTitle" as const,
    bodyKey: "shopCollectionBody" as const,
    ctaKey: "shopNow" as const,
  },
  {
    id: "clothing",
    href: "/shop?category=clothing",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
    titleKey: "shopClothingTitle" as const,
    bodyKey: "shopClothingBody" as const,
    ctaKey: "shopClothingCta" as const,
  },
  {
    id: "tools",
    href: "/shop?category=tools",
    image: "/images/shop-tools-banner.png",
    titleKey: "shopToolsTitle" as const,
    bodyKey: "shopToolsBody" as const,
    ctaKey: "shopToolsCta" as const,
  },
];
