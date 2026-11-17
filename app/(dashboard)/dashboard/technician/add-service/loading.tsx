// SERVER COMPONENT — route-level loading skeleton.
// Shows while the Add Service page loads (session check + form mount).
export default function LoadingAddService() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading form">
      {/* Page header skeleton */}
      <div className="border-b border-border/60 pb-5 space-y-2.5">
        <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* Form card skeleton (mirrors the real form layout) */}
      <div className="max-w-3xl rounded-xl border border-border/80 bg-card p-6 space-y-5">
        <div className="h-11 w-full rounded-lg bg-muted" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-11 w-full rounded-lg bg-muted" />
          <div className="h-11 w-full rounded-lg bg-muted" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-11 w-full rounded-lg bg-muted" />
          <div className="h-11 w-full rounded-lg bg-muted" />
        </div>

        <div className="h-11 w-full rounded-lg bg-muted" />

        <div className="h-28 w-full rounded-xl border border-dashed border-border/60 bg-muted/40" />

        <div className="h-24 w-full rounded-lg bg-muted" />

        <div className="flex justify-end gap-2.5 pt-2">
          <div className="h-10 w-24 rounded-lg bg-muted" />
          <div className="h-10 w-36 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
