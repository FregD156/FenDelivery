"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          isScrolled
            ? "border-b border-line/80 bg-bg-0/85 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Wordmark Logo */}
          <a
            href="#hero"
            className="group flex items-baseline gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="font-display text-xl font-semibold tracking-tight text-text-0 sm:text-2xl">
              {siteConfig.brand.name}
            </span>
            <span className="clip-hex-icon hidden h-2 w-2 bg-accent sm:inline-block" />
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-text-1 transition-colors hover:text-text-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.contact.hotlineHref}
              className="hidden items-center gap-2 text-xs font-medium text-text-1 transition-colors hover:text-accent xl:inline-flex"
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>{siteConfig.contact.hotlineDisplay}</span>
            </a>

            <Button href="#lien-he" size="sm" className="hidden sm:inline-flex">
              {siteConfig.cta.header}
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
              className="clip-hex-icon inline-flex h-10 w-11 bg-line p-[1px] transition-colors hover:bg-accent/60 lg:hidden cursor-pointer"
            >
              <span className="clip-hex-icon flex h-full w-full items-center justify-center bg-bg-2 text-text-0">
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Menu className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng di động"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg-0/98 px-6 py-6 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold text-text-0">
              {siteConfig.brand.name}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Đóng menu"
              className="clip-hex-icon inline-flex h-10 w-11 bg-line p-[1px] cursor-pointer"
            >
              <span className="clip-hex-icon flex h-full w-full items-center justify-center bg-bg-2 text-text-0">
                <X className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8">
            {siteConfig.nav.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline justify-between border-b border-line/60 pb-4 font-display text-2xl text-text-0 transition-colors hover:text-accent"
              >
                <span>{item.label}</span>
                <span className="font-sans text-xs text-text-2">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 border-t border-line pt-6">
            <Button
              href="#lien-he"
              size="lg"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {siteConfig.cta.primary}
            </Button>
            <p className="text-center text-xs text-text-2">
              {siteConfig.contact.hotlineDisplay} · {siteConfig.brand.hours}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
