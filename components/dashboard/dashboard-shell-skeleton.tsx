
export function DashboardShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-background text-foreground animate-pulse">
      {/* Sidebar placeholder */}
      <div className="hidden lg:block w-64 shrink-0 border-r border-border/60 bg-card/50 p-4">
        <div className="h-10 w-36 rounded-lg bg-muted" />
        <div className="mt-8 space-y-2.5">
          {[90, 75, 82, 68, 78].map((width, i) => (
            <div
              key={i}
              className="h-9 rounded-lg bg-muted"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <div className="mt-10 h-12 rounded-xl bg-muted" />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex h-16 items-center justify-between border-b border-border/60 bg-card/50 px-4 sm:px-6">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="h-5 w-24 rounded bg-muted" />
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <div className="space-y-3 border-b border-border/60 pb-5">
            <div className="h-6 w-28 rounded-full bg-muted" />
            <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
            <div className="h-4 w-96 max-w-full rounded bg-muted" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl border border-border/60 bg-card p-4"
              >
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="mt-4 h-8 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
