"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Soft blob cursor. Requested by the brief. Only mounts for fine pointers with
 * motion allowed, so touch devices and reduced-motion users keep the native
 * cursor. It never captures pointer events and keyboard focus is untouched.
 */
export default function BlobCursor() {
  const [enabled, setEnabled] = useState(false);
  const [grown, setGrown] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 380, damping: 32, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 380, damping: 32, mass: 0.4 });
  const frame = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setEnabled(fine.matches && !calm.matches);
    evaluate();
    fine.addEventListener("change", evaluate);
    calm.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      calm.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-blob-cursor");

    const move = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        rawX.set(clientX);
        rawY.set(clientY);
      });
    };

    const INTERACTIVE = 'a, button, input, [data-cursor="grow"]';
    const over = (event: PointerEvent) => {
      const el = event.target as HTMLElement | null;
      setGrown(Boolean(el?.closest?.(INTERACTIVE)));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-blob-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      cancelAnimationFrame(frame.current);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-cursor hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-paper mix-blend-difference"
        animate={{
          width: grown ? 68 : 18,
          height: grown ? 68 : 18,
          opacity: grown ? 0.9 : 0.75,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{ borderRadius: "50%" }}
      />
    </motion.div>
  );
}
