"use client";

import { Wrench, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesEmptyStateProps {
  onResetFilters: () => void;
}

export function ServicesEmptyState({ onResetFilters }: ServicesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-14 text-center rounded-2xl border border-dashed border-border/80 bg-card/60 backdrop-blur-xs max-w-xl mx-auto my-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20">
        <Wrench className="h-8 w-8 stroke-[1.8]" />
      </div>

      <h3 className="text-xl font-bold text-foreground">
        No Services Found
      </h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm">
        We couldn&apos;t find any approved repair services matching your query.
        Try searching with different terms or reset your filters.
      </p>

      <div className="mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          className="gap-2 cursor-pointer shadow-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
