import Link from "next/link";
import { Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Repair themed illustration icon */}
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-md">
          <Wrench className="h-12 w-12 -rotate-12 stroke-[1.8]" />
        </div>
        <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground font-bold text-xs shadow-sm">
          404
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
        The tool, part, or page you are looking for has been moved or doesn&apos;t
        exist in FixMate.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="default" className="gap-2 shadow-sm font-semibold">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild size="default">
          <Link href="/services">Browse Services</Link>
        </Button>
      </div>
    </div>
  );
}
