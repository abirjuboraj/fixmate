// SERVER COMPONENT — route-level loading skeleton for
// Profile Settings while the session/profile is fetched.

export default function LoadingProfile() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading profile">
      {/* Page header skeleton */}
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-36 rounded-full bg-muted" />
        <div className="h-8 w-56 rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile summary card skeleton */}
        <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-4 h-fit">
          <div className="flex flex-col items-center gap-3">
            <div className="h-20 w-20 rounded-full bg-muted" />
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="h-3.5 w-48 rounded bg-muted" />
            <div className="h-6 w-24 rounded-full bg-muted" />
          </div>
        </div>

        {/* Edit form card skeleton */}
        <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card p-6 space-y-5">
          <div className="h-5 w-44 rounded bg-muted" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3.5 w-24 rounded bg-muted" />
                <div className="h-10 w-full rounded-lg bg-muted" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-32 rounded bg-muted" />
            <div className="h-10 w-full rounded-lg bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-28 rounded bg-muted" />
            <div className="h-24 w-full rounded-lg bg-muted" />
          </div>
          <div className="flex justify-end gap-2 border-t border-border/50 pt-4">
            <div className="h-10 w-28 rounded-lg bg-muted" />
            <div className="h-10 w-36 rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
