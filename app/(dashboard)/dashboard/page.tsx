import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ROLE_DEFAULT_ROUTES } from "@/lib/navigation";
import { UserRole } from "@/types";

export default async function DashboardIndexPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in?reason=protected");
  }

  const role = ((session.user as { role?: string }).role || "customer") as UserRole;
  const targetRoute = ROLE_DEFAULT_ROUTES[role] || "/dashboard/customer";

  redirect(targetRoute);
}
