// SERVER COMPONENT — route-level loader for the Home page
// while hero data and featured services are fetched.
import { RouteLoader } from "@/components/shared/route-loader";

export default function LoadingHome() {
  return <RouteLoader label="Loading FixMate..." />;
}
