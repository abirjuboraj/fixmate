import { AUTH_URL } from "@/types";
import type { ServiceItem } from "@/types";
import { ShieldCheck } from "lucide-react";
import { AdminServicesView } from "./_components/admin-services-view";
import { getAllServices } from "@/lib/api/services";

export const metadata = {
  title: "Service Approval | FixMate Admin",
  description: "Approve or reject technician service listings.",
};


// Valid status filters (must match the backend query param values)
const VALID_STATUSES = ["pending", "approved", "rejected", "all"];

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {

  // The admin layout already verified the session + role, so no extra
  // auth.api.getSession() call is needed here.
  const params = await searchParams;
  const rawStatus = typeof params.status === "string" ? params.status : "";
  const currentStatus = VALID_STATUSES.includes(rawStatus) ? rawStatus : "pending";
  const highlightId = typeof params.highlight === "string" ? params.highlight : "";

  let services: ServiceItem[] = [];
  let fetchError: string | null = null;

  try {
    // Fetch ALL services once. The client view filters them instantly.
    const result = await getAllServices(`${AUTH_URL}/api/admin/services`);
    services = (result?.data as ServiceItem[]) ?? [];
  } catch (error) {
    fetchError =
      error instanceof Error ? error.message : "Failed to load services";
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin Panel
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Service Approval
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review service listings from all technicians. Pending services are
          shown by default — approve to make them public, reject to hide them.
        </p>
      </div>

      {/* The interactive part (filter pills, table, approve/reject) is a client component */}
      <AdminServicesView
        services={services}
        fetchError={fetchError}
        initialStatus={currentStatus}
        highlightId={highlightId}
      />
    </div>
  );
}
