"use client";

import Link from "next/link";
import {
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  User,
  ShieldCheck,
  Zap,
  Sparkles,
  AlertCircle,
  Search,
  Check,
  CreditCard,
  Smartphone,
  Laptop,
  Wind,
  Tv,
  Refrigerator,
  Zap as ElectricalIcon,
  Flame,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BookingItem, BookingStatus, CustomUser } from "@/types";
import { withHighlight } from "@/lib/highlight";

interface CustomerOverviewClientProps {
  user: CustomUser;
  bookings: BookingItem[];
}

/** Consistent colored status badge with icon across all dashboards */
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
          className="border-muted-foreground/30 bg-muted/60 text-muted-foreground font-semibold text-xs capitalize gap-1"
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

// 4 Popular repair categories with quick action link
const QUICK_BOOKING_CATEGORIES = [
  { name: "Smartphone", icon: Smartphone, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { name: "Laptop & PC", icon: Laptop, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { name: "AC", icon: Wind, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
  { name: "Refrigerator", icon: Refrigerator, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { name: "TV", icon: Tv, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { name: "Electrical", icon: ElectricalIcon, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
];

export function CustomerOverviewClient({
  user,
  bookings,
}: CustomerOverviewClientProps) {
  // Stats cards (Total Requests, Active Jobs, Completed Jobs)
  const totalRequests = bookings.length;
  const activeJobs = bookings.filter(
    (b) => b.status === "requested" || b.status === "accepted" || b.status === "in-progress"
  ).length;
  const completedJobs = bookings.filter((b) => b.status === "completed").length;

  // Active or upcoming repairs for immediate status tracking
  const activeBookingsList = bookings
    .filter((b) => b.status === "requested" || b.status === "accepted" || b.status === "in-progress")
    .slice(0, 3);

  // Completed but unpaid jobs that need customer payment
  const pendingPayments = bookings.filter(
    (b) => b.status === "completed" && b.paymentStatus === "unpaid"
  );

  return (
    <div className="space-y-8 w-full">
      {/* -------------------- Top Hero Welcome Banner -------------------- */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-r from-card via-card to-primary/5 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" />
              Customer Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Hello, {user.name || "Customer"}!
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Welcome to your personal repair dashboard. Book doorstep services from verified technicians and pay securely after completion.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="gap-2 shadow-xs font-semibold">
              <Link href="/services">
                <Search className="h-4 w-4" />
                Book a Repair
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/dashboard/customer/bookings">
                <Wrench className="h-4 w-4" />
                My Bookings
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-primary/5 blur-2xl" />
      </div>

      {/* -------------------- Unpaid Completed Bookings Notice (If Any) -------------------- */}
      {pendingPayments.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-300">
                Payment Pending for {pendingPayments.length} Completed {pendingPayments.length === 1 ? "Repair" : "Repairs"}
              </p>
              <p className="text-xs text-amber-700/80 dark:text-amber-400/90 mt-0.5">
                Your technician has completed the job. You can review the service and pay securely.
              </p>
            </div>
          </div>
          <Button size="sm" asChild className="bg-amber-600 hover:bg-amber-700 text-white font-semibold shrink-0">
            <Link href="/dashboard/customer/bookings">
              Pay Now
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      )}

      {/* -------------------- Core Required Stats Cards -------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Requests */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Requests
            </span>
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground tracking-tight">
              {totalRequests}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Total repair orders placed
          </p>
          <Link
            href="/dashboard/customer/bookings"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary group-hover:underline"
          >
            <span>View All Bookings</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Active Jobs */}
        <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all">
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
              {activeJobs}
            </span>
            {activeJobs > 0 && (
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs"
              >
                In Progress
              </Badge>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            Currently active or requested
          </p>
          <Link
            href="/dashboard/customer/bookings"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:underline"
          >
            <span>Track Progress</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Completed Jobs */}
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
              {completedJobs}
            </span>
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs"
            >
              Delivered
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Successfully serviced repairs
          </p>
          <Link
            href="/dashboard/customer/payments"
            className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline"
          >
            <span>Payment History</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* -------------------- Ongoing / Active Repairs (If customer has any) -------------------- */}
      {activeBookingsList.length > 0 && (
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Active Repair Progress
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your repairs currently in motion.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="text-xs gap-1">
              <Link href="/dashboard/customer/bookings">
                Manage All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            {activeBookingsList.map((booking) => (
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
                      Technician: {booking.technicianName}
                    </span>
                    {booking.preferredDate && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                        {new Date(booking.preferredDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
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
                    ${Number(booking.finalAmount || booking.basePrice || 0).toFixed(2)}
                  </span>
                  <Button size="sm" variant="outline" asChild className="text-xs font-semibold">
                    <Link
                      href={withHighlight(
                        "/dashboard/customer/bookings",
                        booking._id,
                        "booking-row-",
                      )}
                    >
                      Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* -------------------- Unique Section 1: Quick Booking by Appliance Category -------------------- */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              What needs fixing today?
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click any category to instantly view available technicians and instant rates.
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-xs text-primary gap-1">
            <Link href="/services">
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* 6 Category Shortcut Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_BOOKING_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/services?category=${encodeURIComponent(cat.name)}`}
                className="group rounded-xl border border-border/60 bg-background/50 p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-primary/50 hover:bg-card hover:shadow-xs transition-all"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${cat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 group-hover:underline">
                  Find Tech
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
