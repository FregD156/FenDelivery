"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-bg-0"
    />
  ),
});

export function SceneLoader() {
  return <SceneCanvas />;
}
