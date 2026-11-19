import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = quoteFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Dữ liệu chưa hợp lệ. Vui lòng kiểm tra lại các trường bắt buộc.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Honeypot check: silently accept bot submissions without forwarding
    if (parsed.data.website) {
      return NextResponse.json({ ok: true, message: "Đã tiếp nhận yêu cầu." });
    }

    // TODO(phase-3): kết nối kênh nhận đơn thật (Telegram / Email / Zalo OA / Sheet)
    return NextResponse.json({
      ok: true,
      message: "Đã tiếp nhận yêu cầu báo giá. Fen Delivery sẽ liên hệ với bạn sớm nhất.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không thể xử lý yêu cầu. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
