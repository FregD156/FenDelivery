# AGENT — Hướng dẫn cho AI agent làm dự án Fen Delivery

> File này dành cho AI coding agent (Claude Code, Cursor, v.v.). Đọc **toàn bộ** trước khi viết code. Nội dung dự án nằm ở `detail.md`, tiến độ nằm ở `plan.md`.

## 1. Vai trò

Bạn là **Designer kiêm Developer web 3D** cấp cao. Mục tiêu: dựng website thu mua nội thất cũ **Fen Delivery** (Hà Nội) với giao diện đen xám sang trọng, nhiều hoạt ảnh và 3D, nhưng vẫn nhanh, đáng tin và chuyển đổi khách tốt.

## 2. Quy trình làm việc

1. Đọc `detail.md` và `plan.md` trước khi làm.
2. Làm **đúng giai đoạn hiện tại** trong `plan.md`, không nhảy cóc.
3. Mỗi lần xong một nhóm việc: chạy build, lint, kiểm tra, rồi tick `[x]` trong `plan.md`.
4. Nếu yêu cầu mơ hồ hoặc mâu thuẫn với `detail.md`: **hỏi lại**, không tự đoán những quyết định lớn (màu, slogan, giá, thông tin liên hệ).
5. Báo cáo ngắn gọn: đã làm gì, chưa làm gì, cần quyết định gì.

## 3. Công nghệ (bắt buộc)

- Next.js (App Router) + React + TypeScript (strict)
- Tailwind CSS + CSS variables cho design tokens
- Three.js + React Three Fiber + drei + postprocessing
- GSAP (ScrollTrigger, SplitText) + Lenis cho cuộn và hoạt ảnh
- Motion (Framer Motion) cho chuyển trạng thái UI
- React Hook Form + Zod cho form
- Zustand cho trạng thái chung
- Khi cài thư viện, dùng **phiên bản ổn định mới nhất** và kiểm tra tài liệu chính thức, không dựa vào trí nhớ về API cũ.
- Không thêm thư viện lớn ngoài danh sách khi chưa có lý do rõ ràng.

## 4. Cấu trúc thư mục đề xuất

```
src/
  app/                  # route, layout, API route
    api/quote/route.ts  # nhận form báo giá
  components/
    layout/             # Header, Footer, FloatingContactBar
    sections/           # Hero, TrustBar, Services, Process, Estimator, Projects, WhyUs, Testimonials, Faq, Contact
    ui/                 # Button, Card, Accordion, Heading...
    three/              # Scene, objects/, effects/, hooks/
    motion/             # SmoothScroll, TextReveal, MagneticButton, CustomCursor
  data/                 # TOÀN BỘ nội dung placeholder (site, services, process, pricing, faq, testimonials, projects)
  lib/                  # utils, validators (zod), analytics
  store/                # zustand
  styles/               # globals.css, tokens
public/                 # ảnh, favicon, og-image
```

## 5. Design system (tóm tắt, chi tiết ở `detail.md` mục 3)

- Nền `#0A0A0B`, chữ `#F4F4F5`, chữ phụ `#A1A1AA`, nhấn champagne `#C8B28A` (có thể đổi, chờ chủ dự án duyệt).
- Tiêu đề: Playfair Display. Nội dung: Be Vietnam Pro.
- Chỉ dùng màu qua **CSS variables / Tailwind tokens**, không viết mã màu cứng rải rác.
- Chủ đạo đen xám, màu nhấn dùng tiết chế (tối đa 1–2 điểm mỗi màn hình).
- Phong cách: cao cấp, gọn, nhiều khoảng trống, thẻ kính mờ nhẹ, bo góc 16–24px.

## 6. Quy tắc về nội dung và placeholder

- Mọi nội dung chưa có thật (số điện thoại, Zalo, địa chỉ, email, số liệu, tên khách hàng, đánh giá, ảnh dự án, bảng giá) là **placeholder**.
- Đặt tập trung trong `src/data/`, **không rải chữ cứng trong component**.
- Đánh dấu bằng comment: `// TODO(content): thay bằng thông tin thật`.
- **Không bịa** số liệu, tên công ty, đánh giá như thể là thật. Dữ liệu mẫu phải dễ nhận ra là mẫu (ví dụ số điện thoại `09xx xxx xxx`).
- Công cụ ước tính giá chỉ hiển thị "khoảng giá tham khảo", có dòng "giá thực tế xác nhận sau khi xem hàng". Có cờ cấu hình để tắt/ẩn kết quả giá khi chưa có bảng giá thật.
- Ngôn ngữ giao diện: **tiếng Việt có dấu chuẩn**, văn phong lịch sự, ngắn gọn.

## 7. Quy tắc 3D

- Không dùng file model ngoài ở bản đầu: dựng vật thể **procedural** từ hình khối (box, cylinder, lathe, extrude...), vật liệu PBR xám/gỗ tối/kim loại, viền sáng champagne.
- Canvas 3D là **lớp trang trí và kể chuyện**, không chứa nội dung quan trọng. Chữ, nút, form luôn là HTML thật.
- Tải cảnh 3D theo kiểu lười (dynamic import, không SSR cho Canvas).
- Camera điều khiển theo tiến độ cuộn (liên kết ScrollTrigger với store).
- Giải phóng tài nguyên (geometry, material, texture) khi gỡ cảnh.
- Giới hạn DPR (ví dụ tối đa 1.5–2), giảm số vật thể và tắt hậu kỳ nặng trên mobile/thiết bị yếu.
- Luôn có **bản dự phòng**: không WebGL, thiết bị yếu hoặc `prefers-reduced-motion` thì hiện nền tĩnh/gradient.

## 8. Quy tắc hoạt ảnh

- Đồng bộ Lenis với GSAP ticker; dọn dẹp ScrollTrigger khi unmount.
- Chỉ animate `transform` và `opacity` khi có thể; tránh animate layout (width, height, top, left).
- Mỗi hiệu ứng phải có mục đích (dẫn mắt, tạo cảm giác cao cấp), không làm cho có.
- Thời lượng và easing nhất quán (ví dụ 0.6–1.2s, easing mượt), đặt thành hằng số dùng chung.
- Bắt buộc hỗ trợ `prefers-reduced-motion`.
- Hiệu ứng con trỏ tùy chỉnh và magnetic **chỉ bật trên thiết bị có chuột**.

## 9. Hiệu năng (ngân sách)

- Lighthouse mobile ≥ 80 (có 3D), LCP ≤ 2.5s, CLS ≤ 0.1.
- Dùng `next/image`, `next/font`, tách mã, tải trễ phần nặng.
- Nội dung chữ và nút Gọi/Zalo hiện **trước**, 3D tải sau.
- Không để 3D hoặc loading screen chặn người dùng quá lâu; loading screen có thể bỏ qua.

## 10. Form và backend

- Kiểm tra dữ liệu bằng Zod cả client và server (dùng chung schema).
- Số điện thoại: chấp nhận định dạng Việt Nam (0xxxxxxxxx, +84...).
- Chống spam: honeypot, giới hạn tần suất, cân nhắc Cloudflare Turnstile.
- Ảnh tải lên: tối đa 5 ảnh, giới hạn dung lượng, kiểm tra loại file.
- Khóa API, token **chỉ để trong biến môi trường** (`.env.local`), không commit. Cung cấp `.env.example`.
- Không ghi log dữ liệu cá nhân của khách.

## 11. SEO và truy cập

- Metadata, Open Graph, sitemap, robots, dữ liệu có cấu trúc LocalBusiness + FAQPage.
- Mỗi trang một `h1`, thứ tự heading hợp lý.
- Alt text cho ảnh, `aria-label` cho nút biểu tượng, focus rõ ràng, điều hướng bàn phím được.
- Tương phản chữ đạt chuẩn trên nền tối.

## 12. Phong cách code

- TypeScript strict, không dùng `any` nếu tránh được.
- Component nhỏ, một trách nhiệm; tên rõ nghĩa. Component/biến bằng tiếng Anh, **nội dung hiển thị bằng tiếng Việt**.
- Không để `console.log`, mã chết, comment thừa.
- Commit nhỏ, rõ: `feat:`, `fix:`, `style:`, `perf:`, `chore:`, `docs:`.
- Trước khi báo xong: `build` thành công, không lỗi lint/type.

## 13. Việc **không** được làm

- Không code vượt giai đoạn hiện tại trong `plan.md`.
- Không tự đổi bảng màu, slogan, thương hiệu khi chưa được duyệt.
- Không bịa thông tin liên hệ, số liệu, đánh giá, giá cả.
- Không commit khóa bí mật hoặc file `.env`.
- Không dùng `localStorage` cho dữ liệu nhạy cảm.
- Không thêm tracking/quảng cáo ngoài danh sách đã thống nhất.
- Không hy sinh tốc độ tải trang di động chỉ để có thêm hiệu ứng.

## 14. Định nghĩa "hoàn thành" cho mỗi tính năng

- [ ] Hoạt động đúng trên desktop và mobile
- [ ] Có trạng thái loading/lỗi/rỗng khi cần
- [ ] Có bản dự phòng cho 3D/hiệu ứng
- [ ] Không lỗi console, lint, type
- [ ] Đạt ngân sách hiệu năng
- [ ] Đã cập nhật `plan.md`
