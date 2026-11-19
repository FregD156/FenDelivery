"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/components/motion/constants";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const initTimer = window.setTimeout(() => setEnabled(true), 0);
    return () => window.clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (!enabled || !ringRef.current || !dotRef.current) return;

    const ring = ringRef.current;
    const dot = dotRef.current;

    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      gsap.to([ring, dot], { opacity: 1, duration: 0.25, overwrite: "auto" });
      moveRingX(e.clientX);
      moveRingY(e.clientY);
      moveDotX(e.clientX);
      moveDotY(e.clientY);

      const interactive = (e.target as HTMLElement | null)?.closest(
        'a, button, input, select, textarea, label, [data-cursor="interactive"]'
      );
      gsap.to(ring, {
        scale: interactive ? 1.65 : 1,
        borderColor: interactive ? "var(--accent)" : "rgba(244, 244, 245, 0.35)",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] -mt-4 -ml-4 h-8 w-8 rounded-full border border-text-0/35 opacity-0 will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] -mt-1 -ml-1 h-2 w-2 rounded-full bg-accent opacity-0 will-change-transform"
      />
    </>
  );
}
