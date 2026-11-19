export const MOTION = {
  duration: {
    fast: 0.35,
    base: 0.75,
    slow: 1.05,
  },
  ease: {
    luxury: "power3.out",
    curtain: "power4.inOut",
    smooth: [0.22, 1, 0.36, 1] as const,
  },
  stagger: {
    words: 0.055,
    cards: 0.09,
  },
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}
