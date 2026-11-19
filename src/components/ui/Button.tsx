import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-5 text-xs tracking-wide",
  md: "h-11 px-7 text-sm",
  lg: "h-13 px-9 text-sm sm:text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  if (variant === "secondary") {
    const outerClasses = cn(
      "clip-hex inline-flex bg-line p-[1px] transition-all duration-300 hover:bg-accent/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
      className
    );
    const innerClasses = cn(
      "clip-hex inline-flex w-full items-center justify-center gap-2 bg-bg-2/95 text-text-0 transition-colors hover:bg-bg-2",
      sizeStyles[size]
    );

    if ("href" in props && props.href !== undefined) {
      const { href, ...anchorProps } = props;
      return (
        <a href={href} className={outerClasses} {...anchorProps}>
          <span className={innerClasses}>{children}</span>
        </a>
      );
    }

    return (
      <button
        type={(props as ButtonAsButton).type ?? "button"}
        className={outerClasses}
        {...(props as ButtonAsButton)}
      >
        <span className={innerClasses}>{children}</span>
      </button>
    );
  }

  const classes = cn(
    "clip-hex inline-flex items-center justify-center gap-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variant === "primary"
      ? "bg-accent text-bg-0 font-medium hover:brightness-110 active:scale-[0.99]"
      : "text-text-1 hover:text-text-0 hover:bg-bg-2/70",
    sizeStyles[size],
    className
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type ?? "button"}
      className={classes}
      {...(props as ButtonAsButton)}
    >
      {children}
    </button>
  );
}
