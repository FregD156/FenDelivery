import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = siteConfig.seo.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A0A0B 0%, #151518 65%, #1E1B16 100%)",
          padding: "72px 84px",
          color: "#F4F4F5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#C8B28A",
          }}
        >
          <span>{siteConfig.brand.name}</span>
          <span>·</span>
          <span>{siteConfig.brand.area}</span>
          <span>·</span>
          <span>{siteConfig.brand.hours}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.06,
              fontFamily: "Georgia, serif",
              color: "#F4F4F5",
            }}
          >
            {siteConfig.brand.slogan}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#A1A1AA",
              maxWidth: 920,
            }}
          >
            {siteConfig.brand.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2A2A2E",
            paddingTop: 28,
            fontSize: 22,
            color: "#A1A1AA",
          }}
        >
          <span>Báo giá nhanh · Tự tháo dỡ · Vận chuyển tận nơi</span>
          <span style={{ color: "#C8B28A", fontWeight: 600 }}>Hà Nội 24/7</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
