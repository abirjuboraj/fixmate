import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { authFetch } from "@/lib/server";
import { AUTH_URL } from "@/types";
import type { ServiceItem } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wrench } from "lucide-react";
import { MyServicesView } from "./_components/my-services-view";

export const metadata = {
  title: "My Services | FixMate Technician Hub",
  description: "Manage your repair service listings.",
};

// SERVER COMPONENT
// Does two jobs: (1) protects the route, (2) fetches the technician's
// services from the Express backend, then hands the data to the client view.
export default async function TechnicianMyServicesPage() {
  // 1. Session check (same pattern as the add-service page)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const userRole = (session.user as { role?: string }).role || "customer";

  // 2. Role check: only technicians can manage services
  if (userRole !== "technician") {
    redirect(userRole === "admin" ? "/dashboard/admin" : "/dashboard/customer");
  }

  // 3. Fetch this technician's services (GET /api/services/mine)
  //    authFetch attaches the session token automatically.
  let services: ServiceItem[] = [];
  let fetchError: string | null = null;

  try {
    const result = await authFetch(`${AUTH_URL}/api/services/mine`);
    services = (result?.data as ServiceItem[]) ?? [];
  } catch (error) {
    fetchError =
      error instanceof Error ? error.message : "Failed to load your services";
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full mb-2">
            <Wrench className="h-3.5 w-3.5" />
            My Listings
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Services
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit, delete, or pause your repair service listings. Edited services
            go back to pending for admin re-approval.
          </p>
        </div>

        <Button asChild className="gap-2 w-full sm:w-auto shadow-sm font-semibold">
          <Link href="/dashboard/technician/add-service">
            <PlusCircle className="h-4 w-4" />
            Add New Service
          </Link>
        </Button>
      </div>

      {/* The interactive part (table, modals, toggle) is a client component */}
      <MyServicesView services={services} fetchError={fetchError} />
    </div>
  );
}
