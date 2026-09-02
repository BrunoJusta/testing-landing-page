import type { Config } from "tailwindcss";

/**
 * Tokens live as CSS custom properties in app/globals.css so that the
 * per-lote accent can be swapped at runtime (see components/AccentProvider.tsx)
 * without re-generating any classes. Tailwind just maps names onto them.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        hairline: "rgb(var(--hairline) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-glow": "rgb(var(--accent-glow) / <alpha-value>)",
        "accent-wash": "rgb(var(--accent-wash) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mark: ["var(--font-mark)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["var(--fs-hero)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        display: ["var(--fs-display)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        title: ["var(--fs-title)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        lead: ["var(--fs-lead)", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        manifesto: ["var(--fs-manifesto)", { lineHeight: "1.14", letterSpacing: "-0.025em" }],
        figure: ["var(--fs-figure)", { lineHeight: "0.9", letterSpacing: "-0.045em" }],
        body: ["var(--fs-body)", { lineHeight: "1.65" }],
        micro: ["var(--fs-micro)", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
      borderRadius: {
        // One documented scale: panels 18px, media 22px, inputs 12px, interactive pill.
        panel: "18px",
        media: "22px",
        field: "12px",
      },
      maxWidth: {
        shell: "1400px",
        prose: "62ch",
      },
      transitionTimingFunction: {
        physical: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      zIndex: {
        nav: "40",
        cursor: "70",
        grain: "60",
        intro: "80",
      },
    },
  },
  plugins: [],
};

export default config;
