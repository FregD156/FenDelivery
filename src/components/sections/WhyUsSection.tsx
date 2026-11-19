import { whyUsData } from "@/data/whyUs";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function WhyUsSection() {
  return (
    <Section id="vi-sao-chon" surface="bg-0">
      <Heading
        eyebrow="Vì sao chọn Fen Delivery"
        title="Bốn cam kết tạo nên sự khác biệt"
        description="Chúng tôi đặt sự gọn gàng, minh bạch và tốc độ lên hàng đầu — dù bạn là khách cá nhân hay doanh nghiệp cần trả mặt bằng gấp."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {whyUsData.map((item) => (
          <Card
            key={item.id}
            variant="glass"
            padding="lg"
            className="flex flex-col justify-between hover:border-accent/40"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-semibold text-accent">
                  {item.number}
                </span>
                <span className="h-px w-12 bg-line" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-text-0 sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-accent">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-1 sm:text-base">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
