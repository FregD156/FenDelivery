# PLAN — Website Fen Delivery

> Kế hoạch thực hiện theo giai đoạn. Tick `[x]` khi hoàn thành. Chi tiết nội dung xem `detail.md`, quy tắc cho AI agent xem `agent.md`.

## Nguyên tắc triển khai

- Làm theo từng giai đoạn, **mỗi giai đoạn chạy được và xem được** trước khi sang giai đoạn kế.
- Nội dung chữ và nút liên hệ làm trước, 3D và hiệu ứng thêm lớp sau.
- Mọi dữ liệu chưa có đều dùng placeholder, gom về một nơi để sửa.

---

## Giai đoạn 0 — Chốt yêu cầu

- [x] Trả lời các câu hỏi mở ở `detail.md` mục 11 (các mục kỹ thuật & thẩm mỹ cốt lõi đã chốt; kênh nhận đơn/tên miền sẽ chốt bổ sung trước Giai đoạn 3 & 8)
- [x] Duyệt bảng màu, font, slogan
- [ ] Quyết định kênh nhận đơn báo giá (sẽ chốt trước Giai đoạn 3)
- [ ] Chuẩn bị tên miền (nếu có, trước Giai đoạn 8)

**Xong khi**: chủ dự án duyệt `detail.md`.

---

## Giai đoạn 1 — Khởi tạo dự án

- [x] Tạo dự án Next.js + TypeScript + Tailwind
- [x] Cài thư viện: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, gsap, lenis, motion, react-hook-form, zod, zustand
- [x] Cấu hình ESLint, Prettier
- [x] Dựng cấu trúc thư mục (xem `agent.md`)
- [x] Khai báo design tokens (màu, font, khoảng cách) trong CSS variables
- [x] Nạp font (Playfair Display, Be Vietnam Pro) có hỗ trợ tiếng Việt
- [x] Tạo file dữ liệu placeholder tập trung (`src/data/`)
- [x] Kết nối Git, đẩy lên repository
- [ ] Kết nối Vercel, có link preview đầu tiên (cần `vercel login` hoặc import repo `FregD156/FenDelivery` trên Vercel dashboard)

**Xong khi**: trang trắng nền đen chạy được, đã có link preview.

---

## Giai đoạn 2 — Khung giao diện (chưa 3D)

- [x] Layout chung: Header sticky, Footer, thanh nổi mobile (Gọi · Zalo · Báo giá)
- [x] Dựng đủ 13 section ở dạng tĩnh với nội dung mẫu (Loading screen sẽ gắn ở Giai đoạn 4)
- [x] Responsive: 360px, 768px, 1280px, 1920px
- [x] Component dùng chung: Button, Card, Section, Heading, Accordion
- [x] Menu mobile

**Xong khi**: cuộn hết trang thấy đủ nội dung, đẹp ở mọi cỡ màn hình, chưa cần hiệu ứng.

---

## Giai đoạn 3 — Chức năng cốt lõi

- [ ] Form báo giá: kiểm tra dữ liệu (Zod), định dạng số điện thoại VN
- [ ] Tải ảnh lên (giới hạn số lượng và dung lượng)
- [ ] API nhận đơn → gửi về kênh đã chọn (email / Telegram / Zalo / Sheet)
- [ ] Chống spam (honeypot + giới hạn tần suất, cân nhắc Turnstile)
- [ ] Công cụ ước tính giá 3 bước, đọc từ file cấu hình giá mẫu
- [ ] Nút Gọi / Zalo hoạt động trên mobile
- [ ] Thông báo thành công / lỗi

**Xong khi**: gửi form thử thì chủ dự án nhận được đơn.

---

## Giai đoạn 4 — Cuộn mượt và hoạt ảnh giao diện

- [ ] Tích hợp Lenis đồng bộ với GSAP ScrollTrigger
- [ ] Text reveal cho tiêu đề
- [ ] Hiệu ứng xuất hiện section khi cuộn
- [ ] Counter số ở dải tin cậy
- [ ] Hover tilt cho thẻ dịch vụ
- [ ] Magnetic button, con trỏ tùy chỉnh (desktop)
- [ ] Accordion FAQ mượt
- [ ] Chuyển cảnh giữa các section
- [ ] Loading screen
- [ ] Hỗ trợ `prefers-reduced-motion`

**Xong khi**: trang có "cảm giác cao cấp" khi cuộn, không giật.

---

## Giai đoạn 5 — Cảnh 3D

- [ ] Thiết lập Canvas, ánh sáng, môi trường, nền tối
- [ ] Dựng vật thể procedural: ghế xoay, bàn, tủ hồ sơ, kệ, thùng, xe tải
- [ ] Vật liệu: kim loại xám, gỗ tối, viền sáng champagne
- [ ] Cảnh Hero: ghế xoay + vật thể trôi nổi + phản ứng chuột
- [ ] Camera chạy theo tiến độ cuộn qua các section
- [ ] Cảnh Quy trình: tháo rời → đóng thùng → xe tải
- [ ] Hậu kỳ nhẹ: bloom, vignette, grain
- [ ] Hạt bụi / ánh sáng khí quyển nhẹ
- [ ] Tải cảnh 3D theo kiểu lười, không chặn nội dung

**Xong khi**: Hero và Quy trình có 3D chạy mượt trên desktop.

---

## Giai đoạn 6 — Tối ưu mobile và hiệu năng

- [ ] Phát hiện thiết bị, giảm chất lượng 3D tự động (số vật thể, DPR, hậu kỳ)
- [ ] Bản dự phòng khi không có WebGL hoặc thiết bị yếu
- [ ] Nén ảnh, tối ưu font, tách mã (code splitting)
- [ ] Đo Lighthouse mobile và desktop, sửa đến khi đạt mục tiêu ở `detail.md` mục 10
- [ ] Kiểm thử thiết bị thật: iPhone, Android tầm trung, laptop yếu
- [ ] Kiểm thử trình duyệt: Chrome, Safari, Firefox, Edge

**Xong khi**: đạt ngân sách hiệu năng, mobile cuộn mượt.

---

## Giai đoạn 7 — SEO, theo dõi và hoàn thiện

- [ ] Title, meta, Open Graph, ảnh chia sẻ
- [ ] Dữ liệu có cấu trúc LocalBusiness + FAQPage
- [ ] Sitemap, robots, favicon
- [ ] Google Analytics 4, theo dõi sự kiện: bấm Gọi, bấm Zalo, gửi form, dùng công cụ ước tính
- [ ] Kiểm tra truy cập: bàn phím, tương phản, alt text
- [ ] Rà soát toàn bộ placeholder còn sót

**Xong khi**: toàn bộ checklist chất lượng đạt.

---

## Giai đoạn 8 — Thay nội dung thật và ra mắt

- [ ] Cập nhật: logo, số điện thoại, Zalo, địa chỉ, email, mạng xã hội
- [ ] Thay số liệu thật, dự án thật, đánh giá thật, ảnh thật
- [ ] Cập nhật bảng giá thật cho công cụ ước tính (hoặc đổi sang chế độ "liên hệ báo giá")
- [ ] Gắn tên miền, bật HTTPS
- [ ] Kiểm thử cuối: gửi form thật, gọi thử, mở link trên nhiều thiết bị
- [ ] Ra mắt và đăng ký Google Search Console, Google Business Profile

**Xong khi**: website chạy bằng tên miền thật với nội dung thật.

---

## Giai đoạn 9 — Mở rộng (tùy chọn)

- [ ] Trang quản trị xem đơn, sửa bảng giá
- [ ] Blog / trang dịch vụ riêng cho từng loại nội thất (SEO)
- [ ] Mô hình 3D thật (glTF) thay hình khối procedural khi có tài nguyên
- [ ] Chat trực tiếp / chatbot hỗ trợ

---

## Rủi ro và cách xử lý

| Rủi ro                                       | Cách xử lý                                                   |
| -------------------------------------------- | ------------------------------------------------------------ |
| 3D nặng, mobile giật                         | Chất lượng tự động theo thiết bị, bản dự phòng không 3D      |
| Hiệu ứng làm chậm tải trang                  | Tải 3D trễ, nội dung chữ và nút gọi luôn hiện trước          |
| Số liệu/đánh giá giả bị lộ ra bản chính thức | Gom placeholder một chỗ, có bước rà soát ở Giai đoạn 7       |
| Công cụ ước tính giá hứa sai giá             | Luôn ghi "giá tham khảo", để chế độ tắt khi chưa có giá thật |
| Form bị spam                                 | Honeypot, giới hạn tần suất, Turnstile                       |
| Slogan quá suồng sã so với định vị cao cấp   | Thêm dòng phụ nghiêm túc, chủ dự án quyết định               |

---

## Thứ tự ưu tiên khi thiếu thời gian

1. Hero + Form báo giá + nút Gọi/Zalo (thu khách được ngay)
2. Dịch vụ, Quy trình, FAQ
3. Hoạt ảnh giao diện
4. Công cụ ước tính giá
5. Cảnh 3D nâng cao và hậu kỳ
