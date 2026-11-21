// Scoped skeleton for the Technician Overview page.
// Mirrors the real layout: welcome banner, 4 stat cards, action queue.
export function TechnicianOverviewSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse" aria-label="Loading technician overview">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="h-6 w-52 rounded-full bg-muted" />
            <div className="h-8 w-72 max-w-full rounded-lg bg-muted" />
            <div className="h-4 w-96 max-w-full rounded bg-muted" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-36 rounded-lg bg-muted" />
            <div className="h-10 w-36 rounded-lg bg-muted" />
          </div>
        </div>
      </div>

      {/* 4 stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/80 bg-card p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-20 rounded bg-muted" />
              <div className="h-10 w-10 rounded-xl bg-muted" />
            </div>
            <div className="h-8 w-16 rounded bg-muted" />
            <div className="h-3 w-28 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Action queue card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-5 w-48 max-w-full rounded bg-muted" />
            <div className="h-3.5 w-80 max-w-full rounded bg-muted" />
          </div>
          <div className="h-8 w-28 shrink-0 rounded-lg bg-muted" />
        </div>
        <div className="space-y-3 pt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="h-4 w-56 max-w-full rounded bg-muted" />
                <div className="h-3 w-40 rounded bg-muted" />
              </div>
              <div className="h-8 w-24 rounded-lg bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
