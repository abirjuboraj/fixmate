// SERVER COMPONENT — route-level loading skeleton.
// Shows while the Service Approval page fetches data from the backend,
// so users see a shaped placeholder instead of a blank screen.
export default function LoadingAdminServices() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading services">
      {/* Page header skeleton */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-28 rounded-full bg-muted" />
        <div className="h-8 w-64 rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* Filter pills skeleton */}
      <div className="flex gap-2">
        {[80, 90, 90, 60].map((w, i) => (
          <div key={i} className="h-8 rounded-lg bg-muted" style={{ width: `${w}px` }} />
        ))}
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden md:block rounded-xl border border-border/70 bg-card overflow-hidden">
        {/* header row */}
        <div className="flex gap-4 border-b border-border/60 bg-muted/30 px-4 py-3.5">
          {[90, 60, 40, 30, 40, 60].map((w, i) => (
            <div key={i} className="h-4 rounded bg-muted" style={{ width: `${w * 3}px` }} />
          ))}
        </div>
        {/* 4 skeleton rows: image + title, technician, category, price, badge, actions */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border/40 last:border-0 px-4 py-3"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="h-12 w-20 rounded-lg bg-muted shrink-0" />
              <div className="space-y-2">
                <div className="h-4 w-44 max-w-full rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
            </div>
            <div className="h-4 w-28 rounded bg-muted hidden lg:block" />
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-lg bg-muted" />
              <div className="h-8 w-20 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile card skeleton */}
      <div className="md:hidden space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card overflow-hidden"
          >
            <div className="p-4 flex gap-3">
              <div className="h-12 w-20 rounded-lg bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 max-w-full rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
                <div className="h-6 w-24 rounded-full bg-muted" />
              </div>
            </div>
            <div className="h-14 border-t border-border/40 bg-muted/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
