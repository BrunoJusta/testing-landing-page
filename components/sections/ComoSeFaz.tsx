"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { steps } from "@/lib/site";

/**
 * Scroll-driven process. Motivated: the four steps are a sequence in the real
 * world, so the left column stays put and reports where you are while the right
 * column advances. Reduced motion turns it into a plain stacked list.
 */
export default function ComoSeFaz() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "end 0.85"],
  });
  const barScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    if (next !== active) setActive(next);
  });

  return (
    <section
      id="como-se-faz"
      aria-labelledby="como-title"
      className="relative border-t border-hairline/12 py-[var(--section-y)]"
    >
      <div className="shell">
        <h2 id="como-title" className="max-w-[24ch] text-display font-medium">
          Da folha ao copo.
        </h2>

        <div ref={ref} className="mt-[clamp(2.5rem,6vh,4.5rem)] lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          {/* Sticky index with a progress rail. */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="sticky top-[15vh]">
              <div className="flex gap-6">
                <div
                  aria-hidden="true"
                  className="relative w-px flex-none overflow-hidden bg-hairline/15"
                >
                  <motion.span
                    className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
                    style={reduce ? { scaleY: 1 } : { scaleY: barScale }}
                  />
                </div>
                <ol className="flex flex-col gap-5">
                  {steps.map((step, i) => (
                    <li key={step.id}>
                      <span
                        className={[
                          "text-title transition-colors duration-300 ease-physical",
                          i === active ? "text-ink" : "text-muted/45",
                        ].join(" ")}
                      >
                        {step.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* The steps themselves. */}
          <ol className="flex flex-col gap-[clamp(3rem,10vh,7rem)]">
            {steps.map((step, i) => (
              <motion.li
                key={step.id}
                className="max-w-[54ch]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-title font-medium lg:sr-only">{step.title}</h3>
                <p className="mt-3 text-lead text-muted lg:mt-0">{step.body}</p>

                {step.image ? (
                  <div className="mt-7 overflow-hidden rounded-media">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={1000}
                      height={775}
                      sizes="(max-width: 1024px) 92vw, 46vw"
                      loading="lazy"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ) : (
                  /* TODO: replace with vineyard photography of the leaf being
                     taken at desponta or desfolha. The deck carries no such
                     image, so nothing is faked here. */
                  <div
                    className="mt-7 flex min-h-[16rem] flex-col justify-end gap-3 rounded-media bg-accent-wash/25 p-7"
                    aria-hidden="true"
                  >
                    <p className="max-w-[22ch] text-display font-medium text-accent">
                      A segunda colheita.
                    </p>
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
