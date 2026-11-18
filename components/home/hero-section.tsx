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
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-border/80 bg-neutral-950 text-white">

      <Image
        src={REPAIR_HERO_IMAGE}
        alt="Certified technician repairing an electronic device"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center lg:object-right"
      />


      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-7 text-left">

          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-neutral-200 backdrop-blur-md border border-white/15">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Doorstep Visits &amp; Shop Drop-Offs Available</span>
          </div>

          {/* Clean & Bold Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Professional Device &amp; Appliance Repairs.
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Book certified local technicians for phones, computers, and home appliances.
              Track your service in real time and pay only after completion.
            </p>
          </div>

          {/* Search Box & Quick Action */}
          <div className="space-y-3.5 max-w-xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <HeroSearch />
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2 font-semibold shadow-md shrink-0 h-11 bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="/services">
                  Browse All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Clean Quick Category Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
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

          {/* Minimal Trust Row (No floating sticker badges) */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10 text-neutral-300 max-w-lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">100%</p>
                <p className="text-[11px] text-neutral-400">Pay After Repair</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400 shrink-0 fill-amber-400" />
              <div>
                <p className="text-sm font-bold text-white">4.9 / 5</p>
                <p className="text-[11px] text-neutral-400">Customer Rating</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-sky-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Live Status</p>
                <p className="text-[11px] text-neutral-400">Track Each Step</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
