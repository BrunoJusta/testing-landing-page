"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { manifesto } from "@/lib/site";
import Reveal from "../Reveal";

function ManifestoLine({
  text,
  progress,
  from,
  to,
  reduce,
}: {
  text: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
  reduce: boolean | null;
}) {
  // 0.55 is the lowest resting opacity that still clears AA on paper.
  const opacity = useTransform(progress, [from, to], [0.55, 1]);
  const y = useTransform(progress, [from, to], [22, 0]);
  return (
    <motion.p
      className="text-manifesto font-medium"
      style={reduce ? undefined : { opacity, y }}
    >
      {text}
    </motion.p>
  );
}

/**
 * Editorial manifesto. Motivated: the lines are written to be read as spoken
 * lines, so each one resolves on its own as you scroll past it, and the rule at
 * the end is the only element carrying the accent.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });
  const count = manifesto.lines.length;

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="relative py-[var(--section-y)]"
    >
      <div className="shell">
        <h2 id="manifesto-title" className="sr-only">
          Manifesto
        </h2>

        <div ref={ref} className="max-w-[30ch] sm:max-w-[38ch] md:ml-[6%] md:max-w-[46ch] lg:ml-[12%] lg:max-w-[60ch]">
          {manifesto.lines.map((line, i) => (
            <ManifestoLine
              key={line}
              text={line}
              progress={scrollYProgress}
              from={i / count}
              to={(i + 1) / count}
              reduce={reduce}
            />
          ))}
        </div>

        <div className="mt-[clamp(3rem,7vh,6rem)] grid gap-8 border-t border-hairline/12 pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="max-w-[38ch] text-title text-accent">{manifesto.rule}</p>
          </Reveal>
          <Reveal index={1}>
            <p className="text-body text-muted md:text-right">{manifesto.footnote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
