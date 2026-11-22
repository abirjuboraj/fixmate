import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { CategoriesCarousel } from "./categories-carousel";

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

        <CategoriesCarousel />

      </div>
    </section>
  );
}
