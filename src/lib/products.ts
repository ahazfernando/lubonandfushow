export const productCategories = [
  "furniture",
  "clothing",
  "accessories",
  "tools",
  "tech",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  popular: boolean;
  inStock: boolean;
  colors: ProductColor[];
  sizes: string[];
  rating: number;
};

export const SHIPPING_PRICE = 4.99;

const clothingColors: ProductColor[] = [
  { id: "navy", name: "Navy", hex: "#1e3a5f" },
  { id: "black", name: "Black", hex: "#171717" },
  { id: "green", name: "Green", hex: "#3f5d4a" },
];

const furnitureColors: ProductColor[] = [
  { id: "taupe", name: "Taupe", hex: "#b8a48a" },
  { id: "charcoal", name: "Charcoal", hex: "#4a4a4a" },
  { id: "cream", name: "Cream", hex: "#e8e0d4" },
];

const accessoryColors: ProductColor[] = [
  { id: "black", name: "Black", hex: "#171717" },
  { id: "tortoise", name: "Tortoise", hex: "#6b4226" },
];

const toolColors: ProductColor[] = [
  { id: "yellow", name: "Yellow", hex: "#d4a017" },
  { id: "black", name: "Black", hex: "#171717" },
];

const techColors: ProductColor[] = [
  { id: "black", name: "Black", hex: "#171717" },
  { id: "silver", name: "Silver", hex: "#c0c0c0" },
];

const clothingSizes = ["Small", "Medium", "Large", "X-Large"];

const extraGallery: Record<ProductCategory, string[]> = {
  furniture: [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
  ],
  clothing: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80",
  ],
  tools: [
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1530124566582-a61828166931?auto=format&fit=crop&w=900&q=80",
  ],
  tech: [
    "https://images.unsplash.com/photo-1523275335680-378e68bdca4e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  ],
};

type ProductSeed = Omit<Product, "colors" | "sizes" | "rating" | "gallery"> & {
  gallery?: string[];
  rating?: number;
};

const catalog: ProductSeed[] = [
  {
    id: "prd-sofa",
    slug: "modern-lounge-sofa",
    name: "Modern Lounge Sofa",
    price: 2499,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80",
    description:
      "A deep-seat sectional built for slow weekends. Soft performance fabric, generous cushions and a low modern profile that anchors a living room without crowding it.",
    details: ["Performance fabric", "Solid timber frame", "Modular left or right chaise", "Made to order"],
    popular: true,
    inStock: true,
    rating: 4.6,
  },
  {
    id: "prd-dining",
    slug: "dining-table-set",
    name: "Dining Table Set",
    price: 1899,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    description:
      "An oak dining table with six sculpted chairs — sized for weeknight dinners and the long Saturday lunch that follows.",
    details: ["Oak veneer table", "Seats 6", "Upholstered chairs", "Easy-clean finish"],
    popular: true,
    inStock: true,
    rating: 4.7,
  },
  {
    id: "prd-hoodie",
    slug: "premium-hoodie",
    name: "Premium Hoodie",
    price: 59,
    compareAtPrice: 79,
    category: "clothing",
    image: "/images/premium-hoodie.png",
    description:
      "Heavyweight fleece with a clean upsideboat mark. Cut to layer over everything you already wear.",
    details: ["400 GSM fleece", "Unisex fit", "Kangaroo pocket", "Machine washable"],
    popular: true,
    inStock: true,
    rating: 4.5,
  },
  {
    id: "prd-sunglasses",
    slug: "designer-sunglasses",
    name: "Designer Sunglasses",
    price: 129,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Polarised lenses in a classic acetate frame. Built for glare, travel days and the walk between meetings.",
    details: ["Polarised UV400", "Acetate frame", "Includes hard case", "Unisex"],
    popular: true,
    inStock: true,
    rating: 4.4,
  },
  {
    id: "prd-drill",
    slug: "cordless-drill-kit",
    name: "Cordless Drill Kit",
    price: 249,
    category: "tools",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1200&q=80",
    description:
      "A 20V brushless drill with two batteries, charger and a compact case — the kit tradies actually finish a job with.",
    details: ["20V brushless motor", "2 × 2.0Ah batteries", "LED work light", "Carry case included"],
    popular: true,
    inStock: true,
    rating: 4.8,
  },
  {
    id: "prd-watch",
    slug: "smart-watch",
    name: "Smart Watch",
    price: 299,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1523275335680-378e68bdca4e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Health tracking, calls and a week of battery in a quiet square case. Designed to look like a watch, not a gadget.",
    details: ["5-day battery", "Heart rate & sleep", "Water resistant 5 ATM", "iOS and Android"],
    popular: true,
    inStock: true,
    rating: 4.3,
  },
  {
    id: "prd-coffee",
    slug: "oak-coffee-table",
    name: "Oak Coffee Table",
    price: 649,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80",
    description:
      "A low oak table with a quiet grain and rounded corners. Strong enough for books, trays and the occasional laptop.",
    details: ["Solid oak top", "Rounded edge", "H 40 × W 120 × D 60 cm", "Natural oil finish"],
    popular: false,
    inStock: true,
    rating: 4.5,
  },
  {
    id: "prd-chair",
    slug: "linen-lounge-chair",
    name: "Linen Lounge Chair",
    price: 890,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    description:
      "A wide, slouchy lounge chair in natural linen. The extra chair you always needed for the corner by the window.",
    details: ["Linen upholstery", "Kiln-dried frame", "Removable cover", "Seat height 42 cm"],
    popular: false,
    inStock: true,
    rating: 4.6,
  },
  {
    id: "prd-tee",
    slug: "explorer-tee",
    name: "Explorer Tee",
    price: 39,
    compareAtPrice: 49,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    description:
      "A heavyweight cotton tee with a relaxed shoulder. Washes well, holds its shape, and layers under the hoodie.",
    details: ["180 GSM cotton", "Relaxed fit", "Pre-shrunk", "Available in white"],
    popular: false,
    inStock: true,
    rating: 4.5,
  },
  {
    id: "prd-bag",
    slug: "canvas-weekender",
    name: "Canvas Weekender",
    price: 149,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    description:
      "Waxed canvas, leather handles and room for a long weekend. The bag that makes a two-night trip feel considered.",
    details: ["Waxed canvas", "Leather straps", "Shoe compartment", "Fits under the seat"],
    popular: false,
    inStock: true,
    rating: 4.4,
  },
  {
    id: "prd-chest",
    slug: "tradesman-tool-chest",
    name: "Tradesman Tool Chest",
    price: 379,
    category: "tools",
    image:
      "https://images.unsplash.com/photo-1530124566582-a61828166931?auto=format&fit=crop&w=1200&q=80",
    description:
      "A steel chest with lined drawers and a lockable top. Built to live on site, in the van, or at the back of the garage.",
    details: ["Powder-coated steel", "5 drawers", "Ball-bearing slides", "Lock and keys included"],
    popular: false,
    inStock: true,
    rating: 4.7,
  },
  {
    id: "prd-headphones",
    slug: "wireless-headphones",
    name: "Wireless Headphones",
    price: 219,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Closed-back wireless cans with a long battery and a calm, even sound. For flights, deep work and the walk home.",
    details: ["30-hour battery", "Active noise cancelling", "USB-C charging", "Foldable case"],
    popular: false,
    inStock: true,
    rating: 4.6,
  },
];

function colorsFor(category: ProductCategory) {
  if (category === "clothing") return clothingColors;
  if (category === "furniture") return furnitureColors;
  if (category === "accessories") return accessoryColors;
  if (category === "tools") return toolColors;
  return techColors;
}

export const products: Product[] = catalog.map((item) => {
  const gallery = [...new Set([item.image, ...(item.gallery ?? []), ...extraGallery[item.category]])].slice(
    0,
    4,
  );
  return {
    ...item,
    gallery,
    colors: colorsFor(item.category),
    sizes: item.category === "clothing" ? clothingSizes : [],
    rating: item.rating ?? 4.5,
  };
});

export function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function popularProducts() {
  return products.filter((product) => product.popular);
}

export function relatedProducts(product: Product, count = 4) {
  const same = products.filter((item) => item.category === product.category && item.id !== product.id);
  const rest = products.filter((item) => item.category !== product.category && item.id !== product.id);
  return [...same, ...rest].slice(0, count);
}

export function formatPrice(price: number) {
  const hasCents = !Number.isInteger(price) || price < 1000;
  return `$${price.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export function defaultVariant(product: Product) {
  return {
    color: product.colors[0]?.id,
    size: product.sizes[0],
  };
}
