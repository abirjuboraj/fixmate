import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AUTH_URL, type ServiceItem } from "@/types";
import { Wrench } from "lucide-react";
import {
  StatsCard,
  QuickNavCard,
  TECHNICIAN_NAV_CARDS,
  WrenchIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@/components/dashboard/stats-card";
import { getTechnicianServices } from "@/lib/api/services";

export const metadata = {
  title: "Technician Dashboard | FixMate",
  description: "Overview of your services and repair requests.",
};

// SERVER COMPONENT
// Protects the route, fetches the technician's services from the Express API,
// and computes the required stats: Total Services, Approved Services,
// Pending Requests.
export default async function TechnicianDashboardPage() {
  // 1. Session check (same pattern as the other dashboard pages)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const userRole = (session.user as { role?: string }).role || "customer";

  // 2. Role check: technicians only
  if (userRole !== "technician") {
    redirect(userRole === "admin" ? "/dashboard/admin" : "/dashboard/customer");
  }

  // 3. Fetch this technician's services to compute the stats
  let totalServices = 0;
  let approvedServices = 0;
  let fetchError: string | null = null;

  try {
    const result = await getTechnicianServices(`${AUTH_URL}/api/services/own`);
    const services: ServiceItem[] = result?.data ?? [];

    totalServices = services.length;
    approvedServices = services.filter(
      (s) => s.approvalStatus === "approved"
    ).length;
  } catch (error) {
    fetchError =
      error instanceof Error
        ? error.message
        : "Could not load your service stats";
  }

  // TODO (you): Pending Requests stat
  //
  // "Pending Requests" = bookings with status "requested" for this technician.
  // The bookings API does not exist yet, so it currently shows 0.
  //
  // When you build the technician bookings API, do this:
  //   1. Backend: add GET /api/bookings/technician (verifyToken + verifyTechnician)
  //      that returns bookings where technicianEmail = the logged-in technician.
  //   2. Frontend: fetch it here the same way as services/own above, e.g.:
  //      const bookingsResult = await authFetch(`${AUTH_URL}/api/bookings/technician`);
  //      const bookings = bookingsResult?.data ?? [];
  //      const pendingRequests = bookings.filter(b => b.status === "requested").length;
  //   3. Replace the hardcoded `pendingRequests = 0` below with that value.
  const pendingRequests = 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full mb-2">
            <Wrench className="h-3.5 w-3.5" />
            Technician Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Technician Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publish repair offerings, update job status pipelines, and set final amounts.
          </p>
        </div>
      </div>

      {/* Fetch error notice (stats degrade gracefully to 0) */}
      {fetchError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {fetchError} — showing zeros. Try refreshing the page.
        </div>
      )}

      {/* ---------- Stats cards (required: Total Services, Approved Services, Pending Requests) ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          label="Total Services"
          value={totalServices}
          icon={WrenchIcon}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatsCard
          label="Approved Services"
          value={approvedServices}
          icon={CheckCircleIcon}
          iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          hint="Live on public pages"
        />
        <StatsCard
          label="Pending Requests"
          value={pendingRequests}
          icon={ClockIcon}
          iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          hint="New repair requests to review"
        />
      </div>

      {/* ---------- Quick navigation ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TECHNICIAN_NAV_CARDS.map((card) => (
          <QuickNavCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
