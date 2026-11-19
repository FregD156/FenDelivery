// TODO(content): xác nhận thời gian cam kết báo giá và hình thức thanh toán thật

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  scenePhase: "intake" | "quote" | "inspect" | "disassemble" | "transport";
}

export const processData: ProcessStep[] = [
  {
    step: "01",
    title: "Gửi thông tin",
    description:
      "Gọi hotline, nhắn Zalo hoặc điền form báo giá kèm vài hình ảnh hiện trạng nội thất cần thanh lý.",
    scenePhase: "intake",
  },
  {
    step: "02",
    title: "Báo giá nhanh",
    description:
      "Đội ngũ thẩm định và gửi khoảng giá tham khảo trong thời gian cam kết (mẫu: 30 phút).",
    scenePhase: "quote",
  },
  {
    step: "03",
    title: "Khảo sát tận nơi (nếu cần)",
    description:
      "Với khối lượng lớn hoặc nguyên mặt bằng, nhân viên đến trực tiếp kiểm tra miễn phí tại Hà Nội.",
    scenePhase: "inspect",
  },
  {
    step: "04",
    title: "Thỏa thuận và tháo dỡ",
    description:
      "Chốt giá rõ ràng, đội ngũ Fen Delivery tự tháo dỡ, phân loại và đóng gói gọn gàng.",
    scenePhase: "disassemble",
  },
  {
    step: "05",
    title: "Vận chuyển và thanh toán",
    description:
      "Bốc xếp lên xe, dọn gọn mặt bằng và thanh toán ngay (tiền mặt hoặc chuyển khoản — chờ xác nhận).",
    scenePhase: "transport",
  },
];
