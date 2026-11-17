// SERVER COMPONENT — route-level loading skeleton for the technician overview.
export default function LoadingTechnicianDashboard() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading dashboard">
      {/* Page header skeleton */}
      <div className="border-b border-border/60 pb-5 space-y-2.5">
        <div className="h-6 w-32 rounded-full bg-muted" />
        <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      {/* Stats cards skeleton (3 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card p-5 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-muted shrink-0" />
            <div className="space-y-2">
              <div className="h-8 w-14 rounded bg-muted" />
              <div className="h-4 w-28 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick nav cards skeleton (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card p-5 space-y-3"
          >
            <div className="h-5 w-5 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-3/4 rounded bg-muted" />
            <div className="h-9 w-full rounded-lg bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
