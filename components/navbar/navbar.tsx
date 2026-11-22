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
  { label: "How It Works", href: "/#how-it-works" },
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
    <header className="sticky top-0 z-40 w-full bg-background/95 shadow-[0_1px_14px_-8px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all">
      {/* thin brand-tinted accent line instead of a plain border */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Logo showTagline={false} />

        {/* Desktop Navigation — subtle segmented pill bar */}
        <nav className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-muted/40 p-1 shadow-xs md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary font-semibold text-primary-foreground shadow-sm"
                    : "text-foreground/80 hover:bg-background hover:text-primary hover:shadow-xs"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth State */}
        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          {isPending ? (
            <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />
          ) : session && user ? (
            <UserDropdown user={user} onSignOut={handleSignOut} />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="rounded-full font-medium"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-full px-5 font-semibold shadow-sm"
              >
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
