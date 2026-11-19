// SERVER COMPONENT — route-level loader for Payment Success
// while the Stripe session is verified with the backend.
import { RouteLoader } from "@/components/shared/route-loader";

export default function LoadingPaymentSuccess() {
  return <RouteLoader label="Verifying your payment..." />;
}
