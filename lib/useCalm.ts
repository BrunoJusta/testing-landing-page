"use client";

import { useEffect, useState } from "react";

/**
 * True when continuous motion should not run: either the operating system asks
 * for reduced motion, or the viewer has switched it off with the control in the
 * footer. WCAG 2.2.2 wants a mechanism to stop motion that autoplays for more
 * than five seconds, and the gradient, the bubbles and the marquee all do.
 */
export function useCalm() {
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () =>
      setCalm(query.matches || document.documentElement.dataset.motion === "off");

    evaluate();
    query.addEventListener("change", evaluate);

    const observer = new MutationObserver(evaluate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });

    return () => {
      query.removeEventListener("change", evaluate);
      observer.disconnect();
    };
  }, []);

  return calm;
}
