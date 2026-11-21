"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { UserRole } from "@/types";

interface DashboardShellProps {
  userRole: UserRole;
  userName?: string;
  userEmail?: string;
  userImage?: string | null;
  children: React.ReactNode;
}

export function DashboardShell({
  userRole,
  userName,
  userEmail,
  userImage,
  children,
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop fixed sidebar */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${
          isDesktopCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="fixed inset-y-0 left-0 z-30 h-full transition-all duration-300 ease-in-out">
          <div className={`h-full ${isDesktopCollapsed ? "w-20" : "w-64"}`}>
            <DashboardSidebar
              userRole={userRole}
              userName={userName}
              userEmail={userEmail}
              isCollapsed={isDesktopCollapsed}
            />
          </div>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-72 sm:w-80">
          <DashboardSidebar
            userRole={userRole}
            userName={userName}
            userEmail={userEmail}
            isCollapsed={false}
            onItemClick={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardTopbar
          userRole={userRole}
          userName={userName}
          userEmail={userEmail}
          userImage={userImage}
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
