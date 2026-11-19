import {
  Armchair,
  ArrowUpRight,
  Building2,
  Camera,
  Hotel,
  Layers,
  Snowflake,
  UtensilsCrossed,
} from "lucide-react";
import { servicesData, type ServiceItem } from "@/data/services";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const iconMap: Record<ServiceItem["sceneObjectKey"], typeof Armchair> = {
  chair: Building2,
  table: UtensilsCrossed,
  cabinet: Hotel,
  shelf: Armchair,
  appliance: Snowflake,
  office: Layers,
  custom: Camera,
};

export function ServicesSection() {
  const standardServices = servicesData.filter((s) => !s.isCallout);
  const calloutService = servicesData.find((s) => s.isCallout);

  return (
    <Section id="dich-vu" surface="bg-0">
      <Heading
        eyebrow="Danh mục thu mua"
        title="Thu mua đa dạng nội thất cũ tại Hà Nội"
        description="Từ vài món đồ gia đình đến thanh lý trọn gói văn phòng, nhà hàng, khách sạn — mọi hạng mục đều được báo giá rõ ràng và tự tháo dỡ tận nơi."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {standardServices.map((service) => {
          const Icon = iconMap[service.sceneObjectKey];
          return (
            <Card
              key={service.id}
              variant="glass"
              className="group flex flex-col justify-between hover:border-accent/40"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-bg-1 text-accent transition-colors group-hover:border-accent/40">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-text-2 transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-display text-xl font-semibold text-text-0 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-1">{service.description}</p>
              </div>

              <ul className="mt-6 space-y-1.5 border-t border-line/70 pt-4 text-xs text-text-2">
                {service.examples.map((example) => (
                  <li key={example} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent/80" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {calloutService && (
        <Card
          variant="solid"
          className="mt-6 flex flex-col items-start justify-between gap-6 border-accent/30 bg-bg-1 lg:flex-row lg:items-center"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Không giới hạn hạng mục
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-text-0 sm:text-3xl">
              {calloutService.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-1 sm:text-base">
              {calloutService.description}
            </p>
          </div>
          <Button href="#lien-he" size="lg" className="shrink-0">
            Gửi ảnh nhận báo giá
          </Button>
        </Card>
      )}
    </Section>
  );
}
