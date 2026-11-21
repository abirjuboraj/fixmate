"use client";

import Link from "next/link";
import {
  Wrench,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  PlusCircle,
  ClipboardList,
  Sparkles,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  User,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ServiceItem, BookingItem, BookingStatus } from "@/types";

interface TechnicianOverviewClientProps {
  technicianName: string;
  technicianEmail: string;
  services: ServiceItem[];
  bookings: BookingItem[];
}

/** Consistent colored status badges with icons across all dashboards */
function getStatusBadge(status: BookingStatus) {
  switch (status) {
    case "requested":
      return (
        <Badge
          variant="outline"
          className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs capitalize gap-1"
        >
          <Clock className="h-3 w-3" />
          Requested
        </Badge>
      );
    case "accepted":
      return (
        <Badge
          variant="outline"
          className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-xs capitalize gap-1"
        >
          <CheckCircle2 className="h-3 w-3" />
          Accepted
        </Badge>
      );
    case "in-progress":
      return (
        <Badge
          variant="outline"
          className="border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-xs capitalize gap-1"
        >
          <Wrench className="h-3 w-3" />
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs capitalize gap-1"
        >
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          className="border-destructive/30 bg-destructive/10 text-destructive font-semibold text-xs capitalize gap-1"
        >
          <AlertCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="border-muted-foreground/30 bg-muted/40 text-muted-foreground font-semibold text-xs capitalize gap-1"
        >
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs capitalize">
          {status}
        </Badge>
      );
  }
}

export function TechnicianOverviewClient({
  technicianName,
  services,
  bookings,
}: TechnicianOverviewClientProps) {
  // 1. Metric Calculations
  const totalServices = services.length;
  const approvedServices = services.filter((s) => s.approvalStatus === "approved").length;
  const pendingApprovalServices = services.filter((s) => s.approvalStatus === "pending").length;

  const totalBookings = bookings.length;
  const requestedCount = bookings.filter((b) => b.status === "requested").length;
  const inProgressCount = bookings.filter((b) => b.status === "in-progress").length;
  const acceptedCount = bookings.filter((b) => b.status === "accepted").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  // Active jobs currently on technician's plate
  const activeJobsCount = requestedCount + acceptedCount + inProgressCount;

  // Revenue calculation from completed jobs
  const estimatedRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + Number(b.finalAmount || b.basePrice || 0), 0);

  // Completion rate calculation
  const completionRate =
    totalBookings > 0
      ? Math.round((completedCount / totalBookings) * 100)
      : 100;

  // 2. Breakdown for Visual Work Pipeline (Requirement 4)
  const pipelineSegments = [
    { label: "New Requests", count: requestedCount, color: "bg-amber-500", textColor: "text-amber-500" },
    { label: "Accepted", count: acceptedCount, color: "bg-blue-500", textColor: "text-blue-500" },
    { label: "In Progress", count: inProgressCount, color: "bg-purple-500", textColor: "text-purple-500" },
    { label: "Completed", count: completedCount, color: "bg-emerald-500", textColor: "text-emerald-500" },
  ];

  // 3. Category Demand Visualization (which service categories get the most repair bookings)
  const categoryDemandMap: Record<string, number> = {};
  bookings.forEach((b) => {
    const cat = b.category || "General";
    categoryDemandMap[cat] = (categoryDemandMap[cat] || 0) + 1;
  });
  const categoryDemandEntries = Object.entries(categoryDemandMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxDemand = Math.max(...categoryDemandEntries.map(([, count]) => count), 1);

  // 4. Urgent / High-priority items needing immediate technician action
  const urgentRequests = bookings
    .filter((b) => b.status === "requested" || b.status === "in-progress")
    .slice(0, 5);

  return (
    <div className="space-y-8 w-full">
      {/* -------------------- Top Hero Welcome Banner -------------------- */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-r from-card via-card to-primary/5 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
              <Wrench className="h-3.5 w-3.5" />
              Verified Technician Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Welcome back, {technicianName || "Technician"}!
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Here is your daily performance report, active repair pipeline, and upcoming job queue.
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="gap-2 shadow-xs font-semibold">
              <Link href="/dashboard/technician/add-service">
                <PlusCircle className="h-4 w-4" />
                Add New Service
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/dashboard/technician/requests">
                <ClipboardList className="h-4 w-4" />
                View All Requests
              </Link>
            </Button>
          </div>
        </div>

        {/* Subtle Decorative Background Blob */}
        <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
      </div>

      {/* -------------------- 1. Core Performance Stats Cards (Requirement 1 & 2) -------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Jobs */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Jobs
            </span>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              {activeJobsCount}
            </span>
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs"
            >
              {inProgressCount} in progress
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            {requestedCount} awaiting your acceptance
          </p>
          <Link
            href="/dashboard/technician/requests"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary group-hover:underline"
          >
            <span>Manage Queue</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Completed Repairs */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Completed Jobs
            </span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              {completedCount}
            </span>
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs"
            >
              {completionRate}% success
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Verified customer deliveries
          </p>
          <Link
            href="/dashboard/technician/requests?tab=completed"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline"
          >
            <span>Completed History</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Listed Services */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-blue-500/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Listed Services
            </span>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              {totalServices}
            </span>
            <Badge
              variant="outline"
              className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-xs"
            >
              {approvedServices} active
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            {pendingApprovalServices > 0
              ? `${pendingApprovalServices} pending admin review`
              : "All services approved & live"}
          </p>
          <Link
            href="/dashboard/technician/my-services"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline"
          >
            <span>Manage Services</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Estimated Earnings */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-purple-500/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Delivered Value
            </span>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              ${estimatedRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-purple-500" />
            Across {completedCount} fulfilled jobs
          </p>
          <Link
            href="/dashboard/technician/requests?tab=completed"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:underline"
          >
            <span>Revenue Breakdown</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* -------------------- 2. Visual Charts & Performance Pipelines (Requirement 4) -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Distribution Chart (Unique to Technician) */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Work Pipeline & Fulfillment
              </h2>
              <span className="text-xs font-semibold text-muted-foreground font-mono">
                {totalBookings} Total Requests
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Current lifecycle distribution of all repair requests assigned to you.
            </p>
          </div>

          {/* Combined Visual Segmented Progress Bar */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted/60 rounded-full overflow-hidden flex shadow-inner">
              {totalBookings === 0 ? (
                <div className="h-full w-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                  No requests yet
                </div>
              ) : (
                pipelineSegments.map((segment) => {
                  const pct = totalBookings > 0 ? (segment.count / totalBookings) * 100 : 0;
                  if (pct === 0) return null;
                  return (
                    <div
                      key={segment.label}
                      title={`${segment.label}: ${segment.count} (${Math.round(pct)}%)`}
                      className={`h-full ${segment.color} transition-all duration-500 first:rounded-l-full last:rounded-r-full hover:brightness-110`}
                      style={{ width: `${pct}%` }}
                    />
                  );
                })
              )}
            </div>

            {/* Legend & Count Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {pipelineSegments.map((segment) => (
                <div
                  key={segment.label}
                  className="rounded-xl border border-border/50 bg-background/50 p-3 flex flex-col items-center justify-center text-center space-y-1"
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${segment.color}`} />
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {segment.label}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-foreground font-mono">
                    {segment.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span>Action turnaround rate</span>
            <span className="font-semibold text-foreground">
              {activeJobsCount > 0 ? `${activeJobsCount} active in queue` : "Queue is fully cleared"}
            </span>
          </div>
        </div>

        {/* Category Request Demand (Unique chart showing where customer repairs concentrate) */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Service Demand by Category
              </h2>
              <Badge variant="outline" className="text-xs font-semibold">
                Most Requested
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Volume of customer requests across your listed repair categories.
            </p>
          </div>

          {categoryDemandEntries.length === 0 ? (
            <div className="py-10 text-center text-xs text-muted-foreground">
              No service requests logged yet. As customers book your services, category demand graphs will show here.
            </div>
          ) : (
            <div className="space-y-3.5 pt-1">
              {categoryDemandEntries.map(([category, count]) => {
                const percentage = Math.round((count / maxDemand) * 100);
                return (
                  <div key={category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">{category}</span>
                      <span className="text-muted-foreground font-mono">
                        {count} {count === 1 ? "request" : "requests"}
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-amber-500 via-primary to-primary rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-border/50 flex justify-end">
            <Button variant="ghost" size="sm" asChild className="text-xs text-primary gap-1">
              <Link href="/dashboard/technician/my-services">
                Expand Your Offerings
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* -------------------- 3. Action Center: Urgent Queue & Quick Navigation -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Action Queue (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Immediate Action Queue
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                New incoming repair requests and in-progress jobs requiring status updates.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="text-xs gap-1">
              <Link href="/dashboard/technician/requests">
                Full Pipeline
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {urgentRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/80 p-8 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
              <p className="text-sm font-semibold text-foreground">You are all caught up!</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No new pending requests or active jobs waiting for action. Keep your services active to receive more bookings.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {urgentRequests.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-xl border border-border/60 bg-background/50 p-4 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground truncate">
                        {booking.serviceTitle}
                      </span>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {booking.customerName}
                      </span>
                      {booking.customerPhone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          {booking.customerPhone}
                        </span>
                      )}
                      {booking.address && (
                        <span className="flex items-center gap-1 truncate max-w-[200px]">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          {booking.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="font-extrabold text-sm font-mono text-foreground">
                      ${booking.finalAmount || booking.basePrice}
                    </span>
                    <Button size="sm" asChild className="text-xs font-semibold">
                      <Link href="/dashboard/technician/requests">
                        Update
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Navigation Cards & Account Shortcut (1 col) */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Quick Shortcuts
            </h2>
            <p className="text-xs text-muted-foreground">
              Frequently accessed technician management panels.
            </p>

            <div className="space-y-2.5 pt-2">
              <Button variant="outline" asChild className="w-full justify-between h-auto py-3">
                <Link href="/dashboard/technician/add-service">
                  <div className="flex items-center gap-2.5">
                    <PlusCircle className="h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="text-xs font-semibold">Add New Service</p>
                      <p className="text-[11px] text-muted-foreground">Publish a new repair listing</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full justify-between h-auto py-3">
                <Link href="/dashboard/technician/my-services">
                  <div className="flex items-center gap-2.5">
                    <Wrench className="h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="text-xs font-semibold">My Catalog</p>
                      <p className="text-[11px] text-muted-foreground">Manage {totalServices} listed services</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full justify-between h-auto py-3">
                <Link href="/dashboard/technician/requests">
                  <div className="flex items-center gap-2.5">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="text-xs font-semibold">Requests Pipeline</p>
                      <p className="text-[11px] text-muted-foreground">Accept, progress & complete</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full justify-between h-auto py-3">
                <Link href="/dashboard/profile">
                  <div className="flex items-center gap-2.5">
                    <User className="h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="text-xs font-semibold">Technician Profile</p>
                      <p className="text-[11px] text-muted-foreground">Update bio, service area & phone</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
