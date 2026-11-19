"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AtmosphericDust } from "@/components/three/effects/AtmosphericDust";
import { PostEffects } from "@/components/three/effects/PostEffects";
import type { QualityTier } from "@/components/three/hooks/useWebGLSupport";
import {
  BookshelfProp,
  DeliveryTruck,
  DeskProp,
  FilingCabinetProp,
  ShippingCrates,
} from "@/components/three/objects/FurnitureProps";
import { createFenMaterials } from "@/components/three/objects/materials";
import { OfficeChair } from "@/components/three/objects/OfficeChair";
import { useSceneStore } from "@/store/useSceneStore";

interface SceneContentProps {
  isMobile: boolean;
  tier: QualityTier;
  enablePostEffects: boolean;
}

export function SceneContent({ isMobile, tier, enablePostEffects }: SceneContentProps) {
  const hoveredServiceKey = useSceneStore((s) => s.hoveredServiceKey);

  const materials = useMemo(() => createFenMaterials(), []);
  const stageGroupRef = useRef<THREE.Group | null>(null);
  const explodeRef = useRef<number>(0);
  const packProgressRef = useRef<number>(0);
  const truckProgressRef = useRef<number>(0);
  const lookTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    return () => {
      materials.dispose();
    };
  }, [materials]);

  useFrame((state) => {
    const scroll = useSceneStore.getState().scrollProgress;

    // 1. Hero (0.0 -> 0.22) | Services (0.22 -> 0.40) | Process (0.40 -> 0.65) | Finale (0.65 -> 1.0)
    const processWindow = THREE.MathUtils.smoothstep(scroll, 0.34, 0.56);
    const packWindow = THREE.MathUtils.smoothstep(scroll, 0.42, 0.6);
    const truckWindow = THREE.MathUtils.smoothstep(scroll, 0.46, 0.94);

    explodeRef.current = processWindow * (1 - THREE.MathUtils.smoothstep(scroll, 0.62, 0.78));
    packProgressRef.current = packWindow * (1 - THREE.MathUtils.smoothstep(scroll, 0.72, 0.88));
    truckProgressRef.current = truckWindow;

    // 2. Smooth scroll-driven camera choreography + pointer parallax
    const parallaxX = isMobile ? 0 : state.pointer.x * 0.45;
    const parallaxY = isMobile ? 0 : state.pointer.y * 0.28;

    const baseCamX = isMobile ? 0 : -1.15;
    const targetCamX =
      THREE.MathUtils.lerp(baseCamX, 0.85, THREE.MathUtils.smoothstep(scroll, 0.28, 0.55)) +
      parallaxX;
    const targetCamY =
      THREE.MathUtils.lerp(0.55, 1.35, THREE.MathUtils.smoothstep(scroll, 0.3, 0.6)) +
      parallaxY;
    const targetCamZ = THREE.MathUtils.lerp(
      isMobile ? 6.4 : 5.4,
      isMobile ? 7.6 : 6.8,
      THREE.MathUtils.smoothstep(scroll, 0.18, 0.55)
    );

    const nextCamX = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.06);
    const nextCamY = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.06);
    const nextCamZ = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.06);
    state.camera.position.set(nextCamX, nextCamY, nextCamZ);

    const lookX = isMobile
      ? 0
      : THREE.MathUtils.lerp(0.85, -0.35, THREE.MathUtils.smoothstep(scroll, 0.3, 0.62));
    lookTargetRef.current.set(
      THREE.MathUtils.lerp(lookTargetRef.current.x, lookX, 0.06),
      THREE.MathUtils.lerp(lookTargetRef.current.y, 0.05, 0.06),
      0
    );
    state.camera.lookAt(lookTargetRef.current);

    // 3. Gently recede hero furniture during deep middle/footer sections
    if (stageGroupRef.current) {
      const recede = THREE.MathUtils.smoothstep(scroll, 0.65, 0.9);
      stageGroupRef.current.position.z = THREE.MathUtils.lerp(
        stageGroupRef.current.position.z,
        -recede * 2.2,
        0.06
      );
    }
  });

  const heroOffsetX = isMobile ? 0 : 1.55;
  const dustCount = tier === "low" ? 50 : isMobile ? 95 : 150;

  return (
    <>
      <color attach="background" args={["#0A0A0B"]} />
      <fog attach="fog" args={["#0A0A0B", 7, 18]} />

      {/* Luxury Dark Room Studio Lighting */}
      <ambientLight intensity={0.45} color="#e4e4e7" />
      <directionalLight position={[4, 6, 4]} intensity={1.8} color="#fff7ea" />
      <spotLight
        position={[-4, 5, 3]}
        angle={0.45}
        penumbra={0.85}
        intensity={2.4}
        color="#c8b28a"
      />
      <pointLight position={[2.5, -1.2, 2]} intensity={1.2} color="#c8b28a" distance={8} />
      <pointLight position={[-3.5, 2.5, -2]} intensity={0.9} color="#71717a" distance={10} />

      {/* Architectural Dark Floor Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[heroOffsetX, -1.08, 0]}>
        <ringGeometry args={[1.25, 1.29, 64]} />
        <meshBasicMaterial color="#c8b28a" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[heroOffsetX, -1.1, 0]}>
        <circleGeometry args={[3.4, 48]} />
        <meshStandardMaterial color="#111113" metalness={0.5} roughness={0.65} />
      </mesh>

      {/* Main Furniture Storytelling Cluster */}
      <group ref={stageGroupRef} position={[heroOffsetX, 0, 0]}>
        <OfficeChair
          materials={materials}
          highlighted={hoveredServiceKey === "chair" || hoveredServiceKey === "office"}
          explodeRef={explodeRef}
        />

        <DeskProp
          materials={materials}
          position={[-2.1, 0.45, -1.65]}
          rotation={[0.08, 0.55, -0.05]}
          scale={0.72}
          highlighted={hoveredServiceKey === "table" || hoveredServiceKey === "office"}
        />

        <FilingCabinetProp
          materials={materials}
          position={[1.95, 0.25, -1.35]}
          rotation={[-0.05, -0.45, 0.04]}
          scale={0.78}
          highlighted={hoveredServiceKey === "cabinet" || hoveredServiceKey === "appliance"}
        />

        {tier !== "low" && (
          <BookshelfProp
            materials={materials}
            position={[-1.4, -0.15, -2.55]}
            rotation={[0.04, 0.35, 0.06]}
            scale={0.68}
            highlighted={hoveredServiceKey === "shelf" || hoveredServiceKey === "custom"}
          />
        )}

        <ShippingCrates materials={materials} packProgressRef={packProgressRef} />
      </group>

      {/* Scroll-Driven Fen Delivery Truck */}
      <DeliveryTruck materials={materials} truckProgressRef={truckProgressRef} />

      {/* Subtle Champagne Dust & Adaptive Post-Processing */}
      <AtmosphericDust count={dustCount} />
      {enablePostEffects && <PostEffects isMobile={isMobile} />}
    </>
  );
}
