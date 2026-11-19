import { siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <main className="bg-bg-0 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="glass-panel max-w-2xl rounded-[var(--radius-card-lg)] px-8 py-14 sm:px-14">
        <p className="text-accent mb-4 text-xs font-medium tracking-[0.28em] uppercase">
          {siteConfig.brand.name} · {siteConfig.brand.area}
        </p>
        <h1 className="font-display text-text-0 text-4xl font-semibold tracking-tight sm:text-6xl">
          {siteConfig.brand.slogan}
        </h1>
        <p className="text-text-1 mt-5 text-base leading-relaxed sm:text-lg">
          {siteConfig.brand.tagline}
        </p>
        <div className="border-line bg-bg-1 text-text-2 mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs">
          <span className="bg-accent h-2 w-2 rounded-full" />
          <span>Giai đoạn 1 — Khởi tạo nền tảng &amp; Design System</span>
        </div>
      </div>
    </main>
  );
}
