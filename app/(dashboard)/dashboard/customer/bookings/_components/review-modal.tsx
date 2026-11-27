"use client";

import * as React from "react";
import { Loader2, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingItem } from "@/types";
import { cn } from "@/lib/utils";

interface ReviewModalProps {
  booking: BookingItem;
  isSubmitting: boolean;
  onSubmit: (rating: number, review: string) => void;
  onClose: () => void;
}

const MAX_REVIEW_LENGTH = 300;

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

export function ReviewModal({
  booking,
  isSubmitting,
  onSubmit,
  onClose,
}: ReviewModalProps) {
  const [rating, setRating] = React.useState(0);
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const activeRating = hoveredRating || rating;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating < 1 || rating > 5) {
      setError("Please choose a star rating.");
      return;
    }

    const trimmed = review.trim();

    if (!trimmed) {
      setError("Please write a short review.");
      return;
    }

    setError(null);
    onSubmit(rating, trimmed);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h3
              id="review-modal-title"
              className="text-base sm:text-lg font-bold text-foreground"
            >
              Rate your repair
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              How was your service for{" "}
              <strong className="font-semibold text-foreground">
                &ldquo;{booking.serviceTitle}&rdquo;
              </strong>
              ?
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close review dialog"
            className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star picker — 44px+ targets stay comfortable on touch screens */}
          <fieldset
            disabled={isSubmitting}
            className="space-y-2"
            onMouseLeave={() => setHoveredRating(0)}
          >
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Your rating
            </legend>
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`${star} star${star === 1 ? "" : "s"}`}
                  aria-pressed={rating === star}
                  onClick={() => {
                    setRating(star);
                    setError(null);
                  }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onFocus={() => setHoveredRating(star)}
                  onBlur={() => setHoveredRating(0)}
                  className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-60 cursor-pointer"
                >
                  <Star
                    className={cn(
                      "h-7 w-7 sm:h-8 sm:w-8 transition-transform",
                      star <= activeRating
                        ? "fill-amber-400 text-amber-400 scale-110"
                        : "fill-transparent text-muted-foreground/45"
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-medium text-muted-foreground">
              {rating > 0 ? RATING_LABELS[rating] : "Tap a star to rate"}
            </p>
          </fieldset>

          {/* Review text */}
          <div className="space-y-2">
            <label
              htmlFor="review-text"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Your review
            </label>
            <textarea
              id="review-text"
              value={review}
              onChange={(event) => {
                setReview(event.target.value.slice(0, MAX_REVIEW_LENGTH));
                if (error) setError(null);
              }}
              rows={4}
              maxLength={MAX_REVIEW_LENGTH}
              placeholder="What went well? What could be better?"
              disabled={isSubmitting}
              className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-60"
            />
            <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span>A short note helps other customers.</span>
              <span className="tabular-nums shrink-0">
                {review.length}/{MAX_REVIEW_LENGTH}
              </span>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {error}
            </p>
          )}

          {/* Actions — stacked on phones, side by side on larger screens */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 pt-1 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto h-9 font-medium text-xs"
            >
              Not now
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-9 gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Star className="h-3.5 w-3.5" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
