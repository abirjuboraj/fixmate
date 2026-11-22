"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  DollarSign,
  User,
  Phone,
  MapPin,
  FileText,
  Wrench,
  CheckCircle2,
  XCircle,
  Play,
  Check,
  Ban,
  HelpCircle,
  Loader2,
  X,
  Filter,
  RotateCcw,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingItem, BookingStatus, PaymentStatus } from "@/types";
import { updateBookingStatus } from "@/lib/action/bookings";
import { useHighlight } from "@/hooks/use-highlight";
import {
  HIGHLIGHT_CARD_CLASS,
  HIGHLIGHT_ROW_CLASS,
  HIGHLIGHT_TRANSITION,
} from "@/lib/highlight";
import { toast } from "sonner";

interface TechnicianRequestsClientProps {
  initialBookings: BookingItem[];
  highlightId?: string;
}

// Filter tabs definition
type FilterTab = "all" | "requested" | "accepted" | "in-progress" | "completed";

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All Requests", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

/**
 * Status Badge for Technician View
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
 * Payment Badge helper
 */
function getPaymentBadge(paymentStatus?: PaymentStatus) {
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
 * Format preferred date nicely
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

export function TechnicianRequestsClient({
  initialBookings,
  highlightId,
}: TechnicianRequestsClientProps) {
  const router = useRouter();
  const isHighlighting = useHighlight(
    highlightId,
    "booking-row-",
    "booking-card-",
  );


  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings || []);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [completingBooking, setCompletingBooking] = useState<BookingItem | null>(
    null
  );
  const [finalAmountInput, setFinalAmountInput] = useState<string>("");
  const [isSubmittingCompletion, setIsSubmittingCompletion] = useState(false);
  const [rejectingBooking, setRejectingBooking] = useState<BookingItem | null>(
    null
  );
  const [viewingProblemBooking, setViewingProblemBooking] = useState<BookingItem | null>(
    null
  );

  const filteredBookings = useMemo(() => {
    if (activeTab === "all") return bookings;
    return bookings.filter((b) => b.status === activeTab);
  }, [bookings, activeTab]);

  const handleStatusChange = async (
    bookingId: string,
    newStatus: "accepted" | "rejected" | "in-progress"
  ) => {
    const actionKey = `${bookingId}:${newStatus}`;
    setLoadingAction(actionKey);

    try {
      const res = await updateBookingStatus(bookingId, newStatus);

      if (res && res.success === false) {
        throw new Error(res.message || `Failed to update status to ${newStatus}`);
      }
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );

      const statusLabels: Record<string, string> = {
        accepted: "Request accepted!",
        rejected: "Request rejected.",
        "in-progress": "Job marked In Progress!",
      };

      toast.success(statusLabels[newStatus] || "Status updated successfully.");
      router.refresh();
    } catch (err: unknown) {
      console.error("Status update error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to update booking status.";
      toast.error(message);
    } finally {
      setLoadingAction(null);
    }
  };

  /**
   * Action: Confirm Reject — closes the modal after the status update.
   * handleStatusChange never throws (it shows its own error toast),
   * so it is safe to close the modal right after awaiting it.
   */
  const handleConfirmReject = async () => {
    if (!rejectingBooking?._id) return;

    await handleStatusChange(rejectingBooking._id, "rejected");
    setRejectingBooking(null);
  };

  /**
   * Action: Open Mark Completed Modal
   */
  const handleOpenCompleteModal = (booking: BookingItem) => {
    setCompletingBooking(booking);
    // Pre-fill with the base price or existing final amount
    const defaultAmount =
      booking.finalAmount !== undefined
        ? booking.finalAmount
        : booking.basePrice;
    setFinalAmountInput(String(defaultAmount || ""));
  };

  /**
   * Action: Submit Completion with final amount
   */
  const handleSubmitCompletion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!completingBooking || !completingBooking._id) return;

    const parsedAmount = parseFloat(finalAmountInput);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid final amount greater than 0.");
      return;
    }

    setIsSubmittingCompletion(true);

    try {
      const res = await updateBookingStatus(
        completingBooking._id,
        "completed",
        parsedAmount
      );

      if (res && res.success === false) {
        throw new Error(res.message || "Failed to mark booking as completed.");
      }

      // Optimistically update local state
      setBookings((prev) =>
        prev.map((b) =>
          b._id === completingBooking._id
            ? { ...b, status: "completed", finalAmount: parsedAmount }
            : b
        )
      );

      toast.success("Repair marked as Completed! Customer can now pay.");
      setCompletingBooking(null);
      router.refresh();
    } catch (err: unknown) {
      console.error("Complete repair error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to complete repair.";
      toast.error(message);
    } finally {
      setIsSubmittingCompletion(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── FILTER TABS ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mr-2">
          <Filter className="h-3.5 w-3.5" />
          Filter:
        </div>
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          // Count items in each category
          const count =
            tab.value === "all"
              ? bookings.length
              : bookings.filter((b) => b.status === tab.value).length;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${isActive
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-background text-muted-foreground border border-border/60"
                  }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── EMPTY STATE ── */}
      {filteredBookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center max-w-xl mx-auto space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
            <Wrench className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            No Requests Found
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {activeTab === "all"
              ? "You haven't received any customer repair requests yet."
              : `No requests with status "${activeTab}".`}
          </p>

          {/* CTA: jump to services when empty, or clear the status filter */}
          {activeTab === "all" ? (
            <Button asChild size="sm" className="gap-2 font-semibold shadow-xs">
              <Link href="/dashboard/technician/my-services">
                <Wrench className="h-4 w-4" />
                Manage My Services
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("all")}
              className="gap-1.5 font-medium"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Show All Requests
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* ── DESKTOP TABLE VIEW (Visible on lg & up) ── */}
          <div className="hidden lg:block rounded-2xl border border-border/70 bg-card shadow-xs overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-55">Customer Details</TableHead>
                  <TableHead className="w-45">Service &amp; Price</TableHead>
                  <TableHead className="w-35">Preferred Date</TableHead>
                  <TableHead className="w-60">Problem &amp; Address</TableHead>
                  <TableHead className="w-27.5">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking, index) => {
                  const bookingId = booking._id || "";
                  const isBookingBusy = !!loadingAction && loadingAction.startsWith(`${bookingId}:`);
                  const isAccepting = loadingAction === `${bookingId}:accepted`;
                  const isRejecting = loadingAction === `${bookingId}:rejected`;
                  const isStarting = loadingAction === `${bookingId}:in-progress`;

                  const isRequested = booking.status === "requested";
                  const isAccepted = booking.status === "accepted";
                  const isInProgress = booking.status === "in-progress";
                  const isCompleted = booking.status === "completed";
                  const isFinishedOrCancelled =
                    isCompleted ||
                    booking.status === "rejected" ||
                    booking.status === "cancelled";

                  const amount =
                    booking.finalAmount !== undefined
                      ? booking.finalAmount
                      : booking.basePrice;

                  return (
                    <TableRow
                      key={bookingId || index}
                      id={`booking-row-${bookingId}`}
                      className={`${HIGHLIGHT_TRANSITION} ${
                        isHighlighting && booking._id === highlightId
                          ? HIGHLIGHT_ROW_CLASS
                          : ""
                      }`}
                    >
                      {/* Customer Name & Phone */}
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="truncate">{booking.customerName}</span>
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span>{booking.customerPhone}</span>
                          </p>
                        </div>
                      </TableCell>

                      {/* Service Title & Base Price */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-medium text-foreground text-xs line-clamp-1">
                            {booking.serviceTitle}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span>Base: ${booking.basePrice?.toFixed(2)}</span>
                            {booking.finalAmount && booking.finalAmount !== booking.basePrice && (
                              <span className="text-foreground font-bold">
                                • Final: ${booking.finalAmount?.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Preferred Date */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                          <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{formatDisplayDate(booking.preferredDate)}</span>
                        </div>
                      </TableCell>

                      {/* Problem Description & Address */}
                      <TableCell>
                        <div className="space-y-1 max-w-65">
                          <div>
                            <p
                              className="text-xs  max-w-xs truncate text-foreground leading-relaxed"
                              title={booking.problemDescription}
                            >
                              &ldquo;{booking.problemDescription}&rdquo;
                            </p>
                            {booking.problemDescription && booking.problemDescription.length > 40 && (
                              <button
                                type="button"
                                onClick={() => setViewingProblemBooking(booking)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 hover:underline cursor-pointer mt-0.5"
                              >
                                <Eye className="h-3 w-3" />
                                Read full details
                              </button>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                            <span className="truncate">{booking.address}</span>
                          </p>
                        </div>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>

                      {/* Action Buttons: Status specific */}
                      <TableCell className="text-right">
                        {/* 1. Requested: Accept / Reject */}
                        {isRequested && (
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(bookingId, "accepted")}
                              disabled={isBookingBusy}
                              className="h-8 gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs"
                            >
                              {isAccepting ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Check className="h-3.5 w-3.5" />
                              )}
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setRejectingBooking(booking)}
                              disabled={isBookingBusy}
                              className="h-8 gap-1 text-xs font-semibold shadow-2xs"
                            >
                              {isRejecting ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <X className="h-3.5 w-3.5" />
                              )}
                              Reject
                            </Button>
                          </div>
                        )}

                        {/* 2. Accepted: Start Work (becomes in-progress) */}
                        {isAccepted && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(bookingId, "in-progress")}
                            disabled={isBookingBusy}
                            className="h-8 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs"
                          >
                            {isStarting ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Play className="h-3.5 w-3.5" />
                            )}
                            Start Work
                          </Button>
                        )}

                        {/* 3. In Progress: Mark Completed (opens modal for final amount) */}
                        {isInProgress && (
                          <Button
                            size="sm"
                            onClick={() => handleOpenCompleteModal(booking)}
                            disabled={isBookingBusy}
                            className="h-8 gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-2xs"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Mark Completed
                          </Button>
                        )}

                        {/* 4. Completed: Show payment badge */}
                        {isCompleted && (
                          <div className="flex items-center justify-end gap-1.5">

                            {getPaymentBadge(booking.paymentStatus)}
                          </div>
                        )}

                        {/* 5. Rejected / Cancelled */}
                        {(booking.status === "rejected" ||
                          booking.status === "cancelled") && (
                            <span className="text-xs text-muted-foreground/80 font-medium">
                              No action
                            </span>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* ── MOBILE CARDS VIEW (Visible on md & down) ── */}
          <div className="lg:hidden space-y-4">
            {filteredBookings.map((booking, index) => {
              const bookingId = booking._id || "";
              const isBookingBusy = !!loadingAction && loadingAction.startsWith(`${bookingId}:`);
              const isAccepting = loadingAction === `${bookingId}:accepted`;
              const isRejecting = loadingAction === `${bookingId}:rejected`;
              const isStarting = loadingAction === `${bookingId}:in-progress`;

              const isRequested = booking.status === "requested";
              const isAccepted = booking.status === "accepted";
              const isInProgress = booking.status === "in-progress";
              const isCompleted = booking.status === "completed";

              const amount =
                booking.finalAmount !== undefined
                  ? booking.finalAmount
                  : booking.basePrice;

              return (
                <div
                  key={bookingId || index}
                  id={`booking-card-${bookingId}`}
                  className={`rounded-2xl border bg-card p-4 shadow-xs space-y-3.5 ${HIGHLIGHT_TRANSITION} ${
                    isHighlighting && booking._id === highlightId
                      ? HIGHLIGHT_CARD_CLASS
                      : "border-border/80"
                  }`}
                >
                  {/* Card Header: Service Title & Status */}
                  <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold text-primary uppercase">
                        {booking.category}
                      </p>
                      <h4 className="font-bold text-foreground text-sm line-clamp-1">
                        {booking.serviceTitle}
                      </h4>
                    </div>
                    <div>{getStatusBadge(booking.status)}</div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">
                        Customer
                      </span>
                      <p className="font-semibold text-foreground truncate">
                        {booking.customerName}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">
                        Contact
                      </span>
                      <p className="font-medium text-foreground">
                        {booking.customerPhone}
                      </p>
                    </div>
                  </div>

                  {/* Date & Address */}
                  <div className="space-y-1.5 text-xs border-t border-border/50 pt-2.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Preferred Date: {formatDisplayDate(booking.preferredDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{booking.address}</span>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="bg-muted/40 rounded-xl p-3 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">
                      Problem Description
                    </span>
                    <p className="text-foreground leading-relaxed">
                      &ldquo;{booking.problemDescription}&rdquo;
                    </p>
                  </div>

                  {/* Pricing info */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-muted-foreground">
                      Base Price: ${booking.basePrice?.toFixed(2)}
                    </span>
                    {booking.finalAmount && (
                      <span className="font-bold text-foreground">
                        Final Amount: ${booking.finalAmount?.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-border/60 pt-3">
                    {/* Requested: Accept / Reject */}
                    {isRequested && (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(bookingId, "accepted")}
                          disabled={isBookingBusy}
                          className="w-full gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                        >
                          {isAccepting ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setRejectingBooking(booking)}
                          disabled={isBookingBusy}
                          className="w-full gap-1.5 font-semibold text-xs"
                        >
                          {isRejecting ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <X className="h-3.5 w-3.5" />
                          )}
                          Reject
                        </Button>
                      </div>
                    )}

                    {/* Accepted: Start Work */}
                    {isAccepted && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(bookingId, "in-progress")}
                        disabled={isBookingBusy}
                        className="w-full gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs"
                      >
                        {isStarting ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Play className="h-3.5 w-3.5" />
                        )}
                        Start Work
                      </Button>
                    )}

                    {/* In Progress: Mark Completed */}
                    {isInProgress && (
                      <Button
                        size="sm"
                        onClick={() => handleOpenCompleteModal(booking)}
                        disabled={isBookingBusy}
                        className="w-full gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Mark Completed
                      </Button>
                    )}

                    {/* Completed: Payment badge */}
                    {isCompleted && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                          Customer Payment:
                        </span>
                        {getPaymentBadge(booking.paymentStatus)}
                      </div>
                    )}

                    {/* Cancelled / Rejected */}
                    {(booking.status === "rejected" ||
                      booking.status === "cancelled") && (
                        <p className="text-center text-xs text-muted-foreground italic">
                          No further action available.
                        </p>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── MARK COMPLETED MODAL ── */}
      {completingBooking && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Mark Repair Completed
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Enter the final invoice amount for this job.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCompletingBooking(null)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitCompletion} className="space-y-4">
              {/* Service & Customer Summary */}
              <div className="rounded-xl bg-muted/40 p-3 space-y-1.5 text-xs">
                <p>
                  <strong className="text-foreground">Service:</strong>{" "}
                  <span className="text-muted-foreground">
                    {completingBooking.serviceTitle}
                  </span>
                </p>
                <p>
                  <strong className="text-foreground">Customer:</strong>{" "}
                  <span className="text-muted-foreground">
                    {completingBooking.customerName} ({completingBooking.customerPhone})
                  </span>
                </p>
                <p>
                  <strong className="text-foreground">Base Starting Price:</strong>{" "}
                  <span className="text-muted-foreground font-semibold">
                    ${completingBooking.basePrice?.toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Final Amount Input */}
              <div className="space-y-1.5">
                <Label htmlFor="finalAmount" className="text-xs font-semibold">
                  Final Amount ($ USD)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="finalAmount"
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="Enter final charge (e.g. 50.00)"
                    value={finalAmountInput}
                    onChange={(e) => setFinalAmountInput(e.target.value)}
                    required
                    className="pl-9 font-semibold text-sm"
                  />
                </div>
                <p className="text-[11px] font-semibold text-muted-foreground">
                  Adjust if parts or diagnostics were added.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/60">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCompletingBooking(null)}
                  disabled={isSubmittingCompletion}
                  className="font-medium text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmittingCompletion}
                  className="gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs"
                >
                  {isSubmittingCompletion ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Confirm &amp; Complete
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── REJECT CONFIRMATION MODAL ── */}
      {rejectingBooking && (
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
                  Reject This Repair Request?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Are you sure you want to reject the request from{" "}
                  <strong className="text-foreground">
                    {rejectingBooking.customerName}
                  </strong>{" "}
                  for{" "}
                  <strong className="text-foreground">
                    &ldquo;{rejectingBooking.serviceTitle}&rdquo;
                  </strong>
                  ? The customer will see the request as rejected.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRejectingBooking(null)}
                disabled={loadingAction === `${rejectingBooking._id}:rejected`}
                className="font-medium text-xs"
              >
                Keep Request
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleConfirmReject}
                disabled={loadingAction === `${rejectingBooking._id}:rejected`}
                className="gap-1.5 font-semibold text-xs shadow-xs"
              >
                {loadingAction === `${rejectingBooking._id}:rejected` ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <X className="h-3.5 w-3.5" />
                    Confirm Reject
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: View Full Problem Description ── */}
      {viewingProblemBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0">
          <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Problem Description
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Reported by {viewingProblemBooking.customerName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingProblemBooking(null)}
                className="text-muted-foreground hover:text-foreground cursor-pointer rounded-lg p-1 hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Service & Customer details */}
            <div className="rounded-xl bg-muted/40 p-3 space-y-1.5 text-xs">
              <p>
                <strong className="text-foreground">Service:</strong>{" "}
                <span className="text-muted-foreground">
                  {viewingProblemBooking.serviceTitle}
                </span>
              </p>
              <p>
                <strong className="text-foreground">Customer Phone:</strong>{" "}
                <span className="text-muted-foreground">
                  {viewingProblemBooking.customerPhone}
                </span>
              </p>
              <p>
                <strong className="text-foreground">Service Address:</strong>{" "}
                <span className="text-muted-foreground">
                  {viewingProblemBooking.address}
                </span>
              </p>
            </div>

            {/* Full text content */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Customer&apos;s Statement
              </span>
              <div className="rounded-xl border border-border/70 bg-background p-4 max-h-60 overflow-y-auto">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {viewingProblemBooking.problemDescription}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end pt-2 border-t border-border/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingProblemBooking(null)}
                className="font-medium text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
