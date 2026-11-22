"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRole } from "@/types";
import {
  formatRoleLabel,
  getRoleBadgeStyle,
  getUserInitials,
  renderRoleIcon,
} from "@/components/shared/user-badge";

interface MobileNavDrawerProps {
  navLinks: { label: string; href: string }[];
  pathname: string;
  user?: {
    name?: string;
    email?: string;
    image?: string | null;
    role?: UserRole;
  };
  dashboardHref: string;
  onSignOut: () => void;
}

export function MobileNavDrawer({
  navLinks,
  pathname,
  user,
  dashboardHref,
  onSignOut,
}: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);

  const userRole: UserRole = user?.role || "customer";
  const roleLabel = formatRoleLabel(userRole);
  const initials = getUserInitials(user?.name);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background shadow-sm transition-colors hover:bg-primary/5 hover:text-primary cursor-pointer"
        aria-label="Open mobile navigation menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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

          {/* User info card when logged in */}
          {user && (
            <div className="p-4 mx-4 my-3 rounded-xl bg-muted/50 border border-border/60 flex items-center gap-3">
              <Avatar className="h-11 w-11 ring-2 ring-primary/20 shrink-0">
                <AvatarImage
                  src={user.image || undefined}
                  alt={user.name || "User Avatar"}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate text-foreground">
                  {user.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
                <div className="pt-1.5">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-semibold inline-flex items-center ${getRoleBadgeStyle(
                      userRole
                    )}`}
                  >
                    {renderRoleIcon(userRole)}
                    {roleLabel}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Public navigation links */}
          <div className="p-4 flex flex-col space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1">
              Navigation
            </span>
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-foreground hover:bg-muted"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Account & Dashboard links */}
            {user && (
              <>
                <div className="my-2 border-t border-border/60" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1">
                  Account & Dashboard
                </span>
                <Link
                  href={dashboardHref}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted"
                >
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted"
                >
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Update Profile</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Bottom sign-in / sign-out section */}
        <div className="p-4 border-t border-border/60 bg-muted/20">
          {user ? (
            <Button
              variant="outline"
              className="w-full justify-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer"
              onClick={() => {
                setOpen(false);
                onSignOut();
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
                onClick={() => setOpen(false)}
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="w-full"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
