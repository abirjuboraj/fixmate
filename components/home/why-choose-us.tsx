import {
  ShieldCheck,
  Award,
  Wallet,
  Clock,
  Star,
  Quote,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatsCounter } from "./stats-counter";

// Core Trust Points & Platform Highlights
const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "100% Verified Technicians",
    description:
      "Every technician submits identification, background history, and proof of experience before receiving admin approval.",
    color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Wallet,
    title: "Pay After Service",
    description:
      "Never pay upfront. You only pay securely via Stripe or cash once the technician finishes repairing and testing your device.",
    color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Clock,
    title: "Transparent Live Tracking",
    description:
      "Follow your job lifecycle step-by-step: Requested → Accepted → In Progress → Completed, straight from your dashboard.",
    color: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "Clear pricing upfront with estimated duration and covered items. No hidden charges or surprise diagnostics fees.",
    color: "text-violet-600 bg-violet-500/10 border-violet-500/20",
  },
];

// Verified customer testimonials
const TESTIMONIALS = [
  {
    name: "Tanvir Ahmed",
    role: "MacBook Pro Owner",
    area: "Dhanmondi, Dhaka",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote:
      "My laptop motherboard had water damage and Apple service said it couldn't be saved. A FixMate technician fixed it at my house within 3 hours. Paying after repair gave me immense peace of mind!",
    rating: 5,
  },
  {
    name: "Farhana Yasmin",
    role: "Homeowner",
    area: "Gulshan, Dhaka",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    quote:
      "Master AC servicing before summer was done flawlessly. The technician was polite, wore clean gear, tested cooling with digital gauges, and charged exactly what was listed on FixMate.",
    rating: 5,
  },
  {
    name: "Rafiqul Islam",
    role: "Software Engineer",
    area: "Mirpur, Dhaka",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote:
      "Ordered an iPhone display replacement during office hours. Tracking the status from 'Accepted' to 'Completed' in real-time was super smooth. Highest recommendation!",
    rating: 5,
  },
];

/**
 * Server Component: Displays Trust Pillars, Platform Stats, and Customer Testimonials.
 */
export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ── PART 1: TRUST PILLARS ── */}
        <div className="space-y-12">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Why FixMate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Repair Done Right, The First Time
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We took the uncertainty, overcharging, and hassle out of appliance &amp; gadget repair by introducing verified specialists and strict platform protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md space-y-4"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${item.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── PART 2: PLATFORM NUMBERS & STATS (count up on scroll) ── */}
        <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/5 via-card to-card p-4 shadow-xs sm:p-8 lg:p-12">
          <StatsCounter />
        </div>

        {/* ── PART 3: TESTIMONIALS ── */}
        <div className="space-y-12">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Loved by Thousands of Device Owners
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              See what real users have to say about their repair experiences with FixMate technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40 space-y-6"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <Quote className="h-7 w-7 text-primary/20" />

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                  <Avatar className="h-10 w-10 ring-1 ring-border">
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {item.role} • {item.area}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
