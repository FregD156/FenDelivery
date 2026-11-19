"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/components/motion/constants";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function TiltCard({
  children,
  className,
  maxTilt = 6,
  onHoverStart,
  onHoverEnd,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hasFinePointer() || prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    cardRef.current.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    onHoverEnd?.();
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={cardRef}
      data-cursor="interactive"
      onMouseEnter={onHoverStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "h-full transition-transform duration-300 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
