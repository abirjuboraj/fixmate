// SERVER COMPONENT — route-level loading skeleton.
// Shows while the Manage Users page fetches data from the backend,
// so users see a shaped placeholder instead of a blank screen.
export default function LoadingAdminUsers() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading users">
      {/* Page header skeleton */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-28 rounded-full bg-muted" />
        <div className="h-8 w-56 rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      {/* Search + filter bar skeleton */}
      <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-4 md:flex-row">
        <div className="flex flex-1 gap-2">
          <div className="h-10 flex-1 rounded-lg bg-muted" />
          <div className="h-10 w-24 rounded-lg bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-full md:w-[150px] rounded-lg bg-muted" />
          <div className="h-8 w-full md:w-[190px] rounded-lg bg-muted" />
        </div>
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden md:block rounded-xl border border-border/70 bg-card overflow-hidden">
        {/* header row */}
        <div className="flex gap-4 border-b border-border/60 bg-muted/30 px-4 py-3.5">
          {[100, 70, 40, 40, 50].map((w, i) => (
            <div key={i} className="h-4 rounded bg-muted" style={{ width: `${w * 3}px` }} />
          ))}
        </div>
        {/* 5 skeleton rows: avatar + name, email, role badge, joined, role select */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border/40 last:border-0 px-4 py-3"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="h-9 w-9 rounded-full bg-muted shrink-0" />
              <div className="h-4 w-36 max-w-full rounded bg-muted" />
            </div>
            <div className="h-4 w-48 rounded bg-muted hidden lg:block" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="h-4 w-24 rounded bg-muted hidden lg:block" />
            <div className="h-7 w-[130px] rounded-lg bg-muted" />
          </div>
        ))}
      </div>

      {/* Mobile card skeleton */}
      <div className="md:hidden space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-36 max-w-full rounded bg-muted" />
                <div className="h-3 w-44 max-w-full rounded bg-muted" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-6 w-20 rounded-full bg-muted" />
              <div className="h-3 w-24 rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-border/40">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-7 w-[110px] rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
