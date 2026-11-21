// SERVER COMPONENT — route-level loading skeleton.
// Mirrors the current Add Service page: centered container, form card,
// 3-column first row, 1/3 + 2/3 second row, image upload, footer buttons.
export default function LoadingAddService() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 animate-pulse" aria-label="Loading form">
      {/* Page header */}
      <div className="border-b border-border/60 pb-5 space-y-2.5">
        <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* Form card */}
      <div className="w-full rounded-xl border border-border/80 bg-card p-6 space-y-5">
        {/* Card title + description */}
        <div className="space-y-2">
          <div className="h-6 w-56 rounded bg-muted" />
          <div className="h-3.5 w-80 max-w-full rounded bg-muted" />
        </div>

        {/* Technician info banner */}
        <div className="h-12 w-full rounded-xl bg-muted/60" />

        {/* Full-width title field */}
        <div className="space-y-2">
          <div className="h-3.5 w-28 rounded bg-muted" />
          <div className="h-10 w-full rounded-lg bg-muted" />
        </div>

        {/* Row 1: category / mode / price */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-muted" />
              <div className="h-10 w-full rounded-lg bg-muted" />
            </div>
          ))}
        </div>

        {/* Row 2: duration (1/3) / service area (2/3) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="space-y-2">
            <div className="h-3.5 w-28 rounded bg-muted" />
            <div className="h-10 w-full rounded-lg bg-muted" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <div className="h-3.5 w-24 rounded bg-muted" />
            <div className="h-10 w-full rounded-lg bg-muted" />
          </div>
        </div>

        {/* Banner image upload */}
        <div className="space-y-2">
          <div className="h-3.5 w-36 rounded bg-muted" />
          <div className="h-28 w-full rounded-xl border border-dashed border-border/60 bg-muted/40" />
        </div>

        {/* Description textarea */}
        <div className="space-y-2">
          <div className="h-3.5 w-32 rounded bg-muted" />
          <div className="h-24 w-full rounded-lg bg-muted" />
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-2.5 border-t border-border/40 pt-6">
          <div className="h-10 w-24 rounded-lg bg-muted" />
          <div className="h-10 w-36 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
