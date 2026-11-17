import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export default function TechnicianMyServicesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full mb-2">
          <Clock className="h-3.5 w-3.5" />
          Dashboard Route Placeholder
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          My Services
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Technician services list and CRUD operations will display here.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border/80 bg-card/50 p-8 text-center max-w-lg mx-auto">
        <h2 className="text-base font-semibold">Route Active & Navigable</h2>
        <Button variant="outline" size="sm" asChild className="mt-4">
          <Link href="/dashboard/technician" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
