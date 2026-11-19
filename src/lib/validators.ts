import { z } from "zod";

const vietnamPhoneRegex = /^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/;

export const MAX_QUOTE_IMAGES = 5;
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập họ tên tối thiểu 2 ký tự")
    .max(100, "Họ tên quá dài"),
  phone: z
    .string()
    .trim()
    .refine((val) => vietnamPhoneRegex.test(val.replace(/[\s.-]/g, "")), {
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

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

export function validateQuoteImages(files: File[]): ImageValidationResult {
  if (files.length > MAX_QUOTE_IMAGES) {
    return {
      valid: false,
      error: `Chỉ được tải lên tối đa ${MAX_QUOTE_IMAGES} ảnh.`,
    };
  }

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
      return {
        valid: false,
        error: `Tệp "${file.name}" không đúng định dạng ảnh (chấp nhận JPG, PNG, WebP, HEIC).`,
      };
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return {
        valid: false,
        error: `Ảnh "${file.name}" vượt quá giới hạn ${MAX_IMAGE_SIZE_MB}MB.`,
      };
    }
  }

  return { valid: true };
}
