"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useCountUp } from "react-countup";
import { Users, Wrench, ThumbsUp, Star } from "lucide-react";

/**
 * Client Component: platform numbers.
 * react-countup handles the counting animation; Framer Motion's useInView
 * starts each counter only once the stats block scrolls into view.
 */
const STATS = [
  {
    icon: Users,
    end: 2500,
    suffix: "+",
    label: "Satisfied Customers",
    description: "Across Dhaka & metropolitan regions",
  },
  {
    icon: Wrench,
    end: 4800,
    suffix: "+",
    label: "Successful Repairs",
    description: "Phones, Laptops, ACs & appliances fixed",
  },
  {
    icon: ThumbsUp,
    end: 99.2,
    decimals: 1,
    suffix: "%",
    label: "Positive Satisfaction",
    description: "Backed by verified customer reviews",
  },
  {
    icon: Star,
    end: 4.9,
    decimals: 1,
    suffix: " / 5",
    label: "Average Rating",
    description: "Rated across all technician jobs",
  },
];

type Stat = (typeof STATS)[number];

function StatCard({ stat, isInView }: { stat: Stat; isInView: boolean }) {
  const Icon = stat.icon;
  const reduceMotion = useReducedMotion();
  const countRef = useRef<HTMLSpanElement>(null);

  // useCountUp writes the formatted number straight into this element
  const { start } = useCountUp({
    // react-countup v6 types expect a non-nullable HTMLElement ref
    ref: countRef as RefObject<HTMLElement>,
    end: stat.end,
    decimals: stat.decimals ?? 0,
    suffix: stat.suffix ?? "",
    separator: ",",
    duration: reduceMotion ? 0 : 2,
    startOnMount: false,
  });

  // Start the count-up the first time the section becomes visible
  useEffect(() => {
    if (isInView) start();
  }, [isInView, start]);

  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-border/60 bg-card/70 px-3 py-5 text-center sm:min-h-48 sm:px-5 sm:py-6">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-extrabold tracking-tight text-foreground tabular-nums sm:text-3xl lg:text-4xl">
        <span ref={countRef}>0</span>
      </p>
      <p className="mt-1 text-xs font-bold text-foreground sm:text-sm">
        {stat.label}
      </p>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
        {stat.description}
      </p>
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} isInView={isInView} />
      ))}
    </div>
  );
}
