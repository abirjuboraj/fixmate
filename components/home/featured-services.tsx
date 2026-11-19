import Link from "next/link";
import { Star, Wrench, ArrowRight } from "lucide-react";
import { getAllPublicServices } from "@/lib/api/services";
import { FeaturedServicesGrid } from "./featured-services-grid";


export async function FeaturedServices() {
  const response = await getAllPublicServices({
    sort: "newest",
    limit: 6,
  });

  const services = response.data ?? [];

  return (
    <section className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Star className="h-3.5 w-3.5" />
            Featured Services
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Latest Repair Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            The 6 newest services approved by our team — each one offered by a
            verified technician.
          </p>
        </div>

        {/* Results: animated grid, or a friendly empty state */}
        {services.length > 0 ? (
          <>
            <div className="mt-10">
              <FeaturedServicesGrid services={services} />
            </div>

            {/* CTA to the full listing */}
            <div className="mt-10 flex justify-center">
              <BrowseAllButton />
            </div>
          </>
        ) : (
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-border/80 bg-card/60 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Wrench className="h-7 w-7 stroke-[1.8]" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">
              No services yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Approved repair services will show up here as soon as
              technicians add them and our admin team approves them.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Small "Browse all services" link button (kept separate to stay readable)
function BrowseAllButton() {
  return (
    <Link
      href="/services"
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
    >
      Browse All Services
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
