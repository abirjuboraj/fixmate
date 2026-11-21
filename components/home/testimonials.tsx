"use client";

import { useState } from "react";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    name: "Tanvir Evan",
    role: "MacBook Pro Owner",
    area: "Dhanmondi, Dhaka",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote:
      "My laptop motherboard had water damage and Apple service said it couldn't be saved. A FixMate technician fixed it at my house within 3 hours. Paying after repair gave me immense peace of mind!",
    rating: 5,
  },
  {
    name: "Farhana Yasmin",
    role: "Homeowner",
    area: "Gulshan, Dhaka",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    quote:
      "Master AC servicing before summer was done flawlessly. The technician was polite, wore clean gear, tested cooling with digital gauges, and charged exactly what was listed on FixMate.",
    rating: 5,
  },
  {
    name: "Mahir Islam",
    role: "Software Engineer",
    area: "Mirpur, Dhaka",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote:
      "Ordered an iPhone display replacement during office hours. Tracking the status from 'Accepted' to 'Completed' in real-time was super smooth. Highest recommendation!",
    rating: 5,
  },
];

/** "Tanvir Ahmed" -> "TA", used when the photo fails to load */
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

/** Small reusable star row */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];

  return (
    <>
      {/* ── MOBILE: reviewer tabs + one quote panel ── */}
      <div className="space-y-4 md:hidden">
        {/* Tap a reviewer to switch the story below */}
        <div className="flex gap-2">
          {TESTIMONIALS.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Read review from ${item.name}`}
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-2 py-2 text-left transition-colors ${
                  isActive
                    ? "border-primary/50 bg-primary/10 ring-1 ring-primary/30"
                    : "border-border/70 bg-card hover:border-primary/30"
                }`}
              >
                <Avatar className="h-8 w-8 shrink-0 ring-1 ring-border">
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary">
                    {initials(item.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold text-foreground">
                    {item.name.split(" ")[0]}
                  </span>
                  <span className="block truncate text-[10px] text-muted-foreground">
                    {item.role}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* The selected review. `key` makes the fade animation replay on change. */}
        <div
          key={active.name}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-xs"
        >
          <div className="flex items-start justify-between gap-3">
            <Stars count={active.rating} />
            <Quote className="h-7 w-7 shrink-0 text-primary/20" />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground italic">
            &ldquo;{active.quote}&rdquo;
          </p>

          <div className="flex items-center gap-3 border-t border-border/60 pt-4">
            <Avatar className="h-10 w-10 ring-1 ring-border">
              <AvatarImage src={active.image} alt={active.name} />
              <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                {initials(active.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-bold text-foreground">{active.name}</h4>
              <p className="text-[11px] text-muted-foreground">
                {active.role} • {active.area}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          Tap a reviewer to read their story · {activeIndex + 1} of{" "}
          {TESTIMONIALS.length}
        </p>
      </div>

      {/* ── TABLET + DESKTOP: the original three-card grid ── */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.name}
            className="relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40 space-y-6"
          >
            <div className="space-y-4">
              <Stars count={item.rating} />
              <Quote className="h-7 w-7 text-primary/20" />
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-border/60 pt-4">
              <Avatar className="h-10 w-10 ring-1 ring-border">
                <AvatarImage src={item.image} alt={item.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {initials(item.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                <p className="text-[11px] text-muted-foreground">
                  {item.role} • {item.area}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
