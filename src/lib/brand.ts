export const brand = {
  name: "The Liban & Fu Show",
  logo: "/logo/upsideboatfaviconlogo.png",
  navLogo: "/logo/upsideboatd1.png",
  authLogo: "/logo/upsideboat.png",
  footerLogo: "/logo/upsideboat.png",
} as const;

export const brandOpenGraphImages = [
  {
    url: brand.logo,
    alt: brand.name,
    width: 932,
    height: 930,
    type: "image/png",
  },
];

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
