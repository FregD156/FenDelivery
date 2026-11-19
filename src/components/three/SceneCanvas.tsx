"use client";

import { Suspense, useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useWebGLSupport } from "@/components/three/hooks/useWebGLSupport";
import { SceneContent } from "@/components/three/SceneContent";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { useSceneStore } from "@/store/useSceneStore";

function StaticLuxuryFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-bg-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_32%,var(--accent-soft),transparent_70%)]" />
    </div>
  );
}

export default function SceneCanvas() {
  const { checked, supported, reducedMotion, isMobile, tier } = useWebGLSupport();
  const setSceneReady = useSceneStore((s) => s.setSceneReady);

  const [dpr, setDpr] = useState<number>(1.5);
  const [postEffectsEnabled, setPostEffectsEnabled] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);

  if (!checked || !supported || reducedMotion || contextLost) {
    return <StaticLuxuryFallback />;
  }

  const maxDpr = tier === "low" ? 1 : isMobile ? 1.5 : 1.75;
  const activeDpr = Math.min(dpr, maxDpr);

  return (
    <SceneErrorBoundary fallback={<StaticLuxuryFallback />}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <Canvas
          dpr={activeDpr}
          camera={{ position: [isMobile ? 0 : -1.15, 0.55, isMobile ? 6.4 : 5.4], fov: 42 }}
          gl={{
            antialias: tier !== "low",
            powerPreference: "high-performance",
            alpha: false,
          }}
          onCreated={({ gl }) => {
            setSceneReady(true);
            const canvas = gl.domElement;
            const handleLost = (e: Event) => {
              e.preventDefault();
              setContextLost(true);
            };
            const handleRestored = () => {
              setContextLost(false);
            };
            canvas.addEventListener("webglcontextlost", handleLost, false);
            canvas.addEventListener("webglcontextrestored", handleRestored, false);
          }}
        >
          <PerformanceMonitor
            bounds={(refreshrate) => (refreshrate > 90 ? [45, 80] : [28, 55])}
            onDecline={() => {
              setDpr((current) => Math.max(1, Number((current - 0.25).toFixed(2))));
              if (tier === "low") {
                setPostEffectsEnabled(false);
              }
            }}
            onIncline={() => {
              setDpr((current) => Math.min(maxDpr, Number((current + 0.15).toFixed(2))));
            }}
          />
          <Suspense fallback={null}>
            <SceneContent
              isMobile={isMobile}
              tier={tier}
              enablePostEffects={postEffectsEnabled && tier !== "low"}
            />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
