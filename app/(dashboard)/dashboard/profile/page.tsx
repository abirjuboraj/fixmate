import { UserCog } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
          <UserCog className="h-3.5 w-3.5" />
          User Profile
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Shared route accessible to all authenticated roles (/dashboard/profile).
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border/80 bg-card/50 p-8 text-center max-w-md mx-auto">
        <UserCog className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h2 className="text-base font-semibold">Update Profile Interface</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Form fields for name, phone, area, bio, and ImgBB photo upload will be implemented in the profile & auth phase.
        </p>
      </div>
    </div>
  );
}
