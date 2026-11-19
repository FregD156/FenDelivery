import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/data/site";
import "@/styles/globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: "/",
    locale: "vi_VN",
    type: "website",
    siteName: siteConfig.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfairDisplay.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg-0 text-text-0 font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-bg-0"
        >
          Chuyển tới nội dung chính
        </a>
        <StructuredData />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
