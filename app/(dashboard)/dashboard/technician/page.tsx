import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AUTH_URL, BookingItem, type ServiceItem } from "@/types";
import { getTechnicianServices } from "@/lib/api/services";
import { getTechnicianBookings } from "@/lib/api/bookings";
import { TechnicianOverviewClient } from "./_components/technician-overview-client";
import { TechnicianOverviewSkeleton } from "./_components/technician-overview-skeleton";

export const metadata = {
  title: "Technician Dashboard | FixMate",
  description: "Overview of your services, active repair pipeline, and request analytics.",
};


async function TechnicianOverviewContent() {
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

  const technicianName = session.user.name || "Technician";
  const technicianEmail = session.user.email || "";

  // 1. Fetch Technician Services
  let services: ServiceItem[] = [];
  try {
    const result = await getTechnicianServices(`${AUTH_URL}/api/services/own`);
    services = result?.data ?? [];
  } catch (error) {
    console.error("Failed to load technician services:", error);
  }

  // 2. Fetch Technician Bookings
  let bookings: BookingItem[] = [];
  try {
    const bookingsResult = await getTechnicianBookings();
    bookings = bookingsResult?.data ?? [];
  } catch (error) {
    console.error("Failed to load technician bookings:", error);
  }

  return (
    <TechnicianOverviewClient
      technicianName={technicianName}
      technicianEmail={technicianEmail}
      services={services}
      bookings={bookings}
    />
  );
}

export default function TechnicianDashboardPage() {
  return (
    <Suspense fallback={<TechnicianOverviewSkeleton />}>
      <TechnicianOverviewContent />
    </Suspense>
  );
}
