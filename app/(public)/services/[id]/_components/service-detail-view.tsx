"use client";

// This is the main client component for the service details page.
// It receives service data and the user's role (passed from the server component).
// It handles the "Request Repair" button behavior based on the user's role.

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Home,
  Store,
  Tag,
  Wrench,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceDetailItem } from "@/types";
import { getUserInitials } from "@/components/shared/user-badge";
import { RequestRepairModal } from "./request-repair-modal";

interface ServiceDetailViewProps {
  service: ServiceDetailItem;
  // null = logged out, "customer" | "technician" | "admin" = logged in
  userRole: string | null;
  // session identity of the logged-in user ("" when logged out),
  // pre-filled read-only inside the request modal
  userName: string;
  userEmail: string;
  serviceId: string;
}

export function ServiceDetailView({
  service,
  userRole,
  userName,
  userEmail,
  serviceId,
}: ServiceDetailViewProps) {

  const pathname = usePathname();

  // Request modal — only ever opened in Case 3 (logged-in customer)
  const [showRequestModal, setShowRequestModal] = useState(false);

  const isHomeVisit = service.serviceMode === "Home Visit";


  const renderRepairButton = () => {
    if (userRole === null) {

      return (
        <Button asChild className="w-full sm:w-auto gap-2 font-semibold shadow-sm">
          <Link href={`/sign-in?callbackURL=${encodeURIComponent(pathname)}`}>
            <Wrench className="h-4 w-4" />
            Request Repair
          </Link>
        </Button>
      );
    }

    if (userRole === "technician" || userRole === "admin") {
      // Technicians and admins cannot book services
      return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Button
            disabled
            className="w-full sm:w-auto gap-2 font-semibold opacity-60 cursor-not-allowed"
          >
            <Wrench className="h-4 w-4" />
            Request Repair
          </Button>
          <span className="text-xs text-muted-foreground">
            Only customers can request a repair.
          </span>
        </div>
      );
    }


    // Case 3: Customer → open the request form modal
    return (
      <Button
        className="w-full sm:w-auto gap-2 font-semibold shadow-sm"
        onClick={() => setShowRequestModal(true)}
      >
        <Wrench className="h-4 w-4" />
        Request Repair
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-16 sm:px-6 lg:px-8 space-y-8">

        {/* Back Navigation */}
        <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/services">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </Button>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT COLUMN: Image + Details ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Large Service Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/70 bg-muted/40 shadow-sm">
              {service.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                  No image available
                </div>
              )}

              {/* Category badge overlaid on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-background/90 backdrop-blur-md text-foreground font-semibold text-xs border border-border/80 shadow-sm"
                >
                  <Tag className="h-3 w-3 mr-1 text-primary" />
                  {service.category}
                </Badge>

                {/* Service Mode badge */}
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold backdrop-blur-md shadow-sm ${isHomeVisit
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

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                {service.title}
              </h1>
            </div>

            {/* Quick Info Pills Row */}
            <div className="flex flex-wrap gap-3 text-sm">
              {/* Area */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/60 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{service.serviceArea}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/60 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{service.estimatedDuration}</span>
              </div>

              {/* Availability indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-medium">Available Now</span>
              </div>
            </div>

            <Separator />

            {/* Description Section */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">
                What This Service Includes
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {service.description}
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Pricing Card + Technician Card ── */}
          <div className="space-y-5 lg:sticky lg:top-24 h-fit">

            {/* Pricing & CTA Card */}
            <div className="rounded-2xl border border-border/70 bg-card shadow-sm p-6 space-y-5">
              {/* Price */}
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Starting Price
                </p>
                <p className="text-4xl font-extrabold text-foreground">
                  ${service.basePrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Final cost depends on diagnosis & parts.
                </p>
              </div>

              <Separator />

              {/* Key details inside the pricing card */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Service Mode</span>
                  <span className="font-semibold text-foreground">
                    {service.serviceMode}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">
                    {service.estimatedDuration}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold text-foreground">
                    {service.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Service Area</span>
                  <span className="font-semibold text-foreground text-right max-w-[160px]">
                    {service.serviceArea}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Request Repair Button — changes based on role */}
              {renderRepairButton()}
            </div>

            {/* Technician Summary Card */}
            <div className="rounded-2xl border border-border/70 bg-card shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Your Technician
              </h3>

              {/* Technician avatar + name */}
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                  {/* Technicians don't have a public photo in this endpoint, so we show initials */}
                  <AvatarImage src="" alt={service.technicianName} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {getUserInitials(service.technicianName)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-bold text-foreground text-base">
                    {service.technicianName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Verified Technician
                  </p>
                </div>
              </div>

              {/* Technician contact info (email only — public safe) */}
              <div className="space-y-2 text-sm border-t border-border/50 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{service.technicianName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="break-all">{service.technicianEmail}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Request Repair modal — only rendered for a logged-in customer */}
        {showRequestModal && (
          <RequestRepairModal
            service={service}
            userName={userName}
            userEmail={userEmail}
            onClose={() => setShowRequestModal(false)}
          />
        )}
      </div>
    </div>
  );
}
