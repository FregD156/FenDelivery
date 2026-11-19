import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import {
  quoteFormSchema,
  validateQuoteImages,
  type QuoteFormValues,
} from "@/lib/validators";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function formatQuoteSummary(data: QuoteFormValues, imageCount: number): string {
  const customerLabel =
    data.customerType === "business" ? "Doanh nghiệp / Cơ sở" : "Cá nhân / Gia đình";
  return [
    "📦 YÊU CẦU BÁO GIÁ MỚI — FEN DELIVERY",
    `• Khách hàng: ${data.fullName} (${customerLabel})`,
    `• SĐT: ${data.phone.replace(/[\s.-]/g, "")}`,
    `• Loại nội thất: ${data.furnitureType}`,
    data.quantity ? `• Số lượng: ${data.quantity}` : null,
    `• Khu vực: ${data.district}${data.address ? ` — ${data.address}` : ""}`,
    data.preferredTime ? `• Thời gian mong muốn: ${data.preferredTime}` : null,
    data.description ? `• Mô tả: ${data.description}` : null,
    data.notes ? `• Ghi chú: ${data.notes}` : null,
    `• Ảnh đính kèm: ${imageCount} ảnh`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function notifyTelegram(summary: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: summary,
    }),
  });
  return response.ok;
}

async function notifyResend(summary: string, customerName: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_NOTIFY_EMAIL;
  if (!apiKey || !toEmail) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Fen Delivery <onboarding@resend.dev>",
      to: [toEmail],
      subject: `[Fen Delivery] Yêu cầu báo giá mới từ ${customerName}`,
      text: summary,
    }),
  });
  return response.ok;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${Math.ceil(rateLimit.retryAfterSeconds / 60)} phút hoặc gọi hotline trực tiếp.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        }
      );
    }

    const contentType = request.headers.get("content-type") ?? "";
    let rawPayload: Record<string, unknown> = {};
    let uploadedImages: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const getString = (key: string) => {
        const value = formData.get(key);
        return typeof value === "string" ? value : undefined;
      };

      rawPayload = {
        fullName: getString("fullName") ?? "",
        phone: getString("phone") ?? "",
        customerType: getString("customerType") ?? "individual",
        furnitureType: getString("furnitureType") ?? "",
        quantity: getString("quantity"),
        description: getString("description"),
        district: getString("district") ?? "",
        address: getString("address"),
        preferredTime: getString("preferredTime"),
        notes: getString("notes"),
        website: getString("website") ?? "",
      };

      uploadedImages = formData
        .getAll("images")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0);
    } else {
      rawPayload = (await request.json()) as Record<string, unknown>;
    }

    const parsed = quoteFormSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại các trường đánh dấu lỗi.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Honeypot check: silently accept bot traffic without forwarding
    if (parsed.data.website) {
      return NextResponse.json({
        ok: true,
        mode: "demo",
        message: "Đã tiếp nhận yêu cầu báo giá.",
      });
    }

    const imageValidation = validateQuoteImages(uploadedImages);
    if (!imageValidation.valid) {
      return NextResponse.json(
        {
          ok: false,
          message: imageValidation.error ?? "Ảnh tải lên không hợp lệ.",
        },
        { status: 400 }
      );
    }

    const summary = formatQuoteSummary(parsed.data, uploadedImages.length);
    const [telegramSent, emailSent] = await Promise.all([
      notifyTelegram(summary).catch(() => false),
      notifyResend(summary, parsed.data.fullName).catch(() => false),
    ]);

    const deliveredLive = telegramSent || emailSent;

    return NextResponse.json({
      ok: true,
      mode: deliveredLive ? "live" : "demo",
      imageCount: uploadedImages.length,
      message: deliveredLive
        ? "Đã gửi yêu cầu báo giá thành công! Fen Delivery sẽ liên hệ với bạn sớm nhất."
        : "Đã tiếp nhận yêu cầu ở chế độ demo local. Khi cấu hình Telegram/Email trong .env.local, đơn sẽ được gửi trực tiếp về kênh nhận đơn.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại hoặc gọi hotline trực tiếp.",
      },
      { status: 500 }
    );
  }
}
