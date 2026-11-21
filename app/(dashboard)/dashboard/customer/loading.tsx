// Route-level skeleton for the customer overview (no shell flash on switches).
export default function LoadingCustomerOverview() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading overview">
      <div className="space-y-2.5 border-b border-border/60 pb-5">
        <div className="h-6 w-32 rounded-full bg-muted" />
        <div className="h-8 w-64 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full rounded bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-36 rounded-xl border border-border/60 bg-card p-5 space-y-3"
          >
            <div className="h-4 w-1/2 rounded bg-muted" />
            <div className="h-8 w-2/3 rounded bg-muted" />
            <div className="h-3 w-1/3 rounded bg-muted" />
          </div>
        ))}
      </div>

      <div className="h-64 rounded-xl border border-border/60 bg-card p-5 space-y-3">
        <div className="h-5 w-40 rounded bg-muted" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
