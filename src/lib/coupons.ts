export const couponCategories = [
  "Dining",
  "Travel",
  "Shopping",
  "Tech",
  "Wellness",
  "Entertainment",
] as const;

export type CouponCategory = (typeof couponCategories)[number];

export type Coupon = {
  id: string;
  title: string;
  merchant: string;
  description: string;
  code: string;
  discount: string;
  category: string;
  image: string;
  expiresAt: string;
  terms: string;
  url: string;
  featured: boolean;
  active: boolean;
  createdAt: string;
};

export type CouponInput = {
  title: string;
  merchant: string;
  description: string;
  code: string;
  discount: string;
  category: string;
  expiresAt: string;
  terms: string;
  url: string;
  featured: boolean;
  active: boolean;
  image?: string;
};

export const seedCoupons: Coupon[] = [
  {
    id: "cp-dining-01",
    title: "Weeknight table for two",
    merchant: "Salt & Fire Kitchen",
    description:
      "Prix-fixe dinner for two, Tuesday to Thursday. Book ahead - walk-ins after 9pm only.",
    code: "FIRE20",
    discount: "20% OFF",
    category: "Dining",
    image: "/images/fb657da85d75647359b4fd7ce4bac8f0.jpg",
    expiresAt: "2026-09-30",
    terms: "Dine-in only. Not valid with other offers. Service charge excluded.",
    url: "",
    featured: true,
    active: true,
    createdAt: "2026-08-12T09:00:00.000Z",
  },
  {
    id: "cp-travel-01",
    title: "Shoulder-season city break",
    merchant: "Harbour Line",
    description: "Overnight rail to the coast, bunk or cabin. Valid on off-peak departures.",
    code: "HARBOUR15",
    discount: "15% OFF",
    category: "Travel",
    image: "/order/912f27481efe8d0e3f9dc405433d7e3c.jpg",
    expiresAt: "2026-10-15",
    terms: "Subject to availability. Blackout dates apply on public holidays.",
    url: "",
    featured: true,
    active: true,
    createdAt: "2026-08-10T09:00:00.000Z",
  },
  {
    id: "cp-tech-01",
    title: "Desk reset kit",
    merchant: "Pressroom Shop",
    description: "Notebook, lamp and a year's subscription to the Morning Edition, boxed.",
    code: "DESK100",
    discount: "Rs. 1,000 OFF",
    category: "Tech",
    image: "/images/30a337f3f4912da1687cef8b63c17fca.jpg",
    expiresAt: "2026-12-31",
    terms: "One use per reader. Cannot be exchanged for cash.",
    url: "",
    featured: true,
    active: true,
    createdAt: "2026-08-08T09:00:00.000Z",
  },
  {
    id: "cp-shopping-01",
    title: "Weekend home edit",
    merchant: "Studio Lane Market",
    description:
      "15% off furniture and decor when you spend over $200. Online and in-store.",
    code: "LANE15",
    discount: "15% OFF",
    category: "Shopping",
    image: "/images/HomeHeroSectionHero.jpeg",
    expiresAt: "2026-11-30",
    terms: "Minimum spend $200. Excludes clearance and gift cards.",
    url: "",
    featured: true,
    active: true,
    createdAt: "2026-09-14T09:00:00.000Z",
  },
  {
    id: "cp-wellness-01",
    title: "First-month studio pass",
    merchant: "North Line Athletics",
    description: "Unlimited classes for new members in their first 30 days.",
    code: "NORTHFIRST",
    discount: "FREE MONTH",
    category: "Wellness",
    image: "/order/29c93b7496b86ac14c1fb035e2b2933b.jpg",
    expiresAt: "2026-11-01",
    terms: "New members only. ID required at reception.",
    url: "",
    featured: false,
    active: true,
    createdAt: "2026-08-05T09:00:00.000Z",
  },
  {
    id: "cp-entertainment-01",
    title: "Two-for-one cinema night",
    merchant: "Harbour Lights Cinema",
    description:
      "Buy one ticket, get one free on weekday evening shows. Seats subject to availability.",
    code: "LIGHTS2",
    discount: "2 FOR 1",
    category: "Entertainment",
    image: "/images/752b89637641ef17c9b023b064ecef2b.jpg_2K_20260914110122.jpeg",
    expiresAt: "2026-12-15",
    terms: "Weekdays only. Lowest-priced ticket free. Not valid on premieres.",
    url: "",
    featured: true,
    active: true,
    createdAt: "2026-09-14T11:00:00.000Z",
  },
];

export function couponIsExpired(coupon: Coupon, now = Date.now()) {
  const end = new Date(`${coupon.expiresAt}T23:59:59`).getTime();
  return Number.isFinite(end) && end < now;
}

export function isPublicCoupon(coupon: Coupon) {
  return coupon.active && !couponIsExpired(coupon);
}
