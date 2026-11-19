"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, prefersReducedMotion } from "@/components/motion/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  triggerOnScroll?: boolean;
  delay?: number;
}

export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  triggerOnScroll = true,
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>("[data-word]");
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: MOTION.duration.base,
          ease: MOTION.ease.luxury,
          stagger: MOTION.stagger.words,
          delay,
          ...(triggerOnScroll
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: "top 86%",
                  once: true,
                },
              }
            : {}),
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, triggerOnScroll]);

  return (
    <Tag ref={containerRef} className={cn("overflow-visible", className)}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]"
        >
          <span data-word className="inline-block will-change-transform">
            {word}
            {idx < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
