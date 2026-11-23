// Route-level skeleton — mirrors the current Service Approval page.
export default function LoadingAdminServices() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading services">
      {/* Page header */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-28 rounded-full bg-muted" />
        <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* Filter pills + result count */}
      <div className="flex flex-wrap items-center gap-2">
        {[70, 90, 80, 50].map((w, i) => (
          <div
            key={i}
            className="h-8 rounded-lg bg-muted"
            style={{ width: `${w}px` }}
          />
        ))}
        <div className="ml-auto h-4 w-24 rounded bg-muted" />
      </div>

      {/* Desktop table — 6 columns */}
      <div className="hidden overflow-hidden rounded-xl border border-border/70 bg-card md:block">
        <div className="flex gap-4 border-b border-border/60 bg-muted/40 px-4 py-3.5">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="hidden h-4 w-24 rounded bg-muted lg:block" />
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="ml-auto h-4 w-24 rounded bg-muted" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border/40 px-4 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-20 rounded-lg bg-muted" />
              <div className="space-y-2">
                <div className="h-3.5 w-44 max-w-full rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-28 rounded bg-muted" />
              <div className="h-3 w-36 rounded bg-muted" />
            </div>
            <div className="hidden h-3.5 w-24 rounded bg-muted lg:block" />
            <div className="h-3.5 w-16 rounded bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="ml-auto flex gap-2">
              <div className="h-8 w-20 rounded-lg bg-muted" />
              <div className="h-8 w-20 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile cards — image, title, badge, action footer */}
      <div className="space-y-3 md:hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-border/70 bg-card"
          >
            <div className="flex gap-3 p-4">
              <div className="h-12 w-20 rounded-lg bg-muted" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-40 max-w-full rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
                <div className="h-6 w-24 rounded-full bg-muted" />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border/60 bg-muted/20 px-4 py-3">
              <div className="h-8 w-20 rounded-lg bg-muted" />
              <div className="h-8 w-20 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
