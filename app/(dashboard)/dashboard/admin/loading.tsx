// SERVER COMPONENT — route-level loading skeleton for Admin Overview.
// Shows instantly while all concurrent statistics, users, services,
// bookings, and transactions are fetched from the backend.
export default function LoadingAdminOverview() {
  return (
    <div className="space-y-8 animate-pulse" aria-label="Loading Admin Overview">
      {/* Page header skeleton */}
      <div className="space-y-2 border-b border-border/60 pb-5">
        <div className="h-5 w-32 rounded-full bg-muted" />
        <div className="h-8 w-60 rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      {/* 4 Core Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/80 bg-card p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-10 w-10 rounded-xl bg-muted" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="h-8 w-16 rounded-md bg-muted" />
              <div className="h-5 w-20 rounded-full bg-muted" />
            </div>
            <div className="h-3 w-32 rounded bg-muted" />
            <div className="h-6 w-full rounded bg-muted/60 pt-3 border-t border-border/40" />
          </div>
        ))}
      </div>

      {/* 2 Middle Visual Charts / Pipelines Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-5 w-44 rounded bg-muted" />
              <div className="h-3 w-60 rounded bg-muted" />
            </div>
            <div className="h-6 w-20 rounded-full bg-muted" />
          </div>
          <div className="space-y-3 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-3.5 w-28 rounded bg-muted" />
                  <div className="h-3.5 w-16 rounded bg-muted" />
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted/60" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-5 w-44 rounded bg-muted" />
              <div className="h-3 w-60 rounded bg-muted" />
            </div>
            <div className="h-6 w-24 rounded-full bg-muted" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-center ${
                  i === 4 ? "col-span-2 sm:col-span-2" : ""
                }`}
              >
                <div className="h-3 w-16 mx-auto rounded bg-muted" />
                <div className="h-6 w-10 mx-auto rounded bg-muted" />
                <div className="h-2.5 w-20 mx-auto rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action & Live Feeds Skeleton */}
      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
        <div className="p-5 border-b border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="h-5 w-48 rounded bg-muted" />
            <div className="h-3 w-72 rounded bg-muted" />
          </div>
          <div className="h-9 w-64 rounded-xl bg-muted" />
        </div>
        <div className="p-6 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-border/60 flex items-center justify-between"
            >
              <div className="space-y-2">
                <div className="h-4 w-48 rounded bg-muted" />
                <div className="h-3 w-64 rounded bg-muted" />
              </div>
              <div className="h-8 w-24 rounded-md bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
