// SERVER COMPONENT — fallback loader for the dashboard segment.
// Covers routes without their own loading.tsx:
// /dashboard, /dashboard/admin, /dashboard/customer (overview),
// /dashboard/admin/bookings and /dashboard/admin/transactions.
import { RouteLoader } from "@/components/shared/route-loader";

export default function LoadingDashboard() {
  return <RouteLoader label="Loading dashboard..." />;
}
