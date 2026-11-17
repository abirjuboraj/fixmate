import Link from "next/link";
import { Wrench, PlusCircle, ClipboardList, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TechnicianDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full mb-2">
            <Wrench className="h-3.5 w-3.5" />
            Technician Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Technician Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publish repair offerings, update job status pipelines, and set final amounts.
          </p>
        </div>
      </div>

      {/* Placeholder Test Cards for Navigation Testing */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <PlusCircle className="h-5 w-5 text-amber-500" />
          <h2 className="text-sm font-semibold">Add Service</h2>
          <p className="text-xs text-muted-foreground">
            List a new device repair or appliance service.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/technician/add-service">Add Service</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <Wrench className="h-5 w-5 text-amber-500" />
          <h2 className="text-sm font-semibold">My Services</h2>
          <p className="text-xs text-muted-foreground">
            Manage approvals, active status, and pricing.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/technician/my-services">View Services</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <ClipboardList className="h-5 w-5 text-amber-500" />
          <h2 className="text-sm font-semibold">Manage Requests</h2>
          <p className="text-xs text-muted-foreground">
            Accept/reject requests and complete jobs.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/technician/requests">Manage Requests</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <UserCog className="h-5 w-5 text-amber-500" />
          <h2 className="text-sm font-semibold">Update Profile</h2>
          <p className="text-xs text-muted-foreground">
            Manage your service area, bio, and phone.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/profile">Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
