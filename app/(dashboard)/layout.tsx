"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/types";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as
    | {
      name?: string;
      email?: string;
      image?: string | null;
      role?: UserRole;
    }
    | undefined;

  // Actual role retrieved from Better Auth session (defaults to customer if not set)
  const userRole: UserRole = user?.role || "customer";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Fixed/Collapsible Sidebar */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${isDesktopCollapsed ? "w-20" : "w-64"
          }`}
      >
        <div className="fixed inset-y-0 left-0 z-30 h-full transition-all duration-300 ease-in-out">
          <div className={`h-full ${isDesktopCollapsed ? "w-20" : "w-64"}`}>
            <DashboardSidebar
              userRole={userRole}
              userName={user?.name}
              userEmail={user?.email}
              isCollapsed={isDesktopCollapsed}
            />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Sidebar (using shadcn Sheet) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-72 sm:w-80">
          <DashboardSidebar
            userRole={userRole}
            userName={user?.name}
            userEmail={user?.email}
            isCollapsed={false}
            onItemClick={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardTopbar
          userRole={userRole}
          userName={user?.name}
          userEmail={user?.email}
          userImage={user?.image}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
          onDesktopCollapseToggle={() =>
            setIsDesktopCollapsed(!isDesktopCollapsed)
          }
          isDesktopCollapsed={isDesktopCollapsed}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
