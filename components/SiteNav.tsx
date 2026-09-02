"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { List } from "@phosphor-icons/react/dist/ssr/List";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { nav } from "@/lib/site";
import Wordmark from "./Wordmark";
import MagneticButton from "./MagneticButton";

/**
 * Sticky nav. Motivated: it shrinks and puts glass behind itself once the hero
 * is gone, so it stops competing with the hero and stays readable over content.
 * Below lg the sections move into a disclosure panel rather than wrapping.
 */
export default function SiteNav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 120;
    if (next !== condensed) setCondensed(next);
  });

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-nav transition-[background-color,border-color,backdrop-filter] duration-300 ease-physical",
        condensed || menuOpen
          ? "nav-glass border-b border-hairline/10"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "shell flex items-center justify-between transition-[height] duration-300 ease-physical",
          condensed ? "h-[62px]" : "h-[76px]",
        ].join(" ")}
      >
        <a href="#top" aria-label="kōmvitis, início" className="rounded-sm">
          <motion.span
            className="block origin-left text-[1.3rem] text-ink"
            animate={{ scale: condensed ? 0.81 : 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Wordmark />
          </motion.span>
        </a>

        <nav aria-label="Secções" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.9rem] text-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton
            href="#convite"
            className="hidden px-5 py-2.5 text-[0.85rem] sm:inline-flex"
          >
            Entrar na lista
          </MagneticButton>
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:text-accent lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="nav-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
            {menuOpen ? (
              <X size={22} weight="light" aria-hidden="true" />
            ) : (
              <List size={22} weight="light" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="nav-panel"
            className="overflow-hidden lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="shell flex flex-col gap-1 pb-6 pt-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-title text-ink transition-colors duration-200 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 sm:hidden">
                <MagneticButton href="#convite" className="w-full">
                  Entrar na lista
                </MagneticButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
