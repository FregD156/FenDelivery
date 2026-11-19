import { cn } from "@/lib/utils";

interface HeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function Heading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium tracking-[0.26em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-[1.15] font-semibold tracking-tight text-text-0 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-text-1 sm:text-base">{description}</p>
      )}
    </div>
  );
}
