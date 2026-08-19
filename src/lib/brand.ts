export const brand = {
  name: "The Liban & Fu Show",
  logo: "/logo/libanandfushow.png",
} as const;

export const brandOpenGraphImages = [
  {
    url: brand.logo,
    alt: brand.name,
    width: 797,
    height: 372,
    type: "image/png",
  },
];

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
