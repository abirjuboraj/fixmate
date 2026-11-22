import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { auth } from "@/lib/auth";
import { BookingItem, CustomUser } from "@/types";
import { getMyBookings } from "@/lib/api/bookings";
import { CustomerOverviewClient } from "./_components/customer-overview-client";
import { CustomerOverviewSkeleton } from "./_components/customer-overview-skeleton";

export const metadata = {
  title: "Customer Dashboard | FixMate",
  description: "Overview of your repair requests, active jobs, and account profile.",
};

async function CustomerOverviewContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const user = session.user as CustomUser;

  let bookings: BookingItem[] = [];
  try {
    const bookingsResult = await getMyBookings();
    bookings = bookingsResult?.data ?? [];
  } catch (error) {
    unstable_rethrow(error);
    console.error("Failed to load customer bookings for overview:", error);
  }

  return <CustomerOverviewClient user={user} bookings={bookings} />;
}

export default function CustomerDashboardPage() {
  return (
    <Suspense fallback={<CustomerOverviewSkeleton />}>
      <CustomerOverviewContent />
    </Suspense>
  );
}
