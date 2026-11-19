import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { CalendarClock } from "lucide-react";
import { auth } from "@/lib/auth";
import { getMyBookings } from "@/lib/api/bookings";
import { BookingItem } from "@/types";
import { CustomerBookingsClient } from "./_components/customer-bookings-client";

export const metadata = {
  title: "My Bookings | FixMate Customer Portal",
  description: "Track all your submitted repair service requests, statuses, and payments.",
};

export default async function CustomerBookingsPage() {
  // 1. Verify user session on server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  // Role verification (must be customer or admin accessing)
  const userRole = (session.user as { role?: string }).role || "customer";
  if (userRole !== "customer" && userRole !== "admin") {
    redirect("/unauthorized");
  }

  // 2. Fetch customer bookings from backend API
  const response = await getMyBookings();
  const bookings: BookingItem[] = response?.data || [];


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
          <CalendarClock className="h-3.5 w-3.5" />
          Customer Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          My Repair Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review, track status updates, manage active requests, and pay for completed repairs.
        </p>
      </div>

      <CustomerBookingsClient initialBookings={bookings} />
    </div>
  );
}
