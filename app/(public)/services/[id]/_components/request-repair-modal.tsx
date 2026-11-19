"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  X,
  CheckCircle2,
  Send,
  Lock,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { type CreateBookingPayload, type ServiceDetailItem } from "@/types";
import { createBooking } from "@/lib/action/bookings";

interface RequestRepairModalProps {
  service: ServiceDetailItem;
  userName: string;
  userEmail: string;
  onClose: () => void;
}

// "YYYY-MM-DD" for today, used as the <input type="date"> minimum
// so the customer can never pick a past date.
const getTodayString = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
};

const MIN_DESCRIPTION_LENGTH = 20;

export function RequestRepairModal({
  service,
  userName,
  userEmail,
  onClose,
}: RequestRepairModalProps) {
  const todayString = getTodayString();

  // Editable form fields
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const descriptionLength = problemDescription.trim().length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // ---- Client-side validation (the server re-checks everything) ----
    const digitCount = phone.replace(/\D/g, "").length;
    if (!phone.trim() || digitCount < 7) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    if (!address.trim()) {
      setErrorMessage("Please enter the service address.");
      return;
    }
    if (!preferredDate) {
      setErrorMessage("Please choose a preferred date.");
      return;
    }
    if (preferredDate < todayString) {
      setErrorMessage("Preferred date must be today or a future date.");
      return;
    }
    if (descriptionLength < MIN_DESCRIPTION_LENGTH) {
      setErrorMessage(
        `Problem description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CreateBookingPayload = {
        serviceId: String(service._id),
        customerPhone: phone.trim(),
        address: address.trim(),
        preferredDate,
        problemDescription: problemDescription.trim(),
      };

      const result = await createBooking(payload);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to send your request.");
      }

      toast.add({
        title: "Request sent!",
        description: "Your repair request was sent to the technician.",
        type: "success",
      });

      // Show the success screen with the "My Bookings" link
      setIsSubmitted(true);
    } catch (error) {
      // Server messages (e.g. the duplicate-active-request refusal) show here
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setErrorMessage(message);
      toast.add({
        title: "Could not send request",
        description: message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {/* stopPropagation: clicks inside the modal must not close it */}
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-border/60 p-4 sm:p-5 sticky top-0 bg-card z-10">
          <div>
            <h2 className="font-bold text-foreground">Request a Repair</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {service.title} — ${service.basePrice.toFixed(2)} starting price
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* ── SUCCESS SCREEN ── */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-foreground">
                Your repair request has been sent!
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                <span className="font-medium text-foreground">
                  {service.technicianName}
                </span>{" "}
                will review your request and accept or reject it. You can track
                the status anytime from your bookings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
              <Button asChild className="gap-2 font-semibold">
                <Link href="/dashboard/customer/bookings">
                  View My Bookings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-4 sm:p-5 space-y-4">
              {/* Error message (validation + server errors like duplicates) */}
              {errorMessage && (
                <p className="text-xs sm:text-sm font-medium text-destructive bg-destructive/10 rounded-lg border border-destructive/20 px-3 py-2">
                  {errorMessage}
                </p>
              )}

              {/* Name & Email — read-only, filled from the session */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="booking-name">Name</Label>
                  <div className="relative">
                    <Input
                      id="booking-name"
                      value={userName}
                      readOnly
                      className="pr-9 bg-muted/50 text-muted-foreground cursor-not-allowed"
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="booking-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="booking-email"
                      type="email"
                      value={userEmail}
                      readOnly
                      className="pr-9 bg-muted/50 text-muted-foreground cursor-not-allowed"
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="booking-phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="booking-phone"
                    type="tel"
                    placeholder="e.g. 01712345678"
                    className="pl-9"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <Label htmlFor="booking-address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="booking-address"
                    placeholder="e.g. House 12, Road 5, Dhanmondi, Dhaka"
                    className="pl-9"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Preferred Date — today or later only */}
              <div className="space-y-1.5">
                <Label htmlFor="booking-date">Preferred Date</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="booking-date"
                    type="date"
                    className="pl-9"
                    min={todayString}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Today ({todayString}) or any future date.
                </p>
              </div>

              {/* Problem Description — minimum 20 characters */}
              <div className="space-y-1.5">
                <Label htmlFor="booking-problem">Problem Description</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="booking-problem"
                    rows={4}
                    className="pl-9 resize-none"
                    placeholder="Describe what is wrong with the device, e.g. The screen cracked after a fall and touch is not working..."
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    required
                  />
                </div>
                <p
                  className={`text-xs ${descriptionLength < MIN_DESCRIPTION_LENGTH
                      ? "text-destructive"
                      : "text-emerald-600"
                    }`}
                >
                  {descriptionLength} / {MIN_DESCRIPTION_LENGTH} minimum
                  characters
                </p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-2.5 border-t border-border/60 p-4 sm:p-5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Request
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
