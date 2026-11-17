import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export default function SubRoutePlaceholder({
  params,
}: {
  params?: Promise<{ role?: string; sub?: string }>;
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
          <Clock className="h-3.5 w-3.5" />
          Dashboard Route Placeholder
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Dashboard Sub-Page
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          This route placeholder validates sidebar active state and sub-route navigation.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border/80 bg-card/50 p-8 text-center max-w-lg mx-auto">
        <h2 className="text-base font-semibold">Route Active & Navigable</h2>
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          The dashboard layout and role-based sidebar are functioning properly. Actual data, tables, and CRUD operations will be connected in future phases.
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/customer" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
