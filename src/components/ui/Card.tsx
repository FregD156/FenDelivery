import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "glass" | "solid" | "outline";
  padding?: "sm" | "md" | "lg";
}

const variantClasses = {
  glass: "glass-panel",
  solid: "bg-bg-2 border border-line",
  outline: "bg-bg-1/50 border border-line",
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
        "rounded-[var(--radius-card)] transition-colors duration-300",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
