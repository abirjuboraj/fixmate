// SERVER COMPONENT — route-level loading skeleton.
// Shows while the My Services page fetches data from the backend,
// so users see a shaped placeholder instead of a blank screen.
export default function LoadingMyServices() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading services">
      {/* Page header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-2.5">
          <div className="h-6 w-28 rounded-full bg-muted" />
          <div className="h-8 w-52 rounded-lg bg-muted" />
          <div className="h-4 w-80 max-w-full rounded bg-muted" />
        </div>
        <div className="h-10 w-full sm:w-44 rounded-lg bg-muted" />
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden md:block rounded-xl border border-border/70 bg-card overflow-hidden">
        {/* table header row */}
        <div className="flex gap-4 border-b border-border/60 bg-muted/30 px-4 py-3.5">
          {[80, 60, 40, 50, 50, 40].map((w, i) => (
            <div key={i} className="h-4 rounded bg-muted" style={{ width: `${w * 4}px` }} />
          ))}
        </div>
        {/* 5 skeleton rows: image + text, category, price, badge, switch, actions */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border/40 last:border-0 px-4 py-3"
          >
            <div className="h-12 w-20 rounded-lg bg-muted shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 max-w-full rounded bg-muted" />
              <div className="h-3 w-32 rounded bg-muted" />
            </div>
            <div className="h-4 w-20 rounded bg-muted hidden lg:block" />
            <div className="h-4 w-16 rounded bg-muted hidden lg:block" />
            <div className="h-5 w-20 rounded-full bg-muted" />
            <div className="h-5 w-9 rounded-full bg-muted" />
            <div className="flex gap-1.5">
              <div className="h-8 w-8 rounded-lg bg-muted" />
              <div className="h-8 w-8 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile card skeleton */}
      <div className="md:hidden space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card overflow-hidden"
          >
            <div className="h-36 w-full bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="flex gap-2.5 pt-1">
                <div className="h-9 flex-1 rounded-lg bg-muted" />
                <div className="h-9 flex-1 rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
