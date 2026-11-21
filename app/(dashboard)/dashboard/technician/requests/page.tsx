import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ClipboardList } from "lucide-react";
import { auth } from "@/lib/auth";
import { getTechnicianBookings } from "@/lib/api/bookings";
import { BookingItem } from "@/types";
import { TechnicianRequestsClient } from "./_components/technician-requests-client";

export const metadata = {
  title: "Manage Requests | FixMate Technician Hub",
  description: "Manage incoming repair service requests, update job statuses, and complete orders.",
};

export default async function TechnicianRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ highlight?: string }>;
}) {
  const { highlight } = await searchParams;

  // 1. Verify session on server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in?reason=protected");
  }

  // 2. Role verification (must be technician or admin)
  const userRole = (session.user as { role?: string }).role || "customer";
  if (userRole !== "technician" && userRole !== "admin") {
    redirect("/unauthorized");
  }

  // 3. Fetch technician bookings from backend API
  const response = await getTechnicianBookings();
  const bookings: BookingItem[] = response?.data || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full mb-2">
          <ClipboardList className="h-3.5 w-3.5" />
          Technician Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Manage Repair Requests
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review customer bookings, accept or reject incoming jobs, track active work, and mark repairs completed.
        </p>
      </div>

      {/* Interactive Technician Client View */}
      <TechnicianRequestsClient initialBookings={bookings} highlightId={highlight} />
    </div>
  );
}
