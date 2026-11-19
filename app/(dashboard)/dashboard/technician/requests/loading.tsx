// SERVER COMPONENT — route-level loading skeleton for
// Technician → Manage Requests while incoming bookings are fetched.

export default function LoadingTechnicianRequests() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading repair requests">
      {/* Page header skeleton */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-40 rounded-full bg-muted" />
        <div className="h-8 w-64 rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex flex-wrap gap-2">
        {[90, 110, 100, 120, 100].map((w, i) => (
          <div
            key={i}
            className="h-9 rounded-full bg-muted"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden lg:block rounded-xl border border-border/70 bg-card overflow-hidden">
        <div className="flex gap-5 border-b border-border/60 bg-muted/40 px-4 py-3.5">
          {[150, 130, 120, 170, 90, 120].map((w, i) => (
            <div key={i} className="h-4 rounded bg-muted" style={{ width: `${w}px` }} />
          ))}
        </div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-5 border-b border-border/40 last:border-0 px-4 py-3.5"
          >
            <div className="space-y-2" style={{ width: "200px" }}>
              <div className="h-4 w-36 rounded bg-muted" />
              <div className="h-3 w-44 rounded bg-muted" />
            </div>
            <div className="space-y-2" style={{ width: "160px" }}>
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-3 w-24 rounded bg-muted" />
            </div>
            <div className="h-4 w-28 rounded bg-muted" />
            <div className="h-4 w-40 rounded bg-muted" />
            <div className="h-6 w-24 rounded-full bg-muted" />
            <div className="ml-auto flex gap-1.5">
              <div className="h-8 w-20 rounded-lg bg-muted" />
              <div className="h-8 w-20 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile card skeleton */}
      <div className="lg:hidden space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-48 max-w-full rounded bg-muted" />
              </div>
              <div className="h-6 w-24 rounded-full bg-muted" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-3.5 w-28 rounded bg-muted" />
              <div className="h-3.5 w-32 rounded bg-muted" />
            </div>
            <div className="flex gap-2 border-t border-border/50 pt-3">
              <div className="h-8 flex-1 rounded-lg bg-muted" />
              <div className="h-8 flex-1 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
