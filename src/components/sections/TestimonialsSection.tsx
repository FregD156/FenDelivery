import { Quote } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function TestimonialsSection() {
  return (
    <Section id="danh-gia" surface="bg-1">
      <Heading
        eyebrow="Đánh giá khách hàng"
        title="Phản hồi từ khách hàng (Nội dung mẫu)"
        description="Các đánh giá dưới đây là dữ liệu mẫu để minh họa bố cục, sẽ được thay thế hoàn toàn bằng phản hồi thật trước khi ra mắt."
      />

      <ScrollReveal staggerChildren className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {testimonialsData.map((item) => (
          <Card
            key={item.id}
            variant="outline"
            padding="md"
            className="flex h-full flex-col justify-between"
          >
            <div>
              <Quote className="h-6 w-6 text-accent/70" aria-hidden="true" />
              <p className="mt-4 text-sm leading-relaxed text-text-1 sm:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <p className="text-sm font-semibold text-text-0">{item.author}</p>
              <p className="mt-0.5 text-xs text-text-2">
                {item.role} · {item.district}
              </p>
            </div>
          </Card>
        ))}
      </ScrollReveal>
    </Section>
  );
}
