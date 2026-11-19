import { processData } from "@/data/process";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function ProcessSection() {
  return (
    <Section id="quy-trinh" surface="bg-1">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Left Sticky Overview & Future 3D Stage */}
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Heading
            eyebrow="Quy trình 5 bước"
            title="Nhanh gọn từ lúc gửi ảnh đến khi bàn giao mặt bằng"
            description="Toàn bộ quá trình tháo dỡ, đóng gói và vận chuyển được đội ngũ Fen Delivery thực hiện trọn gói."
            className="mb-8"
          />

          <Card variant="glass" padding="md" className="hidden lg:block">
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              Cảnh 3D theo tiến độ cuộn
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-1">
              Ở Giai đoạn 5, khung này liên kết trực tiếp với cảnh 3D: nội thất tháo rời từng khối,
              đóng thùng và xếp gọn lên xe tải theo từng bước cuộn.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {processData.map((item) => (
                <span
                  key={item.step}
                  className="h-1 flex-1 rounded-full bg-line first:bg-accent"
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Right 5 Steps */}
        <ol className="space-y-4 lg:col-span-7">
          {processData.map((item) => (
            <li key={item.step}>
              <Card
                variant="outline"
                padding="md"
                className="flex flex-col gap-4 hover:border-accent/40 sm:flex-row sm:items-start sm:gap-6"
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
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
