export type AnalyticsEventName =
  "click_call" | "click_zalo" | "submit_quote" | "complete_estimator";

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}
