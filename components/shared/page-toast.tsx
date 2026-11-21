"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface PageToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

/** Fires a single toast on mount (StrictMode-safe). */
export function PageToast({ type, message }: PageToastProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    toast[type](message);
  }, [type, message]);

  return null;
}
