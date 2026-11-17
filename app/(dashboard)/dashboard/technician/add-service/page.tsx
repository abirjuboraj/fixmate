import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AddServiceForm } from "./_components/add-service-form";

export const metadata = {
  title: "Add Repair Service | FixMate Technician Hub",
  description: "List a new device repair or appliance service offering on FixMate.",
};

export default async function TechnicianAddServicePage() {
  // Server-side session verification
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Protect route: must be logged in
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const userRole = (session.user as { role?: string }).role || "customer";

  // Role check: Only technicians can add services
  if (userRole !== "technician") {

    redirect(userRole === "admin" ? "/dashboard/admin" : "/dashboard/customer");
  }


  const technicianInfo = {
    name: session.user.name || "Technician",
    email: session.user.email || "",
  };

  return (
    <div className="space-y-6">

      <div className="border-b border-border/60 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Add New Repair Service
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Publish a new device repair or appliance service. New listings are submitted for admin approval.
        </p>
      </div>


      <AddServiceForm technician={technicianInfo} />
    </div>
  );
}
