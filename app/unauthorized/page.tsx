import Link from "next/link";
import {
  ShieldAlert,
  ArrowRight,
  Home,
  LogIn,
  LayoutDashboard,
  Wrench,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/server";
import { ROLE_DEFAULT_ROUTES } from "@/lib/navigation";
import { UserRole } from "@/types";

export const metadata = {
  title: "Access Restricted | FixMate",
  description: "You do not have permission to access this area on FixMate.",
};

interface UnauthorizedPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function UnauthorizedPage({
  searchParams,
}: UnauthorizedPageProps) {
  // Redirects pass the real API status: 401 = not signed in, 403 = wrong role.
  const { status } = await searchParams;
  const session = await getSession();
  const isLoggedIn = !!session?.user;

  const rawStatus = Number(status);
  const statusCode =
    rawStatus === 401 || rawStatus === 403
      ? rawStatus
      : isLoggedIn
        ? 403
        : 401;
  const isForbidden = statusCode === 403;

  const userName = session?.user?.name || "User";
  const userRole = ((session?.user as { role?: string })?.role ||
    "customer") as UserRole;
  const dashboardHref = ROLE_DEFAULT_ROUTES[userRole] || "/dashboard/customer";

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-16">
      <div className="mx-auto w-full max-w-md space-y-8 text-center">
        {/* Status icon */}
        <div
          className={`relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border shadow-md ${
            isForbidden
              ? "border-destructive/20 bg-destructive/10 text-destructive"
              : "border-amber-500/20 bg-amber-500/10 text-amber-600"
          }`}
        >
          {isForbidden ? (
            <ShieldAlert className="h-12 w-12 stroke-[1.8]" />
          ) : (
            <Lock className="h-12 w-12 stroke-[1.8]" />
          )}
          <span
            className={`absolute -top-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${
              isForbidden ? "bg-destructive" : "bg-amber-500"
            }`}
          >
            {statusCode}
          </span>
        </div>

        {/* Heading + message */}
        <div className="space-y-3">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isForbidden
                ? "border border-destructive/20 bg-destructive/5 text-destructive"
                : "border border-amber-500/20 bg-amber-500/5 text-amber-600"
            }`}
          >
            {isForbidden ? "403 Forbidden" : "401 Unauthorized"}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {isForbidden ? "Forbidden Access" : "Unauthorized Access"}
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {isForbidden ? (
              isLoggedIn ? (
                <>
                  Hello <strong className="text-foreground">{userName}</strong>,
                  your account ({userRole}) does not have permission to view or
                  manage this section.
                </>
              ) : (
                <>
                  This section is only available to certain account roles.
                  Please sign in with the right account to continue.
                </>
              )
            ) : (
              <>
                You need to sign in to access this page. Use your FixMate
                account to continue.
              </>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          {isLoggedIn ? (
            <>
              <Button
                asChild
                size="lg"
                className="w-full gap-2 font-semibold shadow-sm sm:w-auto"
              >
                <Link href={dashboardHref}>
                  <LayoutDashboard className="h-4 w-4" />
                  Go to {userRole.charAt(0).toUpperCase() + userRole.slice(1)}{" "}
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto"
              >
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                size="lg"
                className="w-full gap-2 font-semibold shadow-sm sm:w-auto"
              >
                <Link href="/sign-in">
                  <LogIn className="h-4 w-4" />
                  Sign In to Continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto"
              >
                <Link href="/services">
                  <Wrench className="h-4 w-4" />
                  Browse Services
                </Link>
              </Button>
            </>
          )}
        </div>

        <p className="border-t border-border/60 pt-4 text-xs text-muted-foreground">
          Need help? Return to{" "}
          <Link href="/" className="font-semibold text-primary hover:underline">
            FixMate Homepage
          </Link>{" "}
          or contact platform support.
        </p>
      </div>
    </div>
  );
}
