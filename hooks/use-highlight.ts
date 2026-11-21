"use client";

import { useEffect, useState } from "react";
import { HIGHLIGHT_DURATION_MS } from "@/lib/highlight";

export function useHighlight(
  highlightId?: string,
  rowPrefix?: string,
  cardPrefix?: string,
): boolean {
  const [isHighlighting, setIsHighlighting] = useState(Boolean(highlightId));

  useEffect(() => {
    if (!highlightId) return;

    let element: HTMLElement | null = null;
    if (rowPrefix) {
      element = document.getElementById(`${rowPrefix}${highlightId}`);
    }
    if (!element && cardPrefix) {
      element = document.getElementById(`${cardPrefix}${highlightId}`);
    }

    element?.scrollIntoView({ behavior: "smooth", block: "center" });

    const timer = setTimeout(
      () => setIsHighlighting(false),
      HIGHLIGHT_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [highlightId, rowPrefix, cardPrefix]);

  return isHighlighting;
}
