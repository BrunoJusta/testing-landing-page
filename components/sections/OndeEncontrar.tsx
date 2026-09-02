"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { lexicon, locais, pullQuote } from "@/lib/site";
import Reveal from "../Reveal";

/**
 * Where it lives. Motivated: the photograph carries the promise, so it gets a
 * slow parallax while the list of places holds still beside it. The marquee is
 * the brand's own vocabulary, pausing on hover so it can be read.
 */
export default function OndeEncontrar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="onde"
      aria-labelledby="onde-title"
      className="relative border-t border-hairline/12 pt-[var(--section-y)]"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div>
            <h2 id="onde-title" className="max-w-[20ch] text-display font-medium">
              Onde vive a kōmvitis.
            </h2>
            <Reveal index={1}>
              <p className="mt-5 max-w-[44ch] text-lead text-muted">
                Espaços focados em pequenos produtores, para um público jovem e de nicho.
              </p>
            </Reveal>

            <ul className="mt-10 flex flex-col">
              {locais.map((local, i) => (
                <li key={local.title} className="border-t border-hairline/12 py-5">
                  <Reveal index={i}>
                    <h3 className="text-title font-medium">{local.title}</h3>
                    <p className="mt-1.5 max-w-[38ch] text-body text-muted">{local.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div ref={ref} className="relative">
            <div className="overflow-hidden rounded-media">
              <motion.div style={reduce ? undefined : { y: imageY }} className="scale-[1.12]">
                <Image
                  src="/img/brindar-douro.jpg"
                  alt="Cinco amigos sentados na margem do Douro, no Porto, a brindar com garrafas de kōmvitis rosé."
                  width={1400}
                  height={1482}
                  sizes="(max-width: 1024px) 92vw, 48vw"
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </motion.div>
            </div>
            <Reveal index={1}>
              <p className="mt-6 max-w-[26ch] text-title text-accent">{pullQuote}</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* The brand's own vocabulary, not invented stockists. */}
      <div
        className="marquee group mt-[clamp(3.5rem,9vh,6rem)] overflow-hidden border-y border-hairline/12 py-5"
      >
        <div className="marquee-track flex w-max items-center gap-10 pr-10">
          {[...lexicon, ...lexicon].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="flex flex-none items-center gap-10 text-title text-muted"
              aria-hidden={i >= lexicon.length ? "true" : undefined}
            >
              {word}
              <span className="h-[1.1em] w-px flex-none bg-accent/45" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
