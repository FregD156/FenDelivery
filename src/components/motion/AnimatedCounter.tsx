"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/components/motion/constants";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    const el = spanRef.current;
    if (!el || prefersReducedMotion()) return;

    const counter = { current: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        current: value,
        duration: 1.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => setDisplay(Math.round(counter.current)),
      });
    }, spanRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={spanRef} className="tabular-nums">
      <span className="text-accent">{display}</span>
      <span>{suffix}</span>
    </span>
  );
}
