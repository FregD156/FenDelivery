"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, prefersReducedMotion } from "@/components/motion/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  delay?: number;
  y?: number;
}

export function ScrollReveal({
  children,
  className,
  staggerChildren = false,
  delay = 0,
  y = 28,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = staggerChildren ? Array.from(el.children) : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.base,
          ease: MOTION.ease.luxury,
          stagger: staggerChildren ? MOTION.stagger.cards : 0,
          delay,
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, staggerChildren, y]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
