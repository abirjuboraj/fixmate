"use client";

// Error boundary for any route below the root layout.
// Catches render/data errors and shows a friendly, repair-themed
// message instead of a blank screen.

import Link from "next/link";
import { Wrench, RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Repair-themed illustration */}
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 shadow-md">
          <Wrench className="h-12 w-12 -rotate-12 text-destructive stroke-[1.8]" />
        </div>
        <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm">
          <AlertTriangle className="h-4 w-4" />
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Something Went Wrong
      </h1>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
        We hit an unexpected error while loading this page. Your data is safe —
        please try again, or head back to the home page.
      </p>

      {/* Show the real error message only while developing */}
      {process.env.NODE_ENV !== "production" && error?.message && (
        <p className="mt-4 max-w-lg rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 font-mono text-xs text-destructive break-all">
          {error.message}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} className="gap-2 shadow-sm font-semibold">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
