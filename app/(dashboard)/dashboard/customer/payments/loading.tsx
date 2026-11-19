// SERVER COMPONENT — route-level loading skeleton for
// Customer → Payment History while payment records are fetched.

export default function LoadingCustomerPayments() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading payment history">
      {/* Page header skeleton */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-32 rounded-full bg-muted" />
        <div className="h-8 w-60 rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden md:block rounded-2xl border border-border/70 bg-card overflow-hidden">
        <div className="flex gap-6 border-b border-border/60 bg-muted/40 px-4 py-3.5">
          {[150, 110, 90, 130, 100, 80].map((w, i) => (
            <div key={i} className="h-4 rounded bg-muted" style={{ width: `${w}px` }} />
          ))}
        </div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-border/40 last:border-0 px-4 py-3.5"
          >
            <div className="h-4 w-48 rounded bg-muted" />
            <div className="h-4 w-28 rounded bg-muted" />
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-4 w-36 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="ml-auto h-6 w-16 rounded-full bg-muted" />
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
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="h-4 w-44 max-w-full rounded bg-muted" />
              </div>
              <div className="h-6 w-16 rounded-full bg-muted" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
            <div className="space-y-1.5 border-t border-border/50 pt-2">
              <div className="h-3 w-44 rounded bg-muted" />
              <div className="h-3 w-28 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
