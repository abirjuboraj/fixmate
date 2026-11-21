import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/hero-search";

const REPAIR_HERO_IMAGE =
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop";

const POPULAR_QUICK_TAGS = [
  { label: "iPhone", query: "Smartphone" },
  { label: "Laptop", query: "Laptop & PC" },
  { label: "AC Servicing", query: "AC" },
  { label: "Refrigerator", query: "Refrigerator" },
  { label: "TV Display", query: "TV" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden border-b border-border/80 bg-neutral-950 text-white sm:min-h-[600px] lg:min-h-[640px]">
      {/* Background image: shift the focal point per breakpoint so the
          technician stays visible instead of being covered by the text. */}
      <Image
        src={REPAIR_HERO_IMAGE}
        alt="Certified technician repairing an electronic device"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] sm:object-center lg:object-right"
      />

      {/* Mobile: softer top-to-bottom overlay so the photo is still visible.
          Tablet/desktop: classic left-to-right dark-to-clear overlay. */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/55 to-neutral-950/85 sm:bg-gradient-to-r sm:from-neutral-950 sm:via-neutral-950/75 sm:to-neutral-950/20" />

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-xl space-y-5 rounded-2xl bg-neutral-950/35 p-5 backdrop-blur-[2px] sm:max-w-2xl sm:space-y-7 sm:rounded-none sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-neutral-200 backdrop-blur-md border border-white/15 sm:px-3.5 sm:text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <span>Doorstep Visits &amp; Shop Drop-Offs Available</span>
          </div>

          {/* Clean & Bold Headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Professional Device &amp; Appliance Repairs.
            </h1>
            <p className="text-sm sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Book certified local technicians for phones, computers, and home
              appliances. Track your service in real time and pay only after
              completion.
            </p>
          </div>

          {/* Search Box & Quick Action */}
          <div className="space-y-3.5 max-w-xl">
            {/* Mobile + tablet: shorter search with the CTA stacked below it.
                Desktop: the original side-by-side row. */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
              <HeroSearch />
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-auto self-start gap-2 font-semibold shadow-md shrink-0 h-11 bg-white text-neutral-900 hover:bg-neutral-100 lg:self-auto"
              >
                <Link href="/services">
                  Browse All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Clean Quick Category Links */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-neutral-400">
              <span className="font-medium text-neutral-300">Quick Search:</span>
              {POPULAR_QUICK_TAGS.map((tag) => (
                <Link
                  key={tag.label}
                  href={`/services?search=${encodeURIComponent(tag.query)}`}
                  className="rounded-md bg-white/10 px-2.5 py-1 text-neutral-200 hover:bg-white/20 hover:text-white transition-colors border border-white/10"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust row: stacked icon + label on mobile, inline on larger screens */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-neutral-300 sm:gap-5 lg:gap-6">
            <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:gap-2 sm:text-left">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">100%</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight">
                  Pay After Repair
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:gap-2 sm:text-left">
              <Star className="h-5 w-5 text-amber-400 shrink-0 fill-amber-400" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">4.9 / 5</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight">
                  Customer Rating
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:gap-2 sm:text-left">
              <Clock className="h-5 w-5 text-sky-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">Live Status</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight">
                  Track Each Step
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
