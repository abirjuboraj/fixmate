import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Star,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/hero-search";
import { HowItWorks } from "@/components/home/how-it-works";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ---------- Hero / Banner Section ---------- */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-accent/60 via-background to-background">
        {/* Decorative blurred shapes (modern depth, no images needed) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-40 -left-16 h-64 w-64 rounded-full bg-chart-2/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
            {/* Left: copy, search, CTA */}
            <div className="space-y-7 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified &amp; Background-Checked Technicians
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                Repairs You Can Trust,{" "}
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Results You Can Track
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                FixMate connects your broken phone, laptop, or appliance with
                verified local technicians. Follow every step of the repair in
                real time — and pay only when the job is done.
              </p>

              {/* Search box (leads to /services) + secondary CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <HeroSearch />
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="shrink-0 gap-2 bg-card/80"
                >
                  <Link href="/services">
                    Browse All Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-6 sm:gap-4">
                <div>
                  <p className="text-xl font-bold text-foreground sm:text-2xl">
                    100%
                  </p>
                  <p className="text-[11px] text-muted-foreground sm:text-xs">
                    Pay After Repair
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground sm:text-2xl">
                    7+
                  </p>
                  <p className="text-[11px] text-muted-foreground sm:text-xs">
                    Repair Categories
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground sm:text-2xl">
                    Doorstep
                  </p>
                  <p className="text-[11px] text-muted-foreground sm:text-xs">
                    Or Shop Drop-off
                  </p>
                </div>
              </div>
            </div>

            {/* Right: high-quality photo with floating info cards */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70 shadow-2xl">
                <Image
                  src={HERO_IMAGE}
                  alt="Verified FixMate technician servicing a device"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Soft gradient so floating cards stay readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>

              {/* Floating card: rating */}
              <div className="absolute -top-4 right-4 hidden rounded-2xl border border-border/70 bg-card/95 px-4 py-3 shadow-lg backdrop-blur sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">4.9 / 5</p>
                    <p className="text-[11px] text-muted-foreground">
                      Customer rating
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card: pay-after-service promise */}
              <div className="absolute -bottom-5 left-4 rounded-2xl border border-border/70 bg-card/95 px-4 py-3 shadow-lg backdrop-blur sm:left-8">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
                    <Wallet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Pay After Completion
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Only when the job is done right
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Small trust strip below the hero ---------- */}
      <section className="border-b border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Verified Technicians
              </h2>
              <p className="text-xs text-muted-foreground">
                Every expert is screened before listing a service
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Live Job Tracking
              </h2>
              <p className="text-xs text-muted-foreground">
                Requested → Accepted → In Progress → Completed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Secure Stripe Payments
              </h2>
              <p className="text-xs text-muted-foreground">
                Pay online safely, only after completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How FixMate Works (4-step flow) ---------- */}
      <HowItWorks />
    </div>
  );
}
