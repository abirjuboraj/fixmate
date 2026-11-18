export function ServicesSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between h-[420px] rounded-2xl border border-border/70 bg-card overflow-hidden animate-pulse shadow-xs"
        >
          {/* Image Skeleton */}
          <div className="w-full aspect-16/10 bg-muted" />

          {/* Body Skeleton */}
          <div className="p-5 space-y-4 flex-1">
            <div className="h-5 w-3/4 rounded-md bg-muted" />
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded-md bg-muted/80" />
              <div className="h-3.5 w-5/6 rounded-md bg-muted/80" />
            </div>

            <div className="space-y-2 pt-3 border-t border-border/50">
              <div className="h-3.5 w-1/2 rounded-md bg-muted/60" />
              <div className="h-3.5 w-2/3 rounded-md bg-muted/60" />
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between p-5 pt-3 border-t border-border/60 bg-muted/20">
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded-md bg-muted/70" />
              <div className="h-6 w-20 rounded-md bg-muted" />
            </div>
            <div className="h-8 w-24 rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
