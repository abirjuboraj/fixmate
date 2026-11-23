import Link from "next/link";
import {
  MapPin,
  Clock,
  User,
  ArrowRight,
  Home,
  Store,
  Tag,
} from "lucide-react";
import { ServiceItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const serviceId = service._id ? String(service._id) : "";
  const isHomeVisit = service.serviceMode === "Home Visit";

  return (
    <div className="group flex flex-col justify-between h-full rounded-2xl border border-border/70 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:shadow-lg hover:border-primary/40 overflow-hidden">
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative w-full aspect-16/10 bg-muted/50 overflow-hidden">
        {service.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/60 text-muted-foreground">
            <span className="text-xs">No preview image</span>
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-md text-foreground font-semibold text-xs border border-border/80 shadow-xs"
          >
            <Tag className="h-3 w-3 mr-1 text-primary" />
            {service.category}
          </Badge>
        </div>

        {/* Service Mode Pill Tag */}
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className={`text-xs font-semibold backdrop-blur-md shadow-xs ${
              isHomeVisit
                ? "bg-blue-500/90 text-white border-transparent"
                : "bg-emerald-500/90 text-white border-transparent"
            }`}
          >
            {isHomeVisit ? (
              <Home className="h-3 w-3 mr-1" />
            ) : (
              <Store className="h-3 w-3 mr-1" />
            )}
            {service.serviceMode}
          </Badge>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        {/* Title */}
        <div className="space-y-1">
          {/* Full title on every screen — no truncation, just natural wrapping */}
          <h3 className="min-h-11 text-base leading-snug font-bold text-foreground group-hover:text-primary transition-colors sm:text-lg">
            {service.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Service Metadata: Area & Duration */}
        <div className="space-y-2 pt-1 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{service.serviceArea}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Estimated Duration: {service.estimatedDuration}</span>
          </div>
          {service.technicianName && (
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">
                By:{" "}
                <strong className="text-foreground font-semibold">
                  {service.technicianName}
                </strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Price & CTA Button */}
      <div className="flex items-center justify-between p-5 pt-3 border-t border-border/60 bg-muted/20">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Starting Price
          </span>
          <span className="text-xl font-extrabold text-foreground">
            ${service.basePrice.toFixed(2)}
          </span>
        </div>

        <Button asChild size="sm" className="gap-1.5 shadow-sm font-semibold">
          <Link href={`/services/${serviceId}`}>
            View Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
