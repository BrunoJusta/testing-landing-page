"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import GrapeMark from "./GrapeMark";

/**
 * Page-load intro. Motivated: the whole brand rests on the grape becoming the
 * macron in kōmvitis, so the mark is the first thing you see and it dissolves
 * into the hero. Short by design, and skipped entirely under reduced motion.
 */
export default function IntroCurtain() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (reduce) {
      setOpen(false);
      return;
    }
    const timer = window.setTimeout(() => setOpen(false), 620);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!open) document.body.style.overflow = "";
  }, [open]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-intro flex items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            className="text-ink"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <GrapeMark className="h-24 w-auto sm:h-32" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
