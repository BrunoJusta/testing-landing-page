"use client";

import { useEffect, useRef } from "react";
import { useCalm } from "@/lib/useCalm";

type Bubble = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  alpha: number;
};

/**
 * 2D canvas bubble field behind the hero. Motivated: the product is fermenting,
 * so the hero should be visibly alive, and the bubbles part around the pointer
 * so the page answers the cursor. Lightweight on purpose: no WebGL, one rAF
 * loop, paused when the hero leaves the viewport, thinned on small screens and
 * not mounted at all under prefers-reduced-motion.
 */
export default function BubbleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const calm = useCalm();
  const enabled = !calm;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let bubbles: Bubble[] = [];
    let frame = 0;
    let running = true;
    let last = performance.now();
    const pointer = { x: -9999, y: -9999 };
    let pointerFrame = 0;
    let tint = "200, 66, 63";

    const readTint = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-glow")
        .trim();
      if (value) tint = value.split(/\s+/).join(", ");
    };
    readTint();

    const seed = () => {
      const density = width < 640 ? 26 : width < 1100 ? 46 : 72;
      bubbles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.4 + Math.random() * (width < 640 ? 4 : 7),
        vy: 8 + Math.random() * 26,
        drift: 4 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.12 + Math.random() * 0.4,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();

    const onPointerMove = (event: PointerEvent) => {
      if (!fine || pointerFrame) return;
      const { clientX, clientY } = event;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const rect = canvas.getBoundingClientRect();
        pointer.x = clientX - rect.left;
        pointer.y = clientY - rect.top;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const b of bubbles) {
        b.phase += dt * 0.9;
        b.y -= b.vy * dt;
        b.x += Math.sin(b.phase) * b.drift * dt;

        if (fine) {
          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const radius = 150;
          if (dist < radius && dist > 0.001) {
            const push = ((radius - dist) / radius) * 46 * dt;
            b.x += (dx / dist) * push;
            b.y += (dy / dist) * push;
          }
        }

        if (b.y + b.r < -10) {
          b.y = height + b.r + Math.random() * 60;
          b.x = Math.random() * width;
        }
        if (b.x < -20) b.x = width + 20;
        if (b.x > width + 20) b.x = -20;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tint}, ${b.alpha * 0.5})`;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${tint}, ${Math.min(1, b.alpha + 0.18)})`;
        ctx.stroke();
      }

      if (running) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Stop burning frames once the hero has scrolled away.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          last = performance.now();
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    const accentObserver = new MutationObserver(readTint);
    accentObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      resizeObserver.disconnect();
      visibility.disconnect();
      accentObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
