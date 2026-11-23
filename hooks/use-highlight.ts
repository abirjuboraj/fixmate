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

    const candidates = [rowPrefix, cardPrefix]
      .filter(Boolean)
      .map((prefix) => document.getElementById(`${prefix}${highlightId}`))
      .filter((element): element is HTMLElement => element !== null);

    const element =
      candidates.find((candidate) => candidate.getClientRects().length > 0) ??
      candidates[0];

    const frame = requestAnimationFrame(() => {
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    const timer = setTimeout(
      () => setIsHighlighting(false),
      HIGHLIGHT_DURATION_MS,
    );

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [highlightId, rowPrefix, cardPrefix]);

  return isHighlighting;
}
