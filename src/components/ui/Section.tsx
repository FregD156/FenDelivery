import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  children: ReactNode;
  surface?: "bg-0" | "bg-1" | "transparent";
  compact?: boolean;
}

const surfaceClasses = {
  "bg-0": "bg-bg-0/78",
  "bg-1": "bg-bg-1/84",
  transparent: "bg-transparent",
};

export function Section({
  id,
  children,
  surface = "bg-0",
  compact = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-24",
        surfaceClasses[surface],
        compact ? "py-14 sm:py-20" : "py-20 sm:py-28 lg:py-36",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}
