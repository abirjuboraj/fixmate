// Route-level skeleton — mirrors the current All Bookings page.
export default function LoadingAdminBookings() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading bookings">
      {/* Page header */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-28 rounded-full bg-muted" />
        <div className="h-8 w-56 rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* Filter pills + result count */}
      <div className="flex flex-wrap items-center gap-2">
        {[60, 85, 75, 95, 90, 80, 80].map((w, i) => (
          <div
            key={i}
            className="h-8 rounded-lg bg-muted"
            style={{ width: `${w}px` }}
          />
        ))}
        <div className="ml-auto h-4 w-20 rounded bg-muted" />
      </div>

      {/* Desktop table — 7 columns, matching the real breakpoints */}
      <div className="hidden overflow-hidden rounded-xl border border-border/70 bg-card md:block">
        <div className="flex gap-4 border-b border-border/60 bg-muted/40 px-4 py-3.5">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="hidden h-4 w-24 rounded bg-muted lg:block" />
          <div className="hidden h-4 w-24 rounded bg-muted lg:block" />
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="ml-auto h-4 w-16 rounded bg-muted" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border/40 px-4 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-muted" />
              <div className="space-y-2">
                <div className="h-3.5 w-44 max-w-full rounded bg-muted" />
                <div className="h-3 w-24 rounded bg-muted" />
              </div>
            </div>
            <div className="h-3.5 w-28 rounded bg-muted" />
            <div className="hidden h-3.5 w-24 rounded bg-muted lg:block" />
            <div className="hidden h-3.5 w-24 rounded bg-muted lg:block" />
            <div className="h-6 w-24 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="ml-auto h-4 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Mobile cards — image, title, people, badges, amount */}
      <div className="space-y-3 md:hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card p-4 shadow-xs space-y-3"
          >
            <div className="flex gap-3">
              <div className="h-11 w-11 rounded-lg bg-muted" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-2.5 w-20 rounded bg-muted" />
                <div className="h-4 w-44 max-w-full rounded bg-muted" />
                <div className="h-3 w-36 rounded bg-muted" />
              </div>
              <div className="h-5 w-16 rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="flex gap-1.5">
                <div className="h-6 w-20 rounded-full bg-muted" />
                <div className="h-6 w-16 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
