import { ShieldCheck, Clock, CreditCard, Wrench } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Verified technicians",
    short: "Verified pros",
    text: "Every specialist is identity-checked and admin-approved.",
  },
  {
    icon: Clock,
    title: "Live job tracking",
    short: "Live tracking",
    text: "See your repair move from requested to completed.",
  },
  {
    icon: CreditCard,
    title: "Pay after service",
    short: "Pay after service",
    text: "You only pay once the repair is done and tested.",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[1.05fr_minmax(440px,0.95fr)]">
      {/* ── Full brand panel (desktop) ── */}
      <aside className="relative hidden overflow-hidden bg-linear-to-br from-primary via-primary/90 to-teal-900 px-10 py-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-16 top-1/3 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">
            <Wrench className="h-3.5 w-3.5" />
            FixMate Repair Platform
          </div>

          <h2 className="mt-10 max-w-lg text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
            Repairs done right,
            <br />
            the first time.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80 xl:text-base">
            Book trusted local technicians for your phones, laptops, and home
            appliances — with clear pricing and payment after completion.
          </p>

          <div className="mt-12 space-y-5">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-0.5 text-xs text-primary-foreground/70">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center gap-3 border-t border-white/15 pt-6">
          <div className="flex -space-x-2">
            {["TA", "FY", "RI"].map((initials) => (
              <div
                key={initials}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold ring-2 ring-primary"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-xs text-primary-foreground/80">
            Trusted by thousands of device owners across Dhaka
          </p>
        </div>
      </aside>

      {/* ── Form side ── */}
      <div className="flex min-h-screen flex-col bg-muted/20">
        {/* Compact version of the same brand panel for tablet + mobile */}
        <div className="relative overflow-hidden bg-linear-to-r from-primary to-teal-800 px-4 py-3.5 text-primary-foreground sm:px-6 lg:hidden [@media(max-height:780px)]:hidden">
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-36 w-36 rounded-full bg-white/5" />
          <div className="relative mx-auto max-w-md">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground/80">
              <Wrench className="h-3.5 w-3.5" />
              FixMate Repair Platform
            </div>
            <p className="mt-1.5 text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
              Repairs done right, the first time.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.title}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary-foreground/85"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.short}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Header — the Logo is the single link back home */}
        <header className="flex items-center border-b border-border/60 bg-background/70 px-4 py-2.5 backdrop-blur-md sm:px-6">
          <Logo showTagline={false} />
        </header>

        <main className="flex flex-1 items-start justify-center px-4 pt-3 pb-0 sm:items-center sm:px-6 sm:pt-3 sm:pb-0">
          <div className="w-full max-w-md">{children}</div>
        </main>

        <footer className="border-t border-border/40 py-2 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FixMate. Secure device &amp; appliance
          repair platform.
        </footer>
      </div>
    </div>
  );
}
