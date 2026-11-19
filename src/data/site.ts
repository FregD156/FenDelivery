// TODO(content): thay bằng thông tin thật trước khi ra mắt chính thức (Giai đoạn 8)

export interface NavItem {
  label: string;
  href: string;
}

export interface TrustMetric {
  id: string;
  value: number;
  suffix: string;
  label: string;
  isPlaceholder: boolean;
}

export const siteConfig = {
  brand: {
    name: "Fen Delivery",
    slogan: "Thu thì chả mua",
    tagline: "Thu mua nội thất cũ tại Hà Nội — báo giá nhanh, đến tận nơi, 24/7.",
    area: "Hà Nội",
    hours: "24/7",
    copyright: "© 2026 Fen Delivery. Mọi quyền được bảo lưu.",
  },
  // TODO(content): thay bằng thông tin thật
  contact: {
    hotlineDisplay: "09xx xxx xxx",
    hotlineHref: "tel:+84900000000",
    zaloDisplay: "Zalo Fen Delivery (Mẫu)",
    zaloHref: "https://zalo.me/0900000000",
    facebookHref: "https://facebook.com/fendelivery-placeholder",
    email: "lienhe@fendelivery-placeholder.vn",
    address: "[Địa chỉ mẫu] Khu vực nội thành Hà Nội",
    workingHours: "Hoạt động 24/7 — cả cuối tuần & ngày lễ",
  },
  nav: [
    { label: "Dịch vụ", href: "#dich-vu" },
    { label: "Quy trình", href: "#quy-trinh" },
    { label: "Ước tính giá", href: "#uoc-tinh-gia" },
    { label: "Dự án", href: "#du-an" },
    { label: "FAQ", href: "#faq" },
    { label: "Liên hệ", href: "#lien-he" },
  ] satisfies NavItem[],
  cta: {
    primary: "Nhận báo giá ngay",
    secondary: "Xem quy trình",
    header: "Nhận báo giá",
  },
  // TODO(content): thay bằng số liệu thật
  trustMetrics: [
    { id: "support", value: 24, suffix: "/7", label: "Hỗ trợ liên tục", isPlaceholder: true },
    { id: "projects", value: 500, suffix: "+", label: "Dự án thu mua (mẫu)", isPlaceholder: true },
    {
      id: "response",
      value: 30,
      suffix: " phút",
      label: "Phản hồi báo giá (mẫu)",
      isPlaceholder: true,
    },
    { id: "onsite", value: 100, suffix: "%", label: "Thu nhận tận nơi", isPlaceholder: true },
  ] satisfies TrustMetric[],
  hanoiDistricts: [
    "Ba Đình",
    "Hoàn Kiếm",
    "Tây Hồ",
    "Long Biên",
    "Cầu Giấy",
    "Đống Đa",
    "Hai Bà Trưng",
    "Hoàng Mai",
    "Thanh Xuân",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
    "Hà Đông",
    "Đông Anh",
    "Gia Lâm",
    "Thanh Trì",
    "Hoài Đức",
    "Khu vực khác tại Hà Nội",
  ] as const,
  seo: {
    title: "Fen Delivery — Thu mua nội thất cũ tại Hà Nội 24/7",
    description:
      "Fen Delivery — Thu thì chả mua. Dịch vụ thu mua nội thất cũ văn phòng, nhà hàng, khách sạn, gia đình tại Hà Nội. Báo giá nhanh, tự tháo dỡ, vận chuyển tận nơi 24/7.",
    keywords: [
      "thu mua nội thất cũ Hà Nội",
      "thanh lý nội thất văn phòng",
      "thu mua bàn ghế văn phòng cũ",
      "thu mua đồ nhà hàng cũ",
      "thu mua nội thất khách sạn",
      "Fen Delivery",
    ],
  },
} as const;
