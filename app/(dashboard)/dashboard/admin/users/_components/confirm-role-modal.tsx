"use client";

import { Loader2, KeyRound, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRoleLabel } from "@/components/shared/user-badge";
import type { UserRole } from "@/types";

interface ConfirmRoleModalProps {
  userName: string;
  currentRole: string;
  newRole: UserRole;
  isUpdating: boolean;
  onConfirm: () => void;
  onClose: () => void;
}


// Small confirmation dialog shown before an admin changes a user's role.
// (Same beginner-friendly overlay pattern as ConfirmDeleteModal.)
export function ConfirmRoleModal({
  userName,
  currentRole,
  newRole,
  isUpdating,
  onConfirm,
  onClose,
}: ConfirmRoleModalProps) {
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
          <div className="rounded-full bg-amber-500/10 p-2.5 shrink-0">
            <TriangleAlert className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Change this role?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              &quot;<span className="font-medium text-foreground">{userName}</span>
              &quot; will change from{" "}
              <span className="font-medium text-foreground">
                {formatRoleLabel(currentRole as UserRole)}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {formatRoleLabel(newRole)}
              </span>
              . This affects what they can access in FixMate.
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isUpdating}
            className="gap-2 font-semibold"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                Yes, change role
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
