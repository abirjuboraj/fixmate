import { CalendarClock } from "lucide-react";
import { getAllBookings } from "@/lib/api/bookings";
import type { BookingItem } from "@/types";
import { AdminBookingsView } from "./_components/admin-bookings-view";

export const metadata = {
  title: "All Bookings | FixMate Admin",
  description: "Read-only list of every repair booking on the platform.",
};

// Valid status filters (must match the backend query param values).
// The admin layout already verifies the "admin" role, so no role check is needed here.
const VALID_STATUSES = [
  "all",
  "requested",
  "accepted",
  "in-progress",
  "completed",
  "rejected",
  "cancelled",
];

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Read ?status=... and optional ?highlight=... from the URL
  const params = await searchParams;
  const rawStatus = typeof params.status === "string" ? params.status : "all";
  const currentStatus = VALID_STATUSES.includes(rawStatus) ? rawStatus : "all";
  const highlightId = typeof params.highlight === "string" ? params.highlight : "";

  let bookings: BookingItem[] = [];
  let fetchError: string | null = null;

  try {
    // Fetch everything once; the client view filters by status instantly.
    const result = await getAllBookings("all");
    bookings = (result?.data as BookingItem[]) ?? [];
  } catch (error) {
    fetchError =
      error instanceof Error ? error.message : "Failed to load bookings";
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full mb-2">
          <CalendarClock className="h-3.5 w-3.5" />
          Admin Panel
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          All Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Every repair request on the platform — filter by status to track
          requested, in-progress, completed, or cancelled jobs.
        </p>
      </div>

      {/* Filter pills + table (client component) */}
      <AdminBookingsView
        bookings={bookings}
        fetchError={fetchError}
        initialStatus={currentStatus}
        highlightId={highlightId}
      />
    </div>
  );
}
