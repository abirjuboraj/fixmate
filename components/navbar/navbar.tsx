"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient, useSession } from "@/lib/auth-client";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/navbar/user-dropdown";
import { MobileNavDrawer } from "@/components/navbar/mobile-nav-drawer";
import { ROLE_DEFAULT_ROUTES } from "@/lib/navigation";
import { UserRole } from "@/types";
import { toast } from "sonner";

// Public navigation items
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Retrieve actual Better Auth session on the client
  const { data: session, isPending } = useSession();
  const user = session?.user as
    | {
      name?: string;
      email?: string;
      image?: string | null;
      role?: UserRole;
    }
    | undefined;

  const userRole: UserRole = user?.role || "customer";


  const dashboardHref = ROLE_DEFAULT_ROUTES[userRole] || "/dashboard/customer";

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully. See you soon!");
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("Sign out failed. Please try again.");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Logo showTagline={false} />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${isActive
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth State */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : session && user ? (

            <UserDropdown user={user} onSignOut={handleSignOut} />
          ) : (

            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="shadow-sm font-semibold">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer Component */}
        <div className="flex md:hidden items-center gap-2">
          <MobileNavDrawer
            navLinks={NAV_LINKS}
            pathname={pathname}
            user={user}
            dashboardHref={dashboardHref}
            onSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
}
