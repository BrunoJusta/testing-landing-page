"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: ReactNode;
  /** Stagger index, so a group reads in order rather than all at once. */
  index?: number;
  as?: ElementType;
  className?: string;
  y?: number;
  amount?: number;
};

/**
 * The single reveal primitive for the page. Motivated: it establishes reading
 * order on arrival. Fires once, transform and opacity only, and collapses to a
 * plain fade under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  index = 0,
  as = "div",
  className,
  y = 26,
  amount = 0.3,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.62, delay: index * 0.07, ease: EASE },
        },
      };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}
