import Link from "next/link";
import {
  Wrench,
  CheckCircle2,
  Clock,
  PlusCircle,
  ClipboardList,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------- Reusable stat card (used by every dashboard overview page) ----------
interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  // tailwind classes for the icon chip background/text color
  iconClassName?: string;
  hint?: string;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  iconClassName = "bg-primary/10 text-primary",
  hint,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5 flex items-center gap-4">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl sm:text-3xl font-extrabold leading-none text-foreground">
          {value}
        </p>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground truncate">
          {label}
        </p>
        {hint && (
          <p className="mt-0.5 text-[11px] text-muted-foreground/80">{hint}</p>
        )}
      </div>
    </div>
  );
}

// ---------- Quick navigation card (technician dashboard shortcuts) ----------
interface QuickNavCardProps {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
}

export function QuickNavCard({
  title,
  description,
  href,
  linkLabel,
  icon: Icon,
}: QuickNavCardProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5 space-y-2 flex flex-col">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <p className="text-xs text-muted-foreground flex-1">{description}</p>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="mt-2 w-full"
      >
        <Link href={href}>{linkLabel}</Link>
      </Button>
    </div>
  );
}

// Prebuilt configs so the overview pages stay tidy
export const TECHNICIAN_NAV_CARDS: QuickNavCardProps[] = [
  {
    title: "Add Service",
    description: "List a new device repair or appliance service.",
    href: "/dashboard/technician/add-service",
    linkLabel: "Add Service",
    icon: PlusCircle,
  },
  {
    title: "My Services",
    description: "Manage approvals, active status, and pricing.",
    href: "/dashboard/technician/my-services",
    linkLabel: "View Services",
    icon: Wrench,
  },
  {
    title: "Manage Requests",
    description: "Accept/reject requests and complete jobs.",
    href: "/dashboard/technician/requests",
    linkLabel: "Manage Requests",
    icon: ClipboardList,
  },
  {
    title: "Update Profile",
    description: "Manage your service area, bio, and phone.",
    href: "/dashboard/profile",
    linkLabel: "Profile",
    icon: UserCog,
  },
];

// Icon exports used by overview pages (keeps pages free of icon imports)
export { Wrench as WrenchIcon, CheckCircle2 as CheckCircleIcon, Clock as ClockIcon };
