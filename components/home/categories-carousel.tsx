"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Smartphone,
  Laptop,
  Wind,
  Refrigerator,
  Tv,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Wrench,
} from "lucide-react";

/**
 * 7 Official FixMate Categories matching SERVICE_CATEGORIES from types/index.ts.
 * Clicking any category takes the user directly to `/services?category=<CategoryName>`
 * with that category pre-filtered!
 */
const CATEGORIES = [
  {
    name: "Smartphone",
    slug: "Smartphone",
    icon: Smartphone,
    description:
      "Screen replacement, battery swap, charging port repair & OS recovery",
    accentColor:
      "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    badge: "Most Popular",
  },
  {
    name: "Laptop & PC",
    slug: "Laptop & PC",
    icon: Laptop,
    description:
      "Hardware upgrade, motherboard diagnostics, thermal paste & virus cleanup",
    accentColor:
      "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    badge: "Trending",
  },
  {
    name: "AC",
    slug: "AC",
    icon: Wind,
    description:
      "Master cooling service, gas refilling, compressor & leak repair",
    accentColor:
      "from-cyan-500/10 to-teal-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    badge: "Fast Service",
  },
  {
    name: "Refrigerator",
    slug: "Refrigerator",
    icon: Refrigerator,
    description:
      "Cooling issues, thermostat fixing, gas top-up & gasket replacement",
    accentColor:
      "from-emerald-500/10 to-green-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    name: "TV",
    slug: "TV",
    icon: Tv,
    description:
      "LED/OLED display fix, backlight replacement, power board & audio repair",
    accentColor:
      "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    name: "Washing Machine",
    slug: "Washing Machine",
    icon: Sparkles,
    description:
      "Motor repair, drum balance, drainage pipeline & PCB board troubleshooting",
    accentColor:
      "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  {
    name: "Electrical",
    slug: "Electrical",
    icon: Zap,
    description:
      "Short circuit fixes, switchboard wiring, breaker installation & safety audits",
    accentColor:
      "from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
];

/**
 * Client Component: "Popular Repair Categories" as a swipeable carousel (Embla).
 *
 * Why Embla? It's tiny (~3kb), has no CSS bundle to import, and works with
 * plain Tailwind classes — a much better fit for this site's clean theme than
 * a heavier library like Swiper.
 *
 * Responsive slides-per-view (controlled with CSS, not JS):
 *   mobile  ->  ~1.2 cards (next card peeks in, hints "swipe me")
 *   sm      ->  ~2 cards
 *   md      ->  3 cards
 *   lg      ->  4 cards
 */
export function CategoriesCarousel() {
  // Gentle autoplay: advances every 4s, pauses while hovered, and stops for
  // good as soon as the visitor uses the arrows, dots, or drags the carousel.
  // It also stops naturally at the last card because the loop is disabled.
  // Skipped entirely when "reduce motion" is enabled in the OS settings.
  const plugins = useMemo(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return [];
    }

    return [
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        // IMPORTANT: without this, the autoplay plugin jumps back to slide 1
        // when it reaches the end (embla's default), which brings the first
        // card right next to the last one. Stop quietly on the last card.
        stopOnLastSnap: true,
      }),
    ];
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      // NO infinite loop: at the end the carousel stops on the last cards
      // instead of attaching the first card right after the last one.
      // trimSnaps removes snaps that would leave empty space at the edges,
      // so the final view still shows a full row of cards.
      loop: false,
      align: "start",
      containScroll: "trimSnaps",
    },
    plugins
  );

  // Carousel UI state: arrow availability, current dot, total dots
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  // Keep the arrows and dots in sync with the carousel
  useEffect(() => {
    if (!emblaApi) return;

    const syncState = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setSlideCount(emblaApi.scrollSnapList().length);
    };

    syncState();
    emblaApi.on("select", syncState).on("reInit", syncState);

    // Cleanup listeners when the carousel is destroyed
    return () => {
      emblaApi.off("select", syncState).off("reInit", syncState);
    };
  }, [emblaApi]);

  // Hand control over to the visitor once they interact
  const stopAutoplay = () => {
    emblaApi?.plugins()?.autoplay?.stop();
  };

  const scrollPrev = () => {
    stopAutoplay();
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    stopAutoplay();
    emblaApi?.scrollNext();
  };

  const scrollToSlide = (index: number) => {
    stopAutoplay();
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="space-y-6">
      {/* ---------- Carousel viewport ---------- */}
      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Popular repair categories"
      >
        {/* Slides: horizontal flex row, 1rem gap between cards */}
        <div className="flex gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const targetUrl = `/services?category=${encodeURIComponent(cat.slug)}`;

            return (
              // IMPORTANT: keep CSS transforms/transitions off the slide
              // element. Embla controls slide positioning with inline styles,
              // and animating those same properties with CSS causes jumps.
              <Link
                key={cat.name}
                href={targetUrl}
                // Basis = how wide one card is. It changes per breakpoint so
                // exactly the right number of cards fits on each screen size.
                className="
                  group flex h-full shrink-0 grow-0 basis-[82%]
                  focus-visible:outline-2 focus-visible:outline-primary
                  sm:basis-[46%]
                  md:basis-[calc((100%_-_2rem)/3)]
                  lg:basis-[calc((100%_-_3rem)/4)]
                "
              >
                {/* All hover effects live on this INNER card, which is safe
                    to transform because it isn't an Embla slide. */}
                <div className="relative flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-lg">
                  {/* Top Badge (Optional for featured categories) */}
                  {cat.badge && (
                    <span className="absolute top-4 right-4 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary tracking-wide">
                      {cat.badge}
                    </span>
                  )}

                  {/* Icon & Category Title */}
                  <div className="space-y-4">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br ${cat.accentColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {cat.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom CTA link arrow */}
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
                    <span className="line-clamp-1">
                      Browse {cat.name} Repairs
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Final "Custom Problem" slide filling out the carousel */}
          <Link
            href="/services"
            className="
              group flex h-full shrink-0 grow-0 basis-[82%]
              focus-visible:outline-2 focus-visible:outline-primary
              sm:basis-[46%]
              md:basis-[calc((100%_-_2rem)/3)]
              lg:basis-[calc((100%_-_3rem)/4)]
            "
          >
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:bg-primary/10">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    Need Something Else?
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    Browse our full directory of certified technicians covering
                    specialty gadgets and custom diagnostic tasks.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>View All 50+ Services</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ---------- Controls: dots on the left, arrows on the right ---------- */}
      <div className="flex items-center justify-between gap-4">
        {/* Progress dots — one per slide */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Previous / Next arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Previous categories"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground shadow-xs transition-all duration-200 hover:border-primary/50 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next categories"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground shadow-xs transition-all duration-200 hover:border-primary/50 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
