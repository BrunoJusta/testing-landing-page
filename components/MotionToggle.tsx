"use client";

import { useEffect, useState } from "react";

const KEY = "komvitis:motion";

/**
 * Lets the viewer stop the continuous motion on the page (the drifting
 * gradient, the bubbles, the marquee) without changing their system settings.
 */
export default function MotionToggle() {
  const [off, setOff] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch {
      stored = null;
    }
    const next = stored === "off";
    setOff(next);
    document.documentElement.dataset.motion = next ? "off" : "on";
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !off;
    setOff(next);
    document.documentElement.dataset.motion = next ? "off" : "on";
    try {
      window.localStorage.setItem(KEY, next ? "off" : "on");
    } catch {
      // Storage can be unavailable; the preference simply does not persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={ready ? off : undefined}
      className="text-body text-muted underline decoration-hairline/30 underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink/50"
    >
      {off ? "Ativar movimento" : "Reduzir movimento"}
    </button>
  );
}
