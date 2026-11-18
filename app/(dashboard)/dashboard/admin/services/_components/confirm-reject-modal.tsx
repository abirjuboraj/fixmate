"use client";

import { Loader2, XCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmRejectModalProps {
  serviceTitle: string;
  isRejecting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}


// Confirmation dialog shown before an admin rejects a service.
// (Same beginner-friendly overlay pattern as the other confirm modals.)
export function ConfirmRejectModal({
  serviceTitle,
  isRejecting,
  onConfirm,
  onClose,
}: ConfirmRejectModalProps) {
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
            <h2 className="font-semibold text-foreground">Reject this service?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              &quot;<span className="font-medium text-foreground">{serviceTitle}</span>
              &quot; will not appear in public search. The technician can edit and
              resubmit it for review.
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose} disabled={isRejecting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isRejecting}
            className="gap-2"
          >
            {isRejecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Reject
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
