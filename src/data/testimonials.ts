// TODO(content): thay toàn bộ bằng đánh giá thật từ khách hàng trước khi ra mắt chính thức

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  district: string;
  quote: string;
  isPlaceholder: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "review-sample-01",
    author: "Khách hàng mẫu A",
    role: "Quản lý hành chính (Doanh nghiệp mẫu)",
    district: "Cầu Giấy, Hà Nội",
    quote:
      "[Đánh giá mẫu] Bên mình cần trả mặt bằng gấp vào cuối tuần. Đội Fen Delivery qua tháo dỡ rất gọn, đúng hẹn và thanh toán đầy đủ ngay tại chỗ.",
    isPlaceholder: true,
  },
  {
    id: "review-sample-02",
    author: "Khách hàng mẫu B",
    role: "Chủ quán cà phê (Mẫu)",
    district: "Đống Đa, Hà Nội",
    quote:
      "[Đánh giá mẫu] Gửi ảnh qua Zalo khoảng nửa tiếng là có báo giá tham khảo. Lúc qua xem thực tế trao đổi rất lịch sự, không kỳ kèo ép giá.",
    isPlaceholder: true,
  },
  {
    id: "review-sample-03",
    author: "Khách hàng mẫu C",
    role: "Khách hàng cá nhân (Mẫu)",
    district: "Thanh Xuân, Hà Nội",
    quote:
      "[Đánh giá mẫu] Chuyển nhà cần bán bộ sofa và tủ quần áo cũ. Các bạn tự tháo mang xuống hầm cực kỳ sạch sẽ, không làm trầy tường thang máy.",
    isPlaceholder: true,
  },
];
