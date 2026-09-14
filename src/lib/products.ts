export const productCategories = ["furniture", "tools"] as const;

export type ProductCategory = (typeof productCategories)[number];

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  image?: string;
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

const comfyChairMustard = "/products/ComfyChairD1.png";
const comfyChairRust = "/products/ComfyChairD1Red.png";

type ProductSeed = Omit<Product, "sizes" | "rating" | "gallery"> & {
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
    image: "/products/ModernLoungeSofaD1V1C1.png",
    description:
      "A compact lounge seat with a high back, rolled arms and a deep crimson weave. Built for reading corners and slow evenings.",
    details: ["Upholstered weave", "High back", "Rolled arms", "Timber legs"],
    popular: true,
    inStock: true,
    colors: [],
    rating: 4.6,
  },
  {
    id: "prd-dining",
    slug: "dining-table-set",
    name: "Dining Table Set",
    price: 1899,
    category: "furniture",
    image: "/products/DiningTableSetD1V1C1.png",
    description:
      "A walnut dining table with six sculpted chairs and navy seats - sized for weeknight dinners and the long Saturday lunch.",
    details: ["Walnut finish", "Seats 6", "Navy upholstered seats", "Pedestal base"],
    popular: true,
    inStock: true,
    colors: [],
    rating: 4.7,
  },
  {
    id: "prd-chair",
    slug: "comfy-chair",
    name: "Comfy Chair",
    price: 890,
    category: "furniture",
    image: comfyChairMustard,
    gallery: [comfyChairMustard, comfyChairRust],
    description:
      "A button-tufted velvet lounge chair on tapered timber legs. Available in mustard and rust.",
    details: ["Velvet upholstery", "Button tufting", "Tapered wood legs", "Two colourways"],
    popular: true,
    inStock: true,
    colors: [
      { id: "mustard", name: "Mustard", hex: "#d4a017", image: comfyChairMustard },
      { id: "rust", name: "Rust", hex: "#b4532a", image: comfyChairRust },
    ],
    rating: 4.6,
  },
  {
    id: "prd-coffee",
    slug: "oak-coffee-table",
    name: "Oak Coffee Table",
    price: 649,
    category: "furniture",
    image: "/products/OakCoffeeTableD1V1C1.png",
    description:
      "A round oak table with curved legs, a lower shelf and a warm grain. Strong enough for books, trays and the occasional laptop.",
    details: ["Oak finish", "Round top", "Lower shelf", "Curved legs"],
    popular: true,
    inStock: true,
    colors: [],
    rating: 4.5,
  },
  {
    id: "prd-drill",
    slug: "cordless-drill-kit",
    name: "Cordless Drill Kit",
    price: 249,
    category: "tools",
    image: "/products/CordlessDrillKitD1V1C1.png",
    description:
      "A compact cordless drill with a variable torque collar and a charged battery - the kit that actually finishes the job.",
    details: ["Variable torque", "Keyless chuck", "Battery included", "Ergonomic grip"],
    popular: true,
    inStock: true,
    colors: [],
    rating: 4.8,
  },
];

export const products: Product[] = catalog.map((item) => {
  const gallery = [...new Set([item.image, ...(item.gallery ?? [])])];
  return {
    ...item,
    gallery,
    sizes: [],
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
  return products.filter((product) => product.popular).slice(0, 5);
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
