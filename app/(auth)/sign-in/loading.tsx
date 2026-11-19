// SERVER COMPONENT — route-level loader for the Sign In page.
import { RouteLoader } from "@/components/shared/route-loader";

export default function LoadingSignIn() {
  return <RouteLoader label="Preparing sign in..." />;
}
