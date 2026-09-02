"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { figures, provas } from "@/lib/site";
import Reveal from "../Reveal";

function Counter({ value, unit }: { value: number; unit: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="flex items-baseline gap-2">
      <span className="tabular text-figure font-medium">
        {shown}
      </span>
      <span className="text-lead text-muted">{unit}</span>
    </span>
  );
}

/**
 * Proof, not benefits. The deck forbids health, detox and probiotic language,
 * so this section carries only the facts it lists and the figures printed on the
 * packaging. Motivated: counting the figures up draws the eye to the only hard
 * numbers the brand actually claims.
 */
export default function Provas() {
  return (
    <section
      id="provas"
      aria-labelledby="provas-title"
      className="relative border-t border-hairline/12 py-[var(--section-y)]"
    >
      <div className="shell">
        <h2 id="provas-title" className="max-w-[26ch] text-display font-medium">
          Porque é que isto é credível.
        </h2>

        <div className="mt-[clamp(2.5rem,6vh,4rem)] grid gap-x-10 gap-y-12 md:grid-cols-3">
          {figures.map((figure, i) => (
            <Reveal key={figure.label} index={i}>
              <Counter value={figure.value} unit={figure.unit} />
              <p className="mt-4 max-w-[26ch] border-t border-hairline/12 pt-4 text-body text-muted">
                {figure.label}
              </p>
            </Reveal>
          ))}
        </div>

        <ul className="mt-[clamp(3.5rem,9vh,6rem)] grid gap-px overflow-hidden rounded-panel bg-hairline/10 sm:grid-cols-2">
          {provas.map((prova, i) => (
            <li
              key={prova.title}
              className={[
                "bg-paper p-6 sm:p-8",
                i === provas.length - 1 ? "sm:col-span-2" : "",
              ].join(" ")}
            >
              <Reveal index={i % 2}>
                <h3 className="max-w-[30ch] text-title font-medium">{prova.title}</h3>
                <p className="mt-3 max-w-[46ch] text-body text-muted">{prova.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
