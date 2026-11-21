// Route-level skeleton while the transactions page fetches its data.
export default function LoadingAdminTransactions() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading transactions">
      {/* Header */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-28 rounded-full bg-muted" />
        <div className="h-8 w-64 rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* Revenue cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-32 rounded-xl border border-border/60 bg-card p-5 space-y-3"
          >
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-8 w-40 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="h-10 w-full max-w-md rounded-lg bg-muted" />

      {/* Desktop table skeleton */}
      <div className="hidden md:block rounded-xl border border-border/70 bg-card overflow-hidden">
        <div className="flex gap-6 border-b border-border/60 bg-muted/30 px-4 py-3.5">
          {[80, 80, 70, 50, 90, 50].map((w, i) => (
            <div
              key={i}
              className="h-4 rounded bg-muted"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-border/40 last:border-0 px-4 py-3.5"
          >
            {[100, 90, 80, 50, 110, 50].map((w, j) => (
              <div
                key={j}
                className="h-4 rounded bg-muted"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card p-4 space-y-3"
          >
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
            <div className="h-6 w-24 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
