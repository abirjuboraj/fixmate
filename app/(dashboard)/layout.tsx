import { redirect } from "next/navigation";
import { getSession } from "@/lib/server";
import type { UserRole } from "@/types";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in?reason=protected");
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
