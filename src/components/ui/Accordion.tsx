"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  defaultOpenId?: string;
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-bg-1/70">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="group">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-2/40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-8 sm:py-6 cursor-pointer"
            >
              <span className="text-base font-medium text-text-0 sm:text-lg">{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-text-1 transition-transform duration-300",
                  isOpen && "rotate-180 text-accent"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className="px-6 pb-6 text-sm leading-relaxed text-text-1 sm:px-8 sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
