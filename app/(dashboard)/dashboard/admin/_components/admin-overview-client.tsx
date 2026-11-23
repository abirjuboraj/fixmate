"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Wrench,
  Clock,
  DollarSign,
  TrendingUp,
  CalendarCheck2,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  ChevronRight,
  UserCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminUser, ServiceItem, BookingItem, BookingStatus, PaymentRecord } from "@/types";
import { withHighlight } from "@/lib/highlight";

interface AdminOverviewClientProps {
  users: AdminUser[];
  services: ServiceItem[];
  bookings: BookingItem[];
  transactions: PaymentRecord[];
  totalRevenue: number;
}

/** Consistent colored status badge with icon matching Admin Bookings view */
function getBookingStatusBadge(status: BookingStatus) {
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
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="border-muted-foreground/30 bg-muted/40 text-muted-foreground font-semibold text-xs capitalize gap-1"
        >
          <XCircle className="h-3 w-3" />
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs">
          {status}
        </Badge>
      );
  }
}

export function AdminOverviewClient({
  users,
  services,
  bookings,
  transactions,
  totalRevenue,
}: AdminOverviewClientProps) {
  // 1. Calculate Required Core Metrics
  const totalUsers = users.length;
  const totalTechnicians = users.filter((u) => u.role === "technician").length;
  const totalCustomers = users.filter((u) => u.role === "customer" || !u.role).length;
  const pendingServices = services.filter((s) => s.approvalStatus === "pending").length;
  const approvedServices = services.filter((s) => s.approvalStatus === "approved").length;

  // 2. Additional Insights (Bookings & Jobs)
  const activeBookings = bookings.filter(
    (b) => b.status === "in-progress" || b.status === "accepted" || b.status === "requested"
  ).length;

  // 3. Category Distribution for interactive chart representation
  const categoryCountMap: Record<string, number> = {};
  services.forEach((s) => {
    const cat = s.category || "Other";
    categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
  });
  const categoryEntries = Object.entries(categoryCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCategoryCount = Math.max(...categoryEntries.map(([, count]) => count), 1);

  // 4. Booking Status Distribution
  const statusCounts = {
    requested: bookings.filter((b) => b.status === "requested").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    "in-progress": bookings.filter((b) => b.status === "in-progress").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled" || b.status === "rejected").length,
  };

  // 5. Interactive Tab State for "Recent Activity"
  const [activeTab, setActiveTab] = useState<"pending-services" | "recent-bookings" | "recent-users">(
    "pending-services"
  );

  const pendingList = services.filter((s) => s.approvalStatus === "pending").slice(0, 5);
  const recentBookingsList = [...bookings].slice(0, 5);
  const recentUsersList = [...users].slice(0, 5);

  // Record-specific deep links from the stat cards / notification badges
  const firstPendingService = pendingList[0];
  const firstTechnician = users.find((u) => u.role === "technician");

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Users
            </span>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              {totalUsers}
            </span>
            <Badge
              variant="outline"
              className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-xs gap-1"
            >
              <UserCheck className="h-3 w-3" />
              {totalCustomers} Customers
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5 text-blue-500" />
            Registered accounts on platform
          </p>
          <Link
            href="/dashboard/admin/users"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline"
          >
            <span>Manage All Users</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Total Technicians */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Technicians
            </span>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              {totalTechnicians}
            </span>
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs gap-1"
            >
              <Wrench className="h-3 w-3" />
              Active Pros
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            Verified repair specialists
          </p>
          <Link
            href={withHighlight(
              "/dashboard/admin/users?role=technician",
              firstTechnician?._id,
              "user-row-",
            )}
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:underline"
          >
            <span>View Technicians</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Pending Services */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-rose-500/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pending Services
            </span>
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              {pendingServices}
            </span>
            {pendingServices > 0 ? (
              <Badge
                variant="outline"
                className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-xs gap-1 animate-pulse"
              >
                <AlertCircle className="h-3 w-3" />
                Action Needed
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs gap-1"
              >
                <CheckCircle2 className="h-3 w-3" />
                All Cleared
              </Badge>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
            Awaiting admin moderation
          </p>
          <Link
            href={withHighlight(
              "/dashboard/admin/services?status=pending",
              firstPendingService?._id,
              "service-row-",
            )}
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400 group-hover:underline"
          >
            <span>Review Submissions</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Total Revenue */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              ${Number(totalRevenue || 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            {transactions.length} paid transactions
          </p>
          <Link
            href="/dashboard/admin/transactions"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline"
          >
            <span>View Ledger</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Bar Chart: Services by Category */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                Service Catalog by Category
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total services listed across top repair disciplines ({services.length} total)
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs gap-1"
            >
              <CheckCircle2 className="h-3 w-3" />
              {approvedServices} Approved
            </Badge>
          </div>

          {categoryEntries.length === 0 ? (
            <p className="text-xs text-muted-foreground py-8 text-center">
              No services added to the platform yet.
            </p>
          ) : (
            <div className="space-y-3.5 pt-2">
              {categoryEntries.map(([category, count]) => {
                const percentage = Math.round((count / maxCategoryCount) * 100);
                return (
                  <div key={category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">{category}</span>
                      <span className="text-muted-foreground font-mono">
                        {count} {count === 1 ? "service" : "services"}
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out"
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
              <Link href="/dashboard/admin/services">
                Explore Full Catalog
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Platform Repair Pipeline Breakdown */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <CalendarCheck2 className="h-4 w-4 text-primary" />
                Repair Booking Pipeline
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Current status distribution of all bookings ({bookings.length} total)
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary font-semibold text-xs gap-1"
            >
              <Wrench className="h-3 w-3" />
              {activeBookings} Active Jobs
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-amber-600 block">Requested</span>
              <span className="text-2xl font-bold text-foreground mt-1 block">{statusCounts.requested}</span>
              <span className="text-[10px] text-muted-foreground">New customer orders</span>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-blue-600 block">Accepted</span>
              <span className="text-2xl font-bold text-foreground mt-1 block">{statusCounts.accepted}</span>
              <span className="text-[10px] text-muted-foreground">Technician assigned</span>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-purple-600 block">In Progress</span>
              <span className="text-2xl font-bold text-foreground mt-1 block">{statusCounts["in-progress"]}</span>
              <span className="text-[10px] text-muted-foreground">Repairs underway</span>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-emerald-600 block">Completed</span>
              <span className="text-2xl font-bold text-foreground mt-1 block">{statusCounts.completed}</span>
              <span className="text-[10px] text-muted-foreground">Finished & resolved</span>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 text-center col-span-2 sm:col-span-2">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground block">
                Cancelled / Rejected
              </span>
              <span className="text-2xl font-bold text-foreground mt-1 block">{statusCounts.cancelled}</span>
              <span className="text-[10px] text-muted-foreground">Cancelled by user or declined</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50 flex justify-end">
            <Button variant="ghost" size="sm" asChild className="text-xs text-primary gap-1">
              <Link href="/dashboard/admin/bookings">
                Manage All Bookings
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card shadow-xs overflow-hidden">
        {/* Tab Header Controls */}
        <div className="border-b border-border/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/20">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Quick Action & Live Feeds
            </h2>
            <p className="text-xs text-muted-foreground">
              Direct access to submissions, latest bookings, and new platform members
            </p>
          </div>

          <div className="inline-flex rounded-xl bg-muted p-1 text-xs font-semibold gap-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("pending-services")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTab === "pending-services"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Pending Services ({pendingServices})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("recent-bookings")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTab === "recent-bookings"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Recent Bookings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("recent-users")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTab === "recent-users"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              New Users
            </button>
          </div>
        </div>

        {/* Tab Content 1: Pending Services */}
        {activeTab === "pending-services" && (
          <div className="p-4 sm:p-6">
            {pendingList.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h3 className="text-sm font-bold text-foreground">Zero Pending Approvals</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  All technician service listings have been reviewed and moderated!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingList.map((service) => (
                  <div
                    key={service._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">{service.title}</span>
                        <Badge
                          variant="outline"
                          className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-xs gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          Pending Approval
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>Technician: <strong className="text-foreground">{service.technicianName}</strong></span>
                        <span>•</span>
                        <span>Category: {service.category}</span>
                        <span>•</span>
                        <span>Base: ${service.basePrice}</span>
                      </div>
                    </div>
                    <Button size="sm" asChild className="self-end sm:self-center text-xs font-semibold">
                      <Link
                        href={withHighlight(
                          "/dashboard/admin/services?status=pending",
                          service._id,
                          "service-row-",
                        )}
                      >
                        Review Now
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Recent Bookings */}
        {activeTab === "recent-bookings" && (
          <div className="p-4 sm:p-6">
            {recentBookingsList.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <CalendarCheck2 className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="text-sm font-bold text-foreground">No Bookings Recorded</h3>
                <p className="text-xs text-muted-foreground">Bookings will show up as customers schedule repairs.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookingsList.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">{booking.serviceTitle}</span>
                        {getBookingStatusBadge(booking.status)}
                      </div>
                      <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>Customer: <strong className="text-foreground">{booking.customerName}</strong></span>
                        <span>•</span>
                        <span>Tech: {booking.technicianName}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="self-end sm:self-center text-xs">
                      <Link
                        href={withHighlight(
                          `/dashboard/admin/bookings?status=${booking.status}`,
                          booking._id,
                          "booking-row-",
                        )}
                      >
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 3: Recent Users */}
        {activeTab === "recent-users" && (
          <div className="p-4 sm:p-6">
            {recentUsersList.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <Users className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="text-sm font-bold text-foreground">No Users Found</h3>
              </div>
            ) : (
              <div className="space-y-3">
                {recentUsersList.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">{user.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "admin"
                              ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-xs gap-1"
                              : user.role === "technician"
                                ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs gap-1"
                                : "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-xs gap-1"
                          }
                        >
                          {user.role === "admin" ? (
                            <ShieldCheck className="h-3 w-3" />
                          ) : user.role === "technician" ? (
                            <Wrench className="h-3 w-3" />
                          ) : (
                            <UserCheck className="h-3 w-3" />
                          )}
                          {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Customer"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild className="self-end sm:self-center text-xs">
                      <Link
                        href={withHighlight(
                          `/dashboard/admin/users?search=${encodeURIComponent(user.email)}`,
                          user._id,
                          "user-row-",
                        )}
                      >
                        Edit Role
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

     
    </div>
  );
}
