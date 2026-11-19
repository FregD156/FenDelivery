export interface WhyUsItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const whyUsData: WhyUsItem[] = [
  {
    id: "fast-quote",
    number: "01",
    title: "Báo giá nhanh",
    subtitle: "Không để bạn phải chờ đợi",
    description:
      "Chỉ cần gửi ảnh qua Zalo hoặc điền form, đội ngũ thẩm định phản hồi rõ ràng, minh bạch ngay trong ngày.",
  },
  {
    id: "onsite-pickup",
    number: "02",
    title: "Thu nhận tận nơi",
    subtitle: "Tự tháo dỡ, tự vận chuyển",
    description:
      "Bạn không cần tự tháo lắp hay thuê xe riêng. Fen Delivery lo trọn gói từ tháo dỡ, bốc xếp đến dọn gọn mặt bằng.",
  },
  {
    id: "always-open",
    number: "03",
    title: "Hoạt động 24/7",
    subtitle: "Linh hoạt cả ngoài giờ hành chính",
    description:
      "Sẵn sàng làm việc buổi tối, cuối tuần hoặc ngày lễ để phù hợp lịch trả mặt bằng của tòa nhà và doanh nghiệp.",
  },
  {
    id: "fair-price",
    number: "04",
    title: "Giá tốt",
    subtitle: "Định giá sát thực tế, không ép giá",
    description:
      "Đánh giá đúng chất lượng từng món đồ, báo giá trọn gói rõ ràng và thanh toán nhanh gọn ngay khi nhận hàng.",
  },
];
