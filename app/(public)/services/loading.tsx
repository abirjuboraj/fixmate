import { Wrench } from "lucide-react";
import { ServicesSkeletonGrid } from "./_components/services-skeleton-grid";

// Route-level loader for /services — shows while the server component
// fetches results (first visit, search typing, filter/sort changes).
export default function ServicesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header Skeleton */}
      <div className="space-y-2 animate-pulse">
        <div className="h-6 w-56 rounded-full bg-muted" />
        <div className="h-9 w-72 max-w-full rounded-md bg-muted" />
        <div className="h-4 w-full max-w-xl rounded-md bg-muted" />
        <div className="h-4 w-2/3 max-w-lg rounded-md bg-muted" />
      </div>

      {/* Search / Filters Box Skeleton */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-5 animate-pulse">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="h-11 w-full lg:max-w-md rounded-lg bg-muted" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-40 rounded-lg bg-muted" />
            <div className="h-10 w-44 rounded-lg bg-muted" />
          </div>
        </div>
        <div className="pt-4 border-t border-border/60 space-y-3">
          <div className="h-3.5 w-24 rounded-md bg-muted" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-8 w-24 rounded-full bg-muted" />
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid Skeleton */}
      <ServicesSkeletonGrid />
    </div>
  );
}
