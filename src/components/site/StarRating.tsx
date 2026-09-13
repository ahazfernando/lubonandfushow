import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  className,
  size = "md",
}: {
  rating: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const icon = size === "sm" ? "size-3.5" : "size-4";
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i;
        return (
          <Star
            key={i}
            className={cn(
              icon,
              filled || half ? "fill-amber-400 text-amber-400" : "fill-transparent text-muted-foreground/35",
            )}
          />
        );
      })}
    </div>
  );
}
