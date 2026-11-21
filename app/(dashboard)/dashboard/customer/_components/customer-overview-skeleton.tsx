export function CustomerOverviewSkeleton() {
  return (
    <div className="space-y-8 animate-pulse w-full" aria-label="Loading customer dashboard">
      {/* Welcome Banner Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 space-y-3">
        <div className="h-6 w-36 rounded-full bg-muted" />
        <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* 3 Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-border/70 bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-10 w-10 rounded-xl bg-muted" />
            </div>
            <div className="h-8 w-16 rounded bg-muted" />
            <div className="h-3.5 w-36 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* How FixMate Works Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-5">
        <div className="h-5 w-48 rounded bg-muted" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-muted/50" />
          ))}
        </div>
      </div>

      {/* Appliance Categories Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-5">
        <div className="h-5 w-56 rounded bg-muted" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-muted/50" />
          ))}
        </div>
      </div>
    </div>
  );
}
