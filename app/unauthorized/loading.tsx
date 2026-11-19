// SERVER COMPONENT — route-level loader for the Unauthorized page.
import { RouteLoader } from "@/components/shared/route-loader";

export default function LoadingUnauthorized() {
  return <RouteLoader label="Checking access..." />;
}
