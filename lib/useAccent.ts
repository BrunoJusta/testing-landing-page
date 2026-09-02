"use client";

import { useCallback } from "react";
import type { AccentKey } from "@/lib/site";

/**
 * The accent lives on <html data-accent="...">, so hovering a lote repaints the
 * whole page (hairlines, labels, gradients, focus rings) and not just the card.
 * Writing a data attribute keeps this off the React render path.
 */
export function useAccent(fallback: AccentKey = "rose") {
  const set = useCallback((key: AccentKey) => {
    document.documentElement.dataset.accent = key;
  }, []);

  const reset = useCallback(() => {
    document.documentElement.dataset.accent = fallback;
  }, [fallback]);

  return { set, reset };
}
