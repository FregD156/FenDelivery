import { Calculator, Info } from "lucide-react";
import { pricingConfig } from "@/data/pricing";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function EstimatorSection() {
  return (
    <Section id="uoc-tinh-gia" surface="bg-0">
      <Heading
        eyebrow="Công cụ ước tính"
        title="Ước tính nhanh khoảng giá thu mua"
        description="Chọn nhanh loại nội thất, tình trạng và khu vực tại Hà Nội để xem khoảng giá tham khảo trước khi gửi ảnh báo giá chính xác."
        align="center"
      />

      <Card variant="glass" padding="lg" className="mx-auto max-w-4xl">
        {/* 3-Step Visual Frame (Full interactive calculator logic wired in Phase 3) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Bước 01</p>
            <h3 className="font-display text-lg font-semibold text-text-0">Chọn loại nội thất</h3>
            <div className="flex flex-wrap gap-2">
              {pricingConfig.categories.slice(0, 5).map((cat, idx) => (
                <span
                  key={cat.id}
                  className={
                    idx === 0
                      ? "rounded-full border border-accent bg-accent-soft px-3 py-1.5 text-xs text-text-0"
                      : "rounded-full border border-line bg-bg-1 px-3 py-1.5 text-xs text-text-1"
                  }
                >
                  {cat.label}
                </span>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Bước 02</p>
            <h3 className="font-display text-lg font-semibold text-text-0">
              Số lượng &amp; tình trạng
            </h3>
            <ul className="space-y-2 text-xs text-text-1">
              {pricingConfig.conditions.map((cond) => (
                <li
                  key={cond.id}
                  className="rounded-xl border border-line bg-bg-1/80 px-3 py-2"
                >
                  <span className="font-medium text-text-0">{cond.label}</span> — {cond.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Bước 03</p>
            <h3 className="font-display text-lg font-semibold text-text-0">
              Khu vực &amp; thời gian
            </h3>
            <div className="rounded-xl border border-line bg-bg-1/80 p-3.5 text-xs text-text-1">
              <p className="text-text-2">Khu vực phục vụ</p>
              <p className="mt-1 font-medium text-text-0">
                {siteConfig.hanoiDistricts.slice(0, 4).join(", ")} &amp; toàn Hà Nội
              </p>
              <p className="mt-3 text-text-2">Thời gian linh hoạt</p>
              <p className="mt-1 font-medium text-text-0">
                {pricingConfig.pickupWindows[0]?.label}
              </p>
            </div>
          </div>
        </div>

        {/* Result Preview Box */}
        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-bg-1 p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-accent">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs tracking-wider text-text-2 uppercase">
                Khoảng giá tham khảo (Mẫu)
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-text-0">
                Sẵn sàng tính tự động ở Giai đoạn 3
              </p>
            </div>
          </div>

          <Button href="#lien-he" className="shrink-0">
            Gửi báo giá chính xác
          </Button>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-2">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
          <span>{pricingConfig.disclaimer}</span>
        </p>
      </Card>
    </Section>
  );
}
