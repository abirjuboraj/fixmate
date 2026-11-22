// Shared route-level spinner loader (server component, no hooks).
// Used by loading.tsx files on pages without a big data table/grid
// (auth pages, static pages, simple server pages).

import { Wrench, Loader2 } from "lucide-react";

interface RouteLoaderProps {
  label?: string;
}

export function RouteLoader({ label = "Loading..." }: RouteLoaderProps) {
  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center gap-5 px-4 text-center"
      role="status"
      aria-label={label}
    >
      {/* Repair-themed icon with a spinner */}
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-md">
          <Wrench className="h-8 w-8 -rotate-12 text-primary stroke-[1.8]" />
        </div>
        <Loader2
          className="absolute -bottom-2.5 -right-2.5 h-6 w-6 animate-spin text-primary"
          aria-hidden="true"
        />
      </div>

      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
