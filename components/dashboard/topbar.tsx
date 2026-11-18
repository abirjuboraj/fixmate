"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  ArrowLeft,
  ShieldCheck,
  Wrench,
  UserCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
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
import { UserRole } from "@/types";

interface DashboardTopbarProps {
  userRole: UserRole;
  userName?: string;
  userEmail?: string;
  userImage?: string | null;
  onMobileMenuToggle: () => void;
  onDesktopCollapseToggle: () => void;
  isDesktopCollapsed: boolean;
}

export function DashboardTopbar({
  userRole,
  userName,
  userEmail,
  userImage,
  onMobileMenuToggle,
  onDesktopCollapseToggle,
  isDesktopCollapsed,
}: DashboardTopbarProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left side: Toggles */}
      <div className="flex items-center gap-3">
        {/* Mobile menu sheet toggle button */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-lg lg:hidden"
          onClick={onMobileMenuToggle}
          aria-label="Open mobile dashboard menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop collapse toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onDesktopCollapseToggle}
          aria-label={
            isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {isDesktopCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Brand/Role Context Tag */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`hidden sm:inline-flex text-[11px] font-semibold capitalize items-center ${getRoleBadgeVariant(
              userRole
            )}`}
          >
            {getRoleIcon(userRole)}
            {userRole} Portal
          </Badge>
        </div>
      </div>

      {/* Right side: Actions & User Dropdown */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hidden sm:inline-flex text-xs font-medium text-muted-foreground hover:text-foreground gap-1.5"
        >
          <Link href="/">
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-2.5 px-2 py-1 h-auto rounded-full hover:bg-muted/60 border border-transparent hover:border-border/60 transition-all focus-visible:ring-1 cursor-pointer"
          >
            <Avatar className="h-8 w-8 ring-1 ring-border">
              <AvatarImage src={userImage || undefined} alt={userName || "User"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight text-foreground max-w-32.5 truncate">
                {userName || "User"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                {userRole}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 p-1.5 shadow-lg rounded-xl border-border/80"
          >
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-foreground truncate">
                  {userName || "FixMate User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {userEmail || ""}
                </p>
                <div className="pt-1.5 flex items-center">
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
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/profile")}
              className="cursor-pointer py-2 flex items-center gap-2"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Update Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/")}
              className="cursor-pointer py-2 flex items-center gap-2 sm:hidden"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              <span>Return to Home</span>
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
      </div>
    </header>
  );
}
