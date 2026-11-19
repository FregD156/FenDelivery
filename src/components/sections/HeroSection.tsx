import { ArrowDownRight, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-bg-0 pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Subtle atmospheric glow (augmented by 3D scene in Phase 5) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,var(--accent-soft),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[var(--container-max)] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Editorial Copy */}
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-1/80 px-4 py-1.5 text-xs tracking-wider text-text-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>
              {siteConfig.brand.name} · {siteConfig.brand.area} · {siteConfig.brand.hours}
            </span>
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

        {/* 3D Stage Frame (placeholder backdrop until Phase 5 R3F Canvas) */}
        <ScrollReveal delay={0.28} y={24} className="lg:col-span-5">
          <div className="glass-panel relative flex aspect-[4/4.3] w-full flex-col justify-between overflow-hidden rounded-[var(--radius-card-lg)] p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs text-text-2">
              <span className="tracking-[0.2em] uppercase">Không gian 3D</span>
              <span className="rounded-full border border-line bg-bg-0/70 px-3 py-1 text-[11px] text-accent">
                Giai đoạn 5
              </span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center py-8 text-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-accent/30 bg-bg-0/60">
                <div className="h-24 w-24 rounded-full border border-line bg-bg-2/80" />
                <div className="absolute h-2 w-2 rounded-full bg-accent" />
              </div>
              <p className="mt-6 font-display text-lg text-text-0">
                Thu mua · Tháo dỡ · Vận chuyển
              </p>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-text-2">
                Khung sân khấu cho cảnh 3D căn phòng tối sang trọng và nội thất xoay tương tác theo
                chuột.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-line/70 pt-4 text-xs text-text-2">
              <span>Cá nhân &amp; Doanh nghiệp</span>
              <span className="text-text-1">Phục vụ toàn Hà Nội</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
