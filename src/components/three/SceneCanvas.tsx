"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useWebGLSupport } from "@/components/three/hooks/useWebGLSupport";
import { SceneContent } from "@/components/three/SceneContent";
import { useSceneStore } from "@/store/useSceneStore";

export default function SceneCanvas() {
  const { checked, supported, reducedMotion, isMobile } = useWebGLSupport();
  const setSceneReady = useSceneStore((s) => s.setSceneReady);

  // Graceful static luxury dark fallback for non-WebGL devices or reduced-motion preference
  if (!checked || !supported || reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-bg-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_32%,var(--accent-soft),transparent_70%)]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [isMobile ? 0 : -1.15, 0.55, isMobile ? 6.4 : 5.4], fov: 42 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        onCreated={() => setSceneReady(true)}
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
