// SERVER COMPONENT — route-level loader for the Sign Up page.
import { RouteLoader } from "@/components/shared/route-loader";

export default function LoadingSignUp() {
  return <RouteLoader label="Preparing sign up..." />;
}
