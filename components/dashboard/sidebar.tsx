"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ArrowLeft, ShieldCheck, Wrench, UserCheck } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { authClient } from "@/lib/auth-client";
import { DASHBOARD_MENUS } from "@/lib/navigation";
import { UserRole } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSidebarIcon } from "@/components/dashboard/sidebar-icons";

interface DashboardSidebarProps {
  userRole: UserRole;
  userName?: string;
  userEmail?: string;
  isCollapsed?: boolean;
  onItemClick?: () => void;
}

export function DashboardSidebar({
  userRole,
  isCollapsed = false,
  onItemClick,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = DASHBOARD_MENUS[userRole] || DASHBOARD_MENUS.customer;

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
    <aside className="flex h-full w-full flex-col justify-between bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all">
      <div className="flex flex-col">
        {/* Sidebar Header / Logo */}
        <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
          {isCollapsed ? (
            <div className="mx-auto">
              <Logo showTagline={false} textClassName="hidden" />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <Logo showTagline={false} />
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
          )}
        </div>

        {/* Section Heading */}
        {!isCollapsed && (
          <div className="px-4 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {userRole} Menu
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 p-3">
          {menuItems.map((item) => {
            const IconComponent = getSidebarIcon(item.iconName);
            const isActive =
              pathname === item.href ||
              (item.href !== `/dashboard/${userRole}` &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                title={isCollapsed ? item.title : undefined}
                className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <IconComponent
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-105 ${
                    isActive ? "text-primary-foreground" : "text-primary"
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate">{item.title}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-sidebar-border flex flex-col gap-1">
        <Link
          href="/"
          onClick={onItemClick}
          title={isCollapsed ? "Back to Home" : undefined}
          className={`flex items-center rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors ${
            isCollapsed ? "justify-center" : "gap-2.5"
          }`}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Back to Home</span>}
        </Link>
        <Separator className="my-1 opacity-50" />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          title={isCollapsed ? "Sign Out" : undefined}
          className={`w-full text-destructive hover:bg-destructive/10 hover:text-destructive justify-start text-xs font-medium px-3 py-2 h-auto ${
            isCollapsed ? "justify-center px-0" : "gap-2.5"
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}
