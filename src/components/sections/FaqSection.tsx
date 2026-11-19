import { faqData } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function FaqSection() {
  return (
    <Section id="faq" surface="bg-0">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Heading
            eyebrow="Câu hỏi thường gặp"
            title="Giải đáp nhanh trước khi đặt lịch"
            description="Nếu có câu hỏi khác về khối lượng đồ hoặc lịch tháo dỡ ngoài giờ, hãy gọi trực tiếp hoặc nhắn Zalo 24/7."
            className="mb-0"
          />
        </div>

        <div className="lg:col-span-8">
          <Accordion items={faqData} />
        </div>
      </div>
    </Section>
  );
}
