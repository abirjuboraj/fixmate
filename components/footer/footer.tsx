import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";

const CATEGORIES = [
  { name: "Smartphone", href: "/services?category=Smartphone" },
  { name: "Laptop & PC", href: "/services?category=Laptop+%26+PC" },
  { name: "AC", href: "/services?category=AC" },
  { name: "Refrigerator", href: "/services?category=Refrigerator" },
  { name: "TV", href: "/services?category=TV" },
  { name: "Washing Machine", href: "/services?category=Washing+Machine" },
  { name: "Electrical", href: "/services?category=Electrical" },
];

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "All Services", href: "/services" },
  { name: "How It Works & About", href: "/about" },
  { name: "Customer Portal", href: "/dashboard/customer" },
  { name: "Technician Hub", href: "/dashboard/technician" },
];

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-card/60 text-foreground transition-colors">
      {/* Top Guarantee Strip */}
      <div className="border-b border-border/60 bg-muted/40 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Verified Technicians
                </h4>
                <p className="text-xs text-muted-foreground">
                  Rigorous profile screening & authentic expertise
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Pay After Completion
                </h4>
                <p className="text-xs text-muted-foreground">
                  Zero prepayment risk with secure Stripe checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Fast Home & Drop-off
                </h4>
                <p className="text-xs text-muted-foreground">
                  Flexible doorstep visits and trusted workshop hubs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showTagline={true} />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              FixMate is the smart on-demand repair platform connecting verified
              specialists with device and appliance owners. Transparent pricing,
              real-time progress, and payment after completion.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-xs font-bold"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-xs font-bold"
              >
                IG
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-xs font-bold"
              >
                IN
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-xs font-bold"
              >
                GH
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Popular Repairs
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Support & Contact
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span>Mirpur & Dhanmondi hubs, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>support@fixmate.service</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+880 (1700) 000-000</span>
              </div>
              <p className="text-xs text-muted-foreground/80 pt-1">
                24/7 emergency repair support & dispatch service
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} FixMate Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              Safety & Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
