import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating?: number | null;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

const STAR_SIZES = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

const TEXT_SIZES = {
  sm: "text-xs",
  md: "text-sm",
};


export function RatingDisplay({
  rating,
  reviewCount = 0,
  size = "sm",
  showCount = true,
  className,
}: RatingDisplayProps) {
  const value = typeof rating === "number" && Number.isFinite(rating) ? rating : 0;
  const hasRating = value > 0;
  const filledStars = Math.round(value);

  return (
    <div
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={
        hasRating
          ? `Average rating ${value.toFixed(1)} out of 5 from ${reviewCount} review${reviewCount === 1 ? "" : "s"}`
          : "No reviews yet"
      }
    >
      <span className="inline-flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            aria-hidden="true"
            className={cn(
              STAR_SIZES[size],
              "shrink-0",
              star <= filledStars
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/45"
            )}
          />
        ))}
      </span>

      <span
        className={cn(
          "font-semibold tabular-nums",
          TEXT_SIZES[size],
          hasRating ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {hasRating ? value.toFixed(1) : "New"}
      </span>

      {showCount && hasRating && (
        <span className={cn("text-muted-foreground", TEXT_SIZES[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
