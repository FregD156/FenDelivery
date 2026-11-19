import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-1 pb-24 pt-16 md:pb-14">
      <div className="mx-auto max-w-[var(--container-max)] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#hero" className="inline-flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-text-0">
                {siteConfig.brand.name}
              </span>
              <span className="clip-hex-icon h-2 w-2 bg-accent" />
            </a>
            <p className="mt-3 font-display text-lg text-accent italic">
              &ldquo;{siteConfig.brand.slogan}&rdquo;
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-1">
              {siteConfig.brand.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-text-2 uppercase">
              Điều hướng
            </h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-text-1 transition-colors hover:text-text-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Placeholder */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-text-2 uppercase">
              Liên hệ ({siteConfig.brand.area})
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-text-1">
              <li>
                Hotline:{" "}
                <a href={siteConfig.contact.hotlineHref} className="text-text-0 hover:text-accent">
                  {siteConfig.contact.hotlineDisplay}
                </a>
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-text-0">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>Địa chỉ: {siteConfig.contact.address}</li>
              <li className="text-accent">{siteConfig.contact.workingHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-text-2 sm:flex-row sm:items-center">
          <p>{siteConfig.brand.copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#lien-he" className="transition-colors hover:text-text-1">
              Chính sách bảo mật (Mẫu)
            </a>
            <a href="#lien-he" className="transition-colors hover:text-text-1">
              Điều khoản dịch vụ (Mẫu)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
