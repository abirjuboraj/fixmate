"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock,
  HelpCircle,
  Inbox,
  RotateCcw,
  ShieldAlert,
  User,
  Wrench,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BookingItem, BookingStatus, PaymentStatus } from "@/types";
import { useHighlight } from "@/hooks/use-highlight";
import {
  HIGHLIGHT_CARD_CLASS,
  HIGHLIGHT_ROW_CLASS,
  HIGHLIGHT_TRANSITION,
} from "@/lib/highlight";

interface AdminBookingsViewProps {
  bookings: BookingItem[];
  fetchError: string | null;
  initialStatus: string;
  highlightId?: string;
}


const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
  { value: "cancelled", label: "Cancelled" },
];

/** Colored badge + icon for each booking status */
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
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="border-muted-foreground/30 bg-muted/60 text-muted-foreground font-semibold text-xs capitalize gap-1"
        >
          <Ban className="h-3 w-3" />
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs capitalize gap-1">
          <HelpCircle className="h-3 w-3" />
          {status}
        </Badge>
      );
  }
}

/** Paid / Unpaid badge */
function getPaymentBadge(paymentStatus: PaymentStatus) {
  if (paymentStatus === "paid") {
    return (
      <Badge
        variant="outline"
        className="border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs gap-1"
      >
        <CheckCircle2 className="h-3 w-3" />
        Paid
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-xs gap-1"
    >
      <Clock className="h-3 w-3" />
      Unpaid
    </Badge>
  );
}

/** Format a date nicely, e.g. "Nov 20, 2026" */
function formatDisplayDate(dateInput?: Date | string) {
  if (!dateInput) return "N/A";
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return String(dateInput);
  }
}

/** Amount shown: final agreed price if set, otherwise the base price */
function getAmount(booking: BookingItem): number {
  return booking.finalAmount !== undefined
    ? booking.finalAmount
    : booking.basePrice;
}

/** Small thumbnail with a graceful placeholder when there is no image */
function BookingImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="h-11 w-11 rounded-lg border border-border/60 bg-muted/50 flex items-center justify-center shrink-0 text-muted-foreground">
        <Wrench className="h-4 w-4" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-11 w-11 rounded-lg border border-border/60 object-cover shrink-0"
    />
  );
}

export function AdminBookingsView({
  bookings,
  fetchError,
  initialStatus,
  highlightId,
}: AdminBookingsViewProps) {
  const router = useRouter();

  // All bookings arrive from the server once; filtering is local and instant.
  const [status, setStatus] = useState(initialStatus);
  const visibleBookings = bookings.filter(
    (booking) => status === "all" || booking.status === status,
  );

  // Shared highlight behaviour (scroll + 5s glow + smooth fade).
  const isHighlighting = useHighlight(
    highlightId,
    "booking-row-",
    "booking-card-",
  );

  const handleStatusFilter = (newStatus: string) => {
    // Local state only — instant. Keep the URL shareable without navigating.
    setStatus(newStatus);
    window.history.replaceState(
      null,
      "",
      `/dashboard/admin/bookings?status=${newStatus}`,
    );
  };

  // ---------- Error state (backend unreachable, 500, etc.) ----------
  if (fetchError) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-8 text-center max-w-lg mx-auto">
        <ShieldAlert className="h-8 w-8 text-destructive mx-auto" />
        <h2 className="mt-3 text-base font-semibold">
          Could not load bookings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{fetchError}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 gap-2"
          onClick={() => router.refresh()}
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ---------- Status filter pills + result count ---------- */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((filter) => {
          const isActive = status === filter.value;

          return (
            <Button
              key={filter.value}
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => handleStatusFilter(filter.value)}
              className={isActive ? "font-semibold" : "text-muted-foreground"}
            >
              {filter.label}
            </Button>
          );
        })}

        <span className="text-sm text-muted-foreground ml-auto">
          <span className="font-semibold text-foreground">
            {visibleBookings.length}
          </span>{" "}
          booking{visibleBookings.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* ---------- Empty state ---------- */}
      {visibleBookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 bg-card/50 p-12 text-center max-w-lg mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Inbox className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            {status === "all"
              ? "No bookings yet"
              : `No ${STATUS_FILTERS.find((f) => f.value === status)?.label.toLowerCase()} bookings`}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {status === "all"
              ? "Once customers start requesting repairs, their bookings will appear here."
              : "No bookings match this status right now. Try another filter."}
          </p>

          {/* CTA: clear the filter, or return to the dashboard */}
          <Button
            variant="outline"
            size="sm"
            className="mt-4 gap-2 font-medium"
            onClick={() =>
              status !== "all"
                ? handleStatusFilter("all")
                : router.push("/dashboard/admin")
            }
          >
            {status !== "all" ? "Show All Bookings" : "Back to Dashboard"}
          </Button>
        </div>
      ) : (
        <>
          {/* ---------- Desktop: table ---------- */}
          <div className="hidden md:block rounded-xl border border-border/70 bg-card overflow-hidden shadow-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Service</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Technician
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleBookings.map((booking) => {
                  const isHighlighted = isHighlighting && booking._id === highlightId;
                  return (
                    <TableRow
                      key={booking._id}
                      id={`booking-row-${booking._id}`}
                      className={`${HIGHLIGHT_TRANSITION} ${
                        isHighlighted ? HIGHLIGHT_ROW_CLASS : ""
                      }`}
                    >
                      {/* Service: thumbnail + title + category */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <BookingImage
                            src={booking.serviceImage}
                            alt={booking.serviceTitle}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-foreground line-clamp-1 max-w-[200px]">
                              {booking.serviceTitle}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {booking.category}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Customer */}
                      <TableCell>
                        <p className="text-sm text-foreground font-medium truncate max-w-[160px]">
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                          {booking.customerEmail}
                        </p>
                      </TableCell>

                      {/* Technician */}
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-foreground">
                          <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="truncate max-w-[140px]">
                            {booking.technicianName}
                          </span>
                        </div>
                      </TableCell>

                      {/* Preferred date */}
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{formatDisplayDate(booking.preferredDate)}</span>
                        </div>
                      </TableCell>

                      {/* Status badge */}
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>

                      {/* Payment badge */}
                      <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>

                      {/* Amount (final price if set, else base price) */}
                      <TableCell className="text-right font-bold text-foreground">
                        ${getAmount(booking).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* ---------- Mobile: cards ---------- */}
          <div className="md:hidden space-y-3">
            {visibleBookings.map((booking) => {
              const isHighlighted = isHighlighting && booking._id === highlightId;
              return (
                <div
                  key={booking._id}
                  id={`booking-card-${booking._id}`}
                  className={`rounded-xl border bg-card p-4 shadow-xs space-y-3 ${HIGHLIGHT_TRANSITION} ${isHighlighted
                    ? HIGHLIGHT_CARD_CLASS
                    : "border-border/70"
                    }`}
                >
                  {/* Top: service info + amount */}
                  <div className="flex items-start gap-3">
                    <BookingImage
                      src={booking.serviceImage}
                      alt={booking.serviceTitle}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                            {booking.category}
                          </span>
                          <h4 className="font-semibold text-foreground text-sm line-clamp-1">
                            {booking.serviceTitle}
                          </h4>
                        </div>
                        <span className="text-base font-extrabold text-foreground shrink-0">
                          ${getAmount(booking).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                        <User className="h-3 w-3 shrink-0" />
                        {booking.customerName} • {booking.technicianName}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: date + badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      <span>{formatDisplayDate(booking.preferredDate)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.paymentStatus)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
