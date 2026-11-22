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


export default async function UnauthorizedPage() {

  const session = await getSession();
  const isLoggedIn = !!session?.user;

  const userName = session?.user?.name || "User";
  const userRole = ((session?.user as { role?: string })?.role || "customer") as UserRole;
  const dashboardHref = ROLE_DEFAULT_ROUTES[userRole] || "/dashboard/customer";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-md mx-auto text-center space-y-8">
        
        {/* Animated Visual Shield Icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-destructive/10 text-destructive border border-destructive/20 shadow-md">
          <ShieldAlert className="h-12 w-12 stroke-[1.8]" />
          <span className="absolute -top-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground font-bold text-xs shadow-sm">
            <Lock className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Heading & Context Message */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/5 px-3 py-1 text-xs font-semibold text-destructive">
            <span>403 Access Denied</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Forbidden Access
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isLoggedIn ? (
              <>
                Hello <strong className="text-foreground">{userName}</strong>, your account ({userRole}) does not have permission to view or manage this section.
              </>
            ) : (
              <>
                This section is protected for registered FixMate members. Please sign in to verify your identity.
              </>
            )}
          </p>
        </div>

        {/* Action Buttons based on Logged-in State */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {isLoggedIn ? (
            /* Logged-In User Actions */
            <>
              <Button asChild size="lg" className="w-full sm:w-auto gap-2 font-semibold shadow-sm">
                <Link href={dashboardHref}>
                  <LayoutDashboard className="h-4 w-4" />
                  Go to {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
            </>
          ) : (
            /* Guest / Logged-Out Visitor Actions */
            <>
              <Button asChild size="lg" className="w-full sm:w-auto gap-2 font-semibold shadow-sm">
                <Link href="/sign-in">
                  <LogIn className="h-4 w-4" />
                  Sign In to Continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Link href="/services">
                  <Wrench className="h-4 w-4" />
                  Browse Services
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Footer Support Prompt */}
        <p className="text-xs text-muted-foreground pt-4 border-t border-border/60">
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
