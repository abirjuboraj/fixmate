// Route-level skeleton — mirrors the current transactions page layout.
export default function LoadingAdminTransactions() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading transactions">
      {/* Page header */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-32 rounded-full bg-muted" />
        <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* Metric cards — 1 / 2 / 3 columns like the real page */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-32 rounded bg-muted" />
              <div className="h-9 w-9 rounded-xl bg-muted" />
            </div>
            <div className="h-8 w-40 rounded bg-muted" />
            <div className="h-3 w-52 max-w-full rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Search row: input + count on the right */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-10 w-full max-w-sm rounded-xl bg-muted" />
        <div className="h-3 w-40 rounded bg-muted" />
      </div>

      {/* Desktop table — 7 columns, visible from lg */}
      <div className="hidden overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xs lg:block">
        <div className="flex gap-6 border-b border-border/60 bg-muted/40 px-4 py-3.5">
          {[80, 80, 70, 50, 100, 70, 50].map((w, i) => (
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
            className="flex items-center gap-6 border-b border-border/40 px-4 py-3.5 last:border-0"
          >
            {/* Customer + Technician: two stacked lines each */}
            <div className="w-[150px] shrink-0 space-y-1.5">
              <div className="h-3.5 w-24 rounded bg-muted" />
              <div className="h-3 w-28 rounded bg-muted" />
            </div>
            <div className="w-[150px] shrink-0 space-y-1.5">
              <div className="h-3.5 w-24 rounded bg-muted" />
              <div className="h-3 w-28 rounded bg-muted" />
            </div>
            <div className="h-3.5 w-[170px] rounded bg-muted" />
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-7 w-[150px] rounded-md bg-muted" />
            <div className="h-3.5 w-20 rounded bg-muted" />
            <div className="h-6 w-16 rounded-full bg-muted" />
          </div>
        ))}
      </div>

      {/* Tablet / mobile cards */}
      <div className="space-y-3 lg:hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-2xl border border-border/80 bg-card p-4 shadow-xs"
          >
            <div className="flex items-start justify-between border-b border-border/60 pb-2.5">
              <div className="space-y-1.5">
                <div className="h-2.5 w-16 rounded bg-muted" />
                <div className="h-4 w-44 max-w-full rounded bg-muted" />
              </div>
              <div className="h-6 w-14 rounded-full bg-muted" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((j) => (
                <div key={j} className="space-y-1.5">
                  <div className="h-2.5 w-16 rounded bg-muted" />
                  <div className="h-3.5 w-24 rounded bg-muted" />
                  <div className="h-2.5 w-28 rounded bg-muted" />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border/40 pt-2">
              <div className="space-y-1.5">
                <div className="h-2.5 w-12 rounded bg-muted" />
                <div className="h-4 w-16 rounded bg-muted" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-10 rounded bg-muted" />
                <div className="h-3.5 w-20 rounded bg-muted" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-muted/30 p-2">
              <div className="space-y-1.5">
                <div className="h-2.5 w-24 rounded bg-muted" />
                <div className="h-3.5 w-40 max-w-full rounded bg-muted" />
              </div>
              <div className="h-7 w-7 rounded-md bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
