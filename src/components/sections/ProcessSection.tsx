"use client";

import { processData } from "@/data/process";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { useSceneStore } from "@/store/useSceneStore";
import { cn } from "@/lib/utils";

const STORY_PHASES = [
  { label: "Thu mua & thẩm định", threshold: 0.3 },
  { label: "Tháo rời & đóng thùng", threshold: 0.42 },
  { label: "Xe tải vận chuyển", threshold: 0.52 },
] as const;

export function ProcessSection() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress);

  return (
    <Section id="quy-trinh" surface="transparent" className="border-y border-line/60 bg-bg-1/55">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Left Sticky Overview & Live 3D Story Indicator */}
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Heading
            eyebrow="Quy trình 5 bước"
            title="Nhanh gọn từ lúc gửi ảnh đến khi bàn giao mặt bằng"
            description="Cuộn xuống để theo dõi từng bước tháo dỡ, đóng gói và vận chuyển trọn gói của đội ngũ Fen Delivery."
            className="mb-8"
          />

          <Card variant="glass" padding="md" className="hidden lg:block">
            <div className="flex items-center justify-between text-xs">
              <span className="tracking-[0.2em] text-accent uppercase">Trạng thái cảnh 3D</span>
              <span className="tabular-nums text-text-2">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            <div className="mt-5 space-y-2.5">
              {STORY_PHASES.map((phase, idx) => {
                const isActive = scrollProgress >= phase.threshold;
                return (
                  <div
                    key={phase.label}
                    className={cn(
                      "clip-chamfer-sm p-[1px] transition-colors duration-300",
                      isActive ? "bg-accent/60" : "bg-line/70"
                    )}
                  >
                    <div
                      className={cn(
                        "clip-chamfer-sm flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors duration-300",
                        isActive ? "bg-bg-1 text-text-0" : "bg-bg-0/80 text-text-2"
                      )}
                    >
                      <span>
                        0{idx + 1}. {phase.label}
                      </span>
                      <span
                        className={cn(
                          "clip-hex-icon h-2 w-2",
                          isActive ? "bg-accent" : "bg-line"
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right 5 Steps */}
        <ScrollReveal staggerChildren className="space-y-4 lg:col-span-7">
          {processData.map((item) => (
            <div key={item.step}>
              <Card
                variant="glass"
                padding="md"
                className="flex flex-col gap-4 hover:border-accent/45 sm:flex-row sm:items-start sm:gap-6"
              >
                <span className="font-display text-2xl font-semibold text-accent sm:text-3xl">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-0 sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-1 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </Section>
  );
}
