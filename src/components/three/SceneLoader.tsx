"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-bg-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_32%,var(--accent-soft),transparent_70%)]" />
    </div>
  ),
});

export function SceneLoader() {
  const [shouldMount, setShouldMount] = useState(false);

  // Defer WebGL initialization slightly so Hero text & CTAs achieve fast LCP first
  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setShouldMount(true), { timeout: 350 });
      return () => win.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(() => setShouldMount(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldMount) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-bg-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_32%,var(--accent-soft),transparent_70%)]" />
      </div>
    );
  }

  return <SceneCanvas />;
}
