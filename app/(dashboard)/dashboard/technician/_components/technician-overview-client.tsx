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
  User,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ServiceItem, BookingItem, BookingStatus } from "@/types";
import { withHighlight } from "@/lib/highlight";

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

  // Urgent / High-priority items needing immediate technician action
  const urgentRequests = bookings
    .filter((b) => b.status === "requested" || b.status === "in-progress" || b.status === "accepted")
    .slice(0, 6);

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
              Review incoming service orders, manage your active doorstep queue, and follow the standard diagnostic protocols.
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

      {/* -------------------- 1. Core Performance Stats Cards -------------------- */}
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
            href="/dashboard/technician/requests"
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
            href="/dashboard/technician/requests"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:underline"
          >
            <span>Revenue Breakdown</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* -------------------- 2. The Kept & Expanded Immediate Action Queue -------------------- */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        {/* Stacked on mobile so the button never crowds the text; side-by-side from sm up */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
              Immediate Action Queue
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              New incoming repair requests and in-progress jobs requiring your review, action, or status completion.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="shrink-0 self-start gap-1 text-xs font-semibold sm:self-auto"
          >
            <Link href="/dashboard/technician/requests">
              View All
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
                      <span className="flex items-center gap-1 truncate max-w-60">
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
                    <Link
                      href={withHighlight(
                        "/dashboard/technician/requests",
                        booking._id,
                        "booking-row-",
                      )}
                    >
                      Update
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
