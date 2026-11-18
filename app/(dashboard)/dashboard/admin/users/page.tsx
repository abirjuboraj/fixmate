import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AUTH_URL } from "@/types";
import type { AdminUser } from "@/types";
import { ShieldCheck } from "lucide-react";
import { AdminUsersView } from "./_components/admin-users-view";
import { getAllUsers } from "@/lib/api/users";

export const metadata = {
  title: "Manage Users | FixMate Admin",
  description: "View, search and manage all FixMate users.",
};


export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const userRole = (session.user as { role?: string }).role || "customer";


  // Only admins may open this page
  if (userRole !== "admin") {
    redirect(userRole === "technician" ? "/dashboard/technician" : "/dashboard/customer");
  }

  const adminEmail = (session.user as { email?: string }).email || "";

  // Read the search + filter params from the URL.
  // The client view updates these params, Next re-renders this page,
  // and the fresh filtered data comes straight from Express.
  const params = await searchParams;
  const currentSearch = typeof params.search === "string" ? params.search : "";
  const currentRole = typeof params.role === "string" ? params.role : "";
  const currentCategory =
    typeof params.category === "string" ? params.category : "";

  const query = new URLSearchParams();
  if (currentSearch) query.set("search", currentSearch);
  if (currentRole) query.set("role", currentRole);
  if (currentCategory) query.set("category", currentCategory);
  const queryString = query.toString();

  let users: AdminUser[] = [];
  let fetchError: string | null = null;

  try {
    const result = await getAllUsers(
      `${AUTH_URL}/api/admin/users${queryString ? `?${queryString}` : ""}`
    );
    users = (result?.data as AdminUser[]) ?? [];
  } catch (error) {
    fetchError =
      error instanceof Error ? error.message : "Failed to load users";
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin Panel
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Manage Users
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          All FixMate users, newest first. Search, filter, and change user
          roles — admins cannot change their own role.
        </p>
      </div>

      {/* The interactive part (search, filters, table, role change) is a client component */}
      <AdminUsersView
        users={users}
        fetchError={fetchError}
        currentSearch={currentSearch}
        currentRole={currentRole}
        currentCategory={currentCategory}
        adminEmail={adminEmail}
      />
    </div>
  );
}
