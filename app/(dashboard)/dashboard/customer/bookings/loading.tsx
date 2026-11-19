// SERVER COMPONENT — route-level loading skeleton for
// Customer → My Bookings while the bookings list is fetched.

export default function LoadingCustomerBookings() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading your bookings">
      {/* Page header skeleton */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-36 rounded-full bg-muted" />
        <div className="h-8 w-64 rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden md:block rounded-2xl border border-border/70 bg-card overflow-hidden">
        {/* header row */}
        <div className="flex gap-6 border-b border-border/60 bg-muted/40 px-4 py-3.5">
          {[170, 110, 110, 90, 100, 90, 100].map((w, i) => (
            <div key={i} className="h-4 rounded bg-muted" style={{ width: `${w}px` }} />
          ))}
        </div>
        {/* 4 skeleton rows */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-border/40 last:border-0 px-4 py-3.5"
          >
            <div className="flex items-center gap-3" style={{ width: "280px" }}>
              <div className="h-12 w-12 rounded-xl bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-24 rounded bg-muted" />
              </div>
            </div>
            <div className="h-4 w-28 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-6 w-24 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="h-8 w-24 rounded-lg bg-muted" />
          </div>
        ))}
      </div>

      {/* Mobile card skeleton */}
      <div className="md:hidden space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/70 bg-card p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 rounded-xl bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 rounded bg-muted" />
                <div className="h-4 w-44 max-w-full rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
            </div>
            <div className="flex justify-between border-t border-border/50 pt-3">
              <div className="h-6 w-24 rounded-full bg-muted" />
              <div className="h-7 w-28 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
