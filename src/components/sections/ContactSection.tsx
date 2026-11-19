"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { compressQuoteImage } from "@/lib/imageCompress";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_QUOTE_IMAGES,
  quoteFormSchema,
  validateQuoteImages,
  type QuoteFormValues,
} from "@/lib/validators";
import { useSceneStore } from "@/store/useSceneStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

interface ImagePreview {
  file: File;
  url: string;
}

interface SubmitFeedback {
  type: "success" | "error";
  message: string;
}

const fieldInputClass =
  "clip-chamfer-sm w-full bg-bg-0 px-4 py-3 text-sm text-text-0 placeholder:text-text-2 focus:outline-none";

export function ContactSection() {
  const estimatorPrefill = useSceneStore((s) => s.estimatorPrefill);
  const setEstimatorPrefill = useSceneStore((s) => s.setEstimatorPrefill);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<SubmitFeedback | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      customerType: "individual",
      furnitureType: "",
      quantity: "",
      description: "",
      district: "",
      address: "",
      preferredTime: "",
      notes: "",
      website: "",
    },
  });

  useEffect(() => {
    if (!estimatorPrefill) return;
    const furnitureSummary = estimatorPrefill.categories.join(", ");
    setValue("furnitureType", furnitureSummary, { shouldValidate: true });
    setValue("quantity", `${estimatorPrefill.quantity} món/bộ`);
    setValue("district", estimatorPrefill.district, { shouldValidate: true });
    setValue("preferredTime", estimatorPrefill.pickupWindow);
    setValue(
      "description",
      `Tình trạng: ${estimatorPrefill.condition}.${
        estimatorPrefill.estimatedRangeText
          ? ` Khoảng giá tham khảo: ${estimatorPrefill.estimatedRangeText}.`
          : ""
      }`
    );
  }, [estimatorPrefill, setValue]);

  useEffect(() => {
    return () => {
      images.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [images]);

  const handleImageSelect = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setImageError(null);

    const incomingRaw = Array.from(fileList);
    const incoming = await Promise.all(incomingRaw.map((file) => compressQuoteImage(file)));
    const combinedFiles = [...images.map((i) => i.file), ...incoming];
    const validation = validateQuoteImages(combinedFiles);

    if (!validation.valid) {
      setImageError(validation.error ?? "Ảnh tải lên không hợp lệ.");
      return;
    }

    const nextPreviews: ImagePreview[] = incoming.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...nextPreviews]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageError(null);
    setImages((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const onSubmit = async (values: QuoteFormValues) => {
    setFeedback(null);
    setImageError(null);

    const imageValidation = validateQuoteImages(images.map((i) => i.file));
    if (!imageValidation.valid) {
      setImageError(imageValidation.error ?? "Ảnh tải lên không hợp lệ.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (typeof val === "string") {
          formData.append(key, val);
        }
      });
      images.forEach((item) => formData.append("images", item.file));

      const response = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setFeedback({
          type: "error",
          message:
            data.message ??
            "Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gọi hotline trực tiếp.",
        });
        return;
      }

      trackEvent("submit_quote", {
        customer_type: values.customerType,
        district: values.district,
        images_count: images.length,
      });

      setFeedback({
        type: "success",
        message:
          data.message ??
          "Đã gửi yêu cầu báo giá thành công! Fen Delivery sẽ liên hệ với bạn sớm nhất.",
      });
      images.forEach((item) => URL.revokeObjectURL(item.url));
      setImages([]);
      setEstimatorPrefill(null);
      reset();
    } catch {
      setFeedback({
        type: "error",
        message: "Lỗi kết nối mạng. Vui lòng thử lại hoặc liên hệ trực tiếp qua Hotline/Zalo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="lien-he" surface="bg-1">
      <Heading
        eyebrow="Báo giá & Liên hệ"
        title="Gửi yêu cầu báo giá ngay"
        description="Điền thông tin cơ bản và đính kèm hình ảnh nội thất cần thanh lý. Đội ngũ Fen Delivery sẽ thẩm định và phản hồi nhanh chóng."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Contact Info Panel */}
        <Card variant="solid" padding="lg" className="flex flex-col justify-between lg:col-span-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Liên hệ trực tiếp (Placeholder)
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-text-0">
              Cần báo giá gấp? Gọi hoặc nhắn Zalo 24/7
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-1">
              Phục vụ toàn khu vực Hà Nội cho cả khách cá nhân và doanh nghiệp.
            </p>

            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex items-start gap-3.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-2">Hotline</p>
                  <a
                    href={siteConfig.contact.hotlineHref}
                    onClick={() => trackEvent("click_call", { location: "contact_panel" })}
                    className="font-medium text-text-0 hover:text-accent"
                  >
                    {siteConfig.contact.hotlineDisplay}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <MessageCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-text-2">Zalo gửi ảnh nhanh</p>
                  <a
                    href={siteConfig.contact.zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_zalo", { location: "contact_panel" })}
                    className="font-medium text-text-0 hover:text-accent"
                  >
                    {siteConfig.contact.zaloDisplay}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-2">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-text-0 hover:text-accent"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-2">Địa chỉ</p>
                  <p className="text-text-1">{siteConfig.contact.address}</p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-2">Giờ làm việc</p>
                  <p className="text-accent">{siteConfig.contact.workingHours}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            <Button
              href={siteConfig.contact.hotlineHref}
              size="md"
              onClick={() => trackEvent("click_call", { location: "contact_cta" })}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Gọi ngay</span>
            </Button>
            <Button
              href={siteConfig.contact.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="md"
              onClick={() => trackEvent("click_zalo", { location: "contact_cta" })}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Nhắn Zalo</span>
            </Button>
          </div>
        </Card>

        {/* Interactive Quote Form */}
        <Card variant="glass" padding="lg" className="lg:col-span-7">
          {estimatorPrefill && (
            <div className="clip-chamfer-sm mb-6 bg-accent/50 p-[1px]">
              <div className="clip-chamfer-sm flex items-start justify-between gap-3 bg-bg-1 px-4 py-3 text-xs text-text-0">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <p>
                    Đã tự động điền thông tin từ công cụ ước tính giá. Bạn chỉ cần bổ sung họ tên,
                    số điện thoại và ảnh thực tế.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Ẩn thông báo điền tự động"
                  onClick={() => setEstimatorPrefill(null)}
                  className="text-text-1 hover:text-text-0 cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {feedback && (
            <div
              role="status"
              aria-live="polite"
              className={
                feedback.type === "success"
                  ? "clip-chamfer-sm mb-6 bg-accent/60 p-[1px]"
                  : "clip-chamfer-sm mb-6 bg-red-500/50 p-[1px]"
              }
            >
              <div
                className={
                  feedback.type === "success"
                    ? "clip-chamfer-sm flex items-start gap-3 bg-bg-1 p-4 text-sm text-text-0"
                    : "clip-chamfer-sm flex items-start gap-3 bg-bg-1 p-4 text-sm text-red-200"
                }
              >
                {feedback.type === "success" ? (
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                    aria-hidden="true"
                  />
                )}
                <div className="flex-1">
                  <p className="leading-relaxed">{feedback.message}</p>
                </div>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
            aria-label="Form yêu cầu báo giá"
          >
            {/* Honeypot field hidden from real users */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-xs font-medium text-text-1">
                  Họ và tên <span className="text-accent">*</span>
                </label>
                <div className="hex-border-sm">
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Nguyễn Văn A"
                    aria-invalid={Boolean(errors.fullName)}
                    {...register("fullName")}
                    className={fieldInputClass}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-medium text-text-1">
                  Số điện thoại <span className="text-accent">*</span>
                </label>
                <div className="hex-border-sm">
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="09xx xxx xxx"
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                    className={fieldInputClass}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="customerType"
                  className="mb-2 block text-xs font-medium text-text-1"
                >
                  Loại khách hàng
                </label>
                <div className="hex-border-sm">
                  <select
                    id="customerType"
                    {...register("customerType")}
                    className={fieldInputClass}
                  >
                    <option value="individual">Cá nhân / Gia đình</option>
                    <option value="business">Doanh nghiệp / Văn phòng / Cơ sở kinh doanh</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="furnitureType"
                  className="mb-2 block text-xs font-medium text-text-1"
                >
                  Loại nội thất <span className="text-accent">*</span>
                </label>
                <div className="hex-border-sm">
                  <input
                    id="furnitureType"
                    type="text"
                    list="furniture-category-list"
                    placeholder="Chọn hoặc nhập loại nội thất..."
                    aria-invalid={Boolean(errors.furnitureType)}
                    {...register("furnitureType")}
                    className={fieldInputClass}
                  />
                </div>
                <datalist id="furniture-category-list">
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.title} />
                  ))}
                </datalist>
                {errors.furnitureType && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.furnitureType.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="district" className="mb-2 block text-xs font-medium text-text-1">
                  Quận / Huyện tại Hà Nội <span className="text-accent">*</span>
                </label>
                <div className="hex-border-sm">
                  <select
                    id="district"
                    aria-invalid={Boolean(errors.district)}
                    {...register("district")}
                    className={fieldInputClass}
                  >
                    <option value="">Chọn quận / huyện</option>
                    {siteConfig.hanoiDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.district && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.district.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="quantity" className="mb-2 block text-xs font-medium text-text-1">
                  Số lượng dự kiến
                </label>
                <div className="hex-border-sm">
                  <input
                    id="quantity"
                    type="text"
                    placeholder="Ví dụ: 15 bàn ghế, 1 tủ hồ sơ"
                    {...register("quantity")}
                    className={fieldInputClass}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="address" className="mb-2 block text-xs font-medium text-text-1">
                  Địa chỉ cụ thể (tùy chọn)
                </label>
                <div className="hex-border-sm">
                  <input
                    id="address"
                    type="text"
                    placeholder="Số nhà, tòa nhà, tuyến phố..."
                    {...register("address")}
                    className={fieldInputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="mb-2 block text-xs font-medium text-text-1"
                >
                  Thời gian mong muốn
                </label>
                <div className="hex-border-sm">
                  <input
                    id="preferredTime"
                    type="text"
                    placeholder="Ví dụ: Chiều nay hoặc cuối tuần"
                    {...register("preferredTime")}
                    className={fieldInputClass}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-xs font-medium text-text-1">
                Mô tả hiện trạng &amp; ghi chú
              </label>
              <div className="hex-border-sm">
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Mô tả tình trạng đồ, tầng lầu/thang máy hoặc yêu cầu tháo dỡ ngoài giờ..."
                  {...register("description")}
                  className={fieldInputClass}
                />
              </div>
            </div>

            {/* Image Upload with Previews */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-text-1">
                  Hình ảnh nội thất (tối đa {MAX_QUOTE_IMAGES} ảnh, mỗi ảnh ≤ {MAX_IMAGE_SIZE_MB}MB)
                </span>
                <span className="text-text-2">
                  {images.length}/{MAX_QUOTE_IMAGES} ảnh
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                multiple
                onChange={(e) => handleImageSelect(e.target.files)}
                className="sr-only"
                id="quote-images"
              />

              <div className="clip-chamfer-sm bg-line p-[1px] transition-colors hover:bg-accent/60">
                <label
                  htmlFor="quote-images"
                  className="clip-chamfer-sm flex cursor-pointer flex-col items-center justify-center bg-bg-0/90 px-4 py-5 text-center transition-colors hover:bg-bg-0"
                >
                  <Upload className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span className="mt-2 text-xs font-medium text-text-0">
                    Nhấn để chọn ảnh từ máy hoặc điện thoại
                  </span>
                  <span className="mt-0.5 text-[11px] text-text-2">
                    Hỗ trợ JPG, PNG, WebP, HEIC
                  </span>
                </label>
              </div>

              {imageError && <p className="mt-1.5 text-xs text-red-400">{imageError}</p>}

              {images.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                  {images.map((item, idx) => (
                    <div
                      key={item.url}
                      className="clip-chamfer-sm group relative aspect-square bg-line p-[1px]"
                    >
                      <div className="clip-chamfer-sm relative h-full w-full overflow-hidden bg-bg-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={`Ảnh nội thất ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          aria-label={`Xóa ảnh ${idx + 1}`}
                          className="clip-hex-icon absolute top-1 right-1 flex h-6 w-7 items-center justify-center bg-bg-0/85 text-text-0 transition-colors hover:bg-accent hover:text-bg-0 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Đang gửi yêu cầu...</span>
                </>
              ) : (
                <span>Gửi yêu cầu báo giá</span>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  );
}
