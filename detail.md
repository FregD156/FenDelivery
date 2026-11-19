# DETAIL — Website Fen Delivery

> Tài liệu mô tả chi tiết dự án. Mục nào đánh dấu `[CHỜ XÁC NHẬN]` là giả định của designer, cần chủ dự án duyệt.
> Mục nào đánh dấu `[PLACEHOLDER]` là khung trống, sẽ cập nhật nội dung thật sau.

---

## 1. Tổng quan

| Hạng mục | Nội dung |
|---|---|
| Thương hiệu | **Fen Delivery** |
| Slogan | "Thu thì chả mua" `[CHỜ XÁC NHẬN: giữ nguyên hay thêm dòng phụ chuyên nghiệp bên dưới, ví dụ "Thu mua nội thất cũ tại Hà Nội — báo giá tận nơi, 24/7"]` |
| Loại hình | Dịch vụ thu mua nội thất cũ (văn phòng, nhà hàng, khách sạn, gia đình...) |
| Khu vực | Hà Nội |
| Khách hàng | Từ cá nhân đến doanh nghiệp (văn phòng chuyển địa điểm, công ty giải thể, cơ sở kinh doanh thanh lý) |
| Ngôn ngữ | Tiếng Việt |
| Mục tiêu website | Tạo ấn tượng cao cấp, đáng tin, và **chuyển đổi khách thành yêu cầu báo giá / cuộc gọi / Zalo** |
| Hình thức xuất bản | Publish thành website thật, chạy được trên điện thoại và máy tính |

### Điểm khác biệt (USP)
1. Báo giá nhanh
2. Thu nhận tận nơi (tự tháo dỡ, vận chuyển)
3. Hoạt động 24/7
4. Giá tốt

### Lưu ý về slogan
"Thu thì chả mua" mang sắc thái dí dỏm, dễ nhớ nhưng hơi suồng sã so với định vị "chuyên nghiệp – cao cấp". Đề xuất: giữ slogan làm điểm nhấn thương hiệu, nhưng đi kèm một dòng mô tả dịch vụ nghiêm túc để khách doanh nghiệp vẫn thấy tin cậy. `[CHỜ XÁC NHẬN]`

---

## 2. Định vị và cảm giác thương hiệu

- **Từ khóa**: Chuyên nghiệp · Đáng tin · Cao cấp · Gọn gàng · Nhanh
- **Giọng văn**: Lịch sự, ngắn gọn, tự tin. Có thể pha chút dí dỏm ở slogan và microcopy, tránh lạm dụng.
- **Tránh**: Giao diện rối, màu sặc sỡ, ngôn ngữ chợ, hứa hẹn giá cụ thể khi chưa kiểm tra hàng.

---

## 3. Hệ thống thiết kế (Design System)

### 3.1 Màu sắc (tông đen xám sang trọng) `[CHỜ XÁC NHẬN]`

| Token | Mã màu | Dùng cho |
|---|---|---|
| `--bg-0` | `#0A0A0B` | Nền chính |
| `--bg-1` | `#111113` | Nền section xen kẽ |
| `--bg-2` | `#1A1A1D` | Thẻ, panel |
| `--line` | `#2A2A2E` | Đường viền, divider |
| `--text-0` | `#F4F4F5` | Chữ chính |
| `--text-1` | `#A1A1AA` | Chữ phụ |
| `--text-2` | `#6B6B73` | Chữ mờ |
| `--accent` | `#C8B28A` | Điểm nhấn champagne/vàng nhạt (nút CTA, số liệu, highlight) |
| `--accent-soft` | `#C8B28A22` | Glow, hover nền |

Nguyên tắc: 90% đen xám, chỉ dùng accent cho tối đa 1–2 điểm nhấn mỗi màn hình. Nếu muốn thuần đen xám không có vàng, đổi `--accent` thành bạc `#D4D4D8`.

### 3.2 Chữ
- **Tiêu đề (display)**: Playfair Display hoặc Fraunces (serif, hỗ trợ tiếng Việt, cảm giác cao cấp)
- **Nội dung**: Be Vietnam Pro (sans, thiết kế cho tiếng Việt, dễ đọc)
- **Số liệu / nhãn nhỏ**: Be Vietnam Pro hoặc một font mono nhẹ
- Bắt buộc kiểm tra dấu tiếng Việt hiển thị đúng ở mọi cỡ chữ.

### 3.3 Bố cục
- Lưới 12 cột, container tối đa 1280px
- Khoảng cách section: 120–200px desktop, 72–112px mobile
- Bo góc: 16–24px cho thẻ, nút dạng pill
- Hiệu ứng kính mờ (glassmorphism nhẹ) cho thẻ và thanh điều hướng

### 3.4 Thành phần giao diện chính
- Thanh điều hướng dính (sticky), thu gọn khi cuộn, có nút CTA "Nhận báo giá"
- Nút có hiệu ứng magnetic (hút theo con trỏ) trên desktop
- Thẻ có hover tilt 3D
- Con trỏ tùy chỉnh (chỉ desktop)
- Thanh nổi cố định ở mobile: Gọi ngay · Zalo · Báo giá

---

## 4. Cấu trúc trang (Sitemap)

Phiên bản đầu là **trang đơn (one-page)** cuộn dọc, điều hướng bằng anchor:

1. Loading screen
2. Header
3. Hero 3D
4. Dải tin cậy (số liệu)
5. Dịch vụ / Loại nội thất thu mua
6. Quy trình thu mua
7. Công cụ ước tính giá
8. Dự án đã thực hiện
9. Vì sao chọn Fen Delivery
10. Đánh giá khách hàng
11. FAQ
12. Form báo giá + Liên hệ
13. Footer

Giai đoạn sau có thể tách: `/dich-vu/...`, `/blog`, `/chinh-sach`.

---

## 5. Chi tiết từng section

> Toàn bộ nội dung bên dưới là **dữ liệu mẫu**. Số điện thoại, địa chỉ, số liệu, tên khách hàng đều là `[PLACEHOLDER]`.

### 5.1 Loading screen
- Logo/tên Fen Delivery xuất hiện, thanh tiến trình tải tài nguyên 3D
- Kết thúc bằng hiệu ứng "mở cửa" lộ ra Hero
- Chỉ hiện lần đầu, có nút bỏ qua nếu tải lâu

### 5.2 Header
- Logo (chữ) · Menu: Dịch vụ, Quy trình, Ước tính giá, Dự án, FAQ, Liên hệ
- CTA: **Nhận báo giá**
- Mobile: menu toàn màn hình với hiệu ứng mở

### 5.3 Hero 3D (trọng tâm)
- **Tiêu đề**: "Thu thì chả mua" (chữ lớn, hiệu ứng tách từng chữ khi xuất hiện)
- **Dòng phụ**: "Thu mua nội thất cũ tại Hà Nội — báo giá nhanh, đến tận nơi, 24/7." `[PLACEHOLDER]`
- **CTA**: "Nhận báo giá ngay" · "Xem quy trình"
- **Cảnh 3D**: xem mục 6

### 5.4 Dải tin cậy
4 số liệu đếm tăng khi cuộn tới (`[PLACEHOLDER]`):
- 24/7 hỗ trợ
- 500+ dự án thu mua
- 30 phút phản hồi báo giá
- 100% thu nhận tận nơi

### 5.5 Dịch vụ / Loại nội thất thu mua
Lưới thẻ có hover tilt, mỗi thẻ có biểu tượng 3D nhỏ hoặc hình khối:
- Nội thất văn phòng (bàn, ghế, tủ hồ sơ, vách ngăn)
- Nội thất nhà hàng – quán cà phê
- Nội thất khách sạn – căn hộ dịch vụ
- Nội thất gia đình (sofa, giường, tủ, bàn ăn)
- Thiết bị điện – điện lạnh (máy lạnh, tủ lạnh...)
- Thanh lý nguyên văn phòng / mặt bằng
- Và "Tất cả nội thất có thể thu mua" — thẻ cuối kêu gọi gửi ảnh để được báo giá

### 5.6 Quy trình thu mua (scroll-driven)
Cuộn đến đâu hiện bước đến đó, kèm cảnh 3D xe tải/khối hàng:
1. **Gửi thông tin**: gọi, Zalo hoặc điền form kèm ảnh
2. **Báo giá nhanh**: phản hồi trong thời gian cam kết `[PLACEHOLDER]`
3. **Khảo sát (nếu cần)**: nhân viên đến xem tận nơi
4. **Thỏa thuận và tháo dỡ**: chốt giá, tự tháo dỡ, đóng gói
5. **Vận chuyển và thanh toán**: nhận hàng, thanh toán ngay `[CHỜ XÁC NHẬN: hình thức thanh toán]`

### 5.7 Công cụ ước tính giá
Form tương tác 3 bước, kết quả hiển thị khoảng giá tham khảo:
1. Chọn loại nội thất (nhiều lựa chọn)
2. Số lượng và tình trạng (Mới 90%+ / Còn tốt / Cũ, hư nhẹ / Cần sửa)
3. Khu vực (quận/huyện Hà Nội) và thời gian cần thu

- Kết quả: "Khoảng giá tham khảo: X – Y đ" kèm dòng "Giá thực tế được xác nhận sau khi xem hàng"
- Nút: "Gửi báo giá chính xác" (chuyển dữ liệu sang form liên hệ)
- **Bảng giá hiện tại là dữ liệu mẫu**, lưu trong file cấu hình riêng để dễ sửa. Tuyệt đối không công bố làm giá thật. `[PLACEHOLDER]`

### 5.8 Dự án đã thực hiện
- Dạng carousel hoặc lưới, mỗi dự án: tên (ẩn danh nếu cần), loại hình, khối lượng, thời gian hoàn tất
- Dữ liệu và ảnh mẫu `[PLACEHOLDER]`

### 5.9 Vì sao chọn Fen Delivery
Bốn thẻ lớn: Báo giá nhanh · Thu nhận tận nơi · Hoạt động 24/7 · Giá tốt. Mỗi thẻ có animation riêng.

### 5.10 Đánh giá khách hàng
Slider 3–5 đánh giá mẫu `[PLACEHOLDER]`. Ghi chú nội bộ: thay bằng đánh giá thật trước khi lên chính thức.

### 5.11 FAQ
Accordion mượt, 6–8 câu mẫu `[PLACEHOLDER]`, ví dụ:
- Fen Delivery thu mua những loại nội thất nào?
- Có thu mua số lượng nhỏ, đồ cá nhân không?
- Bao lâu thì được báo giá?
- Có tính phí tháo dỡ, vận chuyển không?
- Thanh toán bằng hình thức nào?
- Nội thất hư hỏng có thu không?

### 5.12 Form báo giá và Liên hệ
**Trường dữ liệu**:
- Họ tên (bắt buộc)
- Số điện thoại (bắt buộc, kiểm tra định dạng VN)
- Loại khách: Cá nhân / Doanh nghiệp
- Loại nội thất, số lượng, mô tả
- Tải ảnh (tối đa 5 ảnh, giới hạn dung lượng)
- Quận/huyện, địa chỉ
- Thời gian mong muốn
- Ghi chú

**Khung thông tin liên hệ** (toàn bộ `[PLACEHOLDER]`): Hotline · Zalo · Facebook · Email · Địa chỉ · Giờ làm việc "24/7"

**Xử lý sau khi gửi**: thông báo thành công có animation, đồng thời gửi dữ liệu về email/Zalo/Telegram của chủ dự án `[CHỜ XÁC NHẬN: kênh nhận đơn]`.

### 5.13 Footer
Logo, slogan, menu nhanh, liên hệ (placeholder), bản quyền, link chính sách (placeholder).

---

## 6. Ý tưởng 3D và hoạt ảnh

### 6.1 Ý tưởng chủ đạo
Một **căn phòng tối sang trọng**, nơi các món nội thất (ghế xoay, bàn, tủ, kệ) được dựng từ hình khối thủ tục (procedural) với vật liệu kim loại xám, gỗ tối, ánh sáng viền vàng nhạt. Khi người dùng cuộn trang, camera di chuyển xuyên qua cảnh, nội thất tháo rời và lắp lại, cuối cùng được "xếp lên xe" — kể câu chuyện **thu mua → tháo dỡ → vận chuyển**.

### 6.2 Cảnh theo từng giai đoạn cuộn

| Giai đoạn | Cảnh 3D | Hiệu ứng |
|---|---|---|
| Hero | Ghế văn phòng xoay chậm ở giữa, các món nội thất nhỏ trôi nổi xung quanh | Phản ứng theo chuột (parallax 3D), ánh sáng viền chạy |
| Dịch vụ | Các món nội thất lùi ra xa, mờ dần làm nền | Hover thẻ làm món tương ứng sáng lên |
| Quy trình | Món nội thất tháo rời thành khối, xếp vào thùng, xe tải tiến vào | Camera chạy theo đường cong, gắn với tiến độ cuộn |
| Ước tính giá | Nền tối nhẹ, vài khối trôi chậm | Tiết kiệm tài nguyên |
| Liên hệ | Cảnh kết: xe tải rời đi / căn phòng trống gọn gàng | Cảm giác hoàn tất |

### 6.3 Danh sách hiệu ứng
- Loading screen có tiến trình
- Cuộn mượt (smooth scroll)
- Text reveal tách chữ / tách dòng
- Parallax nhiều lớp
- Camera 3D điều khiển bằng scroll
- Hover tilt 3D cho thẻ
- Magnetic button
- Con trỏ tùy chỉnh (desktop)
- Counter số
- Chuyển cảnh giữa các section (mask/clip-path)
- Hiệu ứng hạt bụi nhẹ trong cảnh
- Hậu kỳ (post-processing) nhẹ: bloom, vignette, grain

### 6.4 Hiệu năng và dự phòng
- Mobile: giảm số vật thể, tắt hậu kỳ nặng, giới hạn độ phân giải render
- Thiết bị yếu hoặc không hỗ trợ WebGL: hiển thị ảnh tĩnh/gradient thay cảnh 3D
- Tôn trọng cài đặt "giảm chuyển động" của hệ điều hành
- Tải 3D theo kiểu lười (lazy), không chặn nội dung chữ và nút gọi điện

---

## 7. Công nghệ

> Đề xuất bộ công nghệ hiện đại, ổn định. Khi khởi tạo dự án, kiểm tra và dùng phiên bản ổn định mới nhất của từng thư viện.

| Lớp | Công nghệ | Vai trò |
|---|---|---|
| Framework | **Next.js** (App Router) + **React** + **TypeScript** | Nền tảng, SEO, tối ưu ảnh/font |
| Style | **Tailwind CSS** + CSS variables | Design system nhất quán |
| 3D | **Three.js** + **React Three Fiber** + **drei** | Dựng cảnh 3D |
| Hậu kỳ 3D | **@react-three/postprocessing** | Bloom, vignette, grain |
| Animation | **GSAP** (+ ScrollTrigger, SplitText) | Hoạt ảnh theo cuộn, text reveal |
| UI animation | **Motion** (Framer Motion) | Chuyển trạng thái, accordion, modal |
| Cuộn mượt | **Lenis** | Smooth scroll đồng bộ với GSAP |
| Form | **React Hook Form** + **Zod** | Kiểm tra dữ liệu |
| Trạng thái | **Zustand** | Trạng thái tiến độ cuộn, thiết bị, cảnh 3D |
| Backend nhẹ | Route Handler của Next.js + dịch vụ gửi mail/Telegram/Zalo OA | Nhận đơn báo giá |
| Lưu ảnh khách tải | Dịch vụ lưu trữ đối tượng (S3 / Cloudflare R2 / Vercel Blob) | Ảnh trong form |
| Hosting | **Vercel** (hoặc Cloudflare Pages) | Publish, HTTPS, CDN |
| Phân tích | Google Analytics 4 + Meta Pixel (tùy chọn) | Đo chuyển đổi |
| Chất lượng | ESLint, Prettier, Lighthouse CI | Giữ chất lượng |

---

## 8. SEO và nội dung địa phương

- Từ khóa mục tiêu: thu mua nội thất cũ Hà Nội, thanh lý nội thất văn phòng, thu mua bàn ghế văn phòng cũ, thu mua đồ nhà hàng cũ, thu mua nội thất khách sạn
- Thẻ title, meta description, Open Graph, ảnh chia sẻ
- Dữ liệu có cấu trúc `LocalBusiness` + `FAQPage`
- Sitemap, robots, canonical
- Nội dung chữ thật phải nằm trong HTML (không chỉ trong canvas 3D)
- Google Business Profile: gợi ý đăng ký song song (ngoài phạm vi code)

---

## 9. Khả năng truy cập và trải nghiệm

- Độ tương phản chữ đạt chuẩn trên nền tối
- Điều hướng bằng bàn phím, focus rõ ràng
- Hỗ trợ `prefers-reduced-motion`
- Alt text cho ảnh, `aria-label` cho nút biểu tượng
- Nút Gọi / Zalo luôn truy cập được trong 1 chạm trên mobile

---

## 10. Mục tiêu hiệu năng (ngân sách)

| Chỉ số | Mục tiêu |
|---|---|
| Lighthouse Performance (mobile) | ≥ 80 (có 3D), ≥ 90 (bản dự phòng không 3D) |
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| Trọng lượng JS ban đầu | càng nhỏ càng tốt, 3D tải trễ |
| Khung hình | 60fps desktop, ≥ 30fps mobile tầm trung |

---

## 11. Câu hỏi còn mở

1. Giữ nguyên slogan hay thêm dòng phụ?
2. Chấp nhận màu nhấn champagne/vàng nhạt, hay thuần đen xám/bạc?
3. Kênh nhận đơn báo giá: email, Zalo OA, Telegram hay Google Sheet?
4. Hình thức thanh toán cam kết với khách?
5. Thời gian cam kết phản hồi báo giá?
6. Đã có tên miền chưa? Dự kiến tên miền?
7. Có logo chưa, hay cần thiết kế logo chữ (wordmark) tạm?
8. Có chạy quảng cáo (Google/Facebook) không, để chuẩn bị tracking?
9. Sau này có cần trang quản trị (admin) để xem đơn và sửa bảng giá không?
10. Mức độ ưu tiên: hiệu ứng tối đa hay ưu tiên tốc độ tải trên mobile khi có xung đột?