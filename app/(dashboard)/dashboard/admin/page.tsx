import Link from "next/link";
import { ShieldCheck, Users, CheckCircle2, CalendarCheck2, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            Administration Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Platform governance, technician service moderation, user roles, and Stripe transaction logs.
          </p>
        </div>
      </div>

      {/* Placeholder Test Cards for Navigation Testing */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <Users className="h-5 w-5 text-rose-500" />
          <h2 className="text-sm font-semibold">Manage Users</h2>
          <p className="text-xs text-muted-foreground">
            View customer and technician accounts, adjust roles.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/admin/users">Manage Users</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <CheckCircle2 className="h-5 w-5 text-rose-500" />
          <h2 className="text-sm font-semibold">Service Approval</h2>
          <p className="text-xs text-muted-foreground">
            Approve or reject technician service submissions.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/admin/services">Moderate</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <CalendarCheck2 className="h-5 w-5 text-rose-500" />
          <h2 className="text-sm font-semibold">All Bookings</h2>
          <p className="text-xs text-muted-foreground">
            Platform-wide repair requests and job progression.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/admin/bookings">View Bookings</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2">
          <ReceiptText className="h-5 w-5 text-rose-500" />
          <h2 className="text-sm font-semibold">Transactions</h2>
          <p className="text-xs text-muted-foreground">
            Total platform revenue and Stripe payment logs.
          </p>
          <Button variant="outline" size="sm" asChild className="mt-2 w-full">
            <Link href="/dashboard/admin/transactions">Transactions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
