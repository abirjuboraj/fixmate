"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  DollarSign,
  User,
  Wrench,
  AlertTriangle,
  CreditCard,
  Ban,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Loader2,
  ArrowRight,
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
import { BookingItem, BookingStatus, PaymentStatus } from "@/types";
import { cancelBooking, initiateBookingPayment } from "@/lib/action/bookings";
import { toast } from "sonner";

interface CustomerBookingsClientProps {
  initialBookings: BookingItem[];
}

/**
 * Status Badge configuration with color styling and icons
 */
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
        <Badge variant="outline" className="text-xs capitalize">
          <HelpCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      );
  }
}

/**
 * Payment Status Badge configuration
 */
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

/**
 * Helper to format preferred date nicely
 */
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

export function CustomerBookingsClient({
  initialBookings,
}: CustomerBookingsClientProps) {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings || []);

  // Modal state for booking cancellation confirmation
  const [cancellingBooking, setCancellingBooking] = useState<BookingItem | null>(
    null
  );
  const [isCancelling, setIsCancelling] = useState(false);

  // Loading state for Pay Now action
  const [payingBookingId, setPayingBookingId] = useState<string | null>(null);

  /**
   * Handle Cancel Confirmation & Submission
   */
  const handleConfirmCancel = async () => {
    if (!cancellingBooking || !cancellingBooking._id) return;

    setIsCancelling(true);

    try {
      // 1. Call server action
      const res = await cancelBooking(cancellingBooking._id);

      if (res && res.success === false) {
        throw new Error(res.message || "Failed to cancel booking.");
      }

      // 2. Optimistically update local booking status to 'cancelled'
      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancellingBooking._id
            ? { ...b, status: "cancelled" as BookingStatus }
            : b
        )
      );

      toast.success("Booking request cancelled successfully.");
      setCancellingBooking(null);
      router.refresh();
    } catch (err: unknown) {
      console.error("Cancel booking error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to cancel booking.";
      toast.error(message);
    } finally {
      setIsCancelling(false);
    }
  };

  /**
   * Handle Pay Now (Stripe Checkout)
   */
  const handlePayNow = async (booking: BookingItem) => {
    if (!booking._id) return;

    setPayingBookingId(booking._id);

    try {
      toast.info("Preparing secure Stripe checkout session...");

      const res = await initiateBookingPayment(booking._id);

      // Backend returns { success: true, data: { url, sessionId } }
      const checkoutUrl = res?.data?.url || res?.url;

      if (checkoutUrl) {
        // Redirect user to Stripe Checkout hosted payment page
        window.location.href = checkoutUrl;
        return;
      }

      throw new Error(res?.message || "Failed to retrieve checkout URL.");
    } catch (err: unknown) {
      console.error("Payment initiation error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to initiate payment.";
      toast.error(message);
    } finally {
      setPayingBookingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── EMPTY STATE ── */}
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Wrench className="h-7 w-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-foreground">
              No Repair Bookings Found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              You haven&apos;t placed any repair requests yet. Browse our verified
              services to find an expert technician for your device.
            </p>
          </div>
          <Button asChild size="default" className="gap-2 font-semibold shadow-xs">
            <Link href="/services">
              Browse Repair Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          {/* ── DESKTOP TABLE VIEW (Visible on md & up) ── */}
          <div className="hidden md:block rounded-2xl border border-border/70 bg-card shadow-xs overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[300px]">Service &amp; Category</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Preferred Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => {
                  const amount =
                    booking.finalAmount !== undefined
                      ? booking.finalAmount
                      : booking.basePrice;

                  const canCancel = booking.status === "requested";
                  const canPay =
                    booking.status === "completed" &&
                    booking.paymentStatus === "unpaid";
                  const isPaid = booking.paymentStatus === "paid";

                  return (
                    <TableRow key={booking._id || Math.random()}>
                      {/* Service Info with Image */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted/50 border border-border/70 shrink-0">
                            {booking.serviceImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={booking.serviceImage}
                                alt={booking.serviceTitle}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                <Wrench className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <p className="font-semibold text-foreground text-sm truncate max-w-[210px]">
                              {booking.serviceTitle}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.category}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Technician */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                          <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="truncate max-w-[130px]">
                            {booking.technicianName}
                          </span>
                        </div>
                      </TableCell>

                      {/* Preferred Date */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{formatDisplayDate(booking.preferredDate)}</span>
                        </div>
                      </TableCell>

                      {/* Price / Final Amount */}
                      <TableCell>
                        <div className="font-bold text-foreground text-sm">
                          ${amount?.toFixed(2)}
                        </div>
                      </TableCell>

                      {/* Booking Status Badge */}
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>

                      {/* Payment Badge */}
                      <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>

                      {/* Action Button: Cancel (if requested) or Pay Now (if completed & unpaid) */}
                      <TableCell className="text-center">
                        {canCancel && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setCancellingBooking(booking)}
                            className="h-8 gap-1.5 text-xs font-semibold shadow-2xs"
                          >
                            <Ban className="h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        )}

                        {canPay && (
                          <Button
                            size="sm"
                            onClick={() => handlePayNow(booking)}
                            disabled={payingBookingId === booking._id}
                            className="h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs"
                          >
                            {payingBookingId === booking._id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <CreditCard className="h-3.5 w-3.5" />
                            )}
                            Pay Now
                          </Button>
                        )}

                        {isPaid && (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed
                          </span>
                        )}

                        {booking.status === "accepted" && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Request Accepted
                          </span>
                        )}

                        {booking.status === "in-progress" && (
                          <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold inline-flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                            </span>
                            In progress
                          </span>
                        )}

                        {booking.status === "cancelled" && (
                          <span className="text-xs text-muted-foreground/80 font-medium">
                            No action required
                          </span>
                        )}

                        {booking.status === "rejected" && (
                          <span className="text-xs text-muted-foreground/80 font-medium">
                            Request rejected
                          </span>
                        )}

                        {!canCancel &&
                          !canPay &&
                          !isPaid &&
                          booking.status !== "accepted" &&
                          booking.status !== "in-progress" &&
                          booking.status !== "cancelled" &&
                          booking.status !== "rejected" && (
                            <span className="text-xs text-muted-foreground italic">
                              Pending update
                            </span>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* ── MOBILE CARDS VIEW (Visible on sm & down) ── */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking) => {
              const amount =
                booking.finalAmount !== undefined
                  ? booking.finalAmount
                  : booking.basePrice;

              const canCancel = booking.status === "requested";
              const canPay =
                booking.status === "completed" &&
                booking.paymentStatus === "unpaid";
              const isPaid = booking.paymentStatus === "paid";

              return (
                <div
                  key={booking._id || Math.random()}
                  className="rounded-2xl border border-border/80 bg-card p-4 shadow-xs space-y-4"
                >
                  {/* Top: Service info + Thumbnail */}
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-muted/50 border border-border/70 shrink-0">
                      {booking.serviceImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={booking.serviceImage}
                          alt={booking.serviceTitle}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                          <Wrench className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                          {booking.category}
                        </span>
                        <span className="text-base font-extrabold text-foreground">
                          ${amount?.toFixed(2)}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-sm line-clamp-1">
                        {booking.serviceTitle}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Tech: {booking.technicianName}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Details & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      <span>{formatDisplayDate(booking.preferredDate)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.paymentStatus)}
                    </div>
                  </div>

                  {/* Bottom: Action buttons */}
                  {(canCancel || canPay) && (
                    <div className="pt-2 border-t border-border/60">
                      {canCancel && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setCancellingBooking(booking)}
                          className="w-full gap-1.5 text-xs font-semibold"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          Cancel Request
                        </Button>
                      )}

                      {canPay && (
                        <Button
                          size="sm"
                          onClick={() => handlePayNow(booking)}
                          disabled={payingBookingId === booking._id}
                          className="w-full gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs"
                        >
                          {payingBookingId === booking._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <CreditCard className="h-3.5 w-3.5" />
                          )}
                          Pay with Stripe (${amount?.toFixed(2)})
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── CANCELLATION CONFIRMATION MODAL ── */}
      {cancellingBooking && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  Cancel Repair Request?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Are you sure you want to cancel your repair booking for{" "}
                  <strong className="text-foreground">
                    &ldquo;{cancellingBooking.serviceTitle}&rdquo;
                  </strong>
                  ? This action will set your request status to cancelled.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCancellingBooking(null)}
                disabled={isCancelling}
                className="font-medium text-xs"
              >
                Keep Booking
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="gap-1.5 font-semibold text-xs shadow-xs"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <Ban className="h-3.5 w-3.5" />
                    Confirm Cancellation
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
