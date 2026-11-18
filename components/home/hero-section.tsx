import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Wrench,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/hero-search";

// High-resolution, professional electronics & device repair hero images
const HERO_IMAGE_MAIN =
  "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1200&auto=format&fit=crop";
const HERO_IMAGE_SECONDARY =
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop";

const POPULAR_QUICK_TAGS = [
  { label: "iPhone Screen", query: "iPhone" },
  { label: "Laptop Battery", query: "Laptop" },
  { label: "AC Servicing", query: "AC" },
  { label: "Refrigerator", query: "Refrigerator" },
];

/**
 * Modern, High-End Hero Section.
 * Designed with professional typography, dual-layer interactive search,
 * real-time trust metrics, and an asymmetrical showcase image composition.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/5 via-background to-background pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Background ambient lighting effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-chart-2/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ── LEFT COLUMN: Copy, Search, Quick Tags & Trust Badges (7 cols) ── */}
          <div className="space-y-8 text-left lg:col-span-7">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/90 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>FixMate Verified Network</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-muted-foreground">Certified Experts Near You</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.12]">
                Expert Device &amp; Appliance Repairs{" "}
                <span className="bg-gradient-to-r from-primary via-indigo-600 to-chart-2 bg-clip-text text-transparent">
                  Made Effortless.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                Connect with background-checked local technicians for doorstep visits or shop drop-offs. Track every step live in your dashboard and pay only after complete satisfaction.
              </p>
            </div>

            {/* Interactive Search Box + Direct Browse CTA */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
                <HeroSearch />
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2 font-semibold shadow-xs shrink-0 bg-background/80 hover:bg-muted/80 h-11"
                >
                  <Link href="/services">
                    Browse All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <span className="text-muted-foreground font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Popular:
                </span>
                {POPULAR_QUICK_TAGS.map((tag) => (
                  <Link
                    key={tag.label}
                    href={`/services?search=${encodeURIComponent(tag.query)}`}
                    className="rounded-md border border-border/70 bg-card px-2.5 py-1 font-medium text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all shadow-xs"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Three Pillar Trust Proofs */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/70 pt-6 sm:gap-6 max-w-xl">
              <div>
                <div className="flex items-center gap-1.5 text-foreground font-bold text-lg sm:text-xl">
                  <span>100%</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pay After Service
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-foreground font-bold text-lg sm:text-xl">
                  <span>4.9 / 5</span>
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Over 2,500+ Reviews
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-foreground font-bold text-lg sm:text-xl">
                  <span>Fast</span>
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Same-Day Support
                </p>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: High-Resolution Composite Visual Showcase (5 cols) ── */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
            
            {/* Backdrop glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 to-chart-2/20 blur-xl opacity-60" />

            {/* Main Showcase Image Card */}
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={HERO_IMAGE_MAIN}
                  alt="Certified technician performing precision hardware repair"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-background/85 px-4 py-2.5 backdrop-blur-md border border-white/10 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-xs">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      Motherboard &amp; Chipset Diagnostic
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      FixMate Certified Workshop
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  Inspected
                </span>
              </div>
            </div>

            {/* Floating Card 1: Verified Technicians pill (top-right) */}
            <div className="absolute -top-4 -right-2 sm:-right-4 rounded-2xl border border-border/80 bg-background/95 p-3.5 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Verified Technicians</p>
                  <p className="text-[11px] text-muted-foreground">Strict Background Checks</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Live Tracking pill (bottom-left) */}
            <div className="absolute -bottom-5 -left-2 sm:-left-4 rounded-2xl border border-border/80 bg-background/95 p-3.5 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-emerald-500" />
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Live Job Tracking</p>
                  <p className="text-[11px] text-muted-foreground">Real-Time Status Updates</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
