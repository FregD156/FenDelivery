const MAX_DIMENSION = 1600;
const QUALITY = 0.82;

/**
 * Compresses large client-side photos (JPEG/PNG/WebP) before uploading to /api/quote.
 * Falls back gracefully to the original file if compression isn't supported or doesn't reduce size.
 */
export async function compressQuoteImage(file: File): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return file;
  }
  if (file.size < 350 * 1024) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * ratio));
    const height = Math.max(1, Math.round(bitmap.height * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY)
    );

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const baseName = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}
