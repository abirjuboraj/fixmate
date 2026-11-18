import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Wind,
  Refrigerator,
  Tv,
  Sparkles,
  Zap,
  ArrowRight,
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
    description: "Screen replacement, battery swap, charging port repair & OS recovery",
    accentColor: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    badge: "Most Popular",
  },
  {
    name: "Laptop & PC",
    slug: "Laptop & PC",
    icon: Laptop,
    description: "Hardware upgrade, motherboard diagnostics, thermal paste & virus cleanup",
    accentColor: "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    badge: "Trending",
  },
  {
    name: "AC",
    slug: "AC",
    icon: Wind,
    description: "Master cooling service, gas refilling, compressor & leak repair",
    accentColor: "from-cyan-500/10 to-teal-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    badge: "Fast Service",
  },
  {
    name: "Refrigerator",
    slug: "Refrigerator",
    icon: Refrigerator,
    description: "Cooling issues, thermostat fixing, gas top-up & gasket replacement",
    accentColor: "from-emerald-500/10 to-green-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    name: "TV",
    slug: "TV",
    icon: Tv,
    description: "LED/OLED display fix, backlight replacement, power board & audio repair",
    accentColor: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    name: "Washing Machine",
    slug: "Washing Machine",
    icon: Sparkles,
    description: "Motor repair, drum balance, drainage pipeline & PCB board troubleshooting",
    accentColor: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  {
    name: "Electrical",
    slug: "Electrical",
    icon: Zap,
    description: "Short circuit fixes, switchboard wiring, breaker installation & safety audits",
    accentColor: "from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
];

/**
 * Server Component: Displays popular repair categories as clean, clickable cards.
 * Deep links cleanly to `/services?category=...`
 */
export function PopularCategories() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Wrench className="h-3.5 w-3.5" />
              <span>Explore Categories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Popular Repair Categories
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Choose your appliance or device type to connect with certified local specialists offering home visits and drop-offs.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline transition-colors shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Categories Grid: 1 col on mobile, 2 col on tablet, 3-4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const targetUrl = `/services?category=${encodeURIComponent(cat.slug)}`;

            return (
              <Link
                key={cat.name}
                href={targetUrl}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
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
                  <span>Browse {cat.name} Repairs</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}

          {/* Quick "Custom Problem" Card filling out the grid nicely */}
          <Link
            href="/services"
            className="group flex flex-col justify-between rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10"
          >
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  Need Something Else?
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Browse our full directory of certified technicians covering specialty gadgets and custom diagnostic tasks.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <span>View All 50+ Services</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
