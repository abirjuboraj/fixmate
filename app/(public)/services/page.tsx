import { getAllPublicServices } from "@/lib/api/services";
import { ServicesBrowserClient } from "./_components/services-browser-client";
import { Wrench } from "lucide-react";

export const metadata = {
  title: "Browse Repair Services | FixMate",
  description:
    "Find and book verified repair specialists for smartphones, laptops, ACs, refrigerators, TVs, and home appliances across Dhaka.",
};

// Next.js 15+ searchParams are provided as a Promise
interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    serviceMode?: string;
    sort?: string;
  }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const resolvedParams = await searchParams;

  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "All";
  const serviceMode = resolvedParams.serviceMode || "All";
  const sort = resolvedParams.sort || "newest";

  // Server-side fetch querying MongoDB directly via fixmate-server
  // (Challenge 1: searching, filtering, and sorting happen strictly on the server)
  const response = await getAllPublicServices({
    search: search || undefined,
    category: category !== "All" ? category : undefined,
    serviceMode: serviceMode !== "All" ? serviceMode : undefined,
    sort,
  });

  const services = response.data || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <Wrench className="h-3.5 w-3.5" />
          Certified Repair Technicians
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Browse Repair Services
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Select a verified technician for your smart device or home appliance.
          Filter by category, search by problem, choose home visit or shop drop-off,
          and pay securely only after completion.
        </p>
      </div>

      {/* Services Browser with Search, Server Filters & Results */}
      <ServicesBrowserClient
        initialServices={services}
        initialSearch={search}
        initialCategory={category}
        initialServiceMode={serviceMode}
        initialSort={sort}
      />
    </div>
  );
}
