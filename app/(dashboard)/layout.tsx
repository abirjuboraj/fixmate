import { redirect } from "next/navigation";
import { getSession } from "@/lib/server";
import type { UserRole } from "@/types";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

/**
 * SERVER layout: the session (and therefore the role) is resolved on the
 * server BEFORE any HTML is sent. The old client version briefly fell back to
 * "customer" while useSession() loaded, so admins/technicians saw the wrong
 * menu for a moment. This version cannot flash the wrong role.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = session.user as {
    name?: string;
    email?: string;
    image?: string | null;
    role?: UserRole;
  };

  return (
    <DashboardShell
      userRole={user.role || "customer"}
      userName={user.name}
      userEmail={user.email}
      userImage={user.image}
    >
      {children}
    </DashboardShell>
  );
}
