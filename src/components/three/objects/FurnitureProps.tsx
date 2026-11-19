"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { FenMaterialSet } from "@/components/three/objects/materials";

interface PropBase {
  materials: FenMaterialSet;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  highlighted?: boolean;
}

export function DeskProp({
  materials,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  highlighted = false,
}: PropBase) {
  const ref = useRef<THREE.Group | null>(null);
  const accent = highlighted ? materials.champagneGlow : materials.champagneBrass;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.9 + 1.2) * 0.08;
    ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.35) * 0.14;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {/* Tabletop */}
      <mesh position={[0, 0.38, 0]} material={materials.darkWood}>
        <boxGeometry args={[1.45, 0.07, 0.72]} />
      </mesh>
      {/* Champagne inlay trim */}
      <mesh position={[0, 0.34, 0.365]} material={accent}>
        <boxGeometry args={[1.45, 0.015, 0.012]} />
      </mesh>
      {/* 4 sleek metal legs */}
      {[
        [-0.64, 0, -0.28],
        [0.64, 0, -0.28],
        [-0.64, 0, 0.28],
        [0.64, 0, 0.28],
      ].map((pos, idx) => (
        <mesh
          key={idx}
          position={[pos[0] ?? 0, -0.02, pos[2] ?? 0]}
          material={materials.darkMetal}
        >
          <boxGeometry args={[0.055, 0.76, 0.055]} />
        </mesh>
      ))}
    </group>
  );
}

export function FilingCabinetProp({
  materials,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  highlighted = false,
}: PropBase) {
  const ref = useRef<THREE.Group | null>(null);
  const accent = highlighted ? materials.champagneGlow : materials.champagneBrass;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.85 + 2.4) * 0.09;
    ref.current.rotation.y = rotation[1] + Math.cos(state.clock.elapsedTime * 0.3) * 0.12;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh material={materials.darkMetal}>
        <boxGeometry args={[0.56, 1.08, 0.62]} />
      </mesh>
      {[-0.3, 0.02, 0.34].map((y, idx) => (
        <group key={idx} position={[0, y, 0.315]}>
          <mesh material={materials.charcoalFabric}>
            <boxGeometry args={[0.48, 0.26, 0.02]} />
          </mesh>
          <mesh position={[0, 0.04, 0.02]} material={accent}>
            <boxGeometry args={[0.16, 0.018, 0.018]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function BookshelfProp({
  materials,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  highlighted = false,
}: PropBase) {
  const ref = useRef<THREE.Group | null>(null);
  const accent = highlighted ? materials.champagneGlow : materials.champagneBrass;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.75 + 4.1) * 0.07;
    ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {/* Side vertical frames */}
      <mesh position={[-0.44, 0, 0]} material={materials.darkMetal}>
        <boxGeometry args={[0.04, 1.32, 0.34]} />
      </mesh>
      <mesh position={[0.44, 0, 0]} material={materials.darkMetal}>
        <boxGeometry args={[0.04, 1.32, 0.34]} />
      </mesh>
      {/* 4 dark wood shelves with champagne front edge */}
      {[-0.56, -0.18, 0.2, 0.58].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          <mesh material={materials.darkWood}>
            <boxGeometry args={[0.88, 0.045, 0.34]} />
          </mesh>
          <mesh position={[0, 0, 0.174]} material={accent}>
            <boxGeometry args={[0.88, 0.012, 0.008]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function ShippingCrates({
  materials,
  packProgressRef,
}: {
  materials: FenMaterialSet;
  packProgressRef: React.RefObject<number>;
}) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = packProgressRef.current ?? 0;
    const targetScale = THREE.MathUtils.clamp(p, 0.001, 1);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -0.65 + (1 - p) * 0.6,
      0.08
    );
  });

  return (
    <group ref={groupRef} position={[-1.4, -0.65, 0.2]} scale={0.001}>
      {[
        [0, 0, 0, 0.64],
        [0.7, 0, -0.05, 0.56],
        [0.32, 0.58, -0.02, 0.5],
      ].map(([x, y, z, size], idx) => (
        <group key={idx} position={[x ?? 0, y ?? 0, z ?? 0]}>
          <mesh material={materials.crateMatte}>
            <boxGeometry args={[size ?? 0.5, size ?? 0.5, size ?? 0.5]} />
          </mesh>
          {/* Champagne packing tape stripe */}
          <mesh position={[0, (size ?? 0.5) / 2 + 0.004, 0]} material={materials.champagneBrass}>
            <boxGeometry args={[size ?? 0.5, 0.008, 0.07]} />
          </mesh>
          <mesh position={[0, 0, (size ?? 0.5) / 2 + 0.004]} material={materials.champagneBrass}>
            <boxGeometry args={[0.07, size ?? 0.5, 0.008]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function DeliveryTruck({
  materials,
  truckProgressRef,
}: {
  materials: FenMaterialSet;
  truckProgressRef: React.RefObject<number>;
}) {
  const truckRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (!truckRef.current) return;
    const p = truckProgressRef.current ?? 0;
    // Slides in from x = 7 -> x = 0.6 during Process, then exits left to x = -7 at finale
    const targetX = THREE.MathUtils.lerp(7.5, -6.5, p);
    truckRef.current.position.x = THREE.MathUtils.lerp(truckRef.current.position.x, targetX, 0.07);
    truckRef.current.visible = p > 0.02 && p < 0.99;
  });

  return (
    <group ref={truckRef} position={[7.5, -0.6, -0.8]} visible={false}>
      {/* Cargo container */}
      <mesh position={[0.45, 0.85, 0]} material={materials.truckBody}>
        <boxGeometry args={[2.35, 1.32, 1.16]} />
      </mesh>
      {/* Champagne branding trim strip along cargo */}
      <mesh position={[0.45, 0.85, 0.588]} material={materials.champagneGlow}>
        <boxGeometry args={[2.1, 0.045, 0.015]} />
      </mesh>
      {/* Cab */}
      <mesh position={[-1.12, 0.62, 0]} material={materials.darkMetal}>
        <boxGeometry args={[0.78, 0.88, 1.08]} />
      </mesh>
      {/* Windshield */}
      <mesh position={[-1.48, 0.78, 0]} material={materials.glassTint}>
        <boxGeometry args={[0.08, 0.42, 0.96]} />
      </mesh>
      {/* Headlights */}
      <mesh position={[-1.52, 0.36, 0.36]} material={materials.champagneGlow}>
        <boxGeometry args={[0.04, 0.1, 0.16]} />
      </mesh>
      <mesh position={[-1.52, 0.36, -0.36]} material={materials.champagneGlow}>
        <boxGeometry args={[0.04, 0.1, 0.16]} />
      </mesh>
      {/* Chassis */}
      <mesh position={[-0.1, 0.16, 0]} material={materials.charcoalFabric}>
        <boxGeometry args={[3.2, 0.14, 1.02]} />
      </mesh>
      {/* 4 Wheels with champagne hubcaps */}
      {[
        [-1.08, 0.08, 0.54],
        [-1.08, 0.08, -0.54],
        [0.95, 0.08, 0.54],
        [0.95, 0.08, -0.54],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x ?? 0, y ?? 0, z ?? 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.charcoalFabric}>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 20]} />
          </mesh>
          <mesh material={materials.champagneBrass}>
            <cylinderGeometry args={[0.11, 0.11, 0.17, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
