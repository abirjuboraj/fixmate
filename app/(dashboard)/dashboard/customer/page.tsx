import Link from "next/link";
import { UserCheck, CalendarClock, CreditCard, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full mb-2">
            <UserCheck className="h-3.5 w-3.5" />
            Customer Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Customer Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track repair requests, manage active jobs, and pay after completion.
          </p>
        </div>
      </div>

      {/* Placeholder Test Cards for Navigation Testing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">My Bookings</h2>
          <p className="text-xs text-muted-foreground">
            View active requests, progress, and pay for completed jobs.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/customer/bookings">View Bookings</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">Payment History</h2>
          <p className="text-xs text-muted-foreground">
            Stripe transaction logs and paid repair invoices.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/customer/payments">View Payments</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <UserCog className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">Profile Settings</h2>
          <p className="text-xs text-muted-foreground">
            Update contact number, service area, and address.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/profile">Update Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
