"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Wrench,
  UserCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROLE_DEFAULT_ROUTES } from "@/lib/navigation";
import { UserRole } from "@/types";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
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
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch {
      router.push("/");
      router.refresh();
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "FM";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "technician":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <ShieldCheck className="h-3 w-3 mr-1 text-rose-500" />;
      case "technician":
        return <Wrench className="h-3 w-3 mr-1 text-amber-500" />;
      default:
        return <UserCheck className="h-3 w-3 mr-1 text-blue-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
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
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center gap-2.5 px-2 py-1.5 h-auto rounded-full hover:bg-muted/60 border border-transparent hover:border-border/60 transition-all focus-visible:ring-1 cursor-pointer"
              >
                <Avatar className="h-8 w-8 ring-1 ring-border">
                  <AvatarImage
                    src={user.image || undefined}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold leading-tight text-foreground max-w-[120px] truncate">
                    {user.name || "My Account"}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                    {userRole}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-0.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 p-1.5 shadow-lg rounded-xl border-border/80"
              >
                <DropdownMenuLabel className="p-2 font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-foreground truncate">
                      {user.name || "FixMate User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email || ""}
                    </p>
                    <div className="pt-1.5 flex items-center">
                      <Badge
                        variant="outline"
                        className={`text-[11px] font-semibold capitalize flex items-center ${getRoleBadgeVariant(
                          userRole
                        )}`}
                      >
                        {getRoleIcon(userRole)}
                        {userRole}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(dashboardHref)}
                  className="cursor-pointer py-2 flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/profile")}
                  className="cursor-pointer py-2 flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Update Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 py-2 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="shadow-sm">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-background hover:bg-muted cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 p-0 flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="p-5 border-b border-border/60 text-left">
                  <SheetTitle className="flex items-center">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Auth Header if Logged In */}
                {session && user && (
                  <div className="p-4 mx-4 my-3 rounded-xl bg-muted/50 border border-border/60 flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-1 ring-border">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold truncate text-foreground">
                        {user.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </span>
                      <div className="pt-1">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold capitalize inline-flex items-center ${getRoleBadgeVariant(
                            userRole
                          )}`}
                        >
                          {getRoleIcon(userRole)}
                          {userRole}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <div className="p-4 flex flex-col space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1">
                    Navigation
                  </span>
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-foreground hover:bg-muted"
                          }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  {session && user && (
                    <>
                      <div className="my-2 border-t border-border/60" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1">
                        Account & Dashboard
                      </span>
                      <Link
                        href={dashboardHref}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted"
                      >
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                        <span>Dashboard ({userRole})</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted"
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Update Profile</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Auth Bottom Section */}
              <div className="p-4 border-t border-border/60 bg-muted/20">
                {session && user ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={() => {
                      setMobileOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button
                      className="w-full"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
