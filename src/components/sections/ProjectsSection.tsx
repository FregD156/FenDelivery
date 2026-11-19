import { Clock, MapPin, Package } from "lucide-react";
import { projectsData } from "@/data/projects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function ProjectsSection() {
  return (
    <Section id="du-an" surface="bg-1">
      <Heading
        eyebrow="Dự án đã thực hiện"
        title="Một số dự án thu mua tiêu biểu (Mẫu)"
        description="Hình ảnh và số liệu bên dưới là khung dữ liệu mẫu, sẽ được cập nhật bằng dự án thực tế của Fen Delivery trước khi ra mắt."
      />

      <ScrollReveal staggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projectsData.map((project) => (
          <TiltCard key={project.id} maxTilt={4}>
            <Card
              variant="solid"
              padding="sm"
              className="group h-full overflow-hidden hover:border-accent/40"
            >
              {/* Placeholder visual frame */}
              <div className="clip-chamfer-md bg-line p-[1px]">
                <div className="clip-chamfer-md relative flex aspect-[16/10] w-full items-end overflow-hidden bg-bg-0 p-5">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--accent-soft),transparent_65%)]"
                  />
                  <div className="relative flex w-full items-center justify-between gap-2">
                    <span className="clip-hex bg-line p-[1px]">
                      <span className="clip-hex block bg-bg-1/95 px-3.5 py-1 text-xs text-text-1">
                        {project.category}
                      </span>
                    </span>
                    <span className="clip-hex bg-accent/45 p-[1px]">
                      <span className="clip-hex block bg-bg-1/95 px-3.5 py-1 text-[11px] text-accent">
                        Ảnh dự án mẫu
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 px-1">
                <h3 className="font-display text-xl font-semibold text-text-0 sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-1">{project.summary}</p>

                <div className="mt-5 grid grid-cols-1 gap-2 border-t border-line pt-4 text-xs text-text-2 sm:grid-cols-3">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    {project.district}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    {project.volume}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    {project.duration}
                  </span>
                </div>
              </div>
            </Card>
          </TiltCard>
        ))}
      </ScrollReveal>
    </Section>
  );
}
