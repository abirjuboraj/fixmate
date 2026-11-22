"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User as UserIcon,
  LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_DEFAULT_ROUTES } from "@/lib/navigation";
import { UserRole } from "@/types";
import {
  formatRoleLabel,
  getRoleBadgeStyle,
  getUserInitials,
  renderRoleIcon,
} from "@/components/shared/user-badge";
import { toast } from "sonner";

export interface UserDropdownProps {
  user: {
    name?: string;
    email?: string;
    image?: string | null;
    role?: UserRole;
  };
  /**
   * Optional custom callback on sign out.
   */
  onSignOut?: () => void;
}

export function UserDropdown({ user, onSignOut }: UserDropdownProps) {
  const router = useRouter();

  const userRole: UserRole = user.role || "customer";
  const dashboardHref = ROLE_DEFAULT_ROUTES[userRole] || "/dashboard/customer";
  const roleLabel = formatRoleLabel(userRole);
  const initials = getUserInitials(user.name);

  const handleSignOut = async () => {

    if (onSignOut) {
      onSignOut();
      return;
    }

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully! See you soon")
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("Failed to sign out! Try again")
      router.push("/");
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center rounded-full p-0.5 hover:ring-2 hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all cursor-pointer outline-none"
        aria-label="Open user profile menu"
      >
        <Avatar className="h-9 w-9 ring-2 ring-primary/20">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || "User Avatar"}
          />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 rounded-2xl border-border/80 p-2 shadow-xl shadow-primary/10 ring-1 ring-border/50"
      >
        {/* User Info Header: Avatar, Name, Email and Role Badge */}
        <DropdownMenuLabel className="m-1 rounded-lg bg-muted/50 p-2.5 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/15">
              <AvatarImage
                src={user.image || undefined}
                alt={user.name || "User Avatar"}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name || "FixMate User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email || ""}
              </p>
            </div>
          </div>

          <div className="pt-2.5 flex items-center">
            <Badge
              variant="outline"
              className={`text-[11px] font-semibold flex items-center ${getRoleBadgeStyle(
                userRole
              )}`}
            >
              {renderRoleIcon(userRole)}
              {roleLabel}
            </Badge>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Dynamic Role-Based Dashboard Link */}
        <DropdownMenuItem
          onClick={() => router.push(dashboardHref)}
          className="cursor-pointer rounded-lg py-2.5 flex items-center gap-2.5 text-sm font-medium hover:bg-primary/5"
        >
          <LayoutDashboard className="h-4 w-4 text-primary" />
          <span>Dashboard</span>
        </DropdownMenuItem>

        {/* Update Profile Link */}
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="cursor-pointer rounded-lg py-2.5 flex items-center gap-2.5 text-sm font-medium hover:bg-primary/5"
        >
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <span>Update Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out Action */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10 hover:bg-destructive/5 py-2.5 flex items-center gap-2.5 text-sm font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
