import Link from "next/link";
import {
  Wrench,
  Clock,
  ArrowRight,
  Smartphone,
  Laptop,
  Wind,
  Refrigerator,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Preview */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified & Background-Checked Technicians
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.15]">
                Broken Device or Appliance?{" "}
                <span className="text-primary">Get It Fixed Reliably.</span>
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg max-w-xl leading-relaxed">
                FixMate connects you with certified technicians across Dhaka for
                smartphones, laptops, ACs, refrigerators, and electronics. Track
                status step-by-step and pay securely only after the job is
                complete.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" asChild className="gap-2 shadow-md">
                  <Link href="/services">
                    Browse Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">How It Works</Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60">
                <div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">
                    Pay After Repair
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12+</p>
                  <p className="text-xs text-muted-foreground">
                    Repair Verticals
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">Doorstep</p>
                  <p className="text-xs text-muted-foreground">
                    Or Shop Drop-off
                  </p>
                </div>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-xl backdrop-blur-sm space-y-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">
                        Instant Repair Booking
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Transparent pricing & live status tracking
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-all hover:border-primary/50">
                    <Smartphone className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-semibold">Smartphone Repair</h3>
                    <p className="text-xs text-muted-foreground">
                      Screen, battery & logic board
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-all hover:border-primary/50">
                    <Laptop className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-semibold">Laptop & PC</h3>
                    <p className="text-xs text-muted-foreground">
                      Hardware & performance tuning
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-all hover:border-primary/50">
                    <Wind className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-semibold">AC Servicing</h3>
                    <p className="text-xs text-muted-foreground">
                      Master cleaning & gas refill
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-all hover:border-primary/50">
                    <Refrigerator className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-semibold">Refrigerator</h3>
                    <p className="text-xs text-muted-foreground">
                      Cooling issues & compressor
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-primary/10 p-4 border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Ready to experience FixMate?
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Public layout, Navbar & Footer active.
                      </p>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/services">Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
