// SERVER COMPONENT — route-level loading skeleton for the
// service details page (/services/[id]) while the service
// and technician info are being fetched.

export default function LoadingServiceDetails() {
  return (
    <div
      className="min-h-screen bg-background animate-pulse"
      aria-label="Loading service details"
    >
      <div className="max-w-6xl mx-auto px-4 py-8 pb-16 sm:px-6 lg:px-8 space-y-8">
        {/* Back link skeleton */}
        <div className="h-8 w-40 rounded-lg bg-muted" />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: image + details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Large image */}
            <div className="w-full aspect-video rounded-2xl bg-muted" />

            {/* Title */}
            <div className="h-9 w-3/4 rounded-lg bg-muted" />

            {/* Info pills */}
            <div className="flex gap-3">
              <div className="h-8 w-36 rounded-full bg-muted" />
              <div className="h-8 w-32 rounded-full bg-muted" />
              <div className="h-8 w-32 rounded-full bg-muted" />
            </div>

            {/* Description lines */}
            <div className="space-y-2.5 border-t border-border/50 pt-5">
              <div className="h-5 w-56 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          </div>

          {/* Right column: pricing card + technician card */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-4">
              <div className="h-3.5 w-32 rounded bg-muted" />
              <div className="h-10 w-36 rounded bg-muted" />
              <div className="h-3.5 w-48 rounded bg-muted" />
              <div className="space-y-3 border-t border-border/50 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-4 w-20 rounded bg-muted" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-full rounded-lg bg-muted" />
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-4">
              <div className="h-3.5 w-36 rounded bg-muted" />
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-muted shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-24 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
