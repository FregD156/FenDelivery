"use client";

import { FileText, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

export function FloatingContactBar() {
  return (
    <nav
      aria-label="Liên hệ nhanh trên di động"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg-0/92 px-3 py-2.5 backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={siteConfig.contact.hotlineHref}
          onClick={() => trackEvent("click_call", { location: "mobile_bar" })}
          className="flex flex-col items-center justify-center gap-1 rounded-xl border border-line bg-bg-2/80 py-2 text-xs font-medium text-text-0 active:scale-95"
        >
          <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>Gọi ngay</span>
        </a>

        <a
          href={siteConfig.contact.zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("click_zalo", { location: "mobile_bar" })}
          className="flex flex-col items-center justify-center gap-1 rounded-xl border border-line bg-bg-2/80 py-2 text-xs font-medium text-text-0 active:scale-95"
        >
          <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>Zalo</span>
        </a>

        <a
          href="#lien-he"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-accent py-2 text-xs font-semibold text-bg-0 active:scale-95"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Báo giá</span>
        </a>
      </div>
    </nav>
  );
}
