"use client";

import { Loader2, Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  serviceName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

// CLIENT COMPONENT — a simple "are you sure?" confirmation modal.
// The actual delete API call happens in the parent (MyServicesView).
export function ConfirmDeleteModal({
  serviceName,
  isDeleting,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {/* stopPropagation: clicks inside the modal must not close it */}
      <div
        className="w-full max-w-sm rounded-xl border border-border bg-card shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-rose-500/10 p-2.5 shrink-0">
            <TriangleAlert className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">
              Delete this service?
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              &quot;<span className="font-medium text-foreground">{serviceName}</span>
              &quot; will be removed permanently. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
