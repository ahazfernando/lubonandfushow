import { brand } from "@/lib/brand";

export function BrandLogo({
  className,
  src = brand.navLogo,
}: {
  className?: string;
  src?: string;
}) {
  return <img src={src} alt={brand.name} className={className} />;
}
