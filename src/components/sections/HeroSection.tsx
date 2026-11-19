import { ArrowDownRight, ArrowRight, Mouse, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[96vh] w-full items-center overflow-hidden bg-transparent pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Directional readability vignette so Hero text stays crisp over live 3D */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-0/92 via-bg-0/65 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-0 to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-[var(--container-max)] grid-cols-1 items-end gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10">
        {/* Editorial Copy */}
        <div className="lg:col-span-7">
          <div className="clip-hex mb-6 inline-flex bg-line p-[1px]">
            <div className="clip-hex inline-flex items-center gap-2.5 bg-bg-1/90 px-5 py-1.5 text-xs tracking-wider text-text-1 backdrop-blur-md">
              <span className="clip-hex-icon h-2 w-2 bg-accent" />
              <span>
                {siteConfig.brand.name} · {siteConfig.brand.area} · {siteConfig.brand.hours}
              </span>
            </div>
          </div>

          <TextReveal
            as="h1"
            text={siteConfig.brand.slogan}
            triggerOnScroll={false}
            delay={0.12}
            className="font-display text-5xl leading-[1.06] font-semibold tracking-tight text-text-0 sm:text-6xl lg:text-7xl"
          />

          <ScrollReveal delay={0.22} y={18}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-1 sm:text-lg lg:text-xl">
              {siteConfig.brand.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.32} y={18}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <MagneticButton>
                <Button href="#lien-he" size="lg" className="w-full sm:w-auto">
                  <span>{siteConfig.cta.primary}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="#quy-trinh" variant="secondary" size="lg" className="w-full sm:w-auto">
                  <span>{siteConfig.cta.secondary}</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line/70 pt-6 text-xs text-text-2 sm:text-sm">
            <span className="inline-flex items-center gap-2 text-text-1">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              Tự tháo dỡ &amp; vận chuyển trọn gói
            </span>
            <span>Không ép giá · Minh bạch từ bước báo giá</span>
          </div>
        </div>

        {/* Open 3D Stage Window + Subtle Interactive HUD */}
        <div className="flex min-h-[220px] flex-col justify-end lg:col-span-5 lg:min-h-[460px]">
          <div className="clip-hex ml-auto inline-flex bg-line p-[1px]">
            <div className="clip-hex glass-panel inline-flex items-center gap-3 px-5 py-2 text-xs text-text-1">
              <Mouse className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>Di chuột &amp; cuộn để xem quy trình 3D</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
