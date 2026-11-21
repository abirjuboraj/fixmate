import { ShieldCheck } from "lucide-react";

// Route-level skeleton loader scoped strictly to the Admin Overview page.
export function AdminOverviewSkeleton() {
  return (
    <div className="space-y-8 animate-pulse w-full" aria-label="Loading admin overview">
      {/* 4 Required Metric Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-border/70 bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-10 w-10 rounded-xl bg-muted" />
            </div>
            <div className="h-8 w-20 rounded bg-muted" />
            <div className="h-3.5 w-32 rounded bg-muted" />
            <div className="h-3.5 w-24 rounded bg-muted pt-2 border-t border-border/50" />
          </div>
        ))}
      </div>

      {/* 2 Visual Analytics Panels Skeleton (Catalog Distribution & Repair Pipeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-5">
          <div className="flex justify-between items-center">
            <div className="h-5 w-48 rounded bg-muted" />
            <div className="h-6 w-24 rounded-full bg-muted" />
          </div>
          <div className="space-y-4 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-3.5 w-24 rounded bg-muted" />
                  <div className="h-3.5 w-16 rounded bg-muted" />
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-5">
          <div className="h-5 w-52 rounded bg-muted" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-muted/60" />
            ))}
          </div>
        </div>
      </div>

      {/* Tabbed Activity Feed & Quick Actions Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-4">
        <div className="flex gap-2">
          <div className="h-9 w-32 rounded-lg bg-muted" />
          <div className="h-9 w-32 rounded-lg bg-muted" />
          <div className="h-9 w-32 rounded-lg bg-muted" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted/60" />
          ))}
        </div>
      </div>
    </div>
  );
}
