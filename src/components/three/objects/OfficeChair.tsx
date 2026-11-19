"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { FenMaterialSet } from "@/components/three/objects/materials";

interface OfficeChairProps {
  materials: FenMaterialSet;
  highlighted?: boolean;
  explodeRef: React.RefObject<number>;
}

const LEG_ANGLES = [0, 1, 2, 3, 4].map((i) => (i * Math.PI * 2) / 5);

export function OfficeChair({ materials, highlighted = false, explodeRef }: OfficeChairProps) {
  const rootRef = useRef<THREE.Group | null>(null);
  const baseRef = useRef<THREE.Group | null>(null);
  const seatRef = useRef<THREE.Group | null>(null);
  const backRef = useRef<THREE.Group | null>(null);
  const leftArmRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    const explode = explodeRef.current ?? 0;
    const t = state.clock.elapsedTime;

    if (rootRef.current) {
      rootRef.current.rotation.y += delta * (highlighted ? 0.65 : 0.28);
      rootRef.current.position.y = Math.sin(t * 1.1) * 0.06;
    }

    // Modular disassembly animation along axes when scroll enters Process phase
    if (baseRef.current) {
      baseRef.current.position.y = THREE.MathUtils.lerp(baseRef.current.position.y, -explode * 0.55, 0.08);
    }
    if (seatRef.current) {
      seatRef.current.position.y = THREE.MathUtils.lerp(seatRef.current.position.y, explode * 0.15, 0.08);
    }
    if (backRef.current) {
      backRef.current.position.z = THREE.MathUtils.lerp(
        backRef.current.position.z,
        -0.36 - explode * 0.55,
        0.08
      );
      backRef.current.position.y = THREE.MathUtils.lerp(
        backRef.current.position.y,
        0.58 + explode * 0.35,
        0.08
      );
    }
    if (leftArmRef.current) {
      leftArmRef.current.position.x = THREE.MathUtils.lerp(
        leftArmRef.current.position.x,
        -0.44 - explode * 0.45,
        0.08
      );
    }
    if (rightArmRef.current) {
      rightArmRef.current.position.x = THREE.MathUtils.lerp(
        rightArmRef.current.position.x,
        0.44 + explode * 0.45,
        0.08
      );
    }
  });

  const accentMat = highlighted ? materials.champagneGlow : materials.champagneBrass;

  return (
    <group ref={rootRef}>
      {/* 5-star caster base + gas lift */}
      <group ref={baseRef}>
        <mesh position={[0, -0.52, 0]} material={materials.darkMetal} castShadow>
          <cylinderGeometry args={[0.045, 0.055, 0.52, 20]} />
        </mesh>
        <mesh position={[0, -0.32, 0]} material={accentMat}>
          <torusGeometry args={[0.06, 0.01, 12, 28]} />
        </mesh>
        {LEG_ANGLES.map((angle, idx) => (
          <group key={idx} rotation={[0, angle, 0]} position={[0, -0.76, 0]}>
            <mesh position={[0.24, 0, 0]} rotation={[0, 0, -0.1]} material={materials.darkMetal}>
              <boxGeometry args={[0.48, 0.04, 0.055]} />
            </mesh>
            <mesh position={[0.46, -0.06, 0]} material={materials.darkMetal}>
              <cylinderGeometry args={[0.042, 0.042, 0.04, 14]} />
            </mesh>
            <mesh position={[0.46, -0.06, 0]} material={accentMat}>
              <cylinderGeometry args={[0.018, 0.018, 0.045, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Seat cushion & champagne rim */}
      <group ref={seatRef}>
        <mesh position={[0, -0.2, 0.02]} material={materials.charcoalFabric} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.12, 0.78]} />
        </mesh>
        <mesh position={[0, -0.265, 0.02]} material={accentMat}>
          <boxGeometry args={[0.84, 0.018, 0.8]} />
        </mesh>
      </group>

      {/* Ergonomic backrest + headrest */}
      <group ref={backRef} position={[0, 0.58, -0.36]}>
        <mesh material={materials.charcoalFabric} castShadow>
          <boxGeometry args={[0.74, 0.92, 0.1]} />
        </mesh>
        {/* Champagne architectural frame */}
        <mesh position={[-0.385, 0, 0]} material={accentMat}>
          <boxGeometry args={[0.025, 0.94, 0.11]} />
        </mesh>
        <mesh position={[0.385, 0, 0]} material={accentMat}>
          <boxGeometry args={[0.025, 0.94, 0.11]} />
        </mesh>
        {/* Headrest */}
        <mesh position={[0, 0.62, 0.03]} material={materials.charcoalFabric}>
          <boxGeometry args={[0.42, 0.22, 0.09]} />
        </mesh>
        <mesh position={[0, 0.49, 0]} material={materials.darkMetal}>
          <boxGeometry args={[0.14, 0.1, 0.04]} />
        </mesh>
      </group>

      {/* Left armrest */}
      <group ref={leftArmRef} position={[-0.44, 0.04, 0.02]}>
        <mesh position={[0, -0.1, 0]} material={materials.darkMetal}>
          <boxGeometry args={[0.04, 0.28, 0.06]} />
        </mesh>
        <mesh position={[0, 0.05, 0.04]} material={materials.darkWood}>
          <boxGeometry args={[0.09, 0.04, 0.46]} />
        </mesh>
      </group>

      {/* Right armrest */}
      <group ref={rightArmRef} position={[0.44, 0.04, 0.02]}>
        <mesh position={[0, -0.1, 0]} material={materials.darkMetal}>
          <boxGeometry args={[0.04, 0.28, 0.06]} />
        </mesh>
        <mesh position={[0, 0.05, 0.04]} material={materials.darkWood}>
          <boxGeometry args={[0.09, 0.04, 0.46]} />
        </mesh>
      </group>
    </group>
  );
}
