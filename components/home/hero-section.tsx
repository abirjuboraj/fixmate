import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/hero-search";

const REPAIR_HERO_IMAGE =
  "/images/FixMate%20Living%20Room%20Light%20Repair.png?v=2";

const POPULAR_QUICK_TAGS = [
  { label: "iPhone", query: "Smartphone" },
  { label: "Laptop", query: "Laptop & PC" },
  { label: "AC Servicing", query: "AC" },
  { label: "Refrigerator", query: "Refrigerator" },
  { label: "TV Display", query: "TV" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-140 items-center justify-center overflow-hidden border-b border-border/80 bg-neutral-950 text-white sm:min-h-150 lg:min-h-160">
      {/* Background image: shift the focal point per breakpoint so the
          technician stays visible instead of being covered by the text. */}
      <Image
        src={REPAIR_HERO_IMAGE}
        alt="Certified technician repairing an electronic device"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_top] sm:object-[74%_top] lg:object-top"
      />

      {/* Mobile: softer top-to-bottom overlay so the photo is still visible.
          Tablet/desktop: classic left-to-right dark-to-clear overlay. */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-950/85 via-neutral-950/75 to-neutral-950/90 sm:bg-linear-to-r sm:from-neutral-950 sm:via-neutral-950/65 sm:to-neutral-950/10" />

      {/* Gentle lift on the right so the repair area and technician stay bright */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-white/15 via-transparent to-transparent sm:from-white/10" />

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-[16rem] space-y-4 text-left sm:max-w-[22rem] sm:space-y-7 lg:max-w-[38rem]">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-neutral-200 backdrop-blur-md border border-white/15 sm:px-3.5 sm:text-[11px] lg:text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <span>Your Repair, Our Expertise</span>
          </div>

          {/* Clean & Bold Headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-[1.65rem] sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Professional Device <br /> &amp; Appliance Repairs
            </h1>
            <p className="max-w-full text-xs text-neutral-300 leading-relaxed sm:text-base lg:text-lg">
              <span className="block lg:inline">
              Get expert repairs for your devices and home appliances. Connect with our trusted local technicians and enjoy reliable services
              </span>
            </p>
          </div>

          {/* Search Box & Quick Action */}
          <div className="max-w-full space-y-3.5">
            {/* Mobile + tablet: shorter search with the CTA stacked below it.
                Desktop: the original side-by-side row. */}
            <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
              <HeroSearch />
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="h-8 w-auto shrink-0 self-start gap-1.5 rounded-lg px-3 text-xs font-semibold shadow-md bg-white text-neutral-900 hover:bg-neutral-100 sm:h-9 sm:text-sm lg:h-11 lg:w-auto lg:gap-2 lg:self-auto lg:text-sm"
              >
                <Link href="/services">
                  Browse All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Clean Quick Category Links */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs text-neutral-400">
              <span className="font-medium text-neutral-300">Quick Search:</span>
              {POPULAR_QUICK_TAGS.map((tag, index) => (
                <Link
                  key={tag.label}
                  href={`/services?search=${encodeURIComponent(tag.query)}`}
                  className={`rounded-md border border-white/10 bg-white/10 px-2 py-1 text-neutral-200 transition-colors hover:bg-white/20 hover:text-white ${
                    index >= 3 ? "hidden sm:inline-flex" : ""
                  }`}
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust row — hidden on mobile to leave room for the photo */}
          <div className="hidden grid-cols-3 gap-2 border-t border-white/10 pt-4 text-neutral-300 sm:grid sm:gap-5 lg:gap-6">
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
