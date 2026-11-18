import { redirect } from "next/navigation";
import { getSession } from "@/lib/server";
import { UpdateProfileForm } from "./_components/update-profile-form";
import { UserCog } from "lucide-react";

export const metadata = {
  title: "Update Profile | FixMate Dashboard",
  description: "Update your personal details, contact information, service area, and profile photo.",
};

export default async function ProfilePage() {
  // Retrieve session on the server
  const session = await getSession();

  // Protect route
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const user = session.user as {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string | null;
    phone?: string | null;
    area?: string | null;
    bio?: string | null;
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
          <UserCog className="h-3.5 w-3.5" />
          Account Settings
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Update Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal profile, contact information, service area, and avatar.
        </p>
      </div>

      {/* Profile Form (Client Component) */}
      <UpdateProfileForm initialUser={user} />
    </div>
  );
}
