import Link from "next/link";
import { Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showTagline?: boolean;
}

export function Logo({
  className,
  iconClassName,
  textClassName,
  showTagline = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md",
        className
      )}
      aria-label="FixMate Home"
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25",
          iconClassName
        )}
      >
        <Wrench className="h-5 w-5" strokeWidth={2.3} />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "text-xl font-bold tracking-tight text-foreground flex items-center leading-none",
            textClassName
          )}
        >
          Fix<span className="text-primary">Mate</span>
        </span>
        {showTagline && (
          <span className="text-[11px] font-medium text-muted-foreground leading-tight tracking-normal">
            Device & Appliance Repair
          </span>
        )}
      </div>
    </Link>
  );
}
