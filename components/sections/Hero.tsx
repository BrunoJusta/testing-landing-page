"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { brand } from "@/lib/site";
import BubbleField from "../BubbleField";
import MagneticButton from "../MagneticButton";

/** The claim, broken where the composition needs it. */
const LINES = ["O convite para", "os bons momentos."] as const;

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  // Scroll-linked depth: the bottle lifts, grows and tilts a little as the
  // headline leaves, so the product stays the subject while the copy exits.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bottleY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [0, 2.2]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Pointer parallax, held in motion values so it never re-renders the tree.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.6 });
  const py = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.6 });
  const bottleTiltX = useTransform(px, [-1, 1], [14, -14]);
  const bottleTiltY = useTransform(py, [-1, 1], [10, -10]);
  const fieldTiltX = useTransform(px, [-1, 1], [-30, 30]);
  const fieldTiltY = useTransform(py, [-1, 1], [-20, 20]);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pointerX.set((clientX / window.innerWidth) * 2 - 1);
        pointerY.set((clientY / window.innerHeight) * 2 - 1);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [pointerX, pointerY, reduce]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-[84px]"
    >
      {/* Layer 1: the drifting liquid gradient. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-40"
        style={reduce ? undefined : { y: fieldY }}
      >
        <motion.div
          className="liquid-field absolute inset-0"
          style={reduce ? undefined : { x: fieldTiltX, y: fieldTiltY }}
        />
      </motion.div>

      {/* Layer 2: bubbles. */}
      <BubbleField className="-z-30" />

      {/* Layer 3: the bottle, centre stage. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 flex justify-center lg:translate-x-[4%]"
        style={
          reduce ? undefined : { y: bottleY, scale: bottleScale, rotate: bottleRotate }
        }
      >
        <motion.div
          className="relative aspect-[550/1280] h-[52vh] sm:h-[60vh] lg:h-[80vh]"
          style={reduce ? undefined : { x: bottleTiltX, y: bottleTiltY }}
        >
          <Image
            src="/img/garrafa-rose-cacho.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 55vw, 30vw"
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Layer 4: light bloom, so the headline keeps AA contrast over glass. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(62%_52%_at_50%_50%,rgb(var(--paper)/0.72)_0%,rgb(var(--paper)/0.42)_46%,transparent_78%)]"
      />

      <motion.div
        className="shell relative w-full"
        style={reduce ? undefined : { y: copyY, opacity: copyFade }}
      >
        <p
          className="eyebrow rise-soft text-center lg:text-left"
          style={{ "--d": "0.3s" } as React.CSSProperties}
        >
          {brand.descriptor}
        </p>

        {/* The two lines are set left and right of the bottle so the glass
            threads between them instead of sitting behind the words. */}
        <h1 className="mt-5 text-hero font-medium">
          {LINES.map((line, lineIndex) => (
            <span
              key={line}
              className={[
                "block text-center",
                lineIndex === 0
                  ? "lg:max-w-[52%] lg:text-left"
                  : "lg:ml-auto lg:mt-[19vh] lg:max-w-[62%] lg:text-right",
              ].join(" ")}
            >
              {line.split(" ").map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <span className="inline-block overflow-hidden align-bottom pb-[0.16em] -mb-[0.16em]">
                    <span
                      className="rise-word inline-block"
                      style={
                        {
                          "--d": `${0.38 + (lineIndex * 3 + i) * 0.06}s`,
                        } as React.CSSProperties
                      }
                    >
                      {word}
                    </span>
                  </span>
                  {/* A real space, so the accessible name reads as a sentence. */}
                  {" "}
                </Fragment>
              ))}
            </span>
          ))}
        </h1>

        <div className="mt-9 flex flex-col items-center gap-7 lg:mt-12 lg:max-w-[38ch] lg:items-start">
          <p
            className="rise-soft max-w-[44ch] text-center text-lead text-muted lg:text-left"
            style={{ "--d": "0.78s" } as React.CSSProperties}
          >
            {brand.oneLine}
          </p>

          <div
            className="rise-soft flex flex-wrap items-center justify-center gap-3"
            style={{ "--d": "0.92s" } as React.CSSProperties}
          >
            <MagneticButton href="#lotes">Ver os lotes</MagneticButton>
            <MagneticButton href="#como-se-faz" variant="outline">
              Como se faz
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue: a hairline that fills. No label, no wheel icon. */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[var(--shell-x)] lg:translate-x-0"
        style={reduce ? undefined : { opacity: copyFade }}
      >
        <div className="h-14 w-px overflow-hidden bg-hairline/15">
          <motion.span
            className="block h-6 w-px bg-accent"
            initial={{ y: "-100%" }}
            animate={reduce ? { y: "60%" } : { y: ["-100%", "240%"] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
            }
          />
        </div>
      </motion.div>
    </section>
  );
}
