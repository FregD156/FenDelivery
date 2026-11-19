// TODO(content): thay bằng bảng giá thật của Fen Delivery trước khi công bố chính thức
// Lưu ý: Bảng giá dưới đây CHỈ LÀ DỮ LIỆU MẪU phục vụ công cụ ước tính tham khảo.

export interface PricingCategory {
  id: string;
  label: string;
  unit: string;
  minPerUnit: number;
  maxPerUnit: number;
}

export interface ConditionOption {
  id: "like-new" | "good" | "used" | "needs-repair";
  label: string;
  description: string;
  multiplier: number;
}

export interface PickupWindowOption {
  id: string;
  label: string;
}

export const pricingConfig = {
  /** Đặt thành false để ẩn con số ước tính và chuyển sang chế độ "Liên hệ báo giá" khi chưa có bảng giá thật */
  showEstimatedPrice: true,
  isSampleData: true,
  disclaimer:
    "Khoảng giá trên chỉ mang tính chất tham khảo từ bảng giá mẫu. Giá thu mua thực tế sẽ được xác nhận sau khi xem ảnh chi tiết hoặc khảo sát trực tiếp.",
  categories: [
    {
      id: "office-chair",
      label: "Ghế văn phòng",
      unit: "chiếc",
      minPerUnit: 150000,
      maxPerUnit: 650000,
    },
    {
      id: "office-desk",
      label: "Bàn làm việc / Bàn họp",
      unit: "chiếc",
      minPerUnit: 300000,
      maxPerUnit: 1400000,
    },
    {
      id: "cabinet",
      label: "Tủ hồ sơ / Tủ quần áo",
      unit: "chiếc",
      minPerUnit: 350000,
      maxPerUnit: 1500000,
    },
    {
      id: "sofa",
      label: "Sofa / Bàn trà",
      unit: "bộ",
      minPerUnit: 700000,
      maxPerUnit: 3500000,
    },
    {
      id: "restaurant-set",
      label: "Bộ bàn ghế nhà hàng / café",
      unit: "bộ",
      minPerUnit: 400000,
      maxPerUnit: 1800000,
    },
    {
      id: "appliance",
      label: "Điều hòa / Tủ lạnh / Điện lạnh",
      unit: "máy",
      minPerUnit: 800000,
      maxPerUnit: 3200000,
    },
    {
      id: "full-office",
      label: "Trọn gói mặt bằng / văn phòng",
      unit: "gói",
      minPerUnit: 5000000,
      maxPerUnit: 25000000,
    },
  ] satisfies PricingCategory[],
  conditions: [
    {
      id: "like-new",
      label: "Mới 90%+",
      description: "Ít sử dụng, bề mặt đẹp, đầy đủ phụ kiện",
      multiplier: 1.15,
    },
    {
      id: "good",
      label: "Còn tốt",
      description: "Sử dụng bình thường, trầy xước nhẹ",
      multiplier: 1.0,
    },
    {
      id: "used",
      label: "Cũ, hư nhẹ",
      description: "Có dấu hiệu hao mòn hoặc lỗi nhỏ",
      multiplier: 0.65,
    },
    {
      id: "needs-repair",
      label: "Cần sửa chữa",
      description: "Hư hỏng rõ, cần tân trang lại",
      multiplier: 0.35,
    },
  ] satisfies ConditionOption[],
  pickupWindows: [
    { id: "today", label: "Trong hôm nay (gấp)" },
    { id: "1-3-days", label: "Trong 1 – 3 ngày tới" },
    { id: "this-week", label: "Trong tuần này" },
    { id: "flexible", label: "Linh hoạt / Tham khảo trước" },
  ] satisfies PickupWindowOption[],
} as const;
