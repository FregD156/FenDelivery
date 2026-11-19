import { siteConfig } from "@/data/site";

export function TrustBarSection() {
  return (
    <section
      aria-label="Chỉ số tin cậy"
      className="border-y border-line bg-bg-1 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {siteConfig.trustMetrics.map((metric) => (
            <div
              key={metric.id}
              className="flex flex-col border-l border-line/80 pl-5 first:border-l-0 first:pl-0 lg:first:border-l lg:first:pl-5"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-text-0 sm:text-4xl">
                <span className="text-accent">{metric.value}</span>
                <span>{metric.suffix}</span>
              </p>
              <p className="mt-1.5 text-xs text-text-1 sm:text-sm">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
