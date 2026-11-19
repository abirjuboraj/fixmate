"use client";

// Fires a single sonner toast when the page mounts.
// Used on server pages (payment success / cancel) that don't have their
// own client component but still need a toast notification.

import { useEffect } from "react";
import { toast } from "sonner";

interface PageToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

export function PageToast({ type, message }: PageToastProps) {
  useEffect(() => {
    toast[type](message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
