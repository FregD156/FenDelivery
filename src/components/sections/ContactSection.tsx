import { Clock, Mail, MapPin, MessageCircle, Phone, Upload } from "lucide-react";
import { siteConfig } from "@/data/site";
import { servicesData } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function ContactSection() {
  return (
    <Section id="lien-he" surface="bg-1">
      <Heading
        eyebrow="Báo giá &amp; Liên hệ"
        title="Gửi yêu cầu báo giá ngay"
        description="Điền thông tin cơ bản và đính kèm hình ảnh nội thất cần thanh lý. Đội ngũ Fen Delivery sẽ phản hồi nhanh chóng."
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
            <Button href={siteConfig.contact.hotlineHref} size="md">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Gọi ngay</span>
            </Button>
            <Button
              href={siteConfig.contact.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="md"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Nhắn Zalo</span>
            </Button>
          </div>
        </Card>

        {/* Quote Form Shell (Zod validation + image upload + API submit wired in Phase 3) */}
        <Card variant="glass" padding="lg" className="lg:col-span-7">
          <form className="space-y-5" aria-label="Form yêu cầu báo giá">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-xs font-medium text-text-1">
                  Họ và tên <span className="text-accent">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl border border-line bg-bg-0/80 px-4 py-3 text-sm text-text-0 placeholder:text-text-2 focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-medium text-text-1">
                  Số điện thoại <span className="text-accent">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="09xx xxx xxx"
                  className="w-full rounded-xl border border-line bg-bg-0/80 px-4 py-3 text-sm text-text-0 placeholder:text-text-2 focus:border-accent focus:outline-none"
                />
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
                <select
                  id="customerType"
                  name="customerType"
                  defaultValue="individual"
                  className="w-full rounded-xl border border-line bg-bg-0/80 px-4 py-3 text-sm text-text-0 focus:border-accent focus:outline-none"
                >
                  <option value="individual">Cá nhân / Gia đình</option>
                  <option value="business">Doanh nghiệp / Văn phòng / Cơ sở kinh doanh</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="furnitureType"
                  className="mb-2 block text-xs font-medium text-text-1"
                >
                  Loại nội thất <span className="text-accent">*</span>
                </label>
                <select
                  id="furnitureType"
                  name="furnitureType"
                  defaultValue=""
                  className="w-full rounded-xl border border-line bg-bg-0/80 px-4 py-3 text-sm text-text-0 focus:border-accent focus:outline-none"
                >
                  <option value="" disabled>
                    Chọn danh mục nội thất
                  </option>
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="district" className="mb-2 block text-xs font-medium text-text-1">
                  Quận / Huyện tại Hà Nội <span className="text-accent">*</span>
                </label>
                <select
                  id="district"
                  name="district"
                  defaultValue=""
                  className="w-full rounded-xl border border-line bg-bg-0/80 px-4 py-3 text-sm text-text-0 focus:border-accent focus:outline-none"
                >
                  <option value="" disabled>
                    Chọn quận / huyện
                  </option>
                  {siteConfig.hanoiDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="mb-2 block text-xs font-medium text-text-1"
                >
                  Thời gian mong muốn
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="text"
                  placeholder="Ví dụ: Chiều nay hoặc cuối tuần"
                  className="w-full rounded-xl border border-line bg-bg-0/80 px-4 py-3 text-sm text-text-0 placeholder:text-text-2 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-xs font-medium text-text-1">
                Mô tả số lượng &amp; tình trạng
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Ví dụ: 15 bàn làm việc, 15 ghế xoay, 2 tủ hồ sơ còn mới khoảng 85%..."
                className="w-full rounded-xl border border-line bg-bg-0/80 px-4 py-3 text-sm text-text-0 placeholder:text-text-2 focus:border-accent focus:outline-none"
              />
            </div>

            {/* Image Upload Dropzone Shell */}
            <div className="rounded-xl border border-dashed border-line bg-bg-0/50 p-4 text-center">
              <Upload className="mx-auto h-5 w-5 text-accent" aria-hidden="true" />
              <p className="mt-2 text-xs text-text-1">
                Tải ảnh nội thất (tối đa 5 ảnh — kích hoạt ở Giai đoạn 3)
              </p>
            </div>

            <Button type="button" size="lg" className="w-full">
              Gửi yêu cầu báo giá
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  );
}
