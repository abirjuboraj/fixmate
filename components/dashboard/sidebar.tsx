"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { authClient } from "@/lib/auth-client";
import { DASHBOARD_MENUS } from "@/lib/navigation";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSidebarIcon } from "@/components/dashboard/sidebar-icons";
import { toast } from "sonner";

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
            toast.success("Successfully signed out. See you soon!")
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("Failed to sign out. Try again")
      router.push("/");
      router.refresh();
    }
  };

  return (
    <aside className="relative flex h-full w-full flex-col justify-between border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[1px_0_20px_-16px_rgba(0,0,0,0.3)] transition-all">
      <div className="flex flex-col">
        {/* Sidebar Header / Logo */}
        <div className="relative flex h-16 items-center border-b border-sidebar-border px-4">
          <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
          {isCollapsed ? (
            <div className="mx-auto">
              <Logo showTagline={false} textClassName="hidden" />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <Logo showTagline={false} />

            </div>
          )}
        </div>

        {/* Section Heading — small brand-tinted pill */}
        {!isCollapsed && (
          <div className="mx-3 mt-4 inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            <span />
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
                className={`group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isCollapsed ? "justify-center" : "gap-3"
                  } ${isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm"
                  }`}
              >
                <IconComponent
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-primary-foreground" : "text-primary"
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
          className={`flex items-center rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors ${isCollapsed ? "justify-center" : "gap-2.5"
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
          className={`w-full rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive justify-start text-xs font-medium px-3 py-2 h-auto ${isCollapsed ? "justify-center px-0" : "gap-2.5"
            }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}
