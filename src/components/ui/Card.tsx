import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "glass" | "solid" | "outline";
  padding?: "sm" | "md" | "lg";
}

const outerVariantClasses = {
  glass: "bg-line/85 hover:bg-accent/50",
  solid: "bg-line hover:bg-accent/55",
  outline: "bg-line/80 hover:bg-accent/50",
};

const innerVariantClasses = {
  glass: "glass-panel",
  solid: "bg-bg-2",
  outline: "bg-bg-1/90",
};

const paddingClasses = {
  sm: "p-5 sm:p-6",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
};

export function Card({
  children,
  variant = "glass",
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "clip-chamfer-lg p-[1px] transition-colors duration-300",
        outerVariantClasses[variant]
      )}
      {...props}
    >
      <div
        className={cn(
          "clip-chamfer-lg h-full w-full",
          innerVariantClasses[variant],
          paddingClasses[padding],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
