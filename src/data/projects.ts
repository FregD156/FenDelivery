// TODO(content): thay bằng dự án và hình ảnh thực tế của Fen Delivery

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  district: string;
  volume: string;
  duration: string;
  summary: string;
  isPlaceholder: boolean;
}

export const projectsData: ProjectItem[] = [
  {
    id: "project-sample-01",
    title: "Dự án mẫu #01 — Văn phòng chuyển địa điểm",
    category: "Nội thất văn phòng",
    district: "Cầu Giấy, Hà Nội",
    volume: "[Dữ liệu mẫu] ~40 bộ bàn ghế & tủ hồ sơ",
    duration: "Hoàn tất trong 1 ngày",
    summary: "Tháo dỡ toàn bộ cụm bàn làm việc, phân loại ghế và bàn giao mặt bằng đúng giờ.",
    isPlaceholder: true,
  },
  {
    id: "project-sample-02",
    title: "Dự án mẫu #02 — Thanh lý quán cà phê",
    category: "Nhà hàng – Quán cà phê",
    district: "Đống Đa, Hà Nội",
    volume: "[Dữ liệu mẫu] 25 bộ bàn ghế gỗ & quầy bar",
    duration: "Hoàn tất trong 4 giờ",
    summary: "Thu gom gọn trong khung giờ đêm để tránh ảnh hưởng giao thông khu vực trung tâm.",
    isPlaceholder: true,
  },
  {
    id: "project-sample-03",
    title: "Dự án mẫu #03 — Cải tạo căn hộ dịch vụ",
    category: "Khách sạn – Căn hộ",
    district: "Tây Hồ, Hà Nội",
    volume: "[Dữ liệu mẫu] 12 phòng ngủ & thiết bị điện lạnh",
    duration: "Hoàn tất trong 1 ngày",
    summary: "Tháo lắp an toàn điều hòa, giường tủ và vận chuyển sạch sẽ qua thang hàng.",
    isPlaceholder: true,
  },
  {
    id: "project-sample-04",
    title: "Dự án mẫu #04 — Thu mua nội thất gia đình",
    category: "Nội thất gia đình",
    district: "Hai Bà Trưng, Hà Nội",
    volume: "[Dữ liệu mẫu] Trọn bộ phòng khách & phòng ăn",
    duration: "Hoàn tất trong 2 giờ",
    summary: "Khảo sát qua ảnh Zalo, đến tận nơi đúng hẹn và thanh toán ngay sau khi bốc hàng.",
    isPlaceholder: true,
  },
];
