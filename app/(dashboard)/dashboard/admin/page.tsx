import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { AUTH_URL } from "@/types";
import type { AdminUser, ServiceItem, BookingItem, PaymentRecord } from "@/types";
import { getAllUsers } from "@/lib/api/users";
import { getAllServices } from "@/lib/api/services";
import { getAllBookings } from "@/lib/api/bookings";
import { getAllPaymentsAndRevenue } from "@/lib/api/payment";
import { AdminOverviewClient } from "./_components/admin-overview-client";
import { AdminOverviewSkeleton } from "./_components/admin-overview-skeleton";

export const metadata = {
  title: "Admin Overview | FixMate",
  description: "Platform summary metrics, user stats, pending service moderation, and activity pipeline.",
};

async function AdminOverviewContent() {
  const baseUrl = AUTH_URL || "http://localhost:5000";

  // Fetch all necessary admin metrics concurrently in parallel
  const [usersRes, servicesRes, bookingsRes, paymentsRes] = await Promise.allSettled([
    getAllUsers(`${baseUrl}/api/admin/users`),
    getAllServices(`${baseUrl}/api/admin/services`),
    getAllBookings("all"),
    getAllPaymentsAndRevenue(),
  ]);

  const users: AdminUser[] =
    usersRes.status === "fulfilled" && Array.isArray(usersRes.value?.data)
      ? usersRes.value.data
      : [];

  const services: ServiceItem[] =
    servicesRes.status === "fulfilled" && Array.isArray(servicesRes.value?.data)
      ? servicesRes.value.data
      : [];

  const bookings: BookingItem[] =
    bookingsRes.status === "fulfilled" && Array.isArray(bookingsRes.value?.data)
      ? bookingsRes.value.data
      : [];

  const paymentData =
    paymentsRes.status === "fulfilled" ? paymentsRes.value?.data : null;

  const transactions: PaymentRecord[] = Array.isArray(paymentData?.transactions)
    ? paymentData.transactions
    : [];

  const totalRevenue: number = Number(paymentData?.totalRevenue || 0);

  return (
    <AdminOverviewClient
      users={users}
      services={services}
      bookings={bookings}
      transactions={transactions}
      totalRevenue={totalRevenue}
    />
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          Administration Center
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Platform Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor key platform metrics: users, technicians, pending approvals, and active bookings.
        </p>
      </div>

      {/* Scoped Suspense loader: only activates for this overview page */}
      <Suspense fallback={<AdminOverviewSkeleton />}>
        <AdminOverviewContent />
      </Suspense>
    </div>
  );
}
