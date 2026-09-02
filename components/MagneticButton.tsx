"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useRef } from "react";
import type { ReactNode } from "react";

const SPRING = { stiffness: 220, damping: 22, mass: 0.5 };
const MAX = 8;

type Props = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "solid" | "outline";
  className?: string;
  disabled?: boolean;
};

/**
 * Magnetic primary action. Motivated: the two decisions on the page (read the
 * lotes, join the list) pull toward the pointer so they feel picked, not read.
 * Position is held in motion values, never in state, so it never re-renders.
 */
export default function MagneticButton({
  children,
  href,
  type = "button",
  variant = "solid",
  className = "",
  disabled,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef(0);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  const reduce = useReducedMotion();

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (reduce || event.pointerType !== "mouse") return;
      const { clientX, clientY } = event;
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        rawX.set(Math.max(-1, Math.min(1, dx)) * MAX);
        rawY.set(Math.max(-1, Math.min(1, dy)) * MAX);
      });
    },
    [rawX, rawY, reduce],
  );

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-[0.95rem] font-medium transition-[background-color,border-color,color] duration-200 ease-physical active:scale-[0.98] disabled:opacity-60";
  const skin =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-ink/90"
      : "border border-hairline/30 text-ink hover:border-ink/45 hover:bg-ink/[0.05]";

  const style = { x, y };
  const shared = {
    ref: ref as never,
    className: `${base} ${skin} ${className}`,
    style,
    onPointerMove,
    onPointerLeave: onLeave,
    "data-cursor": "grow" as const,
  };

  if (href) {
    return (
      <motion.a href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} disabled={disabled} {...shared}>
      {children}
    </motion.button>
  );
}
