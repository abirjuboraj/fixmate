import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { AUTH_URL } from "@/types";
import type { ServiceItem } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wrench } from "lucide-react";
import { MyServicesView } from "./_components/my-services-view";
import { getTechnicianServices } from "@/lib/api/services";

export const metadata = {
  title: "My Services | FixMate Technician Hub",
  description: "Manage your repair service listings.",
};

export default async function TechnicianMyServicesPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in?reason=protected");
  }

  const userRole = (session.user as { role?: string }).role || "customer";


  if (userRole !== "technician") {
    redirect(userRole === "admin" ? "/dashboard/admin" : "/dashboard/customer");
  }


  let services: ServiceItem[] = [];
  let fetchError: string | null = null;

  try {
    const result = await getTechnicianServices(`${AUTH_URL}/api/services/own`);

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
