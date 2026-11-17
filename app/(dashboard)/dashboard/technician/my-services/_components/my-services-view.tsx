"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  ImageIcon,
  PlusCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import type { ServiceItem } from "@/types";
import { deleteService } from "@/lib/action/services";
import { EditServiceModal } from "./edit-service-modal";
import { ConfirmDeleteModal } from "./confirm-delete-modal";

interface MyServicesViewProps {
  services: ServiceItem[];
  fetchError: string | null;
}

// Approval status -> badge label + colors (Pending = amber, Approved = green, Rejected = red)
const getApprovalBadge = (status: string) => {
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

// Small service image with a placeholder when the image is missing
const ServiceImage = ({ src, alt }: { src: string; alt: string }) => {
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

// CLIENT COMPONENT — all interactivity lives here
export function MyServicesView({ services, fetchError }: MyServicesViewProps) {
  // Local copy of the list, so edit/delete/toggle update the screen instantly
  const [serviceList, setServiceList] = useState<ServiceItem[]>(services);

  // Which service is being edited / deleted (null = modal closed)
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deletingService, setDeletingService] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ---------- Availability toggle ----------
  const handleToggleAvailability = async (
    serviceId: string,
    nextValue: boolean
  ) => {
    // 1. Update the screen right away so the switch feels instant
    //    (this is called an "optimistic update")
    setServiceList((prev) =>
      prev.map((s) =>
        s._id === serviceId ? { ...s, isAvailable: nextValue } : s
      )
    );

    // TODO: 2. Save the change to the database through the backend.
    //
    // Step 1 (backend): add a dedicated endpoint in services.routes.js:
    //   router.patch("/:id/availability", verifyToken, verifyTechnician, toggleAvailability);
    //   Do NOT reuse PATCH /:id for this — that endpoint resets approvalStatus
    //   to "pending", and toggling availability should NOT send the service
    //   back for re-approval.
    //
    // Step 2 (frontend): add a server action in lib/action/services.ts:
    //   export const toggleServiceAvailability = async (
    //     serviceId: string,
    //     isAvailable: boolean
    //   ) => {
    //     const api = `${AUTH_URL}/api/services/${serviceId}/availability`;
    //     return protectedMutation(api, "PATCH", { isAvailable });
    //   };
    //
    // Step 3: call the action here and revert the switch if it fails:
    //   const result = await toggleServiceAvailability(serviceId, nextValue);
    //   if (!result?.success) {
    //     // revert the optimistic update so the switch shows the old value
    //     setServiceList((prev) =>
    //       prev.map((s) =>
    //         s._id === serviceId ? { ...s, isAvailable: !nextValue } : s
    //       )
    //     );
    //     toast.add({
    //       title: "Could not update availability",
    //       description: result?.message,
    //       type: "error",
    //     });
    //   } else {
    //     toast.add({
    //       title: nextValue ? "Service is now available" : "Service is now hidden",
    //       type: "success",
    //     });
    //   }
  };

  // ---------- Edit ----------
  // Called by the edit modal after the backend successfully saved the changes.
  const handleServiceUpdated = (updated: ServiceItem) => {
    setServiceList((prev) =>
      prev.map((s) => (s._id === updated._id ? updated : s))
    );
    setEditingService(null);
  };

  // ---------- Delete ----------
  const handleDelete = async () => {
    if (!deletingService?._id) return;

    setIsDeleting(true);

    try {
      const result = await deleteService(deletingService._id);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to delete service");
      }

      // Remove it from the screen
      setServiceList((prev) =>
        prev.filter((s) => s._id !== deletingService._id)
      );

      toast.add({
        title: "Service deleted",
        description: `"${deletingService.title}" was removed.`,
        type: "success",
      });

      setDeletingService(null);
    } catch (error) {
      toast.add({
        title: "Failed to delete service",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // ---------- Error state (backend unreachable etc.) ----------
  if (fetchError) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-8 text-center max-w-lg mx-auto">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto" />
        <h2 className="mt-3 text-base font-semibold">
          Could not load your services
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{fetchError}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 gap-2"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  // ---------- Empty state ----------
  if (serviceList.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-card/50 p-10 text-center max-w-lg mx-auto">
        <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto" />
        <h2 className="mt-3 text-base font-semibold">No services yet</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You have not listed any repair service. Create your first one — it
          will be reviewed by an admin before going live.
        </p>
        <Button asChild size="sm" className="mt-4 gap-2">
          <a href="/dashboard/technician/add-service">
            <PlusCircle className="h-4 w-4" />
            Add Your First Service
          </a>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* ---------- Desktop table ---------- */}
      <div className="hidden md:block rounded-xl border border-border/70 bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30 text-left">
              <th className="px-4 py-3 font-semibold text-muted-foreground">
                Service
              </th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">
                Category
              </th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">
                Price
              </th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">
                Approval
              </th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">
                Availability
              </th>
              <th className="px-4 py-3 font-semibold text-muted-foreground text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {serviceList.map((service) => {
              const badge = getApprovalBadge(service.approvalStatus);

              return (
                <tr
                  key={service._id}
                  className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors"
                >
                  {/* Image + title */}
                  <td className="px-4 py-3">
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
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-muted-foreground">
                    {service.category}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 font-semibold text-foreground">
                    ${service.basePrice}
                  </td>

                  {/* Approval badge */}
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={`border-transparent ${badge.className}`}
                    >
                      {badge.label}
                    </Badge>
                  </td>

                  {/* Availability switch */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={service.isAvailable}
                        onCheckedChange={(checked) =>
                          handleToggleAvailability(
                            service._id as string,
                            checked
                          )
                        }
                        aria-label="Toggle availability"
                      />
                      <span className="text-xs text-muted-foreground">
                        {service.isAvailable ? "Available" : "Hidden"}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingService(service)}
                        aria-label={`Edit ${service.title}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeletingService(service)}
                        aria-label={`Delete ${service.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile cards ---------- */}
      <div className="md:hidden space-y-4">
        {serviceList.map((service) => {
          const badge = getApprovalBadge(service.approvalStatus);

          return (
            <div
              key={service._id}
              className="rounded-xl border border-border/70 bg-card overflow-hidden"
            >
              {service.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="h-36 w-full bg-muted/50 flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {service.category} • {service.serviceMode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {service.serviceArea}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`border-transparent shrink-0 ${badge.className}`}
                  >
                    {badge.label}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-border/40">
                  <span className="font-semibold text-foreground">
                    ${service.basePrice}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {service.isAvailable ? "Available" : "Hidden"}
                    </span>
                    <Switch
                      checked={service.isAvailable}
                      onCheckedChange={(checked) =>
                        handleToggleAvailability(
                          service._id as string,
                          checked
                        )
                      }
                      aria-label="Toggle availability"
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => setEditingService(service)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 text-destructive hover:text-destructive"
                    onClick={() => setDeletingService(service)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Modals ---------- */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          onUpdated={handleServiceUpdated}
          onClose={() => setEditingService(null)}
        />
      )}

      {deletingService && (
        <ConfirmDeleteModal
          serviceName={deletingService.title}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeletingService(null)}
        />
      )}
    </>
  );
}
