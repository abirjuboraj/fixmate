"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ImageIcon,
  Clock,
  RotateCcw,
  ShieldAlert,
  SearchX,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import type { ServiceItem } from "@/types";
import { updateServiceApproval } from "@/lib/action/services";
import { ConfirmRejectModal } from "./confirm-reject-modal";
import { toast } from "sonner";

interface AdminServicesViewProps {
  services: ServiceItem[];
  fetchError: string | null;
  currentStatus: string;
}


const STATUS_FILTERS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

// Badge color/label for each approval status
const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      };
    case "rejected":
      return {
        label: "Rejected",
        className: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      };
    default:
      return {
        label: "Pending",
        className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      };
  }
};

// Small service image with a graceful placeholder (same as my-services)
const ServiceImage = ({ src, alt }: { src?: string; alt: string }) => {
  if (!src) {
    return (
      <div className="h-12 w-20 rounded-lg border border-border/60 bg-muted/50 flex items-center justify-center shrink-0">
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-12 w-20 rounded-lg border border-border/60 object-cover shrink-0"
    />
  );
};


export function AdminServicesView({
  services,
  fetchError,
  currentStatus,
}: AdminServicesViewProps) {
  const router = useRouter();


  const [rejectingService, setRejectingService] = useState<ServiceItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [approvingId, setApprovingId] = useState<string | null>(null);



  const handleStatusFilter = (status: string) => {
    router.push(
      status === "all"
        ? "/dashboard/admin/services?status=all"
        : `/dashboard/admin/services?status=${status}`
    );
  };


  // ---------- Approve / Reject ----------

  const handleApprove = async (service: ServiceItem) => {
    if (!service._id) return;

    setApprovingId(service._id);

    try {
      const result = await updateServiceApproval(service._id, "approved");

      if (!result?.success) {
        throw new Error(result?.message || "Failed to approve service");
      }

      toast.success(`"${service.title}" is now live in public services search.`)

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Please try again.",
      )
    } finally {
      setApprovingId(null);
    }
  };

  const handleReject = async () => {
    if (!rejectingService?._id) return;

    setIsUpdating(true);

    try {
      const result = await updateServiceApproval(rejectingService._id, "rejected");

      if (!result?.success) {
        throw new Error(result?.message || "Failed to reject service");
      }

      toast.success(`"${rejectingService.title}" is now hidden from public search.`)
      setRejectingService(null);

      router.refresh();
    } catch (error) {

      toast.error(error instanceof Error ? error.message : "Please try again.")
    } finally {
      setIsUpdating(false);
    }
  };


  // ---------- Error state (backend unreachable etc.) ----------

  if (fetchError) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-8 text-center max-w-lg mx-auto">
        <ShieldAlert className="h-8 w-8 text-destructive mx-auto" />
        <h2 className="mt-3 text-base font-semibold">
          Could not load services
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{fetchError}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 gap-2"
          onClick={() => router.refresh()}
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }


  const renderActions = (service: ServiceItem) => {
    const isApproving = approvingId === service._id;

    return (
      <div className="flex justify-end gap-2">

        {service.approvalStatus !== "approved" && (
          <Button
            size="sm"
            className="gap-1.5 font-semibold"
            disabled={isApproving || isUpdating}
            onClick={() => handleApprove(service)}
          >
            {isApproving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            Approve
          </Button>
        )}


        {service.approvalStatus !== "rejected" && (
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
            disabled={isApproving || isUpdating}
            onClick={() => setRejectingService(service)}
          >
            <XCircle className="h-3.5 w-3.5" />
            Reject
          </Button>
        )}
      </div>
    );
  };


  return (
    <div className="space-y-4">
      {/* ---------- Status filter pills ---------- */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((filter) => {
          const isActive = currentStatus === filter.value;

          return (
            <Button
              key={filter.value}
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => handleStatusFilter(filter.value)}
              className={
                isActive
                  ? "font-semibold"
                  : "text-muted-foreground"
              }
            >
              {filter.value === "pending" && (
                <Clock className="h-3.5 w-3.5" />
              )}
              {filter.label}
            </Button>
          );
        })}

        <span className="text-sm text-muted-foreground ml-auto">
          <span className="font-semibold text-foreground">{services.length}</span>{" "}
          service{services.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* ---------- Empty state ---------- */}
      {services.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 bg-card/50 p-12 text-center">
          <SearchX className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="mt-4 font-semibold text-foreground">
            No {currentStatus !== "all" ? currentStatus : ""} services
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {currentStatus === "pending"
              ? "Great news — there are no services waiting for review."
              : "No services match this filter right now."}
          </p>
        </div>
      ) : (
        <>
          {/* ---------- Desktop: table ---------- */}
          <div className="hidden md:block rounded-xl border border-border/70 bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Service</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead className="hidden lg:table-cell">Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => {
                  const badge = getStatusBadge(service.approvalStatus);

                  return (
                    <TableRow key={service._id}>
                      {/* Image + title */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ServiceImage
                            src={service.image}
                            alt={service.title}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-foreground line-clamp-1">
                              {service.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {service.serviceMode} • {service.serviceArea}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Technician */}
                      <TableCell>
                        <p className="text-foreground">{service.technicianName}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.technicianEmail}
                        </p>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="text-muted-foreground hidden lg:table-cell">
                        {service.category}
                      </TableCell>

                      {/* Price */}
                      <TableCell className="font-semibold text-foreground">
                        ${service.basePrice}
                      </TableCell>

                      {/* Status badge */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`border-transparent ${badge.className}`}
                        >
                          {badge.label}
                        </Badge>
                      </TableCell>

                      {/* Approve / Reject */}
                      <TableCell className="text-right">
                        {renderActions(service)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* ---------- Mobile: cards ---------- */}
          <div className="md:hidden space-y-3">
            {services.map((service) => {
              const badge = getStatusBadge(service.approvalStatus);

              return (
                <div
                  key={service._id}
                  className="rounded-xl border border-border/70 bg-card overflow-hidden"
                >
                  <div className="p-4 flex gap-3">
                    <ServiceImage src={service.image} alt={service.title} />

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground line-clamp-1">
                        {service.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {service.technicianName} • {service.category}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {service.serviceMode}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={`border-transparent ${badge.className}`}
                        >
                          {badge.label}
                        </Badge>
                        <span className="text-sm font-semibold text-foreground">
                          ${service.basePrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="px-4 py-3 border-t border-border/60 bg-muted/20">
                    {renderActions(service)}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ---------- Confirm before rejecting ---------- */}
      {rejectingService && (
        <ConfirmRejectModal
          serviceTitle={rejectingService.title}
          isRejecting={isUpdating}
          onConfirm={handleReject}
          onClose={() => setRejectingService(null)}
        />
      )}
    </div>
  );
}
