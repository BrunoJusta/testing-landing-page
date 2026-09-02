"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { convite } from "@/lib/site";
import MagneticButton from "../MagneticButton";
import Reveal from "../Reveal";

type Status = "idle" | "pending" | "done";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Front-end only sign up. Every state is implemented: idle, invalid with an
 * inline message under the field, pending on the button, and a composed success
 * panel that replaces the form.
 */
export default function Convite() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const email = value.trim();
    if (!email) {
      setError(convite.errorEmpty);
      inputRef.current?.focus();
      return;
    }
    if (!EMAIL.test(email)) {
      setError(convite.errorInvalid);
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setStatus("pending");
    // No backend in this build; the delay stands in for the request.
    window.setTimeout(() => setStatus("done"), 850);
  };

  return (
    <section
      id="convite"
      aria-labelledby="convite-title"
      className="relative py-[var(--section-y)]"
    >
      <div className="shell">
        <div className="relative overflow-hidden rounded-panel border border-hairline/12 bg-panel/50 px-6 py-[clamp(2.5rem,7vh,5rem)] sm:px-10 lg:px-16">
          <div
            aria-hidden="true"
            className="liquid-field pointer-events-none absolute inset-0 opacity-60"
          />

          <div className="relative mx-auto max-w-[52ch] text-center">
            <Reveal>
              <p className="eyebrow">{convite.eyebrow}</p>
              <h2 id="convite-title" className="mt-5 text-display font-medium">
                {convite.title}
              </h2>
              <p className="mx-auto mt-5 max-w-[42ch] text-lead text-muted">
                {convite.body}
              </p>
            </Reveal>

            <AnimatePresence mode="wait" initial={false}>
              {status === "done" ? (
                <motion.div
                  key="done"
                  className="mt-10 flex flex-col items-center gap-3 text-accent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle size={28} weight="light" aria-hidden="true" />
                  <p className="text-title">{convite.success}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="mt-10 text-left"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mx-auto flex max-w-[34rem] flex-col gap-2">
                    <label htmlFor="email" className="text-body font-medium">
                      {convite.fieldLabel}
                    </label>
                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
                      <input
                        ref={inputRef}
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        value={value}
                        onChange={(event) => {
                          setValue(event.target.value);
                          if (error) setError(null);
                        }}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? "email-error" : "email-help"}
                        className="w-full min-w-0 rounded-field border border-hairline/25 bg-paper/70 px-4 py-3.5 text-body transition-colors duration-200 placeholder:text-muted focus:border-accent"
                        placeholder="nome@exemplo.pt"
                      />
                      <MagneticButton
                        type="submit"
                        disabled={status === "pending"}
                        className="flex-none"
                      >
                        {status === "pending" ? convite.submitting : convite.submit}
                      </MagneticButton>
                    </div>
                    {error ? (
                      <p id="email-error" className="text-body text-accent" role="alert">
                        {error}
                      </p>
                    ) : (
                      <p id="email-help" className="text-body text-muted">
                        {convite.fieldHelp}
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
