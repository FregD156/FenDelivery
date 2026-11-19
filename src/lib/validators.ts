import { z } from "zod";

const vietnamPhoneRegex = /^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/;

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập họ tên tối thiểu 2 ký tự")
    .max(100, "Họ tên quá dài"),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s.-]/g, ""))
    .refine((val) => vietnamPhoneRegex.test(val), {
      message: "Số điện thoại Việt Nam chưa đúng định dạng (ví dụ: 09xx xxx xxx)",
    }),
  customerType: z.enum(["individual", "business"]),
  furnitureType: z.string().trim().min(2, "Vui lòng chọn hoặc nhập loại nội thất").max(200),
  quantity: z.string().trim().max(100).optional(),
  description: z.string().trim().max(1500).optional(),
  district: z.string().trim().min(2, "Vui lòng chọn quận/huyện tại Hà Nội").max(100),
  address: z.string().trim().max(250).optional(),
  preferredTime: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(1000).optional(),
  website: z.string().max(0).optional(), // honeypot anti-spam field
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
