import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Wallet,
  Clock,
  Award,
  Wrench,
  Search,
  ClipboardList,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCounter } from "@/components/home/stats-counter";

export const metadata = {
  title: "About FixMate | Trusted Device & Appliance Repairs",
  description:
    "Learn about FixMate — the repair platform connecting device owners with verified local technicians through transparent pricing and live job tracking.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Verified technicians",
    description:
      "Every technician is identity-checked and every service listing is reviewed by our admin team before it goes live.",
  },
  {
    icon: Wallet,
    title: "Pay after service",
    description:
      "No upfront payments. You pay securely through Stripe only once the repair is finished and you are satisfied.",
  },
  {
    icon: Clock,
    title: "Live job tracking",
    description:
      "Follow every step from Requested to Accepted, In Progress and Completed — no guessing, no missed calls.",
  },
  {
    icon: Award,
    title: "Clear, fair pricing",
    description:
      "Upfront base prices, transparent final amounts, and no surprise charges after the work is done.",
  },
];

const STEPS = [
  {
    icon: Search,
    title: "Find a service",
    description: "Browse verified repair listings by category and price.",
  },
  {
    icon: ClipboardList,
    title: "Send a request",
    description: "Share the problem, your address, and a preferred date.",
  },
  {
    icon: Wrench,
    title: "Technician repairs",
    description: "Track the job live until the work is completed.",
  },
  {
    icon: CreditCard,
    title: "Pay after completion",
    description: "Confirm the finished work, then pay securely.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/60 bg-linear-to-b from-primary/5 via-background to-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Wrench className="h-3.5 w-3.5" />
              About FixMate
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Repairs done right, the first time.
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              FixMate connects device and home appliance owners with verified
              local technicians. We built it to remove the uncertainty from
              repairs — with clear pricing, complete job visibility, and
              payment only after the work is done.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button asChild className="gap-2 font-semibold shadow-xs">
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our story / mission ── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Why FixMate exists
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Finding a trustworthy repair technician has always been difficult.
              Prices are unclear, job progress is invisible, and payment is often
              demanded before the device is even inspected. FixMate was created
              to fix that experience.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Today, customers can browse approved services, request a repair in
              under a minute, follow their job in real time, and pay only after
              completion. Technicians get a fair, organised way to find work and
              grow their reputation.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-foreground">
              Our commitment
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Every listing on FixMate is checked by our team, every repair
              follows a clear status pipeline, and every payment happens only
              after the customer is satisfied. That is the standard we hold
              ourselves to — on every job, every day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-y border-border/60 bg-muted/20 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              What we stand for
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Four simple promises that shape every repair on FixMate.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/70 bg-linear-to-br from-primary/5 via-card to-card p-4 shadow-xs sm:p-8 lg:p-12">
            <StatsCounter />
          </div>
        </div>
      </section>

      {/* ── Short process recap ── */}
      <section className="border-y border-border/60 bg-muted/20 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                How the platform works
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Four straightforward steps from a broken device to a working one.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-extrabold text-muted-foreground/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-sm sm:px-10">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Need a repair or ready to join as a technician?
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/85">
              Book a trusted local expert today, or create a technician account
              and start listing your services on FixMate.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="secondary"
                className="gap-2 font-semibold"
              >
                <Link href="/services">
                  Browse Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/30 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/sign-up">Join as a Technician</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
