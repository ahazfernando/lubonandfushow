import { brand } from "@/lib/brand";

export function BrandLogo({ className }: { className?: string }) {
  return <img src={brand.logo} alt={brand.name} className={className} />;
}
