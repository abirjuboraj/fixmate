import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-muted/20 text-foreground">
      {/* Header bar */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between">
        <Logo showTagline={false} />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
      </header>

      {/* Main Auth Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Auth Footer note */}
      <footer className="py-4 text-center text-xs text-muted-foreground border-t border-border/40">
        © {new Date().getFullYear()} FixMate. Secure device & appliance repair platform.
      </footer>
    </div>
  );
}
