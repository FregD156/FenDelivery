// TODO(content): thay bằng thông tin thật và chi tiết danh mục thu mua thực tế

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  examples: string[];
  sceneObjectKey: "chair" | "table" | "cabinet" | "shelf" | "appliance" | "office" | "custom";
  isCallout?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: "office",
    title: "Nội thất văn phòng",
    description: "Thu mua trọn gói từ bàn làm việc, ghế công thái học đến tủ hồ sơ và vách ngăn.",
    examples: ["Bàn làm việc, bàn họp", "Ghế xoay, ghế giám đốc", "Tủ hồ sơ, hộc di động"],
    sceneObjectKey: "chair",
  },
  {
    id: "restaurant",
    title: "Nhà hàng – Quán cà phê",
    description: "Thanh lý nhanh bàn ghế gỗ, quầy bar, bếp công nghiệp, kệ trưng bày số lượng lớn.",
    examples: ["Bàn ghế ăn, bàn café", "Quầy thu ngân, quầy pha chế", "Thiết bị bếp, tủ mát"],
    sceneObjectKey: "table",
  },
  {
    id: "hotel",
    title: "Khách sạn – Căn hộ dịch vụ",
    description:
      "Thu gọn chuyên nghiệp nội thất phòng ngủ, sảnh lễ tân, hành lang theo tiến độ bàn giao.",
    examples: ["Giường, tủ quần áo", "Bàn trang điểm, sofa sảnh", "Rèm, đèn, minibar"],
    sceneObjectKey: "cabinet",
  },
  {
    id: "home",
    title: "Nội thất gia đình",
    description: "Nhận thu mua từ từng món riêng lẻ đến trọn bộ nội thất khi chuyển nhà, cải tạo.",
    examples: ["Sofa phòng khách", "Bộ bàn ăn, tủ bếp", "Giường ngủ, kệ tivi"],
    sceneObjectKey: "shelf",
  },
  {
    id: "electronics",
    title: "Thiết bị điện – Điện lạnh",
    description: "Hỗ trợ tháo lắp an toàn máy lạnh, tủ lạnh, tủ đông và thiết bị văn phòng đi kèm.",
    examples: ["Điều hòa treo tường / âm trần", "Tủ lạnh, tủ đông", "Tivi, máy chiếu, máy in"],
    sceneObjectKey: "appliance",
  },
  {
    id: "full-clearance",
    title: "Thanh lý nguyên mặt bằng",
    description: "Giải phóng mặt bằng văn phòng, showroom, nhà xưởng gọn gàng trong ngày.",
    examples: [
      "Trọn gói văn phòng chuyển chỗ",
      "Công ty giải thể, thu hẹp",
      "Hoàn trả mặt bằng đúng hạn",
    ],
    sceneObjectKey: "office",
  },
  {
    id: "anything-else",
    title: "Tất cả nội thất có thể thu mua",
    description:
      "Không chắc món đồ của bạn có thu mua được không? Chỉ cần gửi vài tấm ảnh, đội ngũ Fen Delivery sẽ kiểm tra và báo giá nhanh.",
    examples: ["Gửi ảnh qua Zalo hoặc Form", "Báo giá minh bạch, không ép giá"],
    sceneObjectKey: "custom",
    isCallout: true,
  },
];
