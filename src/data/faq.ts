// TODO(content): rà soát và xác nhận câu trả lời theo chính sách thực tế của Fen Delivery

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: "what-items",
    question: "Fen Delivery thu mua những loại nội thất nào?",
    answer:
      "Chúng tôi thu mua đa dạng nội thất cũ tại Hà Nội: bàn ghế văn phòng, tủ hồ sơ, nội thất nhà hàng – quán cà phê, khách sạn – căn hộ dịch vụ, nội thất gia đình (sofa, giường, tủ, bàn ăn) và các thiết bị điện lạnh đi kèm.",
  },
  {
    id: "small-quantity",
    question: "Có thu mua số lượng nhỏ hoặc đồ cá nhân không?",
    answer:
      "Có. Fen Delivery phục vụ từ khách cá nhân cần thanh lý vài món nội thất gia đình cho đến doanh nghiệp thanh lý trọn gói văn phòng hoặc mặt bằng.",
  },
  {
    id: "response-time",
    question: "Bao lâu thì tôi nhận được báo giá?",
    answer:
      "Sau khi nhận được thông tin và hình ảnh qua Zalo hoặc form trên website, đội ngũ sẽ thẩm định và phản hồi khoảng giá nhanh nhất có thể (thời gian cam kết mẫu: khoảng 30 phút).",
  },
  {
    id: "disassembly-fee",
    question: "Có tính thêm phí tháo dỡ hay vận chuyển không?",
    answer:
      "Không phát sinh chi phí ẩn. Mức giá thỏa thuận cuối cùng đã bao gồm công tháo dỡ, bốc xếp và vận chuyển tận nơi của đội ngũ Fen Delivery.",
  },
  {
    id: "payment-method",
    question: "Hình thức thanh toán như thế nào?",
    answer:
      "Thanh toán ngay sau khi hoàn tất kiểm đếm và bốc xếp bằng tiền mặt hoặc chuyển khoản ngân hàng tùy theo yêu cầu của khách hàng (sẽ xác nhận chính thức trước khi triển khai).",
  },
  {
    id: "damaged-items",
    question: "Nội thất cũ hoặc hư hỏng nhẹ có thu mua không?",
    answer:
      "Vẫn có thể thu mua tùy theo tình trạng thực tế và chất liệu. Bạn chỉ cần chụp vài góc ảnh rõ hiện trạng và gửi cho chúng tôi để được tư vấn cụ thể.",
  },
  {
    id: "after-hours",
    question: "Fen Delivery có hỗ trợ thu dọn buổi tối hoặc cuối tuần không?",
    answer:
      "Có. Chúng tôi hoạt động 24/7 tại Hà Nội, sẵn sàng sắp xếp lịch tháo dỡ ngoài giờ hành chính hoặc cuối tuần theo quy định của tòa nhà văn phòng và chung cư.",
  },
];
