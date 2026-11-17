"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  ChevronDown,
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
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            if (onSignOut) {
              onSignOut();
            } else {
              router.push("/");
              router.refresh();
            }
          },
        },
      });
    } catch {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2.5 px-2 py-1.5 h-auto rounded-full hover:bg-muted/60 border border-transparent hover:border-border/60 transition-all focus-visible:ring-1 cursor-pointer"
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

        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold leading-tight text-foreground max-w-[130px] truncate">
            {user.name || "My Account"}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            {roleLabel}
          </span>
        </div>

        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-0.5 opacity-70" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 p-2 shadow-lg rounded-xl border-border/80"
      >
        {/* User Info Header: Avatar, Name, Email and Role Badge */}
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-1 ring-border">
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
          className="cursor-pointer py-2.5 flex items-center gap-2.5 text-sm font-medium"
        >
          <LayoutDashboard className="h-4 w-4 text-primary" />
          <span>Dashboard</span>
          <span className="ml-auto text-[10px] text-muted-foreground font-normal">
            ({roleLabel})
          </span>
        </DropdownMenuItem>

        {/* Update Profile Link */}
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="cursor-pointer py-2.5 flex items-center gap-2.5 text-sm font-medium"
        >
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <span>Update Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out Action */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 py-2.5 flex items-center gap-2.5 text-sm font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
