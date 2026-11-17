import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          How FixMate Works
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          FixMate connects device & home appliance owners with verified
          technicians. We solve the trust deficit by introducing complete job
          pipeline transparency and guaranteed post-repair payments.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 pt-4">
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              1. Book a Service
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Choose home visit or shop drop-off, select a preferred date, and describe the problem.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              2. Track Real-Time
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Monitor your job status from Requested → Accepted → In Progress → Completed.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              3. Verified Technicians
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Every service listing is reviewed and approved by platform administrators.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              4. Pay After Delivery
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Never pay upfront. Complete payment securely via Stripe only after the repair succeeds.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
