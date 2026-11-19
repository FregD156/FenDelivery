"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Calculator, Check, Info, Minus, Plus } from "lucide-react";
import { pricingConfig } from "@/data/pricing";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { cn, formatVnd } from "@/lib/utils";
import { useSceneStore } from "@/store/useSceneStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

type EstimatorStep = 1 | 2 | 3;

const STEP_LABELS: Record<EstimatorStep, string> = {
  1: "Loại nội thất",
  2: "Số lượng & tình trạng",
  3: "Khu vực & thời gian",
};

export function EstimatorSection() {
  const setEstimatorPrefill = useSceneStore((s) => s.setEstimatorPrefill);

  const [step, setStep] = useState<EstimatorStep>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    pricingConfig.categories[0]?.id ?? "office-chair",
  ]);
  const [quantity, setQuantity] = useState<number>(5);
  const [conditionId, setConditionId] = useState<(typeof pricingConfig.conditions)[number]["id"]>(
    "good"
  );
  const [district, setDistrict] = useState<string>(siteConfig.hanoiDistricts[4] ?? "Cầu Giấy");
  const [pickupWindowId, setPickupWindowId] = useState<string>(
    pricingConfig.pickupWindows[1]?.id ?? "1-3-days"
  );

  const toggleCategory = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const selectedCategories = useMemo(
    () => pricingConfig.categories.filter((c) => selectedIds.includes(c.id)),
    [selectedIds]
  );

  const activeCondition = useMemo(
    () =>
      pricingConfig.conditions.find((c) => c.id === conditionId) ?? pricingConfig.conditions[1],
    [conditionId]
  );

  const activePickupWindow = useMemo(
    () =>
      pricingConfig.pickupWindows.find((w) => w.id === pickupWindowId) ??
      pricingConfig.pickupWindows[0],
    [pickupWindowId]
  );

  const estimate = useMemo(() => {
    if (selectedCategories.length === 0) {
      return { min: 0, max: 0 };
    }
    const avgMin =
      selectedCategories.reduce((sum, item) => sum + item.minPerUnit, 0) /
      selectedCategories.length;
    const avgMax =
      selectedCategories.reduce((sum, item) => sum + item.maxPerUnit, 0) /
      selectedCategories.length;

    const multiplier = activeCondition?.multiplier ?? 1;
    const roundToTenThousand = (val: number) => Math.max(50000, Math.round(val / 10000) * 10000);

    return {
      min: roundToTenThousand(avgMin * quantity * multiplier),
      max: roundToTenThousand(avgMax * quantity * multiplier),
    };
  }, [selectedCategories, quantity, activeCondition]);

  const estimatedRangeText = pricingConfig.showEstimatedPrice
    ? `${formatVnd(estimate.min)} – ${formatVnd(estimate.max)}`
    : "Liên hệ để nhận báo giá trực tiếp";

  const handleSendToQuoteForm = () => {
    setEstimatorPrefill({
      categories: selectedCategories.map((c) => c.label),
      quantity,
      condition: activeCondition?.label ?? "Còn tốt",
      district,
      pickupWindow: activePickupWindow?.label ?? "",
      estimatedRangeText: pricingConfig.showEstimatedPrice ? estimatedRangeText : undefined,
    });
    trackEvent("complete_estimator", {
      categories_count: selectedCategories.length,
      quantity,
      district,
    });

    const target = document.getElementById("lien-he");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="uoc-tinh-gia" surface="bg-0">
      <Heading
        eyebrow="Công cụ ước tính"
        title="Ước tính nhanh khoảng giá thu mua"
        description="Chọn loại nội thất, tình trạng và khu vực tại Hà Nội để xem khoảng giá tham khảo và chuyển thẳng sang form báo giá chính xác."
        align="center"
      />

      <Card variant="glass" padding="lg" className="mx-auto max-w-4xl">
        {/* Step Indicator */}
        <div
          role="tablist"
          aria-label="Các bước ước tính giá"
          className="mb-8 grid grid-cols-3 gap-2 border-b border-line pb-6 sm:gap-4"
        >
          {([1, 2, 3] as EstimatorStep[]).map((num) => {
            const isActive = step === num;
            const isCompleted = step > num;
            return (
              <button
                key={num}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setStep(num)}
                className={cn(
                  "clip-chamfer-sm p-[1px] text-left transition-colors cursor-pointer",
                  isActive
                    ? "bg-accent"
                    : isCompleted
                      ? "bg-line hover:bg-accent/50"
                      : "bg-line/60 hover:bg-line"
                )}
              >
                <span
                  className={cn(
                    "clip-chamfer-sm flex items-center gap-2.5 px-3 py-2.5 sm:px-4",
                    isActive
                      ? "bg-bg-2 text-text-0"
                      : isCompleted
                        ? "bg-bg-1 text-text-0"
                        : "bg-bg-1/70 text-text-2 hover:text-text-1"
                  )}
                >
                  <span
                    className={cn(
                      "clip-hex-icon flex h-6 w-7 shrink-0 items-center justify-center text-xs font-semibold",
                      isActive
                        ? "bg-accent text-bg-0"
                        : isCompleted
                          ? "bg-accent/25 text-accent"
                          : "bg-bg-2 text-text-2"
                    )}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : num}
                  </span>
                  <span className="truncate text-xs font-medium sm:text-sm">
                    {STEP_LABELS[num]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Step 1: Categories */}
        {step === 1 && (
          <div>
            <p className="text-sm text-text-1">
              Chọn một hoặc nhiều loại nội thất bạn muốn thanh lý:
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pricingConfig.categories.map((cat) => {
                const isSelected = selectedIds.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "clip-chamfer-sm p-[1px] text-left transition-colors cursor-pointer",
                      isSelected ? "bg-accent" : "bg-line hover:bg-accent/45"
                    )}
                  >
                    <span
                      className={cn(
                        "clip-chamfer-sm flex items-center justify-between px-4 py-3.5",
                        isSelected
                          ? "bg-bg-2 text-text-0"
                          : "bg-bg-1/85 text-text-1 hover:text-text-0"
                      )}
                    >
                      <span>
                        <span className="block text-sm font-medium text-text-0">{cat.label}</span>
                        <span className="mt-0.5 block text-xs text-text-2">
                          Đơn vị tính: {cat.unit}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "clip-hex-icon flex h-5 w-6 shrink-0 items-center justify-center",
                          isSelected
                            ? "bg-accent text-bg-0"
                            : "bg-bg-0 text-transparent"
                        )}
                      >
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Quantity & Condition */}
        {step === 2 && (
          <div className="space-y-7">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="estimator-qty" className="text-sm font-medium text-text-0">
                  Số lượng ước tính
                </label>
                <span className="font-display text-2xl font-semibold text-accent">{quantity}</span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="clip-hex-icon flex h-10 w-11 bg-line p-[1px] hover:bg-accent cursor-pointer"
                >
                  <span className="clip-hex-icon flex h-full w-full items-center justify-center bg-bg-1 text-text-0">
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
                <input
                  id="estimator-qty"
                  type="range"
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-2 flex-1 accent-[var(--accent)] cursor-pointer"
                />
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((q) => Math.min(200, q + 1))}
                  className="clip-hex-icon flex h-10 w-11 bg-line p-[1px] hover:bg-accent cursor-pointer"
                >
                  <span className="clip-hex-icon flex h-full w-full items-center justify-center bg-bg-1 text-text-0">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </div>
              <p className="mt-1.5 text-xs text-text-2">
                Nếu thanh lý nguyên văn phòng số lượng lớn hơn, hãy ghi chú cụ thể ở form báo giá.
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-text-0">Tình trạng hiện tại</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pricingConfig.conditions.map((cond) => {
                  const isSelected = cond.id === conditionId;
                  return (
                    <button
                      key={cond.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setConditionId(cond.id)}
                      className={cn(
                        "clip-chamfer-sm p-[1px] text-left transition-colors cursor-pointer",
                        isSelected ? "bg-accent" : "bg-line hover:bg-accent/45"
                      )}
                    >
                      <span
                        className={cn(
                          "clip-chamfer-sm block p-4",
                          isSelected ? "bg-bg-2" : "bg-bg-1/85"
                        )}
                      >
                        <span className="block text-sm font-semibold text-text-0">
                          {cond.label}
                        </span>
                        <span className="mt-1 block text-xs text-text-1">{cond.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: District & Pickup Window */}
        {step === 3 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="estimator-district"
                className="mb-2 block text-sm font-medium text-text-0"
              >
                Khu vực tại Hà Nội
              </label>
              <div className="hex-border-sm">
                <select
                  id="estimator-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="clip-chamfer-sm w-full bg-bg-0 px-4 py-3 text-sm text-text-0 focus:outline-none"
                >
                  {siteConfig.hanoiDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-text-0">Thời gian dự kiến thu gom</p>
              <div className="space-y-2">
                {pricingConfig.pickupWindows.map((win) => {
                  const isSelected = win.id === pickupWindowId;
                  return (
                    <button
                      key={win.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setPickupWindowId(win.id)}
                      className={cn(
                        "clip-chamfer-sm block w-full p-[1px] text-left transition-colors cursor-pointer",
                        isSelected ? "bg-accent" : "bg-line hover:bg-accent/45"
                      )}
                    >
                      <span
                        className={cn(
                          "clip-chamfer-sm flex w-full items-center justify-between px-4 py-2.5 text-sm",
                          isSelected ? "bg-bg-2 text-text-0" : "bg-bg-1/85 text-text-1"
                        )}
                      >
                        <span>{win.label}</span>
                        {isSelected && <Check className="h-4 w-4 text-accent" aria-hidden="true" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
          <Button
            variant="ghost"
            size="sm"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1) as EstimatorStep)}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Quay lại</span>
          </Button>

          {step < 3 ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setStep((s) => Math.min(3, s + 1) as EstimatorStep)}
            >
              <span>Tiếp tục</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <span className="text-xs text-accent">Đã sẵn sàng gửi báo giá chính xác</span>
          )}
        </div>

        {/* Live Estimate Result Panel */}
        <div className="clip-chamfer-md mt-6 bg-accent/45 p-[1px]">
          <div className="clip-chamfer-md flex flex-col items-start justify-between gap-6 bg-bg-1 p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="clip-hex-icon h-11 w-12 shrink-0 bg-accent/50 p-[1px]">
                <div className="clip-hex-icon flex h-full w-full items-center justify-center bg-bg-2 text-accent">
                  <Calculator className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <div>
                <p className="text-xs tracking-wider text-text-2 uppercase">
                  Khoảng giá tham khảo ({selectedCategories.length} hạng mục · SL {quantity} ·{" "}
                  {activeCondition?.label})
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-accent sm:text-3xl">
                  {estimatedRangeText}
                </p>
                <p className="mt-1 text-xs text-text-1">
                  Khu vực: {district} · {activePickupWindow?.label}
                </p>
              </div>
            </div>

            <Button onClick={handleSendToQuoteForm} size="lg" className="w-full shrink-0 sm:w-auto">
              <span>Gửi báo giá chính xác</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-2">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
          <span>{pricingConfig.disclaimer}</span>
        </p>
      </Card>
    </Section>
  );
}
