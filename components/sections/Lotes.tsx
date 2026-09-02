"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { lotes, type AccentKey } from "@/lib/site";
import { useAccent } from "@/lib/useAccent";
import GrapeMark from "../GrapeMark";
import Reveal from "../Reveal";

const MAX_TILT = 8; // degrees

function LoteCard({
  lote,
  index,
  onEnter,
  onLeave,
}: {
  lote: (typeof lotes)[number];
  index: number;
  onEnter: (id: AccentKey) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();
  const rawRx = useMotionValue(0);
  const rawRy = useMotionValue(0);
  const rx = useSpring(rawRx, { stiffness: 160, damping: 18, mass: 0.5 });
  const ry = useSpring(rawRy, { stiffness: 160, damping: 18, mass: 0.5 });

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
        rawRy.set(Math.max(-1, Math.min(1, dx)) * MAX_TILT);
        rawRx.set(Math.max(-1, Math.min(1, -dy)) * MAX_TILT);
      });
    },
    [rawRx, rawRy, reduce],
  );

  const reset = useCallback(() => {
    rawRx.set(0);
    rawRy.set(0);
    onLeave();
  }, [onLeave, rawRx, rawRy]);

  return (
    <Reveal
      index={index}
      className={[
        "h-full",
        index === 1 ? "md:translate-y-10" : index === 2 ? "md:translate-y-4" : "",
      ].join(" ")}
    >
      <motion.div
        ref={ref}
        data-accent-scope={lote.id}
        className="group relative h-full rounded-panel border border-hairline/12 bg-panel/60 p-6 [transform-style:preserve-3d] sm:p-7"
        style={
          reduce
            ? undefined
            : { rotateX: rx, rotateY: ry, transformPerspective: 900 }
        }
        onPointerMove={onPointerMove}
        onPointerEnter={() => onEnter(lote.id)}
        onPointerLeave={reset}
      >
        <div className="relative flex h-[min(52vh,400px)] items-end justify-center">
          {lote.image ? (
            <div className="relative aspect-[560/1300] h-full">
              <Image
                src={lote.image}
                alt={lote.alt}
                fill
                sizes="(max-width: 768px) 60vw, 22vw"
                loading="lazy"
                className="object-contain transition-transform duration-500 ease-physical group-hover:scale-[1.04]"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink">
              <GrapeMark className="h-24 w-auto opacity-90 transition-transform duration-500 ease-physical group-hover:scale-105" />
            </div>
          )}
        </div>

        <div className="mt-7 border-t border-hairline/12 pt-5">
          <h3 className="text-title font-medium">{lote.name}</h3>
          <p className="mt-2 text-body text-accent">
            {lote.casta} · {lote.origem}
          </p>
          <p className="mt-3 max-w-[32ch] text-body text-muted">{lote.note}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

/**
 * The lotes. Motivated: reading a lote should feel like picking one up, so the
 * card tilts toward the pointer and the page adopts that lote's colour, which
 * is the only place on the site where the accent is chosen rather than given.
 */
export default function Lotes() {
  const { set, reset } = useAccent("rose");

  return (
    <section
      id="lotes"
      aria-labelledby="lotes-title"
      className="relative py-[var(--section-y)]"
    >
      <div className="shell">
        <div className="max-w-[46ch]">
          <Reveal as="h2">
            <span id="lotes-title" className="block text-display font-medium">
              Dois lotes, uma casta.
            </span>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-5 text-lead text-muted">
              Cada lote nomeia a casta, a vinha e o ano. Se não sabemos de que vinha veio,
              não usamos a palavra.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(2.5rem,6vh,4.5rem)] grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {lotes.map((lote, i) => (
            <LoteCard key={lote.id} lote={lote} index={i} onEnter={set} onLeave={reset} />
          ))}
        </div>
      </div>
    </section>
  );
}
